const express = require("express");
const multer = require("multer");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/auth");
const AppError = require("../utils/AppError");
const c = require("../controllers/uploadController");

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB — plenty for a product photo, small enough to stay fast
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_TYPES.includes(file.mimetype)) {
      return cb(new Error("Only JPEG, PNG, or WebP images are allowed."));
    }
    cb(null, true);
  },
});

// Multer's own errors (bad type, too large) don't carry a statusCode by
// default and would otherwise fall through to errorHandler.js as a 500 —
// this converts them into a proper 400 first.
function handleUpload(req, res, next) {
  upload.single("image")(req, res, (err) => {
    if (err) return next(new AppError(err.message || "Upload failed.", 400));
    next();
  });
}

router.post("/", protect, adminOnly, handleUpload, c.uploadImage);

module.exports = router;