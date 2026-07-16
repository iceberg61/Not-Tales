import Hero from "@/components/Hero";
import Collection from "@/components/Collection";
import ProductGrid from "@/components/ProductGrid";
import CTA from "@/components/CTA";
import WearIt from "@/components/WearIt";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Collection />
      <ProductGrid variant="featured" />
      <ProductGrid variant="grid" />
      <CTA />
      <WearIt />
    </>
  );
}
