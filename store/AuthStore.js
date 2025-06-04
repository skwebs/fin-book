import { APP_KEYS } from "@/constants/AppKeys";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

const useAuthStore = create((set) => ({
  // isAuthenticated: getLoginData().token !== null, // Check if token exists in secure storage
  isAuthenticated: false, // Default to false until token is checked
  token: null,
  loginState: async (router, token, user) => {
    // saveLoginData(token, user); // Save token and user data to secure storage
    SecureStore.setItemAsync(APP_KEYS.TOKEN, token); // Save token to secure storage
    // set({ isAuthenticated: true });
    set({
      isAuthenticated: true,
      token: token,
      // user: user,
    });
    // Save token and user data to secure storage
    router.replace("/"); // Redirect to home page after login
  },
  logoutState: async (router) => {
    await SecureStore.deleteItemAsync(APP_KEYS.TOKEN); // Clear token and user data from secure storage
    console.log("Logout successful, token cleared from secure storage");
    set({
      isAuthenticated: false,
      token: null,
      // user: null,
    });
    router.replace("/login");
  },
}));
export default useAuthStore;
