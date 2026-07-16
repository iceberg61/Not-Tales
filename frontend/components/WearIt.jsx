import Image from "next/image";
import { lookbook } from "@/lib/mockData";

export default function WearIt() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display text-3xl font-bold">Young Favorite Apparel</h2>
          <p className="text-ink/50 text-sm mt-1">
            Look smart and stay comfortable. Clothes for the way you work now.
          </p>
        </div>
        <button className="bg-ink text-cream rounded-pill px-6 py-2.5 text-sm font-medium hover:bg-brown-dark transition-colors">
          See more
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {lookbook.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt="Lookbook outfit"
            width={280}
            height={340}
            className="rounded-xl object-cover w-full h-64"
          />
        ))}
      </div>
    </section>
  );
}
