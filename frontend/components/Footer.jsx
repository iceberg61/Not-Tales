import Link from "next/link";
import { Instagram, Twitter, Facebook } from "lucide-react";

const categories = ["Jeans", "Shirt", "Caps", "Others"];
const importantLinks = ["Shop Page", "FAQ", "About Shop", "Blog"];

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brown-dark inline-block" />
            <span className="font-display text-xl font-semibold">Not Tales</span>
          </div>
          <p className="text-ink/50 text-sm mt-4 max-w-[200px]">
            Abuja, Unah Street Phase 1
          </p>
        </div>

        <div>
          <h4 className="font-medium mb-4 text-sm">Categories</h4>
          <ul className="space-y-2 text-sm text-ink/50">
            {categories.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-4 text-sm">Important Links</h4>
          <ul className="space-y-2 text-sm text-ink/50">
            {importantLinks.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 md:col-span-1">
          <h4 className="font-medium mb-4 text-sm">Subscribe</h4>
          <p className="text-sm text-ink/50 mb-3">Get 10% off your first order.</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-cream-2 rounded-pill px-4 py-2 text-sm flex-1 outline-none min-w-0"
            />
            <button className="bg-ink text-cream rounded-pill px-4 py-2 text-sm font-medium hover:bg-brown-dark transition-colors shrink-0">
              Subscribe
            </button>
          </div>
          <div className="flex gap-4 mt-6 text-ink/60">
            <Instagram size={18} />
            <Twitter size={18} />
            <Facebook size={18} />
          </div>
        </div>
      </div>

      <div className="border-t border-ink/10 py-6 text-center text-xs text-ink/40">
        © {new Date().getFullYear()} Not Tales. All rights reserved.
      </div>
    </footer>
  );
}