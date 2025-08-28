import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,           // stores user object {email, name, picture}
      loginMethod: null,    // "google" or "email"

      // 🔹 log in user and set method
      login: (userData, method) =>
        set({
          user: {
            email: userData.email,
            name: userData.name,
            picture: userData.picture, // profile photo if provided
          },
          loginMethod: method,
        }),

      // 🔹 log out user and clear method
      logout: () => set({ user: null, loginMethod: null }),

      // 🔹 computed: is user authenticated?
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