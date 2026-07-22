import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      ids: [],

      toggle: (id) =>
        set((state) => ({
          ids: state.ids.includes(id)
            ? state.ids.filter((i) => i !== id)
            : [...state.ids, id],
        })),

      isSaved: (id) => get().ids.includes(id),
    }),
    {
      name: "not-tales-wishlist",
      // Bumped from the unversioned build that shipped with seeded demo
      // ids — anyone whose browser still has that old persisted state gets
      // it reset to empty automatically instead of carrying stale entries.
      version: 1,
      migrate: (persistedState, version) => (version < 1 ? { ids: [] } : persistedState),
    }
  )
);