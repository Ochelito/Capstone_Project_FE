import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,           // { username, email, name, picture }
      loginMethod: null,    // "google" or "local"

      // 🔹 log in user and persist
      login: (userData, method) => {
        const user =
          method === "local"
            ? { username: userData.username, picture: userData.picture || null }
            : { email: userData.email, name: userData.name, picture: userData.picture || null };

        set(() => ({
          user,
          loginMethod: method,
        }));
      },

      // 🔹 log out user
      logout: () => set(() => ({ user: null, loginMethod: null })),

      // 🔹 computed
      get isAuthenticated() {
        return get().user !== null;
      },
    }),
    {
      name: "auth-storage", // localStorage key
      partialize: (state) => ({ user: state.user, loginMethod: state.loginMethod }),
    }
  )
);

export default useAuthStore;