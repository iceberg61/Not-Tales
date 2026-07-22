"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import api from "@/lib/api";
import { formatNaira } from "@/lib/currency";

function OrderConfirmationContent() {
  const orderId = useSearchParams().get("order");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderId) {
      setError("No order specified.");
      setLoading(false);
      return;
    }
    api
      .get(`/orders/${orderId}`)
      .then(({ data }) => setOrder(data.order))
      .catch(() => setError("Couldn't load that order."))
      .finally(() => setLoading(false));
  }, [orderId]);

  if (loading) return <p className="text-center py-24 text-ink/50 text-sm">Loading...</p>;
  if (error || !order) {
    return (
      <section className="max-w-2xl mx-auto px-6 py-20 text-center">
        <p className="text-red-600 text-sm">{error || "Order not found."}</p>
        <Link href="/shop" className="inline-block mt-6 text-brown-dark underline text-sm">
          Back to shop
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-2xl mx-auto px-6 py-20 text-center">
      <CheckCircle2 size={48} className="text-brown-dark mx-auto mb-6" />
      <h1 className="font-display text-3xl font-bold">Thank you for your order!</h1>
      <p className="text-ink/60 mt-3">
        Your order <span className="font-medium text-ink">#{order._id.slice(-6).toUpperCase()}</span> has been placed and is
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