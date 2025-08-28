import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,          // currently logged-in user
      loginMethod: null,   // "google" or "email"

      // log in user and set method
      login: (userData, method) => set({ user: userData, loginMethod: method }),

      // log out user and clear method
      logout: () => set({ user: null, loginMethod: null }),

      // computed value: is the user authenticated?
      get isAuthenticated() {
        return get().user !== null;
      },

    }),
    {
      name: "auth-storage", // key name in localStorage
    }
  )
);

export default useAuthStore;