
import { useAuthStore } from '@/src/store/authStore';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import "../global.css";

export default function RootLayout() {

  const { _hasHydrated, isLoading } = useAuthStore();

  React.useEffect(() => {
    if (_hasHydrated) {
      console.log("Auth store has hydrated .");
    } else {
      console.log("Auth store is has not hydrated yet.");
    }

    if (!isLoading) {
      console.log("Auth store is not loading.");
    } else {
      console.log("Auth store is loading.");
    }
  }, [_hasHydrated, isLoading]);

  return (
    <>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <Stack screenOptions={{ animation: 'slide_from_right' }}>
          <Stack.Screen name="(protected)" options={{ headerShown: false, animation: "none" }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false, animation: "none" }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </SafeAreaProvider>
    </>
  )
}
