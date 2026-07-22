// Placeholder data — will be replaced by API calls to the backend in Phase 3.

export const brandLogos = ["H&M", "Amazon", "OBEY", "Levi's"];

export const infoStrip = [
  { icon: "tag", title: "Get ₦3 off", subtitle: "Your first order" },
  { icon: "award", title: "Premium quality", subtitle: "Guaranteed fabric" },
  { icon: "truck", title: "Shipping info", subtitle: "Fast & reliable" },
];

export const collections = [
  {
    name: "Jeans",
    count: "1200+ Products",
    image: "/images/IMG-20260718-WA0019.jpg",
  },
  {
    name: "Clothes",
    count: "2500+ Products",
    image: "/images/IMG-20260718-WA0058.jpg",
  },
  {
    name: "Caps",
    count: "800+ Products",
    image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400&q=80",
  },
];

export const featuredProduct = {
  name: "Payday Sale Now",
  description: "Spend minimal ₦100 get 30% off voucher code for your next purchase",
  image: "/images/IMG-20260718-WA0064.jpg",
  modelImage: "/images/IMG-20260718-WA0105.jpg",
  colors: ["#2E2E2E", "#4FA3A3", "#E8A33D"],
  sizes: ["S", "M", "L", "XL"],
  rating: 4.9,
  reviews: "80,716",
};

export const summerCollection = [
  {
    id: "p1",
    slug: "cotton-long-sleeve-shirt-charcoal",
    name: "100% cotton long sleeve shirt",
    price: 140,
    rating: 5.0,
    reviews: 1906,
    image: "/images/IMG-20260718-WA0063.jpg",
    colors: ["#8A8A8A", "#2E2E2E", "#7BA7C9", "#E8A33D"],
    inStock: true,
  },
  {
    id: "p2",
    slug: "cotton-long-sleeve-tshirt-sky",
    name: "100% cotton long sleeve t-shirt",
    price: 170,
    rating: 5.0,
    reviews: 1516,
    image: "/images/IMG-20260718-WA0104.jpg",
    colors: ["#8A8A8A", "#2E2E2E", "#7BA7C9", "#E8A33D"],
    inStock: true,
  },
  {
    id: "p3",
    slug: "cotton-long-sleeve-shirt-maroon",
    name: "100% cotton long sleeve shirt",
    price: 150,
    rating: 5.0,
    reviews: 1316,
    image: "/images/IMG-20260718-WA0068.jpg",
    colors: ["#8A8A8A", "#2E2E2E", "#7BA7C9", "#E8A33D"],
    quickView: true,
    inStock: true,
  },
  {
    id: "p4",
    slug: "cotton-long-sleeve-tshirt-sage",
    name: "100% cotton long sleeve t-shirt",
    price: 130,
    rating: 5.0,
    reviews: 1716,
    image: "/images/IMG-20260718-WA0073.jpg",
    colors: ["#8A8A8A", "#2E2E2E", "#7BA7C9", "#E8A33D"],
    inStock: false,
  },
];

export const lookbook = [
  "/images/IMG-20260718-WA0131.jpg",
  "/images/IMG-20260718-WA0104.jpg",
  "/images/IMG-20260718-WA0083.jpg",
  "/images/IMG-20260718-WA0144.jpg",
  "/images/IMG-20260718-WA0086.jpg",
  "/images/IMG-20260718-WA0101.jpg",
  "/images/IMG-20260718-WA0133.jpg",
  "/images/IMG-20260718-WA0119.jpg",
];

