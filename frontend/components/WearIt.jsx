"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { lookbook } from "@/lib/mockData";

const AUTOPLAY_DELAY_MS = 4000;

export default function WearIt() {
  const scrollerRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const isPausedRef = useRef(false);

  const scrollToIndex = useCallback((index) => {
    const el = scrollerRef.current;
    const card = cardRefs.current[index];
    if (!el || !card) return;
    el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    function handleScroll() {
      const scrollCenter = el.scrollLeft + el.offsetWidth / 2;
      let closest = 0;
      let closestDist = Infinity;
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const cardCenter = card.offsetLeft - el.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(cardCenter - scrollCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      setActiveIndex(closest);
    }

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPausedRef.current) return;
      const nextIndex = (activeIndex + 1) % lookbook.length;
      scrollToIndex(nextIndex);
    }, AUTOPLAY_DELAY_MS);
    return () => clearInterval(interval);
  }, [activeIndex, scrollToIndex]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold">Young Favorite Apparel</h2>
          <p className="text-ink/50 text-xs md:text-sm mt-1">
            Look smart and stay comfortable. Clothes for the way you work now.
          </p>
        </div>
        <button className="self-end md:self-auto bg-ink text-cream rounded-pill px-5 py-2 md:px-6 md:py-2.5 text-xs md:text-sm font-medium hover:bg-brown-dark transition-colors">
          See more
        </button>
      </div>

      <div
        className="relative"
        onMouseEnter={() => (isPausedRef.current = true)}
        onMouseLeave={() => (isPausedRef.current = false)}
        onTouchStart={() => (isPausedRef.current = true)}
        onTouchEnd={() => (isPausedRef.current = false)}
      >
        <div
          ref={scrollerRef}
          className="no-scrollbar flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2"
        >
          {lookbook.map((src, i) => (
            <div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              className="shrink-0 snap-start w-[70%] xs:w-[60%] sm:w-[45%] md:w-[30%] lg:w-[23%]"
            >
              <Image
                src={src}
                alt="Lookbook outfit"
                width={280}
                height={340}
                className="rounded-xl object-cover w-full h-64 md:h-72"
              />
            </div>
          ))}
        </div>

        
        <div className="pointer-events-none absolute top-0 right-0 h-full w-16 md:w-24 bg-gradient-to-l from-cream via-cream/60 to-transparent backdrop-blur-[2px]" />
      </div>

    
      <div className="flex items-center justify-center gap-2 mt-5">
        {lookbook.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === activeIndex ? "w-6 bg-ink" : "w-2 bg-ink/25 hover:bg-ink/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}