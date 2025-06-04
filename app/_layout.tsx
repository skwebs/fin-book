
import { getToken } from "@/store/AuthSecureStorage";
import useAuthStore from '@/ZustandAuthStore';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import "../global.css";

export default function RootLayout() {
  const { setIsAuthenticated } = useAuthStore();

  useEffect(() => {
    async function checkAuth() {
      const token = await getToken();
      setIsAuthenticated(!!token);
    }
    checkAuth();
  }, [setIsAuthenticated])

  return (
    <>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <Stack>
          <Stack.Screen name="(protected)" options={{ headerShown: false, animation: "none" }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false, animation: "none" }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </SafeAreaProvider>
    </>
  )
}
