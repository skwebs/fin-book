import { APP_KEYS } from "@/constants/AppKeys";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

const useAuthSessionStore = create((set) => ({
  isAuthenticated: false,
  token: null,
  setToken: async (token) => {
    await SecureStore.setItemAsync(APP_KEYS.TOKEN, token);
  },

  loginSession: async (router, token, user) => {
    // saveLoginData(token, user); // Save token and user data to secure storage
    await SecureStore.setItemAsync(APP_KEYS.TOKEN, token); // Save token to secure storage
    // set({ isAuthenticated: true });
    set({
      isAuthenticated: true,
      token: token,
      // user: user,
    });
    // Save token and user data to secure storage
    router.replace("/"); // Redirect to home page after login
  },
  logoutSession: async (router) => {
    const res = await SecureStore.deleteItemAsync(APP_KEYS.TOKEN); // Clear token and user data from secure storage
    console.log("Secure storage cleared:", res);
    console.log("Logout successful, token cleared from secure storage");
    set({
      isAuthenticated: false,
      token: null,
      // user: null,
    });
    router.replace("/login");
  },
}));
export default useAuthSessionStore;
