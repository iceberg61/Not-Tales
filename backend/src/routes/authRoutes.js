const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/auth");
const c = require("../controllers/authController");

router.post("/register", c.register);
router.post("/login", c.login);
router.post("/logout", c.logout);
router.get("/profile", protect, c.getProfile);
router.post("/forgot-password", c.forgotPassword);
router.post("/reset-password", c.resetPassword);
router.get("/users", protect, adminOnly, c.getAllUsers);

module.exports = router;