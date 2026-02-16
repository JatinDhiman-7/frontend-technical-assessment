import { create } from "zustand";

/**
 * Auth store using Zustand
 * Stores access token for API requests
 * Can be extended for user info
 */
export const useAuthStore = create((set) => ({
  token: null,
  setToken: (token) => set({ token }),
  clearToken: () => set({ token: null }),
}));
