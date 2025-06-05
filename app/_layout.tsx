
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import "../global.css";

export default function RootLayout() {

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
