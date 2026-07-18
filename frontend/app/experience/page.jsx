import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/components/SEO";
import { lookbook } from "@/lib/mockData";

export const metadata = buildMetadata({
  title: "Experience",
  description: "The story and philosophy behind Not Tales.",
});

const values = [
  { title: "Real materials", body: "100% cotton, raw denim, and fabrics chosen to last, not just to photograph well." },
  { title: "Small batches", body: "We produce in limited runs so every piece stays intentional, not disposable." },
  { title: "Made to be worn", body: "Clothes that hold up to an actual life, not just a first outing." },
];

export default function ExperiencePage() {
  return (
    <>
      <section className="max-w-3xl mx-auto px-6 py-16 sm:py-24 text-center">
        <h1 className="font-display text-3xl sm:text-5xl font-bold leading-tight">
          Not Tales. Just what actually works.
        </h1>
        <p className="text-ink/60 mt-6 max-w-xl mx-auto">
          We don&apos;t design around a story — we design around how clothes hold up in
          real life. No fairy-tale marketing, just fabric, fit, and craft that speaks
          for itself.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16 sm:pb-24 grid sm:grid-cols-3 gap-6">
        {values.map((v) => (
          <div key={v.title} className="bg-cream-2 rounded-2xl p-8">
            <h3 className="font-display text-lg font-semibold">{v.title}</h3>
            <p className="text-ink/60 text-sm mt-3">{v.body}</p>
          </div>
        ))}
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16 sm:pb-24">
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8">In the wild</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {lookbook.map((src, i) => (
            <Image
              key={i}
              src={src}
              alt="Not Tales, worn"
              width={280}
              height={340}
              className="rounded-xl object-cover w-full h-48 sm:h-64"
            />
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-20 sm:pb-28 text-center">
        <h2 className="font-display text-2xl sm:text-3xl font-bold">See it for yourself</h2>
        <Link
          href="/shop"
          className="inline-block mt-6 bg-ink text-cream rounded-pill px-8 py-3 font-medium hover:bg-brown-dark transition-colors"
        >
          Shop the collection
        </Link>
      </section>
    </>
  );
}