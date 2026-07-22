"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { useWishlistStore } from "@/lib/store/wishlistStore";
import ProductCard from "@/components/ProductCard";
import QuickView from "@/components/QuickView";
import RequireAuth from "@/components/RequireAuth";

function WishlistContent() {
  const { ids } = useWishlistStore();
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    if (ids.length === 0) {
      setSaved([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    // No batch "get by ids" endpoint yet — catalog is small enough that
    // fetching everything and filtering client-side is fine for now.
    // Worth adding a dedicated endpoint if the catalog grows much larger.
    api
      .get("/products", { params: { limit: 100 } })
      .then(({ data }) => setSaved(data.products.filter((p) => ids.includes(p.id))))
      .catch(() => setSaved([]))
      .finally(() => setLoading(false));
  }, [ids]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="font-display text-3xl font-bold mb-2">Wishlist</h1>
      <p className="text-ink/50 text-sm mb-10">{loading ? "Loading..." : `${saved.length} saved items`}</p>

      {!loading && saved.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-ink/60">Nothing saved yet — tap the heart on any product to add it here.</p>
          <Link
            href="/shop"
            className="inline-block mt-6 bg-ink text-cream rounded-pill px-7 py-3 font-medium hover:bg-brown-dark transition-colors"
          >
            Browse the shop
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {saved.map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
          ))}
        </div>
      )}

      <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </section>
  );
}

export default function WishlistPage() {
  return (
    <RequireAuth>
      <WishlistContent />
    </RequireAuth>
  );
}