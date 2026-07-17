"use client";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";

const SHIPPING_FEE = 8;

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCartStore();

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const total = items.length ? subtotal + SHIPPING_FEE : 0;

  if (items.length === 0) {
    return (
      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Your cart is empty</h1>
        <p className="text-ink/60 mt-3">Looks like you haven&apos;t added anything yet.</p>
        <Link
          href="/shop"
          className="inline-block mt-8 bg-ink text-cream rounded-pill px-7 py-3 font-medium hover:bg-brown-dark transition-colors"
        >
          Continue shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="font-display text-3xl font-bold mb-10">Your Cart</h1>

      <div className="grid md:grid-cols-3 gap-10">
        {/* Line items */}
        <div className="md:col-span-2 space-y-6">
          {items.map((item) => (
            <div
              key={`${item.id}-${item.size}-${item.color}`}
              className="flex gap-4 bg-cream-2 rounded-2xl p-4"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={100}
                height={120}
                className="w-24 h-28 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-ink/50 text-sm mt-1 flex items-center gap-2">
                      Size: {item.size} · Color:
                      <span
                        className="inline-block w-3 h-3 rounded-full border border-ink/10"
                        style={{ backgroundColor: item.color }}
                      />
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id, item.size, item.color)}
                    aria-label="Remove item"
                    className="text-ink/40 hover:text-red-500 transition-colors shrink-0"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-3 bg-cream rounded-pill px-2 py-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                      className="w-7 h-7 flex items-center justify-center hover:text-brown-dark"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center hover:text-brown-dark"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="bg-cream-2 rounded-2xl p-6 h-fit md:sticky md:top-24">
          <h2 className="font-display text-xl font-bold mb-6">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-ink/60">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-ink/60">
              <span>Shipping</span>
              <span>${SHIPPING_FEE.toFixed(2)}</span>
            </div>
            <div className="border-t border-ink/10 pt-3 flex justify-between font-semibold text-base">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="mt-6 w-full bg-ink text-cream rounded-pill py-3 font-medium hover:bg-brown-dark transition-colors flex items-center justify-center gap-2"
          >
            Checkout <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}