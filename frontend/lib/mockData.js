// Placeholder data — will be replaced by API calls to the backend in Phase 3.



export const infoStrip = [
  { icon: "tag", title: "Get 10% off", subtitle: "Your first order" },
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
  description: "Spend minimal $100 get 30% off voucher code for your next purchase",
  image:
    "https://images.unsplash.com/photo-1622445275576-721325763afe?w=500&q=80",
  modelImage:
    "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=400&q=80",
  colors: ["#2E2E2E", "#4FA3A3", "#E8A33D"],
  sizes: ["S", "M", "L", "XL"],
  rating: 4.9,
  reviews: "80,716",
};

export const summerCollection = [
  {
    id: "p1",
    name: "100% cotton long sleeve shirt",
    price: 140,
    rating: 5.0,
    reviews: 1906,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80",
    colors: ["#8A8A8A", "#2E2E2E", "#7BA7C9", "#E8A33D"],
  },
  {
    id: "p2",
    name: "100% cotton long sleeve t-shirt",
    price: 170,
    rating: 5.0,
    reviews: 1516,
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&q=80",
    colors: ["#8A8A8A", "#2E2E2E", "#7BA7C9", "#E8A33D"],
  },
  {
    id: "p3",
    name: "100% cotton long sleeve shirt",
    price: 150,
    rating: 5.0,
    reviews: 1316,
    image: "https://images.unsplash.com/photo-1485231183945-fffde7cc051e?w=400&q=80",
    colors: ["#8A8A8A", "#2E2E2E", "#7BA7C9", "#E8A33D"],
    quickView: true,
  },
  {
    id: "p4",
    name: "100% cotton long sleeve t-shirt",
    price: 130,
    rating: 5.0,
    reviews: 1716,
    image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=400&q=80",
    colors: ["#8A8A8A", "#2E2E2E", "#7BA7C9", "#E8A33D"],
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