import { buildMetadata } from "@/components/SEO";
import Link from "next/link";
import { HelpCircle } from "lucide-react";

export const metadata = buildMetadata({
  title: "FAQ",
  description: "Frequently asked questions — coming soon.",
});

export default function FaqPage() {
  return (
    <section className="max-w-2xl mx-auto px-6 py-24 text-center">
      <div className="w-16 h-16 rounded-full bg-cream-2 flex items-center justify-center mx-auto mb-6">
        <HelpCircle size={28} className="text-brown-dark" />
      </div>
      <h1 className="font-display text-3xl font-bold">FAQ — Coming soon</h1>
      <p className="text-ink/60 mt-3 max-w-md mx-auto">
        We&apos;re putting together answers to the questions we get asked most. In the meantime, reach out directly and we&apos;ll help right away.
      </p>
      <Link
        href="/contact"
        className="inline-block mt-8 bg-ink text-cream rounded-pill px-7 py-3 font-medium hover:bg-brown-dark transition-colors"
      >
        Contact us
      </Link>
    </section>
  );
}
