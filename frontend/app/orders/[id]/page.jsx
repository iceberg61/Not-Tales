import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { orders } from "@/lib/mockData";
import { formatNaira } from "@/lib/currency";
import OrderStatusBadge from "@/components/OrderStatusBadge";

export default function OrderTrackingPage({ params }) {
  const order = orders.find((o) => o.id === params.id);
  if (!order) notFound();

  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
        <h1 className="font-display text-3xl font-bold">Order {order.id}</h1>
        <OrderStatusBadge status={order.status} />
      </div>
      <p className="text-ink/50 text-sm mb-10">
        Placed{" "}
        {new Date(order.date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>

      {/* Timeline */}
      <div className="bg-cream-2 rounded-2xl p-6 sm:p-8 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-0">
          {order.timeline.map((step, i) => (
            <div key={step.label} className="flex sm:flex-col items-center sm:flex-1 gap-3 sm:gap-0 sm:text-center">
              <div className="flex sm:flex-col items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    step.done ? "bg-brown-dark text-cream" : "bg-cream text-ink/30 border border-ink/10"
                  }`}
                >
                  {step.done ? <Check size={15} /> : <span className="text-xs">{i + 1}</span>}
                </div>
                {i < order.timeline.length - 1 && (
                  <div
                    className={`hidden sm:block h-px flex-1 mt-4 ${
                      order.timeline[i + 1].done || step.done ? "bg-brown-dark" : "bg-ink/10"
                    }`}
                  />
                )}
              </div>
              <div className="sm:mt-3">
                <p className="text-sm font-medium">{step.label}</p>
                <p className="text-xs text-ink/50">
                  {step.date
                    ? new Date(step.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                    : "Pending"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

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