const crypto = require("crypto");
const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");
const AppError = require("../utils/AppError");
const { verifyTransaction } = require("../services/flutterwaveService");
const { sendOrderConfirmationEmail } = require("../services/emailService");

// Placeholder flat rate — mirrors the frontend's SHIPPING_FEE constant in
// cart/checkout. TODO: pull both from one shared config once real shipping
// rates exist, so they can't drift apart.
const SHIPPING_FEE = 8;

function generateTxRef() {
  return `NT-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
}

// Shared by both the client-triggered verify call and the Flutterwave
// webhook, so a payment can only ever be applied once no matter which path
// gets there first (or if both do).
async function markOrderPaid(order, transactionRef) {
  if (order.paymentStatus === "paid") return order; // already applied — no-op

  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      for (const item of order.items) {
        const updated = await Product.findOneAndUpdate(
          { _id: item.product, stock: { $gte: item.quantity } },
          { $inc: { stock: -item.quantity } },
          { session }
        );
        if (!updated) {
          throw new AppError(`Insufficient stock for ${item.name} after payment.`, 409);
        }
      }
      order.paymentStatus = "paid";
      order.paymentRef = transactionRef;
      await order.save({ session });
    });
  } finally {
    session.endSession();
  }

  const populated = await order.populate("user", "email name");
  sendOrderConfirmationEmail(populated.user.email, order).catch((err) =>
    console.error("Order confirmation email failed:", err.message)
  );

  return order;
}

// POST /api/orders — creates a *pending* order priced from live DB data,
// before any payment happens. The returned tx_ref is what the frontend
// hands to the Flutterwave inline checkout.
exports.createOrder = async (req, res, next) => {
  try {
    const { items, shippingAddress } = req.body;

    if (!items?.length) throw new AppError("Cart is empty.", 400);
    const requiredAddressFields = ["street", "city", "state", "country", "zip"];
    if (!shippingAddress || requiredAddressFields.some((f) => !shippingAddress[f])) {
      throw new AppError("A complete shipping address is required.", 400);
    }

    const orderItems = [];
    let subtotal = 0;

    for (const { productId, quantity, size, color } of items) {
      const product = await Product.findById(productId);
      if (!product) throw new AppError(`Product ${productId} not found.`, 404);
      if (product.stock < quantity) {
        throw new AppError(`${product.name} doesn't have enough stock.`, 409);
      }

      // Price/name/image are snapshotted from the DB, never trusted from the
      // client — otherwise a request could be edited to check out at $0.
      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        size,
        color,
        quantity,
      });
      subtotal += product.price * quantity;
    }

    const total = subtotal + SHIPPING_FEE;
    const txRef = generateTxRef();

    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      shippingAddress,
      subtotal,
      shippingFee: SHIPPING_FEE,
      total,
      paymentRef: txRef,
    });

    res.status(201).json({
      success: true,
      order,
      payment: { txRef, amount: total, currency: "NGN" },
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/orders/my-orders
exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    next(err);
  }
};

// GET /api/orders/:id
exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) throw new AppError("Order not found.", 404);

    const isOwner = order.user.toString() === req.user.id;
    if (!isOwner && req.user.role !== "admin") {
      throw new AppError("Not authorized to view this order.", 403);
    }

    res.json({ success: true, order });
  } catch (err) {
    next(err);
  }
};

// POST /api/orders/verify-payment — called by the frontend right after
// Flutterwave's checkout modal reports success. The webhook below is the
// authoritative confirmation; this just gives the user instant feedback.
exports.verifyPayment = async (req, res, next) => {
  try {
    const { orderId, transactionId } = req.body;
    if (!orderId || !transactionId) {
      throw new AppError("orderId and transactionId are required.", 400);
    }

    const order = await Order.findById(orderId);
    if (!order) throw new AppError("Order not found.", 404);
    if (order.user.toString() !== req.user.id) {
      throw new AppError("Not authorized for this order.", 403);
    }

    const { data } = await verifyTransaction(transactionId);

    const isValid =
      data.status === "successful" &&
      data.tx_ref === order.paymentRef &&
      data.currency === "NGN" &&
      data.amount >= order.total;

    if (!isValid) {
      order.paymentStatus = "failed";
      await order.save();
      throw new AppError("Payment verification failed.", 402);
    }

    await markOrderPaid(order, data.tx_ref);
    res.json({ success: true, order });
  } catch (err) {
    next(err);
  }
};

// POST /api/orders/webhook — Flutterwave calls this server-to-server.
// Never trust the payload directly; re-verify the transaction with
// Flutterwave's API before acting on it. Always ack with 200 so
// Flutterwave doesn't endlessly retry, even if something downstream fails.
exports.flutterwaveWebhook = async (req, res) => {
  try {
    const signature = req.headers["verif-hash"];
    if (!signature || signature !== process.env.FLUTTERWAVE_WEBHOOK_HASH) {
      return res.status(401).end();
    }

    const payload = JSON.parse(req.body.toString());
    const transactionId = payload?.data?.id;
    if (!transactionId) return res.status(200).end();

    const { data } = await verifyTransaction(transactionId);
    const order = await Order.findOne({ paymentRef: data.tx_ref });
    if (!order) return res.status(200).end();

    const isValid = data.status === "successful" && data.currency === "NGN" && data.amount >= order.total;
    if (isValid) {
      await markOrderPaid(order, data.tx_ref);
    }

    res.status(200).end();
  } catch (err) {
    console.error("Webhook processing error:", err.message);
    res.status(200).end(); // still ack — log it, don't trigger Flutterwave retries
  }
};

// GET /api/orders (admin)
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("user", "name email").sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    next(err);
  }
};

// PUT /api/orders/:id/status (admin)
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ["processing", "shipped", "out_for_delivery", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
      throw new AppError(`Status must be one of: ${validStatuses.join(", ")}.`, 400);
    }

    const order = await Order.findByIdAndUpdate(req.params.id, { orderStatus: status }, { new: true });
    if (!order) throw new AppError("Order not found.", 404);

    res.json({ success: true, order });
  } catch (err) {
    next(err);
  }
};