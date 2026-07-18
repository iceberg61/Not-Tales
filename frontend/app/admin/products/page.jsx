"use client";
import Image from "next/image";
import { Plus, Pencil, Trash2 } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import { allProducts } from "@/lib/mockData";
import { formatNaira } from "@/lib/currency";

export default function AdminProductsPage() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 lg:flex gap-10">
      <aside className="lg:w-56 shrink-0 mb-8 lg:mb-0">
        <AdminSidebar />
      </aside>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-2xl sm:text-3xl font-bold">Products</h1>
          <button className="flex items-center gap-2 bg-ink text-cream rounded-pill px-4 sm:px-5 py-2.5 text-sm font-medium hover:bg-brown-dark transition-colors">
            <Plus size={16} /> <span className="hidden sm:inline">Add product</span>
          </button>
        </div>

        <div className="overflow-x-auto -mx-6 sm:mx-0">
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="text-left text-ink/50 border-b border-ink/10">
                <th className="py-3 px-6 sm:px-0 font-medium">Product</th>
                <th className="py-3 px-4 font-medium">Category</th>
                <th className="py-3 px-4 font-medium">Price</th>
                <th className="py-3 px-4 font-medium">Rating</th>
                <th className="py-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allProducts.map((p) => (
                <tr key={p.id} className="border-b border-ink/5">
                  <td className="py-3 px-6 sm:px-0">
                    <div className="flex items-center gap-3">
                      <Image src={p.image} alt={p.name} width={40} height={40} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                      <span className="font-medium">{p.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-ink/60 capitalize">{p.category}</td>
                  <td className="py-3 px-4 text-ink/60">{formatNaira(p.price)}</td>
                  <td className="py-3 px-4 text-ink/60">{p.rating.toFixed(1)}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-3 text-ink/50">
                      <button aria-label="Edit product" className="hover:text-brown-dark transition-colors">
                        <Pencil size={16} />
                      </button>
                      <button aria-label="Delete product" className="hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}