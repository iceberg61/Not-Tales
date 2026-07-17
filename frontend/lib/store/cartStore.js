import { create } from "zustand";
import { persist } from "zustand/middleware";
import { cartSeed } from "@/lib/mockData";

// Cart items are matched by id + size + color, since the same product
// in a different size/color counts as a separate line item.
const sameLine = (a, b) =>
  a.id === b.id && a.size === b.size && a.color === b.color;

export const useCartStore = create(
  persist(
    (set) => ({
      // Seeded with demo items so Cart/Checkout aren't empty during the styling
      // pass — swap to [] once product pages wire a real "Add to cart" action.
      items: cartSeed,

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => sameLine(i, item));
          if (existing) {
            return {
              items: state.items.map((i) =>
                sameLine(i, item) ? { ...i, quantity: i.quantity + item.quantity } : i
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
          items: state.items.map((i) =>
            sameLine(i, { id, size, color }) ? { ...i, quantity: Math.max(1, quantity) } : i
          ),
        })),

      clearCart: () => set({ items: [] }),
    }),
    { name: "not-tales-cart" }
  )
);
