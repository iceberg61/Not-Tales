import { create } from "zustand";
import { persist } from "zustand/middleware";
import { wishlistSeed } from "@/lib/mockData";

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      // Seeded with demo product ids — swap to [] once "Save to wishlist"
      // is wired on the product pages.
      ids: wishlistSeed,

      toggle: (id) =>
        set((state) => ({
          ids: state.ids.includes(id)
            ? state.ids.filter((i) => i !== id)
            : [...state.ids, id],
        })),

      isSaved: (id) => get().ids.includes(id),
    }),
    { name: "not-tales-wishlist" }
  )
);
