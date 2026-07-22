"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import api from "@/lib/api";
import { formatNaira } from "@/lib/currency";
import OrderStatusBadge from "@/components/OrderStatusBadge";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setError("login");
      setLoading(false);
      return;
    }
    api
      .get("/orders/my-orders")
      .then(({ data }) => setOrders(data.orders))
      .catch(() => setError("Couldn't load your orders."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="font-display text-3xl font-bold mb-10">My Orders</h1>

      {loading ? (
        <p className="text-ink/50 text-sm">Loading...</p>
      ) : error === "login" ? (
        <p className="text-ink/60 text-sm">
          <Link href="/login" className="text-brown-dark underline">Log in</Link> to see your orders.
        </p>
      ) : error ? (
        <p className="text-red-600 text-sm">{error}</p>
      ) : orders.length === 0 ? (
        <p className="text-ink/50 text-sm">You haven&apos;t placed any orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="block bg-cream-2 rounded-2xl p-5 hover:bg-cream-2/70 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="font-medium">Order #{order.id.slice(-6).toUpperCase()}</p>
                  <p className="text-ink/50 text-sm mt-0.5">
                    Placed {new Date(order.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <OrderStatusBadge status={order.orderStatus} />
                  <span className="font-semibold">{formatNaira(order.total)}</span>
                  <ChevronRight size={18} className="text-ink/30 shrink-0" />
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                {order.items.map((item, i) => (
                  <Image
                    key={i}
                    src={item.image}
                    alt={item.name}
                    width={48}
                    height={56}
                    className="w-12 h-14 rounded-lg object-cover"
                  />
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}