"use client";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { allProducts, productCategories } from "@/lib/mockData";
import ProductCard from "@/components/ProductCard";
import QuickView from "@/components/QuickView";

const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

const PER_PAGE = 8;

export default function ShopClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [category, setCategory] = useState(
    productCategories.includes(initialCategory) ? initialCategory : "all"
  );
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const filtered = useMemo(() => {
    let list = allProducts.filter((p) => category === "all" || p.category === category);
    if (search.trim()) {
      list = list.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return list;
  }, [category, search, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleCategoryChange = (c) => {
    setCategory(c);
    setPage(1);
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">Shop</h1>
        <p className="text-ink/50 text-sm mt-1">{filtered.length} products</p>
      </div>

      {/* Search + sort + mobile filter toggle */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-8">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search products..."
          className="w-full sm:max-w-xs bg-cream-2 rounded-pill px-5 py-2.5 text-sm outline-none border border-transparent focus:border-brown-dark transition-colors"
        />
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 bg-cream-2 rounded-pill px-4 py-2.5 text-sm font-medium"
          >
            <SlidersHorizontal size={15} /> Filters
          </button>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-cream-2 rounded-pill px-4 py-2.5 text-sm font-medium outline-none"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-[220px_1fr] gap-10">
        {/* Category filter — sidebar on desktop, slide-over on mobile */}
        <aside className="hidden lg:block">
          <CategoryList category={category} onChange={handleCategoryChange} />
        </aside>

        {filtersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-ink/40" onClick={() => setFiltersOpen(false)} />
            <div className="absolute left-0 top-0 h-full w-72 bg-cream p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-lg font-semibold">Filters</h2>
                <button onClick={() => setFiltersOpen(false)} aria-label="Close filters">
                  <X size={20} />
                </button>
              </div>
              <CategoryList
                category={category}
                onChange={(c) => {
                  handleCategoryChange(c);
                  setFiltersOpen(false);
                }}
              />
            </div>
          </div>
        )}

        {/* Product grid */}
        <div>
          {paged.length === 0 ? (
            <p className="text-ink/50 text-sm py-16 text-center">No products match your filters.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {paged.map((product) => (
                <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-9 h-9 rounded-full text-sm font-medium ${
                    page === i + 1 ? "bg-ink text-cream" : "bg-cream-2 text-ink/60"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </section>
  );
}

function CategoryList({ category, onChange }) {
  return (
    <div className="space-y-1">
      <h3 className="font-medium text-sm mb-3">Category</h3>
      {productCategories.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className={`block w-full text-left px-3 py-2 rounded-lg text-sm capitalize transition-colors ${
            category === c ? "bg-cream-2 font-medium" : "text-ink/60 hover:bg-cream-2"
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}