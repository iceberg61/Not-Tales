"use client";
import { useState } from "react";
import axios from "axios";
import { Mail, Phone, MapPin } from "lucide-react";

const inputClass =
  "w-full bg-cream-2 rounded-xl px-4 py-3 text-sm outline-none border border-transparent focus:border-brown-dark transition-colors";

const contactDetails = [
  { icon: Mail, label: "hello@nottales.com" },
  { icon: Phone, label: "+1 (555) 012-3456" },
  { icon: MapPin, label: "6363 Forest St, Aberdeen, New Mexico" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.message) {
      setError("Please fill in your name, email, and message.");
      return;
    }

    setLoading(true);
    try {
      // Backend endpoint isn't live yet — wired for Phase 3
      // (contactController.submitContactForm + emailService.sendContactNotificationEmail).
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/contact`, form);
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="font-display text-3xl font-bold mb-2">Contact us</h1>
      <p className="text-ink/50 text-sm mb-10">We usually reply within one business day.</p>

      <div className="grid md:grid-cols-3 gap-10">
        <div className="space-y-6">
          {contactDetails.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-start gap-3">
              <span className="w-10 h-10 rounded-full bg-cream-2 flex items-center justify-center shrink-0">
                <Icon size={16} className="text-brown-dark" />
              </span>
              <p className="text-sm text-ink/70 mt-2">{label}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="md:col-span-2 space-y-4">
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2">{error}</p>
          )}
          {sent && (
            <p className="text-sm text-sage bg-sage/10 border border-sage/20 rounded-lg px-4 py-2">
              Message sent — we&apos;ll be in touch soon.
            </p>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" className={inputClass} />
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className={inputClass} />
          </div>
          <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" className={inputClass} />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your message"
            rows={6}
            className={`${inputClass} rounded-2xl resize-none`}
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-ink text-cream rounded-pill px-8 py-3 font-medium hover:bg-brown-dark transition-colors disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send message"}
          </button>
        </form>
      </div>
    </section>
  );
}