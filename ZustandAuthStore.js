import { create } from "zustand";

const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  clearAuth: () => set({ user: null, token: null }),
  // setIsAuthenticated: () => {
  //   const state = get();
  //   console.log("Checking authentication state:", state.token);
  //   return !!state;
  // },
  // setIsAuthenticated: (value) => set({ value }),
  setIsAuthenticated: (AuthState) => {
    set({ isAuthenticated: AuthState });
  },
  // setIsAuthenticated: () => set({ isAuthenticated: true }),
  getDetails: () => {
    const state = get();
    console.log("Getting user details:", state);
    return state;
  },
  // setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  // checkAuthentication: () => {
  //   const state = useAuthStore.getState();
  //   return !!state.token && !!state.user;
  // },
  // updateAuth: (user, token) => set({ user, token, isAuthenticated: !!token }),
  // logout: () => set({ user: null, token: null, isAuthenticated: false }),
  // isLoggedIn: () => {
  //   const state = useAuthStore.getState();
  //   return !!state.token && !!state.user;
  // },
}));

export default useAuthStore;
