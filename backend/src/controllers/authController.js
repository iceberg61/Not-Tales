const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../models/User");
const Order = require("../models/Order");
const AppError = require("../utils/AppError");
const generateToken = require("../utils/generateToken");
const { sendWelcomeEmail, sendPasswordResetOtpEmail } = require("../services/emailService");

const SALT_ROUNDS = 10;

// Strips password and reset-token internals before a user object goes in a response.
function toPublicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
    address: user.address,
    createdAt: user.createdAt,
  };
}

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new AppError("Name, email, and password are all required.", 400);
    }
    if (password.length < 8) {
      throw new AppError("Password must be at least 8 characters.", 400);
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      throw new AppError("An account with that email already exists.", 409);
    }

    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({ name, email: email.toLowerCase(), password: hashed });

    // Don't let a flaky email provider fail the signup itself.
    sendWelcomeEmail(user.email, user.name).catch((err) =>
      console.error("Welcome email failed:", err.message)
    );

    const token = generateToken(user);
    res.status(201).json({ success: true, token, user: toPublicUser(user) });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError("Email and password are required.", 400);
    }

    // password has `select: false` in the schema, so it must be pulled in explicitly.
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user) {
      throw new AppError("Invalid email or password.", 401);
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new AppError("Invalid email or password.", 401);
    }

    const token = generateToken(user);
    res.json({ success: true, token, user: toPublicUser(user) });
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  // JWTs are stateless and stored client-side (localStorage), so there's
  // nothing to invalidate server-side — the client just discards the token.
  res.json({ success: true, message: "Logged out." });
};

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      throw new AppError("User not found.", 404);
    }
    res.json({ success: true, user: toPublicUser(user) });
  } catch (err) {
    next(err);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw new AppError("Email is required.", 400);
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    // Always respond the same way whether or not the account exists —
    // confirming/denying an email's existence is an account-enumeration leak.
    const genericResponse = {
      success: true,
      message: "If an account exists for that email, a reset code has been sent.",
    };

    if (!user) {
      return res.json(genericResponse);
    }

    // 6-digit numeric code, easy to type in by hand — only the hash is
    // stored, same pattern as the old token, just a shorter human-facing value.
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetPasswordToken = crypto.createHash("sha256").update(otp).digest("hex");
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save();

    sendPasswordResetOtpEmail(user.email, otp).catch((err) =>
      console.error("Password reset email failed:", err.message)
    );

    res.json(genericResponse);
  } catch (err) {
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { email, otp, password } = req.body;

    if (!email || !otp) {
      throw new AppError("Email and reset code are required.", 400);
    }
    if (!password || password.length < 8) {
      throw new AppError("Password must be at least 8 characters.", 400);
    }

    // Scoped by email + hash, not hash alone — a 6-digit code has far more
    // collision risk across different users than the old 32-byte token did.
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");
    const user = await User.findOne({
      email: email.toLowerCase(),
      resetPasswordToken: hashedOtp,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw new AppError("That code is invalid or has expired.", 400);
    }

    user.password = await bcrypt.hash(password, SALT_ROUNDS);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ success: true, message: "Password updated. You can now log in." });
  } catch (err) {
    next(err);
  }
};

// GET /api/auth/users (admin) — powers the Admin Users table.
exports.getAllUsers = async (req, res, next) => {
  try {
    const [users, orderCounts] = await Promise.all([
      User.find().sort({ createdAt: -1 }),
      Order.aggregate([{ $group: { _id: "$user", count: { $sum: 1 } } }]),
    ]);

    const countByUserId = Object.fromEntries(orderCounts.map((o) => [o._id.toString(), o.count]));

    const result = users.map((user) => ({
      ...toPublicUser(user),
      orders: countByUserId[user._id.toString()] || 0,
    }));

    res.json({ success: true, users: result });
  } catch (err) {
    next(err);
  }
};