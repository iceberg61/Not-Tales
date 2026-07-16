const express = require("express");
const multer = require("multer");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/auth");
const c = require("../controllers/uploadController");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", protect, adminOnly, upload.single("image"), c.uploadImage);

module.exports = router;
