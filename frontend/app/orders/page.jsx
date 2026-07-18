import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { orders } from "@/lib/mockData";
import { formatNaira } from "@/lib/currency";
import OrderStatusBadge from "@/components/OrderStatusBadge";

export default function OrdersPage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="font-display text-3xl font-bold mb-10">My Orders</h1>

      {orders.length === 0 ? (
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
                  <p className="font-medium">Order {order.id}</p>
                  <p className="text-ink/50 text-sm mt-0.5">
                    Placed {new Date(order.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <OrderStatusBadge status={order.status} />
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