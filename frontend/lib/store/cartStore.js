import { create } from "zustand";
import { persist } from "zustand/middleware";

// Cart items are matched by id + size + color, since the same product
// in a different size/color counts as a separate line item.
const sameLine = (a, b) =>
  a.id === b.id && a.size === b.size && a.color === b.color;

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => sameLine(i, item));
          if (existing) {
            const cap = existing.stock ?? Infinity;
            return {
              items: state.items.map((i) =>
                sameLine(i, item) ? { ...i, quantity: Math.min(cap, i.quantity + item.quantity) } : i
              ),
            };
          }
          return { items: [...state.items, item] };
        }),

      removeItem: (id, size, color) =>
        set((state) => ({
          items: state.items.filter((i) => !sameLine(i, { id, size, color })),
        })),

      updateQuantity: (id, size, color, quantity) =>
        set((state) => ({
          items: state.items.map((i) => {
            if (!sameLine(i, { id, size, color })) return i;
            const cap = i.stock ?? Infinity;
            return { ...i, quantity: Math.min(cap, Math.max(1, quantity)) };
          }),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "not-tales-cart",
      version: 1,
      migrate: (persistedState, version) => (version < 1 ? { items: [] } : persistedState),
    }
  )
);