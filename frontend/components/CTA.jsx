import Link from "next/link";
import { MessageCircle, Instagram } from "lucide-react";

// A custom illustration replaces the old stock photo — a rotated "ticket"
// badge with a perforated edge, confetti dots, and a couple of stitched
// hemlines nodding to apparel, built entirely from brand-color SVG shapes
// so it never looks like a generic downloaded image and scales cleanly.
function DiscountBadge() {
  return (
    <svg viewBox="0 0 260 260" className="w-40 h-40 md:w-56 md:h-56" aria-hidden="true">
      <circle cx="130" cy="130" r="120" className="fill-cream/10" />
      <circle cx="130" cy="130" r="95" className="fill-cream/10" />

      {/* Confetti scatter */}
      <circle cx="40" cy="60" r="5" className="fill-mustard" />
      <circle cx="215" cy="70" r="4" className="fill-cream/70" />
      <circle cx="30" cy="190" r="4" className="fill-cream/70" />
      <circle cx="225" cy="200" r="6" className="fill-mustard" />
      <circle cx="60" cy="225" r="3.5" className="fill-cream/50" />
      <rect x="195" y="150" width="8" height="8" rx="2" className="fill-cream/60" transform="rotate(20 199 154)" />
      <rect x="45" y="140" width="7" height="7" rx="2" className="fill-mustard/80" transform="rotate(-15 48 143)" />

      {/* Ticket badge */}
      <g transform="rotate(-8 130 130)">
        <path
          d="M60 90 h140 a10 10 0 0 1 10 10 a12 12 0 0 0 0 24 a10 10 0 0 1 -10 10 a10 10 0 0 1 -10 -10 H70 a10 10 0 0 1 -10 -10 a12 12 0 0 0 0 -24 a10 10 0 0 1 10 -10 z"
          className="fill-cream"
          transform="translate(0 20)"
        />
        <circle cx="60" cy="130" r="6" className="fill-brown-dark" />
        <text
          x="130"
          y="140"
          textAnchor="middle"
          className="fill-brown-dark font-display"
          style={{ fontSize: "34px", fontWeight: 700 }}
        >
          10% OFF
        </text>
      </g>
    </svg>
  );
}

export default function CTA() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="bg-brown-dark text-cream rounded-3xl px-6 py-10 md:px-10 md:py-12 md:flex items-center justify-between gap-10 overflow-hidden relative">
        <div className="max-w-sm">
          <h2 className="font-display text-2xl md:text-3xl font-bold leading-tight">
            10% Off Your First Order
          </h2>
          <p className="mt-3 text-sm md:text-base text-cream/70">
            Spend a minimum of ₦50,000 and get 10% off. Follow us for early
            access to new drops and restocks.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <Link
              href="https://wa.me/2340000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-cream text-ink rounded-pill px-5 py-2.5 text-sm font-medium hover:bg-white transition-colors"
            >
              <MessageCircle size={16} /> Chat on WhatsApp
            </Link>
            <Link
              href="https://instagram.com/yourbrand"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center sm:justify-start gap-2 text-cream text-sm font-medium hover:text-cream/80 transition-colors"
            >
              <Instagram size={16} /> Follow us
            </Link>
          </div>
        </div>

        <div className="mt-8 md:mt-0 hidden sm:flex items-center justify-center shrink-0">
          <DiscountBadge />
        </div>
      </div>
    </section>
  );
}