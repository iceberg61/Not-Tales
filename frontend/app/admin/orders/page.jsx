"use client";
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import OrderStatusBadge from "@/components/OrderStatusBadge";
import api from "@/lib/api";
import { formatNaira } from "@/lib/currency";

const STATUS_OPTIONS = ["processing", "shipped", "out_for_delivery", "delivered", "cancelled"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/orders")
      .then(({ data }) => setOrders(data.orders))
      .catch(() => setError("Couldn't load orders. Are you logged in as an admin?"))
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    const previous = orders;
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, orderStatus: status } : o))); // optimistic
    try {
      await api.put(`/orders/${id}/status`, { status });
    } catch (err) {
      setOrders(previous); // roll back on failure
      setError(err.response?.data?.message || "Couldn't update that order's status.");
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 lg:flex gap-10">
      <aside className="lg:w-56 shrink-0 mb-8 lg:mb-0">
        <AdminSidebar />
      </aside>

      <div className="flex-1 min-w-0">
        <h1 className="font-display text-2xl sm:text-3xl font-bold mb-8">Orders</h1>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        {loading ? (
          <p className="text-ink/50 text-sm">Loading...</p>
        ) : (
          <div className="overflow-x-auto -mx-6 sm:mx-0">
            <table className="w-full text-sm min-w-[620px]">
              <thead>
                <tr className="text-left text-ink/50 border-b border-ink/10">
                  <th className="py-3 px-6 sm:px-0 font-medium">Order</th>
                  <th className="py-3 px-4 font-medium">Customer</th>
                  <th className="py-3 px-4 font-medium">Date</th>
                  <th className="py-3 px-4 font-medium">Items</th>
                  <th className="py-3 px-4 font-medium">Status</th>
                  <th className="py-3 px-4 font-medium text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-ink/5">
                    <td className="py-3 px-6 sm:px-0 font-medium">#{o._id.slice(-6).toUpperCase()}</td>
                    <td className="py-3 px-4 text-ink/60">{o.user?.name || "—"}</td>
                    <td className="py-3 px-4 text-ink/60">
                      {new Date(o.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </td>
                    <td className="py-3 px-4 text-ink/60">
                      {o.items.reduce((sum, i) => sum + i.quantity, 0)}
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={o.orderStatus}
                        onChange={(e) => updateStatus(o.id, e.target.value)}
                        className="bg-cream-2 rounded-pill pl-3 pr-2 py-1.5 text-xs font-medium outline-none capitalize"
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-4 text-right font-medium">{formatNaira(o.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}