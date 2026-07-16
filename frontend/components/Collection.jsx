import Image from "next/image";
import Link from "next/link";
import { collections } from "@/lib/mockData";

export default function Collection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-3 gap-10">
      {collections.map((c) => (
        <div key={c.name} className="flex items-center gap-4">
          <Image
            src={c.image}
            alt={`${c.name} collection`}
            width={90}
            height={90}
            className="rounded-full object-cover w-20 h-20 shrink-0"
          />
          <div>
            <h3 className="font-display text-lg font-semibold">{c.name} Collections</h3>
            <p className="text-ink/50 text-sm">{c.count}</p>
            <Link
              href={`/shop?category=${c.name.toLowerCase()}`}
              className="text-sm font-medium underline underline-offset-4 hover:text-brown-dark"
            >
              Discover All
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
}
