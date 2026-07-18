"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { featuredProduct, summerCollection } from "@/lib/mockData";
import ProductCard from "@/components/ProductCard";
import QuickView from "@/components/QuickView";

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
            <p className="text-sm md:text-base text-ink/70 mt-2 md:mt-3">{p.description}</p>
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

          <Link
            href="/shop"
            className="inline-block bg-black text-white px-10 py-2 rounded-full font-medium text-sm md:text-lg hover:bg-brown-dark transition-colors"
          >
            Shop now
          </Link>
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
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="flex items-center justify-between mb-5 md:mb-8">
        <div>
          <h2 className="font-display text-xl md:text-3xl font-bold">New Drops</h2>
          <p className="text-ink/50 text-xs md:text-sm mt-0.5 md:mt-1">Fresh pieces, made for the streets</p>
        </div>
        <Link
          href="/shop"
          className="bg-ink text-cream rounded-pill px-4 py-1.5 md:px-6 md:py-2.5 text-xs md:text-sm font-medium hover:bg-brown-dark transition-colors"
        >
          Shop all
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        {summerCollection.map((item) => (
          <ProductCard key={item.id} product={item} onQuickView={setQuickViewProduct} />
        ))}
      </div>

      <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </section>
  );
}

export default function ProductGrid({ variant = "grid" }) {
  return variant === "featured" ? <FeaturedSpotlight /> : <SummerGrid />;
}