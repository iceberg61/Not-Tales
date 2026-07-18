"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart, ShoppingBag, Check, Loader2, Eye } from "lucide-react";
import { useWishlistStore } from "@/lib/store/wishlistStore";
import { useCartStore } from "@/lib/store/cartStore";
import { formatNaira } from "@/lib/currency";

// Shared card used by Shop, Wishlist, related products, and the homepage
// "New Drops" grid — one definition so all four look and behave identically.
// Quick view + add-to-cart both stopPropagation so they don't trigger the
// card's own Link navigation to the product page.
export default function ProductCard({ product, onQuickView }) {
  const { ids, toggle } = useWishlistStore();
  const addItem = useCartStore((s) => s.addItem);
  const saved = ids.includes(product.id);
  const inStock = product.inStock !== false;

  const [cartStatus, setCartStatus] = useState("idle");

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCartStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 300));
    addItem({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      size: product.sizes?.[0] || "One size",
      color: product.colors?.[0],
      quantity: 1,
    });
    setCartStatus("added");
    setTimeout(() => setCartStatus("idle"), 2000);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product);
  };

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative rounded-xl overflow-hidden bg-cream-2">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={340}
          className="w-full h-40 sm:h-48 md:h-56 object-cover"
        />

        <span
          className={`absolute top-2 left-2 text-[9px] md:text-[10px] font-medium px-2 py-1 rounded-full ${
            inStock ? "bg-cream/95 text-ink" : "bg-ink/80 text-cream"
          }`}
        >
          {inStock ? "In stock" : "Out of stock"}
        </span>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggle(product.id);
          }}
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-2 right-2 w-7 h-7 md:w-8 md:h-8 rounded-full bg-cream/90 flex items-center justify-center hover:scale-105 transition-transform"
        >
          <Heart size={14} className={saved ? "fill-brown-dark text-brown-dark" : "text-ink/60"} />
        </button>

        {onQuickView && (
          <button
            onClick={handleQuickView}
            className="absolute bottom-2 inset-x-2 flex items-center justify-center gap-1.5 bg-ink/90 text-cream text-[10px] md:text-xs font-medium py-1.5 md:py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
          >
            <Eye size={13} /> Quick view
          </button>
        )}
      </div>

      <div className="flex items-start justify-between gap-2 mt-1.5 md:mt-2">
        <p className="text-xs md:text-sm">{product.name}</p>
        {inStock ? (
          <button
            onClick={handleAddToCart}
            disabled={cartStatus === "loading"}
            className={`shrink-0 flex items-center gap-1 text-[10px] md:text-xs font-medium px-2.5 py-1 rounded-full transition-colors ${
              cartStatus === "added" ? "bg-green-700 text-white" : "bg-ink text-cream hover:bg-brown-dark"
            }`}
          >
            {cartStatus === "loading" ? (
              <Loader2 size={12} className="animate-spin" />
            ) : cartStatus === "added" ? (
              <Check size={12} />
            ) : (
              <ShoppingBag size={12} />
            )}
            {cartStatus === "added" ? "Added" : "Add"}
          </button>
        ) : (
          <span className="shrink-0 text-[10px] md:text-xs text-ink/40">Unavailable</span>
        )}
      </div>

      <div className="mt-1 flex items-center justify-between gap-2">
        <span className="text-sm md:text-base font-semibold">{formatNaira(product.price)}</span>
        <span className="text-[10px] md:text-xs text-mustard flex items-center gap-1">
          <Star size={11} fill="currentColor" strokeWidth={0} />
          {product.rating.toFixed(1)} <span className="text-ink/40">({product.reviews.toLocaleString()})</span>
        </span>
      </div>
    </Link>
  );
}