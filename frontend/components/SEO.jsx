// Helper for building a Next.js `metadata` object consistently across pages.
// Next's App Router only reads `metadata` from Server Components, so this is
// a plain function (not JSX) — call it from a page.jsx that isn't "use client".
//
// Usage:
//   export const metadata = buildMetadata({ title: "Shop", description: "..." });
export function buildMetadata({ title, description, image } = {}) {
  const fallbackDescription = "Shop the latest jeans, clothes, and caps from Not Tales.";
  const fullTitle = title ? `${title} | Not Tales` : "Not Tales | Wear What's Real";
  const desc = description || fallbackDescription;

  return {
    title: fullTitle,
    description: desc,
    openGraph: {
      title: fullTitle,
      description: desc,
      images: image ? [{ url: image }] : undefined,
    },
  };
}