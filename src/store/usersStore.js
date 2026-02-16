"use client";

import { create } from "zustand";

/**
 * Users Store
 * - Caches user lists
 * - Async fetch
 */
export const useUsersStore = create((set, get) => ({
  usersCache: {},
  totalCache: {},
  users: [],
  total: 0,

  fetchUsers: async (search = "", page = 1, limit = 10) => {
    const cacheKey = `${search}-${page}`;
    const totalKey = search;
    const { usersCache, totalCache } = get();

    if (usersCache[cacheKey]) {
      set({ users: usersCache[cacheKey], total: totalCache[totalKey] || 0 });
      return;
    }

    try {
      const skip = (page - 1) * limit;
      const url = search
        ? `https://dummyjson.com/users/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`
        : `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;

      const res = await fetch(url);
      const data = await res.json();

      const fetchedUsers = data.users || [];
      const fetchedTotal = data.total || fetchedUsers.length;

      set({
        usersCache: { ...usersCache, [cacheKey]: fetchedUsers },
        totalCache: { ...totalCache, [totalKey]: fetchedTotal },
        users: fetchedUsers,
        total: fetchedTotal,
      });
    } catch (err) {
      console.error("Failed to fetch users", err);
      set({ users: [], total: 0 });
    }
  },
}));
