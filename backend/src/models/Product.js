const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: String,
    price: { type: Number, required: true },
    category: { type: String, enum: ["jeans", "clothes", "caps"], required: true },
    image: { type: String, required: true },   // cover photo — used by every card
    images: [String],                          // gallery — used by Product Detail
    colors: [String],
    sizes: [String],
    stock: { type: Number, default: 0 },        // source of truth for inventory
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// The frontend only needs a boolean — derived from stock so there's one
// source of truth instead of an admin having to keep two fields in sync.
productSchema.virtual("inStock").get(function () {
  return this.stock > 0;
});

productSchema.index({ name: "text", description: "text" });

module.exports = mongoose.model("Product", productSchema);