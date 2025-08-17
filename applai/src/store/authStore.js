import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null, //no user signed in initially

  login: (userData) => set({ user: userData }), //function to set the user when logged in
  logout: () => set({ user: null }),
}));

export default useAuthStore;