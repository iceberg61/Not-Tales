const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const c = require("../controllers/authController");

router.post("/register", c.register);
router.post("/login", c.login);
router.post("/logout", c.logout);
router.get("/profile", protect, c.getProfile);
router.post("/forgot-password", c.forgotPassword);
router.post("/reset-password/:token", c.resetPassword);

module.exports = router;
