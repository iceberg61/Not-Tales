import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Instagram } from "lucide-react";

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
        <Image
          src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=300&q=80"
          alt="Fashion preview"
          width={180}
          height={260}
          className="rounded-2xl mt-8 md:mt-0 object-cover hidden sm:block"
        />
      </div>
    </section>
  );
}