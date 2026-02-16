import { create } from "zustand";

/**
 * Products Store
 * - products: list of current page products
 * - cachedPages: cache for {key: pageData} combinations
 */
export const useProductsStore = create((set, get) => ({
  products: [],
  total: 0,
  cachedPages: {},

  fetchProducts: async ({ category = "", search = "", page = 1, limit = 10 } = {}) => {
    const key = `${category}_${search}_${page}`;
    const cached = get().cachedPages[key];
    if (cached) {
      set({ products: cached.products, total: cached.total });
      return;
    }

    try {
      const skip = (page - 1) * limit;
      let url = "";

      if (category && search) {
        url = `https://dummyjson.com/products/category/${category}?limit=100`;
      } else if (category) {
        url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
      } else if (search) {
        url = `https://dummyjson.com/products/search?q=${encodeURIComponent(search)}&limit=100`;
      } else {
        url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      let fetchedProducts = Array.isArray(data.products) ? data.products : [];
      let total = typeof data.total === "number" ? data.total : fetchedProducts.length;

      // Combine search+category filter if needed
      if (category && search) {
        fetchedProducts = fetchedProducts.filter((p) =>
          p.title.toLowerCase().includes(search.toLowerCase())
        );
        total = fetchedProducts.length;
        fetchedProducts = fetchedProducts.slice(skip, skip + limit);
      }

      set((state) => ({
        products: fetchedProducts,
        total,
        cachedPages: { ...state.cachedPages, [key]: { products: fetchedProducts, total } },
      }));
    } catch (err) {
      console.error("Failed to fetch products:", err);
      set({ products: [], total: 0 });
    }
  },
}));
