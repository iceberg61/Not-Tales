"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { orders } from "@/lib/mockData";
import { formatNaira } from "@/lib/currency";

function OrderConfirmationContent() {
  const orderId = useSearchParams().get("order");
  // Falls back to the most recent mock order for demo purposes — once the
  // backend exists, checkout will redirect here with a real ?order=<id>.
  const order = orders.find((o) => o.id === orderId) || orders[orders.length - 1];

  return (
    <section className="max-w-2xl mx-auto px-6 py-20 text-center">
      <CheckCircle2 size={48} className="text-brown-dark mx-auto mb-6" />
      <h1 className="font-display text-3xl font-bold">Thank you for your order!</h1>
      <p className="text-ink/60 mt-3">
        Your order <span className="font-medium text-ink">{order.id}</span> has been placed and is
        being processed. We&apos;ll email you as it ships.
      </p>

      <div className="bg-cream-2 rounded-2xl p-6 mt-10 text-left">
        <div className="space-y-4">
          {order.items.map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <Image src={item.image} alt={item.name} width={56} height={64} className="w-14 h-16 rounded-lg object-cover" />
              <div className="flex-1">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-ink/50">Qty {item.quantity}</p>
              </div>
              <span className="font-semibold text-sm">{formatNaira(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between font-semibold text-base border-t border-ink/10 pt-4 mt-4">
          <span>Total</span>
          <span>{formatNaira(order.total)}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
        <Link
          href={`/orders/${order.id}`}
          className="bg-ink text-cream rounded-pill px-7 py-3 font-medium hover:bg-brown-dark transition-colors"
        >
          Track order
        </Link>
        <Link
          href="/shop"
          className="bg-cream-2 rounded-pill px-7 py-3 font-medium hover:bg-ink/5 transition-colors"
        >
          Continue shopping
        </Link>
      </div>
    </section>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={null}>
      <OrderConfirmationContent />
    </Suspense>
  );
}