// Full catalog — kept as a readable reference for the seed script, but no
// longer read directly by Shop/Product Detail/Wishlist (those fetch from
// the live API since Phase G). Update backend/src/scripts/seedProducts.js
// + re-run `npm run seed` to change what actually shows on those pages.
export const allProducts = [
  {
    id: "p1", slug: "cotton-long-sleeve-shirt-charcoal",
    name: "100% cotton long sleeve shirt", category: "clothes", inStock: true,
    price: 140, rating: 5.0, reviews: 1906,
    image: "/images/IMG-20260718-WA0119.jpg",
    images: [
      "/images/IMG-20260718-WA0099.jpg",
      "/images/IMG-20260718-WA0083.jpg",
      "/images/IMG-20260718-WA0130.jpg",
    ],
    colors: ["#8A8A8A", "#2E2E2E", "#7BA7C9", "#E8A33D"], sizes: ["S", "M", "L", "XL"],
    description: "A relaxed-fit long sleeve shirt in breathable 100% cotton. Soft handfeel, holds its shape wash after wash.",
  },
  {
    id: "p2", slug: "cotton-long-sleeve-tshirt-sky",
    name: "100% cotton long sleeve t-shirt", category: "clothes", inStock: true,
    price: 170, rating: 5.0, reviews: 1516,
    image: "/images/IMG-20260718-WA0101.jpg",
    images: [
      "/images/IMG-20260718-WA0105.jpg",
      "/images/IMG-20260718-WA0124.jpg",
    ],
    colors: ["#8A8A8A", "#2E2E2E", "#7BA7C9", "#E8A33D"], sizes: ["S", "M", "L", "XL"],
    description: "Lightweight layering tee with a clean crew neck, cut for a modern, slightly oversized fit.",
  },
  {
    id: "p3", slug: "cotton-long-sleeve-shirt-maroon",
    name: "100% cotton long sleeve shirt", category: "clothes", inStock: true,
    price: 150, rating: 5.0, reviews: 1316,
    image: "/images/IMG-20260718-WA0017.jpg",
    images: [
      "/images/IMG-20260718-WA0106.jpg",
      "/images/IMG-20260718-WA0144.jpg",
    ],
    colors: ["#8A8A8A", "#2E2E2E", "#7BA7C9", "#E8A33D"], sizes: ["S", "M", "L", "XL"],
    description: "An easy everyday shirt with dropped shoulders and a soft, brushed cotton finish.",
    quickView: true,
  },
  {
    id: "p4", slug: "cotton-long-sleeve-tshirt-sage",
    name: "100% cotton long sleeve t-shirt", category: "clothes", inStock: true,
    price: 130, rating: 5.0, reviews: 1716,
    image: "/images/IMG-20260718-WA0137.jpg",
    images: [
      "/images/IMG-20260718-WA0134.jpg",
      "/images/IMG-20260718-WA0141.jpg",
    ],
    colors: ["#8A8A8A", "#2E2E2E", "#7BA7C9", "#E8A33D"], sizes: ["S", "M", "L", "XL"],
    description: "A wardrobe basic built to layer under jackets or wear on its own.",
  },
  {
    id: "p5", slug: "straight-fit-denim-jeans",
    name: "Straight fit denim jeans", category: "jeans", inStock: true,
    price: 190, rating: 4.8, reviews: 942,
    image: "/images/IMG-20260718-WA0127.jpg",
    images: [
      "/images/IMG-20260718-WA0068.jpg",
      "/images/IMG-20260718-WA0072.jpg",
    ],
    colors: ["#2E3A4F", "#1A1410", "#6B4A32"], sizes: ["28", "30", "32", "34", "36"],
    description: "Classic straight-leg denim in a mid-weight wash that only gets better with age.",
  },
  {
    id: "p6", slug: "slim-taper-denim-jeans",
    name: "Slim taper denim jeans", category: "jeans", inStock: true,
    price: 175, rating: 4.7, reviews: 685,
    image: "/images/IMG-20260718-WA0071.jpg",
    images: [
      "/images/IMG-20260718-WA0078.jpg",
      "/images/IMG-20260718-WA0079.jpg",
    ],
    colors: ["#2E3A4F", "#1A1410"], sizes: ["28", "30", "32", "34", "36"],
    description: "Tapered through the leg for a cleaner silhouette without losing room to move.",
  },
  {
    id: "p7", slug: "raw-selvedge-denim-jeans",
    name: "Raw selvedge denim jeans", category: "jeans", inStock: true,
    price: 210, rating: 4.9, reviews: 431,
    image: "/images/IMG-20260718-WA0020.jpg",
    images: [
      "/images/IMG-20260718-WA0021.jpg",
      "/images/IMG-20260718-WA0106.jpg",
    ],
    colors: ["#1A1410"], sizes: ["28", "30", "32", "34"],
    description: "Unwashed selvedge denim that fades uniquely to you over time.",
  },
  {
    id: "p8", slug: "structured-cotton-cap",
    name: "Structured cotton cap", category: "caps", inStock: true,
    price: 45, rating: 4.9, reviews: 1204,
    image: "/images/IMG-20260718-WA0073.jpg",
    images: [
      "/images/IMG-20260718-WA0056.jpg",
      "/images/IMG-20260718-WA0077.jpg",
    ],
    colors: ["#4A3323", "#1A1410", "#8A6A4C"], sizes: ["One size"],
    description: "A structured six-panel cap with an embroidered logo and adjustable strap.",
  },
  {
    id: "p9", slug: "unstructured-dad-cap",
    name: "Unstructured dad cap", category: "caps", inStock: false,
    price: 38, rating: 4.6, reviews: 588,
    image: "/images/IMG-20260718-WA0064.jpg",
    images: [
      "/images/IMG-20260718-WA0065.jpg",
      "/images/IMG-20260718-WA0117.jpg",
    ],
    colors: ["#EDE6D6", "#4A3323"], sizes: ["One size"],
    description: "Soft, unstructured crown with a curved brim for a broken-in look from day one.",
  },
];

