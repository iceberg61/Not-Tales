import { notFound } from "next/navigation";
import { allProducts } from "@/lib/mockData";
import { buildMetadata } from "@/components/SEO";
import ProductDetailClient from "./ProductDetailClient";

export function generateMetadata({ params }) {
  const product = allProducts.find((p) => p.slug === params.id);
  if (!product) return buildMetadata({ title: "Product not found" });
  return buildMetadata({
    title: product.name,
    description: product.description,
    image: product.image,
  });
}

export default function ProductDetailPage({ params }) {
  const product = allProducts.find((p) => p.slug === params.id);
  if (!product) notFound();
  return <ProductDetailClient product={product} />;
}