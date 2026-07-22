"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Script from "next/script";
import axios from "axios";
import { useCartStore } from "@/lib/store/cartStore";
import { formatNaira } from "@/lib/currency";
import RequireAuth from "@/components/RequireAuth";

const SHIPPING_FEE = 8; // must match backend's orderController SHIPPING_FEE

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

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

function CheckoutContent() {
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

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in before checking out.");
      setTimeout(() => router.push("/login"), 1200);
      return;
    }

    setPlacing(true);
    try {
      const authHeader = { headers: { Authorization: `Bearer ${token}` } };

      // Cart items only carry a slug (from mockData) — resolve each to its
      // real MongoDB _id before creating the order, since that's what the
      // backend actually needs to look the product up.
      const resolvedItems = await Promise.all(
        items.map(async (item) => {
          const { data } = await api.get(`/products/${item.slug}`);
          return {
            productId: data.product._id,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
          };
        })
      );

      const shippingAddress = {
        street: form.street,
        city: form.city,
        state: form.state,
        country: form.country,
        zip: form.zip,
      };

      const { data: orderRes } = await api.post(
        "/orders",
        { items: resolvedItems, shippingAddress },
        authHeader
      );

      const { order, payment } = orderRes;

      // Flutterwave's inline script (loaded below via next/script) attaches
      // this to window — it isn't an npm import.
      window.FlutterwaveCheckout({
        public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY,
        tx_ref: payment.txRef,
        amount: payment.amount,
        currency: payment.currency,
        payment_options: "card, banktransfer, ussd",
        customer: {
          email: form.email,
          phone_number: form.phone,
          name: form.name,
        },
        customizations: {
          title: "Not Tales",
          description: `Payment for order ${order._id}`,
        },
        callback: async (response) => {
          try {
            await api.post(
              "/orders/verify-payment",
              { orderId: order._id, transactionId: response.transaction_id },
              authHeader
            );
            clearCart();
            router.push(`/order-confirmation?order=${order._id}`);
          } catch (err) {
            setError(
              err.response?.data?.message ||
                "Payment went through but we couldn't confirm it — contact support with your order ID."
            );
          } finally {
            setPlacing(false);
          }
        },
        onclose: () => {
          setPlacing(false);
        },
      });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
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
    <>
      <Script src="https://checkout.flutterwave.com/v3.js" strategy="afterInteractive" />

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="font-display text-3xl font-bold mb-10">Checkout</h1>

        <form onSubmit={handlePlaceOrder} className="grid md:grid-cols-3 gap-10">
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
                  <span className="text-sm font-medium">{formatNaira(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 text-sm mt-6 border-t border-ink/10 pt-4">
              <div className="flex justify-between text-ink/60">
                <span>Subtotal</span>
                <span>{formatNaira(subtotal)}</span>
              </div>
              <div className="flex justify-between text-ink/60">
                <span>Shipping</span>
                <span>{formatNaira(SHIPPING_FEE)}</span>
              </div>
              <div className="border-t border-ink/10 pt-3 flex justify-between font-semibold text-base">
                <span>Total</span>
                <span>{formatNaira(total)}</span>
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
    </>
  );
}

export default function CheckoutPage() {
  return (
    <RequireAuth>
      <CheckoutContent />
    </RequireAuth>
  );
}