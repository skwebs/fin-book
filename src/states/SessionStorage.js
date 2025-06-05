import { create } from "zustand";

const useSessionStorage = create((set) => ({
  auth: null,

  setLoading: (isLoading) => set({ isLoading }),
  setAuth: (auth) => set({ auth }),
  clearAuth: () => set({ auth: null }),

  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
}));

export default useSessionStorage;
