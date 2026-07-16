import Image from "next/image";
import { Tag, Award, Truck } from "lucide-react";
import { infoStrip } from "@/lib/mockData";

const icons = { tag: Tag, award: Award, truck: Truck };

export default function Hero() {
  return (
    <section>
      <div className="relative min-h-[620px] md:min-h-[700px] overflow-hidden pt-6 md:pt-0">
        {/* Background Images */}
        <Image
          src="/images/hero-desktop.jpeg"
          alt="Not Tales campaign"
          fill
          priority
          className="hidden md:block object-cover"
        />
        <Image
          src="/images/hero-mobile.jpeg"
          alt="Not Tales campaign"
          fill
          priority
          className="block md:hidden object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink/30" />

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-12 h-full grid md:grid-cols-2 gap-10 items-center text-center md:text-left">
          {/* Text Content */}
          <div className="space-y-6">
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-cream max-w-xl">
              <span className="inline-block bg-brown-dark px-4 py-2 rounded-md -rotate-1">
                Not Tales.
              </span>{" "}
              Wear what&apos;s real.
            </h1>

            <p className="text-base md:text-xl text-cream/90 max-w-md">
              Real style isn’t loud — it’s intentional. Elevated jackets, crisp shirts, 
              and refined pants that help you show up as the best version of yourself.
            </p>

            <div>
              <button className="bg-cream text-ink rounded-full px-10 py-2 font-medium hover:bg-brown-dark hover:text-cream transition-colors text-lg">
                Explore
              </button>
            </div>
          </div>

          {/* Right Side Images - Better Mobile Behavior */}
          <div className="relative hidden md:block h-[520px]">
            {/* Decorative circle */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-brown/30" />

            <Image
              src="https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=500&q=80"
              alt="Model wearing a red jacket"
              width={240}
              height={300}
              className="absolute left-6 top-8 rounded-3xl object-cover shadow-2xl"
            />
            <Image
              src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&q=80"
              alt="Model seated, styled look"
              width={280}
              height={360}
              className="absolute right-0 top-20 rounded-3xl object-cover shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Info Strip */}
      <div className="border-y border-ink/10 bg-cream">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {infoStrip.map((item) => {
            const Icon = icons[item.icon];
            return (
              <div key={item.title} className="flex items-center gap-4">
                <span className="w-11 h-11 rounded-full bg-cream-2 flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-brown-dark" />
                </span>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-ink/50 text-sm">{item.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}