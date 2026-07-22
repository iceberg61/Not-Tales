"use client";
import { useState } from "react";
import Image from "next/image";
import { X, Star } from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";
import { formatNaira } from "@/lib/currency";

// Controlled modal — parent passes `product` (or null to keep it closed) and `onClose`.
export default function QuickView({ product, onClose }) {
  const addItem = useCartStore((s) => s.addItem);
  const [size, setSize] = useState(product?.sizes?.[0]);
  const [color, setColor] = useState(product?.colors?.[0]);

  if (!product) return null;

  const handleAdd = () => {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image,
      price: product.price,
      size,
      color,
      quantity: 1,
      stock: product.stock,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-ink/50" onClick={onClose} />
      <div className="relative bg-cream rounded-3xl w-full max-w-lg p-6 md:p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-ink/50 hover:text-ink"
          aria-label="Close quick view"
        >
          <X size={20} />
        </button>

        <div className="grid sm:grid-cols-2 gap-6">
          <Image
            src={product.image}
            alt={product.name}
            width={280}
            height={320}
            className="w-full h-56 sm:h-64 rounded-2xl object-cover"
          />
          <div>
            <h3 className="font-display text-xl font-bold">{product.name}</h3>
            <div className="flex items-center gap-1 text-mustard text-sm mt-1">
              <Star size={13} fill="currentColor" strokeWidth={0} />
              {product.rating.toFixed(1)}{" "}
              <span className="text-ink/40">({product.reviews.toLocaleString()})</span>
            </div>
            <p className="font-semibold text-lg mt-3">{formatNaira(product.price)}</p>

            <div className="mt-4">
              <p className="text-sm text-ink/50 mb-2">Color</p>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`w-6 h-6 rounded-full border-2 ${color === c ? "border-ink" : "border-transparent"}`}
                    style={{ backgroundColor: c }}
                    aria-label={`Color ${c}`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm text-ink/50 mb-2">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                      size === s ? "bg-ink text-cream" : "bg-cream-2 text-ink/60"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAdd}
              className="mt-6 w-full bg-ink text-cream rounded-pill py-3 font-medium hover:bg-brown-dark transition-colors"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}