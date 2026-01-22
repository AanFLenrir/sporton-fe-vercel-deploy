"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../types";

/* =========================
   TYPES
========================= */

export interface CartItem extends Product {
  qty: number;
}

export interface CustomerInfo {
  customerName: string;
  customerContact: number | null;
  customerAddress: string;
}

interface CartStore {
  customerInfo: CustomerInfo | null;
  items: CartItem[];
  setCustomerInfo: (info: CustomerInfo) => void;
  addItem: (product: Product, qty?: number) => void;
  removeItem: (productId: string) => void;
  reset: () => void;
}

/* =========================
   STORE
========================= */

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      customerInfo: null,
      items: [],

      setCustomerInfo: (info) => {
        set({ customerInfo: info });
      },

      addItem: (product, qty = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item._id === product._id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item._id === product._id
                  ? { ...item, qty: item.qty + qty }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { ...product, qty }],
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item._id !== productId),
        }));
      },

      reset: () => {
        set({
          items: [],
          customerInfo: null,
        });
      },
    }),
    {
      name: "cart-storage",
      skipHydration: true, // penting untuk Next.js
    }
  )
);
