import { create } from "zustand";

export const useStore = create((set, get) => ({
  /* ============================
     AUTH STATE
  ============================ */
  auth: {
    user: null,
    token: null,
    loading: false,
  },

  login: async (username, password) => {
    set({ auth: { ...get().auth, loading: true } });
    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      set({ auth: { user: data, token: data.token, loading: false } });
    } catch (err) {
      console.error("Login failed", err);
      set({ auth: { ...get().auth, loading: false } });
    }
  },

  logout: () =>
    set({ auth: { user: null, token: null, loading: false } }),

  /* ============================
     USERS STATE
  ============================ */
  users: {
    list: [],
    byId: {}, // ✅ Cache individual users
    total: 0,
    loading: false,
  },

  fetchUsers: async (search = "", page = 1, limit = 10) => {
    set({ users: { ...get().users, loading: true } });

    try {
      const skip = (page - 1) * limit;
      const url = search
        ? `https://dummyjson.com/users/search?q=${encodeURIComponent(search)}&limit=${limit}`
        : `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;

      const res = await fetch(url);
      const data = await res.json();

      const usersArray = data.users || [];

      // Update cache
      const updatedById = { ...get().users.byId };
      usersArray.forEach((u) => {
        updatedById[u.id] = u;
      });

      set({
        users: {
          list: usersArray,
          total: data.total || 0,
          loading: false,
          byId: updatedById,
        },
      });
    } catch (err) {
      console.error("Fetch users failed", err);
      set({ users: { ...get().users, loading: false } });
    }
  },

  fetchUserById: async (id) => {
    const existing = get().users.byId[id];
    if (existing) return; // ✅ Already cached

    set({ users: { ...get().users, loading: true } });

    try {
      const res = await fetch(`https://dummyjson.com/users/${id}`);
      const data = await res.json();

      set({
        users: {
          ...get().users,
          loading: false,
          byId: { ...get().users.byId, [id]: data },
        },
      });
    } catch (err) {
      console.error("Fetch user by id failed", err);
      set({ users: { ...get().users, loading: false } });
    }
  },

  /* ============================
     PRODUCTS STATE
  ============================ */
  products: {
    list: [],
    byId: {}, // ✅ Cache individual products
    total: 0,
    loading: false,
  },

  fetchProducts: async ({ search = "", category = "", page = 1, limit = 10 } = {}) => {
    set({ products: { ...get().products, loading: true } });

    try {
      const skip = (page - 1) * limit;
      let url = "";

      if (search) {
        url = `https://dummyjson.com/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`;
      } else if (category) {
        url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
      } else {
        url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      const productsArray = data.products || [];

      // Update cache
      const updatedById = { ...get().products.byId };
      productsArray.forEach((p) => {
        updatedById[p.id] = p;
      });

      set({
        products: {
          list: productsArray,
          total: data.total || 0,
          loading: false,
          byId: updatedById,
        },
      });
    } catch (err) {
      console.error("Fetch products failed", err);
      set({ products: { ...get().products, loading: false } });
    }
  },

  fetchProductById: async (id) => {
    const existing = get().products.byId[id];
    if (existing) return; // ✅ Already cached

    set({ products: { ...get().products, loading: true } });

    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();

      set({
        products: {
          ...get().products,
          loading: false,
          byId: { ...get().products.byId, [id]: data },
        },
      });
    } catch (err) {
      console.error("Fetch product by id failed", err);
      set({ products: { ...get().products, loading: false } });
    }
  },
}));
export const useAuthStore = create((set) => ({
  token: null,

  setToken: (token) => set({ token }),

  clearToken: () => set({ token: null }),
}));