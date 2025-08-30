import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      loginMethod: null,
      error: null,

      // 🔹 Login (local + Google)
      login: (userData, method) => {
        try {
          let user;

          if (method === "google") {
            if (!userData.email || !userData.name) {
              throw new Error("Invalid Google user data");
            }
            user = {
              email: userData.email,
              name: userData.name,
              picture: userData.picture || null,
            };
          } else if (method === "local") {
            if (!userData.username || userData.username.length < 8) {
              throw new Error("Username must be at least 8 characters");
            }
            if (!userData.password || userData.password.length < 6) {
              throw new Error("Password must be at least 6 characters");
            }
            user = {
              username: userData.username,
              password: userData.password, // ⚠️ don't keep in prod
              picture: userData.picture || null,
            };
          } else {
            throw new Error("Unsupported login method");
          }

          set({ user, loginMethod: method, error: null });
        } catch (err) {
          set({ error: err.message });
        }
      },

      // 🔹 Logout
      logout: () => set({ user: null, loginMethod: null, error: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;