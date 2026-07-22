// One-off script to load the same catalog used in the frontend's mockData.js
// into MongoDB, so the real API has something to return while testing.
// Run with: npm run seed  (from the backend folder)
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Product = require("../models/Product");

const products = [
  {
    slug: "cotton-long-sleeve-shirt-charcoal",
    name: "100% cotton long sleeve shirt",
    category: "clothes",
    price: 140,
    rating: 5.0,
    reviews: 1906,
    stock: 25,
    image: "/images/IMG-20260718-WA0119.jpg",
    images: [
      "/images/IMG-20260718-WA0099.jpg",
      "/images/IMG-20260718-WA0083.jpg",
      "/images/IMG-20260718-WA0130.jpg",
    ],
    colors: ["#8A8A8A", "#2E2E2E", "#7BA7C9", "#E8A33D"],
    sizes: ["S", "M", "L", "XL"],
    description: "A relaxed-fit long sleeve shirt in breathable 100% cotton. Soft handfeel, holds its shape wash after wash.",
  },
  {
    slug: "cotton-long-sleeve-tshirt-sky",
    name: "100% cotton long sleeve t-shirt",
    category: "clothes",
    price: 170,
    rating: 5.0,
    reviews: 1516,
    stock: 18,
    image: "/images/IMG-20260718-WA0101.jpg",
    images: [
      "/images/IMG-20260718-WA0105.jpg",
      "/images/IMG-20260718-WA0124.jpg",
    ],
    colors: ["#8A8A8A", "#2E2E2E", "#7BA7C9", "#E8A33D"],
    sizes: ["S", "M", "L", "XL"],
    description: "Lightweight layering tee with a clean crew neck, cut for a modern, slightly oversized fit.",
  },
  {
    slug: "cotton-long-sleeve-shirt-maroon",
    name: "100% cotton long sleeve shirt",
    category: "clothes",
    price: 150,
    rating: 5.0,
    reviews: 1316,
    stock: 12,
    image: "/images/IMG-20260718-WA0017.jpg",
    images: [
      "/images/IMG-20260718-WA0106.jpg",
      "/images/IMG-20260718-WA0144.jpg",
    ],
    colors: ["#8A8A8A", "#2E2E2E", "#7BA7C9", "#E8A33D"],
    sizes: ["S", "M", "L", "XL"],
    description: "An easy everyday shirt with dropped shoulders and a soft, brushed cotton finish.",
  },
  {
    slug: "cotton-long-sleeve-tshirt-sage",
    name: "100% cotton long sleeve t-shirt",
    category: "clothes",
    price: 130,
    rating: 5.0,
    reviews: 1716,
    stock: 30,
    image: "/images/IMG-20260718-WA0137.jpg",
    images: [
      "/images/IMG-20260718-WA0134.jpg",
      "/images/IMG-20260718-WA0141.jpg",
    ],
    colors: ["#8A8A8A", "#2E2E2E", "#7BA7C9", "#E8A33D"],
    sizes: ["S", "M", "L", "XL"],
    description: "A wardrobe basic built to layer under jackets or wear on its own.",
  },
  {
    slug: "straight-fit-denim-jeans",
    name: "Straight fit denim jeans",
    category: "jeans",
    price: 190,
    rating: 4.8,
    reviews: 942,
    stock: 20,
    image: "/images/IMG-20260718-WA0127.jpg",
    images: [
      "/images/IMG-20260718-WA0068.jpg",
      "/images/IMG-20260718-WA0072.jpg",
    ],
    colors: ["#2E3A4F", "#1A1410", "#6B4A32"],
    sizes: ["28", "30", "32", "34", "36"],
    description: "Classic straight-leg denim in a mid-weight wash that only gets better with age.",
  },
  {
    slug: "slim-taper-denim-jeans",
    name: "Slim taper denim jeans",
    category: "jeans",
    price: 175,
    rating: 4.7,
    reviews: 685,
    stock: 15,
    image: "/images/IMG-20260718-WA0071.jpg",
    images: [
      "/images/IMG-20260718-WA0078.jpg",
      "/images/IMG-20260718-WA0079.jpg",
    ],
    colors: ["#2E3A4F", "#1A1410"],
    sizes: ["28", "30", "32", "34", "36"],
    description: "Tapered through the leg for a cleaner silhouette without losing room to move.",
  },
  {
    slug: "raw-selvedge-denim-jeans",
    name: "Raw selvedge denim jeans",
    category: "jeans",
    price: 210,
    rating: 4.9,
    reviews: 431,
    stock: 8,
    image: "/images/IMG-20260718-WA0020.jpg",
    images: [
      "/images/IMG-20260718-WA0021.jpg",
      "/images/IMG-20260718-WA0106.jpg",
    ],
    colors: ["#1A1410"],
    sizes: ["28", "30", "32", "34"],
    description: "Unwashed selvedge denim that fades uniquely to you over time.",
  },
  {
    slug: "structured-cotton-cap",
    name: "Structured cotton cap",
    category: "caps",
    price: 45,
    rating: 4.9,
    reviews: 1204,
    stock: 40,
    image: "/images/IMG-20260718-WA0073.jpg",
    images: [
      "/images/IMG-20260718-WA0056.jpg",
      "/images/IMG-20260718-WA0077.jpg",
    ],
    colors: ["#4A3323", "#1A1410", "#8A6A4C"],
    sizes: ["One size"],
    description: "A structured six-panel cap with an embroidered logo and adjustable strap.",
  },
  {
    // The one out-of-stock item in mockData — kept at stock: 0 here so the
    // "Out of stock" badge and unavailable Add-to-cart state have something
    // real to demonstrate against, same as the frontend mock did.
    slug: "unstructured-dad-cap",
    name: "Unstructured dad cap",
    category: "caps",
    price: 38,
    rating: 4.6,
    reviews: 588,
    stock: 0,
    image: "/images/IMG-20260718-WA0064.jpg",
    images: [
      "/images/IMG-20260718-WA0065.jpg",
      "/images/IMG-20260718-WA0117.jpg",
    ],
    colors: ["#8A6A4C"],
    sizes: ["One size"],
    description: "A soft, unstructured dad cap with a worn-in look straight out of the box.",
  },
];

async function seed() {
  await connectDB();

  for (const product of products) {
    // Upsert by slug so re-running this script updates existing products
    // (and their stock counts) instead of duplicating them.
    await Product.findOneAndUpdate({ slug: product.slug }, product, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
    console.log(`Seeded: ${product.name}`);
  }

  console.log(`\nDone — ${products.length} products seeded.`);
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});