"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2 } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import ProductFormModal from "@/components/ProductFormModal";
import api from "@/lib/api";
import { formatNaira } from "@/lib/currency";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalProduct, setModalProduct] = useState(undefined); // undefined = closed, null = add, object = edit

  const loadProducts = () => {
    setLoading(true);
    api
      .get("/products", { params: { limit: 100 } })
      .then(({ data }) => setProducts(data.products))
      .catch(() => setError("Couldn't load products. Are you logged in as an admin?"))
      .finally(() => setLoading(false));
  };

  useEffect(loadProducts, []);

  const handleDelete = async (product) => {
    if (!confirm(`Delete "${product.name}"? This can't be undone.`)) return;
    const previous = products;
    setProducts((prev) => prev.filter((p) => p.id !== product.id)); // optimistic
    try {
      await api.delete(`/products/${product.id}`);
    } catch (err) {
      setProducts(previous);
      setError(err.response?.data?.message || "Couldn't delete that product.");
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 lg:flex gap-10">
      <aside className="lg:w-56 shrink-0 mb-8 lg:mb-0">
        <AdminSidebar />
      </aside>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-2xl sm:text-3xl font-bold">Products</h1>
          <button
            onClick={() => setModalProduct(null)}
            className="flex items-center gap-2 bg-ink text-cream rounded-pill px-4 sm:px-5 py-2.5 text-sm font-medium hover:bg-brown-dark transition-colors"
          >
            <Plus size={16} /> <span className="hidden sm:inline">Add product</span>
          </button>
        </div>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        {loading ? (
          <p className="text-ink/50 text-sm">Loading...</p>
        ) : (
          <div className="overflow-x-auto -mx-6 sm:mx-0">
            <table className="w-full text-sm min-w-[560px]">
              <thead>
                <tr className="text-left text-ink/50 border-b border-ink/10">
                  <th className="py-3 px-6 sm:px-0 font-medium">Product</th>
                  <th className="py-3 px-4 font-medium">Category</th>
                  <th className="py-3 px-4 font-medium">Price</th>
                  <th className="py-3 px-4 font-medium">Stock</th>
                  <th className="py-3 px-4 font-medium">Rating</th>
                  <th className="py-3 px-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-ink/5">
                    <td className="py-3 px-6 sm:px-0">
                      <div className="flex items-center gap-3">
                        <Image src={p.image} alt={p.name} width={40} height={40} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                        <span className="font-medium">{p.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-ink/60 capitalize">{p.category}</td>
                    <td className="py-3 px-4 text-ink/60">{formatNaira(p.price)}</td>
                    <td className="py-3 px-4 text-ink/60">{p.stock}</td>
                    <td className="py-3 px-4 text-ink/60">{p.rating.toFixed(1)}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-3 text-ink/50">
                        <button
                          onClick={() => setModalProduct(p)}
                          aria-label="Edit product"
                          className="hover:text-brown-dark transition-colors"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(p)}
                          aria-label="Delete product"
                          className="hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalProduct !== undefined && (
        <ProductFormModal
          product={modalProduct}
          onClose={() => setModalProduct(undefined)}
          onSaved={() => {
            setModalProduct(undefined);
            loadProducts();
          }}
        />
      )}
    </section>
  );
}