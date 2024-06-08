import { create } from "zustand";

export interface Product {
  id: number;
  name: string;
  price: number;
  info: string;
  img: any;
}

export interface BasketState {
  products: Array<Product & { quanity: number }>;
  addProduct: (product: Product) => void;
  reduceProduct: (product: Product) => void;
  clearCart: () => void;
  items: number;
  total: number;
}

const useBasketStore = create<BasketState>()((set) => ({
  products: [],
  items: 0,
  total: 0,
  addProduct: (product) => {
    set((state) => {
      state.items += 1;
      state.total += product.price;
      const hasProduct = state.products.find((p) => p.id === product.id);

      if (hasProduct) {
        hasProduct.quanity += 1;
        return { products: [...state.products] };
      } else {
        return { products: [...state.products, { ...product, quanity: 1 }] };
      }
    });
  },
  reduceProduct: (product) => {
    set((state) => {
      state.total -= product.price;
      state.items -= 1;
      return {
        products: state.products
          .map((p) => {
            if (p.id === product.id) {
              p.quanity -= 1;
            }
            return p;
          })
          .filter((p) => p.quanity > 0),
      };
    });
  },
  clearCart: () => set({ products: [], items: 0, total: 0 }),
}));

export default useBasketStore;
