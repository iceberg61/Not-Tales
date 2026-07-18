import { Suspense } from "react";
import { buildMetadata } from "@/components/SEO";
import ShopClient from "./ShopClient";

export const metadata = buildMetadata({
  title: "Shop",
  description: "Browse jeans, clothes, and caps from Not Tales.",
});

export default function ShopPage() {
  return (
    <Suspense fallback={null}>
      <ShopClient />
    </Suspense>
  );
}