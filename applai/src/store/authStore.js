import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Auth store for managing user login state and persistence
const useAuthStore = create(
  persist(
    (set) => ({
      // State variables
      user: null,          // Stores logged-in user data (local or Google)
      loginMethod: null,   // Tracks login method: "local" or "google"
      error: null,         // Stores error messages during login

      // Login action (supports local and Google login)
      login: (userData, method) => {
        try {
          let user;

          // Google login validation
          if (method === "google") {
            if (!userData.email || !userData.name) {
              throw new Error("Invalid Google user data");
            }
            user = {
              email: userData.email,
              name: userData.name,
              picture: userData.picture || null,
            };

          // Local login validation
          } else if (method === "local") {
            if (!userData.username || userData.username.length < 8) {
              throw new Error("Username must be at least 8 characters");
            }
            if (!userData.password || userData.password.length < 6) {
              throw new Error("Password must be at least 6 characters");
            }
            user = {
              username: userData.username,
              password: userData.password, 
              picture: userData.picture || null,
            };

          // Unsupported login method
          } else {
            throw new Error("Unsupported login method");
          }

          // Update state on successful login
          set({ user, loginMethod: method, error: null });

        } catch (err) {
          // Update state with error message on failure
          set({ error: err.message });
        }
      },

      // Logout action
      logout: () => set({ user: null, loginMethod: null, error: null }),
    }),
    {
      // Persist store in localStorage under the key "auth-storage"
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;