"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { Check } from "lucide-react";
import api from "@/lib/api";
import { formatNaira } from "@/lib/currency";
import OrderStatusBadge from "@/components/OrderStatusBadge";

// The backend only stores the current orderStatus, not a dated history of
// each step — so the timeline is derived from where that status sits in
// this sequence, rather than read from per-step data like the old mock did.
const STEPS = [
  { key: "processing", label: "Processing" },
  { key: "shipped", label: "Shipped" },
  { key: "out_for_delivery", label: "Out for delivery" },
  { key: "delivered", label: "Delivered" },
];

export default function OrderTrackingPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFoundFlag, setNotFoundFlag] = useState(false);

  useEffect(() => {
    api
      .get(`/orders/${id}`)
      .then(({ data }) => setOrder(data.order))
      .catch(() => setNotFoundFlag(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center py-24 text-ink/50 text-sm">Loading...</p>;
  if (notFoundFlag || !order) notFound();

  const isCancelled = order.orderStatus === "cancelled";
  const currentIndex = STEPS.findIndex((s) => s.key === order.orderStatus);

  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
        <h1 className="font-display text-3xl font-bold">Order #{order.id.slice(-6).toUpperCase()}</h1>
        <OrderStatusBadge status={order.orderStatus} />
      </div>
      <p className="text-ink/50 text-sm mb-10">
        Placed{" "}
        {new Date(order.createdAt).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>

      {/* Timeline */}
      {!isCancelled && (
        <div className="bg-cream-2 rounded-2xl p-6 sm:p-8 mb-10">
          <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-0">
            {STEPS.map((step, i) => {
              const done = i <= currentIndex;
              const isCurrent = i === currentIndex;
              return (
                <div key={step.key} className="flex sm:flex-col items-center sm:flex-1 gap-3 sm:gap-0 sm:text-center">
                  <div className="flex sm:flex-col items-center flex-1">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        done ? "bg-brown-dark text-cream" : "bg-cream text-ink/30 border border-ink/10"
                      }`}
                    >
                      {done ? <Check size={15} /> : <span className="text-xs">{i + 1}</span>}
                    </div>
                    {i < STEPS.length - 1 && (
                      <div
                        className={`hidden sm:block h-px flex-1 mt-4 ${
                          i < currentIndex ? "bg-brown-dark" : "bg-ink/10"
                        }`}
                      />
                    )}
                  </div>
                  <div className="sm:mt-3">
                    <p className="text-sm font-medium">{step.label}</p>
                    <p className="text-xs text-ink/50">
                      {isCurrent
                        ? new Date(order.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                        : done
                        ? ""
                        : "Pending"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Items */}
      <div className="space-y-4 mb-8">
        {order.items.map((item, i) => (
          <div key={i} className="flex items-center gap-4 bg-cream-2 rounded-xl p-4">
            <Image src={item.image} alt={item.name} width={56} height={64} className="w-14 h-16 rounded-lg object-cover" />
            <div className="flex-1">
              <p className="text-sm font-medium">{item.name}</p>
              <p className="text-xs text-ink/50">Qty {item.quantity}</p>
            </div>
            <span className="font-semibold text-sm">{formatNaira(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between font-semibold text-lg border-t border-ink/10 pt-4">
        <span>Total</span>
        <span>{formatNaira(order.total)}</span>
      </div>

      <Link
        href="/orders"
        className="inline-block mt-8 text-sm font-medium text-brown-dark hover:underline"
      >
        ← Back to My Orders
      </Link>
    </section>
  );
}