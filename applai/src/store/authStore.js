import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null, // no user signed in initially

      login: (userData) => set({ user: userData }), // sets user when logged in
      logout: () => set({ user: null }),            // clears user on logout
    }),
    {
      name: "auth-storage", // key name in localStorage
    }
  )
);

export default useAuthStore;