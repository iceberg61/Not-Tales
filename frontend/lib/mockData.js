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
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&q=80",
  },
  {
    name: "Clothes",
    count: "2500+ Products",
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80",
  },
  {
    name: "Caps",
    count: "800+ Products",
    image:
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400&q=80",
  },
];

export const featuredProduct = {
  name: "Payday Sale Now",
  description: "Spend minimal ₦100 get 30% off voucher code for your next purchase",
  image:
    "https://images.unsplash.com/photo-1622445275576-721325763afe?w=500&q=80",
  modelImage:
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&q=80",
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
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80",
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
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&q=80",
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
    image: "https://images.unsplash.com/photo-1485231183945-fffde7cc051e?w=400&q=80",
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
    image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=400&q=80",
    colors: ["#8A8A8A", "#2E2E2E", "#7BA7C9", "#E8A33D"],
    inStock: false,
  },
];

export const lookbook = [
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80",
  "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=400&q=80",
  "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=400&q=80",
  "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&q=80",
  "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=400&q=80",
  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&q=80",
  "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&q=80",
];

// Seeds the cart store so Cart/Checkout have something to display before
// real "Add to cart" wiring exists on the product pages (Phase 2/3).
export const cartSeed = [
  {
    id: "p1",
    name: "100% cotton long sleeve shirt",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80",
    price: 140,
    size: "M",
    color: "#2E2E2E",
    quantity: 1,
  },
  {
    id: "p3",
    name: "100% cotton long sleeve shirt",
    image: "https://images.unsplash.com/photo-1485231183945-fffde7cc051e?w=400&q=80",
    price: 150,
    size: "L",
    color: "#7BA7C9",
    quantity: 2,
  },
];

// Full catalog — backs the Shop grid, Product Detail, QuickView, and Wishlist.
export const allProducts = [
  {
    id: "p1", slug: "cotton-long-sleeve-shirt-charcoal",
    name: "100% cotton long sleeve shirt", category: "clothes", inStock: true,
    price: 140, rating: 5.0, reviews: 1906,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
      "https://images.unsplash.com/photo-1485231183945-fffde7cc051e?w=800&q=80",
    ],
    colors: ["#8A8A8A", "#2E2E2E", "#7BA7C9", "#E8A33D"], sizes: ["S", "M", "L", "XL"],
    description: "A relaxed-fit long sleeve shirt in breathable 100% cotton. Soft handfeel, holds its shape wash after wash.",
  },
  {
    id: "p2", slug: "cotton-long-sleeve-tshirt-sky",
    name: "100% cotton long sleeve t-shirt", category: "clothes", inStock: true,
    price: 170, rating: 5.0, reviews: 1516,
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
    ],
    colors: ["#8A8A8A", "#2E2E2E", "#7BA7C9", "#E8A33D"], sizes: ["S", "M", "L", "XL"],
    description: "Lightweight layering tee with a clean crew neck, cut for a modern, slightly oversized fit.",
  },
  {
    id: "p3", slug: "cotton-long-sleeve-shirt-maroon",
    name: "100% cotton long sleeve shirt", category: "clothes", inStock: true,
    price: 150, rating: 5.0, reviews: 1316,
    image: "https://images.unsplash.com/photo-1485231183945-fffde7cc051e?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1485231183945-fffde7cc051e?w=800&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
    ],
    colors: ["#8A8A8A", "#2E2E2E", "#7BA7C9", "#E8A33D"], sizes: ["S", "M", "L", "XL"],
    description: "An easy everyday shirt with dropped shoulders and a soft, brushed cotton finish.",
    quickView: true,
  },
  {
    id: "p4", slug: "cotton-long-sleeve-tshirt-sage",
    name: "100% cotton long sleeve t-shirt", category: "clothes", inStock: true,
    price: 130, rating: 5.0, reviews: 1716,
    image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=800&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
    ],
    colors: ["#8A8A8A", "#2E2E2E", "#7BA7C9", "#E8A33D"], sizes: ["S", "M", "L", "XL"],
    description: "A wardrobe basic built to layer under jackets or wear on its own.",
  },
  {
    id: "p5", slug: "straight-fit-denim-jeans",
    name: "Straight fit denim jeans", category: "jeans", inStock: true,
    price: 190, rating: 4.8, reviews: 942,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80",
      "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=800&q=80",
    ],
    colors: ["#2E3A4F", "#1A1410", "#6B4A32"], sizes: ["28", "30", "32", "34", "36"],
    description: "Classic straight-leg denim in a mid-weight wash that only gets better with age.",
  },
  {
    id: "p6", slug: "slim-taper-denim-jeans",
    name: "Slim taper denim jeans", category: "jeans", inStock: true,
    price: 175, rating: 4.7, reviews: 685,
    image: "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=800&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80",
    ],
    colors: ["#2E3A4F", "#1A1410"], sizes: ["28", "30", "32", "34", "36"],
    description: "Tapered through the leg for a cleaner silhouette without losing room to move.",
  },
  {
    id: "p7", slug: "raw-selvedge-denim-jeans",
    name: "Raw selvedge denim jeans", category: "jeans", inStock: true,
    price: 210, rating: 4.9, reviews: 431,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80",
    ],
    colors: ["#1A1410"], sizes: ["28", "30", "32", "34"],
    description: "Unwashed selvedge denim that fades uniquely to you over time.",
  },
  {
    id: "p8", slug: "structured-cotton-cap",
    name: "Structured cotton cap", category: "caps", inStock: true,
    price: 45, rating: 4.9, reviews: 1204,
    image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800&q=80",
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800&q=80",
    ],
    colors: ["#4A3323", "#1A1410", "#8A6A4C"], sizes: ["One size"],
    description: "A structured six-panel cap with an embroidered logo and adjustable strap.",
  },
  {
    id: "p9", slug: "unstructured-dad-cap",
    name: "Unstructured dad cap", category: "caps", inStock: false,
    price: 38, rating: 4.6, reviews: 588,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80",
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800&q=80",
    ],
    colors: ["#EDE6D6", "#4A3323"], sizes: ["One size"],
    description: "Soft, unstructured crown with a curved brim for a broken-in look from day one.",
  },
];

export const productCategories = ["all", "jeans", "clothes", "caps"];

// Seeds the wishlist store — swap to [] once "Save to wishlist" is wired
// on the product pages.
export const wishlistSeed = ["p3", "p6", "p8"];

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

