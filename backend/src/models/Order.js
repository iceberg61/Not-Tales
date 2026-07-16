const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    name: String,
    image: String,
    price: Number,
    size: String,
    color: String,
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [orderItemSchema],
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      country: String,
      zip: String,
    },
    subtotal: Number,
    shippingFee: Number,
    total: Number,
    paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
    paymentRef: String, // Flutterwave transaction reference
    orderStatus: {
      type: String,
      enum: ["processing", "shipped", "out_for_delivery", "delivered", "cancelled"],
      default: "processing",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
