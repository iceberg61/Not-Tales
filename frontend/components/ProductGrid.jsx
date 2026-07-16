import Image from "next/image";
import { Star, ShoppingBag } from "lucide-react";
import { featuredProduct, summerCollection } from "@/lib/mockData";

function FeaturedSpotlight() {
  const p = featuredProduct;
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <h2 className="font-display text-3xl font-bold">{p.name}</h2>
        <p className="text-ink/60 mt-3 max-w-sm">{p.description}</p>

        <div className="mt-6 flex items-center gap-3">
          <span className="text-sm text-ink/50">Color</span>
          {p.colors.map((c) => (
            <span
              key={c}
              className="w-5 h-5 rounded-full border border-ink/10"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <div className="mt-4 flex items-center gap-3">
          <span className="text-sm text-ink/50">Select size</span>
          {p.sizes.map((s, i) => (
            <button
              key={s}
              className={`w-8 h-8 rounded-full text-xs font-medium flex items-center justify-center ${
                i === 0 ? "bg-ink text-cream" : "bg-cream-2 text-ink/60"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <button className="mt-8 bg-ink text-cream rounded-pill px-7 py-3 font-medium hover:bg-brown-dark transition-colors">
          Shop now
        </button>
      </div>

      <div className="flex items-center gap-6">
        <Image
          src={p.image}
          alt={p.name}
          width={260}
          height={320}
          className="rounded-2xl object-cover"
        />
        <div className="text-center">
          <p className="font-display text-2xl font-bold">{p.rating}</p>
          <div className="flex text-mustard justify-center my-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
            ))}
          </div>
          <p className="text-xs text-ink/50">{p.reviews} Review</p>
        </div>
      </div>
    </section>
  );
}

function SummerGrid() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display text-3xl font-bold">Summer Collection</h2>
          <p className="text-ink/50 text-sm mt-1">2022 Spring/Summer Collection</p>
        </div>
        <button className="bg-ink text-cream rounded-pill px-6 py-2.5 text-sm font-medium hover:bg-brown-dark transition-colors">
          See more
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {summerCollection.map((item) => (
          <div key={item.id} className="group">
            <div className="relative rounded-xl overflow-hidden bg-cream-2">
              <Image
                src={item.image}
                alt={item.name}
                width={300}
                height={340}
                className="w-full h-56 object-cover"
              />
              {item.quickView && (
                <button className="absolute bottom-0 inset-x-0 bg-brown-dark text-cream text-xs font-medium py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  Quick view
                </button>
              )}
            </div>

            <div className="flex gap-1.5 mt-3">
              {item.colors.map((c) => (
                <span
                  key={c}
                  className="w-3.5 h-3.5 rounded-full border border-ink/10"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>

            <p className="text-sm mt-2">{item.name}</p>
            <div className="flex items-center justify-between mt-1">
              <span className="font-semibold">${item.price.toFixed(2)}</span>
              <span className="text-xs text-mustard flex items-center gap-1">
                <Star size={12} fill="currentColor" strokeWidth={0} />
                {item.rating.toFixed(1)}{" "}
                <span className="text-ink/40">({item.reviews.toLocaleString()})</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function ProductGrid({ variant = "grid" }) {
  return variant === "featured" ? <FeaturedSpotlight /> : <SummerGrid />;
}
