"use client";
import { useState } from "react";
import Image from "next/image";
import { Star, Heart, Minus, Plus } from "lucide-react";
import { allProducts } from "@/lib/mockData";
import { useCartStore } from "@/lib/store/cartStore";
import { useWishlistStore } from "@/lib/store/wishlistStore";
import ProductCard from "@/components/ProductCard";
import { formatNaira } from "@/lib/currency";

export default function ProductDetailClient({ product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const { ids, toggle } = useWishlistStore();
  const saved = ids.includes(product.id);

  const related = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      size,
      color,
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
        {/* Gallery */}
        <div>
          <div className="rounded-2xl overflow-hidden bg-cream-2 aspect-[4/5]">
            <Image
              src={product.images[activeImage]}
              alt={product.name}
              width={600}
              height={750}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3 mt-4">
              {product.images.map((img, i) => (
                <button
                  key={img + i}
                  onClick={() => setActiveImage(i)}
                  className={`w-16 h-20 sm:w-20 sm:h-24 rounded-lg overflow-hidden shrink-0 border-2 ${
                    activeImage === i ? "border-brown-dark" : "border-transparent"
                  }`}
                >
                  <Image src={img} alt="" width={80} height={96} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold">{product.name}</h1>
          <div className="flex items-center gap-2 text-mustard text-sm mt-2">
            <Star size={14} fill="currentColor" strokeWidth={0} />
            {product.rating.toFixed(1)}{" "}
            <span className="text-ink/40">({product.reviews.toLocaleString()} reviews)</span>
          </div>
          <p className="font-semibold text-2xl mt-4">{formatNaira(product.price)}</p>
          <p className="text-ink/60 mt-4 max-w-md">{product.description}</p>

          <div className="mt-6">
            <p className="text-sm font-medium mb-2">Color</p>
            <div className="flex gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-8 h-8 rounded-full border-2 ${color === c ? "border-ink" : "border-transparent"}`}
                  style={{ backgroundColor: c }}
                  aria-label={`Color ${c}`}
                />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm font-medium mb-2">Size</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    size === s ? "bg-ink text-cream" : "bg-cream-2 text-ink/60"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center gap-3 bg-cream-2 rounded-pill px-3 py-2">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span className="text-sm font-medium w-4 text-center">{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)} aria-label="Increase quantity">
                <Plus size={14} />
              </button>
            </div>

            <button
              onClick={() => toggle(product.id)}
              aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
              className="w-11 h-11 rounded-full bg-cream-2 flex items-center justify-center shrink-0"
            >
              <Heart size={18} className={saved ? "fill-brown-dark text-brown-dark" : "text-ink/60"} />
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-6 w-full sm:w-auto sm:px-14 bg-ink text-cream rounded-pill py-3.5 font-medium hover:bg-brown-dark transition-colors"
          >
            {added ? "Added to cart ✓" : "Add to cart"}
          </button>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="font-display text-2xl font-bold mb-8">You might also like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}