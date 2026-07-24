import { buildMetadata } from "@/components/SEO";
import Link from "next/link";
import { Newspaper } from "lucide-react";

export const metadata = buildMetadata({
  title: "Blog",
  description: "Stories from Not Tales — coming soon.",
});

export default function BlogPage() {
  return (
    <section className="max-w-2xl mx-auto px-6 py-24 text-center">
      <div className="w-16 h-16 rounded-full bg-cream-2 flex items-center justify-center mx-auto mb-6">
        <Newspaper size={28} className="text-brown-dark" />
      </div>
      <h1 className="font-display text-3xl font-bold">Blog — Coming soon</h1>
      <p className="text-ink/60 mt-3 max-w-md mx-auto">
        Style notes, drop-announcements, and behind-the-scenes — we&apos;re just getting started here.
      </p>
      <Link
        href="/shop"
        className="inline-block mt-8 bg-ink text-cream rounded-pill px-7 py-3 font-medium hover:bg-brown-dark transition-colors"
      >
        Shop the latest
      </Link>
    </section>
  );
}
