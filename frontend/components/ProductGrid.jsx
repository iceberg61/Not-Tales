"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag, Check, Loader2 } from "lucide-react";
import { featuredProduct, summerCollection } from "@/lib/mockData";

function FeaturedSpotlight() {
  const p = featuredProduct;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
        <div className="space-y-4 md:space-y-6 text-center md:text-left">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
              Payday Sale Now
            </h1>
            <p className="text-sm md:text-base text-ink/70 mt-2 md:mt-3">
              Spend minimal $100 get 30% off voucher code for your next purchase
            </p>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-5 md:gap-8">
            <div>
              <p className="text-xs md:text-sm text-ink/60 mb-1.5 md:mb-2">Color</p>
              <div className="flex gap-2 md:gap-3">
                {p.colors.map((c, i) => (
                  <span
                    key={i}
                    className="w-4 h-4 md:w-6 md:h-6 rounded-full border-2 border-white shadow-sm cursor-pointer"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs md:text-sm text-ink/60 mb-1.5 md:mb-2">Select size</p>
              <div className="flex gap-1.5 md:gap-2">
                {p.sizes.map((s, i) => (
                  <button
                    key={s}
                    className={`w-5 h-5 md:w-7 md:h-7 rounded-full text-xs md:text-sm font-medium flex items-center justify-center transition-all ${
                      i === 1
                        ? "bg-ink text-cream shadow"
                        : "bg-white border border-ink/20 hover:border-ink/40"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button className="bg-black text-white px-10 py-2 rounded-full font-medium text-sm md:text-lg hover:bg-brown-dark transition-colors">
            Shop now
          </button>
        </div>

        <div className="relative w-full max-w-[420px] md:max-w-md aspect-square mx-auto md:ml-auto">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[72%] aspect-square rounded-full bg-[#8B5A2B] z-0" />

          <div className="absolute right-0 top-6 w-[68%] aspect-square rounded-full overflow-hidden shadow-2xl z-10 ring-8 ring-white/90">
            <Image
              src={p.modelImage}
              alt="Model"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 65vw, 320px"
            />
          </div>

          <div className="absolute left-0 top-8 w-[38%] aspect-square rounded-3xl overflow-hidden bg-white shadow-xl z-20">
            <Image
              src={p.image}
              alt={p.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 35vw, 170px"
            />
          </div>

          
          <div className="absolute left-0 top-[52%] w-[38%] text-center z-30 bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl py-2.5 md:py-4 shadow">
            <p className="text-xl md:text-3xl font-bold tracking-tighter">{p.rating}</p>
            <div className="flex justify-center gap-0.5 my-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={12} className="md:hidden" fill="#EAB308" strokeWidth={0} />
              ))}
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={`d-${i}`} size={16} className="hidden md:block" fill="#EAB308" strokeWidth={0} />
              ))}
            </div>
            <p className="text-[10px] md:text-xs text-ink/60">{p.reviews} Review</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SummerGrid() {
  const [cartStatus, setCartStatus] = useState({});

  async function handleAddToCart(e, item) {
    e.preventDefault(); 
    e.stopPropagation();

    setCartStatus((prev) => ({ ...prev, [item.id]: "loading" }));

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: item.id, quantity: 1 }),
      });

      if (!res.ok) throw new Error("Failed to add to cart");

      setCartStatus((prev) => ({ ...prev, [item.id]: "added" }));
      setTimeout(() => {
        setCartStatus((prev) => ({ ...prev, [item.id]: "idle" }));
      }, 2000);
    } catch (err) {
      console.error(err);
      setCartStatus((prev) => ({ ...prev, [item.id]: "error" }));
      setTimeout(() => {
        setCartStatus((prev) => ({ ...prev, [item.id]: "idle" }));
      }, 2000);
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="flex items-center justify-between mb-5 md:mb-8">
        <div>
          <h2 className="font-display text-xl md:text-3xl font-bold">New Drops</h2>
          <p className="text-ink/50 text-xs md:text-sm mt-0.5 md:mt-1">Fresh pieces, made for the streets</p>
        </div>
        <button className="bg-ink text-cream rounded-pill px-4 py-1.5 md:px-6 md:py-2.5 text-xs md:text-sm font-medium hover:bg-brown-dark transition-colors">
          Shop all
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        {summerCollection.map((item) => {
          const inStock = item.inStock !== false; 

          return (
            <Link key={item.id} href={`/product/${item.id}`} className="group block">
              <div className="relative rounded-xl overflow-hidden bg-cream-2">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={300}
                  height={340}
                  className="w-full h-40 md:h-56 object-cover"
                />

                
                <span
                  className={`absolute top-2 left-2 text-[9px] md:text-[10px] font-medium px-2 py-1 rounded-full ${
                    inStock ? "bg-cream/95 text-ink" : "bg-ink/80 text-cream"
                  }`}
                >
                  {inStock ? "In stock" : "Out of stock"}
                </span>

                
                <span className="absolute bottom-2 right-2 left-2 md:right-3 md:left-auto md:w-auto bg-ink/90 text-cream text-[10px] md:text-xs font-medium py-1.5 px-3 rounded-full backdrop-blur-sm text-center">
                  View details
                </span>
              </div>

              <div className="flex items-start justify-between gap-2 mt-1.5 md:mt-2">
                <p className="text-xs md:text-sm">{item.name}</p>
                {inStock ? (
                  <button
                    onClick={(e) => handleAddToCart(e, item)}
                    disabled={cartStatus[item.id] === "loading"}
                    className={`shrink-0 flex items-center gap-1 text-[10px] md:text-xs font-medium px-2.5 py-1 rounded-full transition-colors ${
                      cartStatus[item.id] === "error"
                        ? "bg-red-600 text-white"
                        : cartStatus[item.id] === "added"
                        ? "bg-green-700 text-white"
                        : "bg-ink text-cream hover:bg-brown-dark"
                    }`}
                  >
                    {cartStatus[item.id] === "loading" ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : cartStatus[item.id] === "added" ? (
                      <Check size={12} />
                    ) : (
                      <ShoppingBag size={12} />
                    )}
                    {cartStatus[item.id] === "added" ? "Added" : "Add"}
                  </button>
                ) : (
                  <span className="shrink-0 text-[10px] md:text-xs text-ink/40">Unavailable</span>
                )}
              </div>

              <div className="mt-1 flex items-center justify-between gap-2">
                <span className="text-sm md:text-base font-semibold">₦{item.price.toLocaleString()}</span>
                <span className="text-[10px] md:text-xs text-mustard flex items-center gap-1">
                  <Star size={10} className="md:hidden" fill="currentColor" strokeWidth={0} />
                  <Star size={12} className="hidden md:block" fill="currentColor" strokeWidth={0} />
                  {item.rating.toFixed(1)}{" "}
                  <span className="text-ink/40">({item.reviews.toLocaleString()})</span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default function ProductGrid({ variant = "grid" }) {
  return variant === "featured" ? <FeaturedSpotlight /> : <SummerGrid />;
}