import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Variant {
  id: string;
  name: string;
  imageUrl: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  variants?: Variant[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedVariant?: Variant;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, variant?: Variant) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, variant) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.id === product.id && item.selectedVariant?.id === variant?.id
        );

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.id === product.id && item.selectedVariant?.id === variant?.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ items: [...currentItems, { ...product, quantity: 1, selectedVariant: variant }] });
        }
      },
      removeItem: (productId, variantId) => {
        set({ 
          items: get().items.filter(
            (item) => !(item.id === productId && item.selectedVariant?.id === variantId)
          ) 
        });
      },
      updateQuantity: (productId, quantity, variantId) => {
        set({
          items: get().items.map((item) =>
            item.id === productId && item.selectedVariant?.id === variantId 
              ? { ...item, quantity: Math.max(0, quantity) } 
              : item
          ).filter(item => item.quantity > 0),
        });
      },
      clearCart: () => set({ items: [] }),
      total: () => {
        return get().items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'zephyr-cart-storage',
    }
  )
);
