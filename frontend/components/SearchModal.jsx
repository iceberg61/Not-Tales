"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Search } from "lucide-react";
import { allProducts } from "@/lib/mockData";
import { formatNaira } from "@/lib/currency";

export default function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return allProducts
      .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 6);
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-cream">
      <div className="max-w-2xl mx-auto px-6 pt-8">
        <div className="flex items-center gap-3 border-b border-ink/10 pb-4">
          <Search size={20} className="text-ink/40 shrink-0" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for jeans, shirts, caps..."
            className="flex-1 bg-transparent outline-none text-base sm:text-lg min-w-0"
          />
          <button onClick={onClose} aria-label="Close search" className="text-ink/50 hover:text-ink shrink-0">
            <X size={22} />
          </button>
        </div>

        <div className="mt-6 space-y-2">
          {query && results.length === 0 && (
            <p className="text-ink/50 text-sm">No products found for &quot;{query}&quot;.</p>
          )}
          {results.map((p) => (
            <Link
              key={p.id}
              href={`/product/${p.slug}`}
              onClick={onClose}
              className="flex items-center gap-4 hover:bg-cream-2 rounded-xl p-2 transition-colors"
            >
              <Image src={p.image} alt={p.name} width={56} height={64} className="w-14 h-16 rounded-lg object-cover" />
              <div>
                <p className="text-sm font-medium">{p.name}</p>
                <p className="text-sm text-ink/50">{formatNaira(p.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}