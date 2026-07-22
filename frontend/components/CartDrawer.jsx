"use client";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";
import { formatNaira } from "@/lib/currency";

// Slide-out mini-cart, opened from the Navbar cart icon. The full /cart
// page (with the same store) is where checkout actually starts.
export default function CartDrawer({ open, onClose }) {
  const { items, updateQuantity, removeItem } = useCartStore();
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <>
      <div
        className={`fixed inset-0 bg-ink/40 z-40 transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-cream z-50 shadow-2xl transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 h-20 border-b border-ink/10 shrink-0">
          <h2 className="font-display text-lg font-semibold">Your Cart</h2>
          <button onClick={onClose} aria-label="Close cart" className="text-ink/50 hover:text-ink">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 && (
            <p className="text-ink/50 text-sm mt-8 text-center">Your cart is empty.</p>
          )}
          {items.map((item) => (
            <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-3">
              <Image
                src={item.image}
                alt={item.name}
                width={64}
                height={76}
                className="w-16 h-[76px] rounded-lg object-cover shrink-0"
              />
              <div className="flex-1">
                <p className="text-sm font-medium leading-tight">{item.name}</p>
                <p className="text-xs text-ink/50 mt-0.5">{item.size}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2 bg-cream-2 rounded-pill px-1.5 py-0.5">
                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                      className="w-5 h-5 flex items-center justify-center"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={11} />
                    </button>
                    <span className="text-xs font-medium w-3 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                      disabled={item.quantity >= (item.stock ?? Infinity)}
                      className="w-5 h-5 flex items-center justify-center disabled:opacity-30"
                      aria-label="Increase quantity"
                    >
                      <Plus size={11} />
                    </button>
                  </div>
                  <span className="text-sm font-semibold">{formatNaira(item.price * item.quantity)}</span>
                </div>
                {item.stock != null && item.quantity >= item.stock && (
                  <p className="text-[11px] text-mustard mt-1">Max stock reached</p>
                )}
              </div>
              <button
                onClick={() => removeItem(item.id, item.size, item.color)}
                aria-label="Remove item"
                className="text-ink/30 hover:text-red-500 shrink-0"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-ink/10 shrink-0">
            <div className="flex justify-between text-sm font-medium mb-4">
              <span>Subtotal</span>
              <span>{formatNaira(subtotal)}</span>
            </div>
            <Link
              href="/cart"
              onClick={onClose}
              className="block text-center bg-cream-2 rounded-pill py-2.5 text-sm font-medium mb-2 hover:bg-ink/5 transition-colors"
            >
              View cart
            </Link>
            <Link
              href="/checkout"
              onClick={onClose}
              className="block text-center bg-ink text-cream rounded-pill py-2.5 text-sm font-medium hover:bg-brown-dark transition-colors"
            >
              Checkout
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}