export const productCategories = ["all", "jeans", "clothes", "caps"];

// Order history — backs My Orders, Order Tracking, and Order Confirmation.
export const orders = [
  {
    id: "NT-10482",
    date: "2026-07-02",
    status: "delivered",
    total: 356.0,
    items: [
      { name: "100% cotton long sleeve shirt", image: allProducts[0].image, quantity: 1, price: 140 },
      { name: "Straight fit denim jeans", image: allProducts[4].image, quantity: 1, price: 190 },
    ],
    timeline: [
      { label: "Processing", date: "2026-07-02", done: true },
      { label: "Shipped", date: "2026-07-03", done: true },
      { label: "Out for delivery", date: "2026-07-05", done: true },
      { label: "Delivered", date: "2026-07-05", done: true },
    ],
  },
  {
    id: "NT-10507",
    date: "2026-07-10",
    status: "out_for_delivery",
    total: 213.0,
    items: [
      { name: "Structured cotton cap", image: allProducts[7].image, quantity: 1, price: 45 },
      { name: "Slim taper denim jeans", image: allProducts[5].image, quantity: 1, price: 175 },
    ],
    timeline: [
      { label: "Processing", date: "2026-07-10", done: true },
      { label: "Shipped", date: "2026-07-11", done: true },
      { label: "Out for delivery", date: "2026-07-13", done: true },
      { label: "Delivered", date: null, done: false },
    ],
  },
  {
    id: "NT-10531",
    date: "2026-07-15",
    status: "processing",
    total: 130.0,
    items: [{ name: "100% cotton long sleeve t-shirt", image: allProducts[3].image, quantity: 1, price: 130 }],
    timeline: [
      { label: "Processing", date: "2026-07-15", done: true },
      { label: "Shipped", date: null, done: false },
      { label: "Out for delivery", date: null, done: false },
      { label: "Delivered", date: null, done: false },
    ],
  },
];

// Admin dashboard summary + tables
export const adminStats = {
  revenue: 48260,
  ordersCount: 312,
  productsCount: allProducts.length,
  usersCount: 1204,
};

export const adminUsers = [
  { id: "u1", name: "Amara Chukwu", email: "amara@example.com", joined: "2026-01-14", orders: 6, role: "customer" },
  { id: "u2", name: "Femi Adeyemi", email: "femi@example.com", joined: "2026-02-02", orders: 2, role: "customer" },
  { id: "u3", name: "Grace Okoro", email: "grace@example.com", joined: "2026-03-19", orders: 11, role: "customer" },
  { id: "u4", name: "Not Tales Admin", email: "admin@nottales.com", joined: "2025-11-01", orders: 0, role: "admin" },
];