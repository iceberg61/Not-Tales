import { notFound } from "next/navigation";
import { buildMetadata } from "@/components/SEO";
import ProductDetailClient from "./ProductDetailClient";

// Server Component — fetch() here is automatically deduped by Next.js, so
// calling it in both generateMetadata and the page below only hits the
// backend once per request, not twice.
async function getProduct(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.product;
}

export async function generateMetadata({ params }) {
  const product = await getProduct(params.id);
  if (!product) return buildMetadata({ title: "Product not found" });
  return buildMetadata({
    title: product.name,
    description: product.description,
    image: product.image,
  });
}

export default async function ProductDetailPage({ params }) {
  const product = await getProduct(params.id);
  if (!product) notFound();
  return <ProductDetailClient product={product} />;
}