const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/auth");
const c = require("../controllers/orderController");

router.post("/", protect, c.createOrder);
router.get("/my-orders", protect, c.getMyOrders);
router.get("/:id", protect, c.getOrderById);
router.post("/verify-payment", protect, c.verifyPayment);
router.post("/webhook", c.flutterwaveWebhook); // raw body — mounted before json() in server.js
router.get("/", protect, adminOnly, c.getAllOrders);
router.put("/:id/status", protect, adminOnly, c.updateOrderStatus);

module.exports = router;
