import { APP_KEYS } from "@/constants/AppKeys";
import * as SecureStore from "expo-secure-store";
export const saveLoginData = async (token, user) => {
  if (!token || !user) {
    console.error("Token and user data must be provided");
    return;
  }

  try {
    await SecureStore.setItemAsync(APP_KEYS.TOKEN, token);
    await SecureStore.setItemAsync(APP_KEYS.USER, JSON.stringify(user));
    console.log("Login data saved successfully");
  } catch (error) {
    console.error("Error saving login data:", error);
  }
};

export const getLoginData = async () => {
  try {
    const token = await SecureStore.getItemAsync(APP_KEYS.TOKEN);
    const user = await SecureStore.getItemAsync(APP_KEYS.USER);
    return { token, user: user ? JSON.parse(user) : null };
  } catch (error) {
    console.error("Error retrieving login data:", error);
    return { token: null, user: null };
  }
};

export const removeLoginData = async () => {
  try {
    await SecureStore.deleteItemAsync(APP_KEYS.TOKEN);
    await SecureStore.deleteItemAsync(APP_KEYS);
    console.log("Login data cleared successfully");
  } catch (error) {
    console.error("Error clearing login data:", error);
  }
};

export const saveToken = async (token) => {
  if (!token) {
    console.error("Token must be provided");
    return;
  }

  try {
    await SecureStore.setItemAsync(APP_KEYS.TOKEN, token);
    console.log("Token saved successfully");
  } catch (error) {
    console.error("Error saving token:", error);
  }
};
export const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync(APP_KEYS.TOKEN);
    console.log("Retrieved token:", token);
    if (!token) {
      console.warn("No token found");
      return null;
    }
    return token;
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};
export const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(APP_KEYS.TOKEN);
    console.log("Token cleared successfully");
  } catch (error) {
    console.error("Error clearing token:", error);
  }
};
