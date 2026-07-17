"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCartStore } from "@/lib/store/cartStore";

const SHIPPING_FEE = 8;

const inputClass =
  "w-full bg-cream rounded-xl px-4 py-3 text-sm outline-none border border-ink/10 focus:border-brown-dark transition-colors";

const FIELDS = [
  { name: "name", placeholder: "Full name" },
  { name: "email", placeholder: "Email", type: "email" },
  { name: "phone", placeholder: "Phone number", span: true },
];

const ADDRESS_FIELDS = [
  { name: "street", placeholder: "Street address", span: true },
  { name: "city", placeholder: "City" },
  { name: "state", placeholder: "State / Province" },
  { name: "country", placeholder: "Country" },
  { name: "zip", placeholder: "ZIP / Postal code" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    street: "", city: "", state: "", country: "", zip: "",
  });
  const [error, setError] = useState("");
  const [placing, setPlacing] = useState(false);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const total = subtotal + (items.length ? SHIPPING_FEE : 0);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError("");

    const allFields = [...FIELDS, ...ADDRESS_FIELDS].map((f) => f.name);
    if (allFields.some((field) => !form[field])) {
      setError("Please fill in every field before continuing to payment.");
      return;
    }

    setPlacing(true);
    try {
      // TODO (Phase 4): trigger the Flutterwave inline checkout here using
      // NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY, then POST the shipping form + cart
      // items to /api/orders, which calls orderController.verifyPayment/createOrder.
      await new Promise((resolve) => setTimeout(resolve, 800)); // placeholder for the payment flow
      clearCart();
      router.push("/order-confirmation");
    } finally {
      setPlacing(false);
    }
  };

  if (items.length === 0) {
    return (
      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Nothing to check out</h1>
        <p className="text-ink/60 mt-3">Your cart is empty — add something first.</p>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="font-display text-3xl font-bold mb-10">Checkout</h1>

      <form onSubmit={handlePlaceOrder} className="grid md:grid-cols-3 gap-10">
        {/* Shipping form */}
        <div className="md:col-span-2 space-y-8">
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2">
              {error}
            </p>
          )}

          <div>
            <h2 className="font-display text-lg font-semibold mb-4">Contact information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {FIELDS.map((f) => (
                <input
                  key={f.name}
                  name={f.name}
                  type={f.type || "text"}
                  value={form[f.name]}
                  onChange={handleChange}
                  placeholder={f.placeholder}
                  className={`${inputClass} ${f.span ? "sm:col-span-2" : ""}`}
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold mb-4">Shipping address</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {ADDRESS_FIELDS.map((f) => (
                <input
                  key={f.name}
                  name={f.name}
                  value={form[f.name]}
                  onChange={handleChange}
                  placeholder={f.placeholder}
                  className={`${inputClass} ${f.span ? "sm:col-span-2" : ""}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Order summary + payment */}
        <div className="bg-cream-2 rounded-2xl p-6 h-fit md:sticky md:top-24">
          <h2 className="font-display text-xl font-bold mb-6">Order Summary</h2>

          <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-3">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={56}
                  height={64}
                  className="w-14 h-16 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 text-sm">
                  <p className="font-medium leading-tight">{item.name}</p>
                  <p className="text-ink/50">{item.size} · Qty {item.quantity}</p>
                </div>
                <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3 text-sm mt-6 border-t border-ink/10 pt-4">
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

          <button
            type="submit"
            disabled={placing}
            className="mt-6 w-full bg-ink text-cream rounded-pill py-3 font-medium hover:bg-brown-dark transition-colors disabled:opacity-50"
          >
            {placing ? "Processing..." : "Pay with Flutterwave"}
          </button>
        </div>
      </form>
    </section>
  );
}