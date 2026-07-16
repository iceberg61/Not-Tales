import Image from "next/image";
import { Apple, PlayCircle } from "lucide-react";

export default function CTA() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="bg-brown-dark text-cream rounded-3xl px-10 py-12 md:flex items-center justify-between gap-10 overflow-hidden relative">
        <div className="max-w-sm">
          <h2 className="font-display text-3xl font-bold leading-tight">
            10% Discount for All Products
          </h2>
          <p className="mt-3 text-cream/70">
            Spend minimal $100 get 10% off. Download the app for exclusive offers.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <button className="flex items-center gap-2 bg-cream text-ink rounded-pill px-5 py-2.5 text-sm font-medium">
              <Apple size={16} /> App Store
            </button>
            <button className="flex items-center gap-2 text-cream text-sm font-medium">
              <PlayCircle size={16} /> Google Play
            </button>
          </div>
        </div>
        <Image
          src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=300&q=80"
          alt="Fashion app preview"
          width={180}
          height={260}
          className="rounded-2xl mt-8 md:mt-0 object-cover hidden sm:block"
        />
      </div>
    </section>
  );
}
