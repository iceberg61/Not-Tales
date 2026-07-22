const AppError = require("../utils/AppError");
const { uploadBuffer } = require("../services/cloudinaryService");

// POST /api/upload (admin) — expects multipart/form-data with a single
// file under the field name "image" (see uploadRoutes.js's multer config).
// Returns the Cloudinary URL, which is what gets saved onto a Product's
// `image`/`images` fields from the Admin Products form.
exports.uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new AppError("No image file was provided.", 400);
    }

    const result = await uploadBuffer(req.file.buffer, "not-tales/products");

    res.status(201).json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (err) {
    next(err);
  }
};