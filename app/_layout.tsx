
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import "../global.css";

export default function RootLayout() {
  // const { setIsAuthenticated, isAuthenticated } = useAuthStore();

  // const { setIsLoading } = useSessionStorage();
  // const [isReady, setIsReady] = React.useState(false);

  // useEffect(() => {
  //   async function checkAuth() {
  //     const token = await getToken();
  //     setIsReady(true);
  //     setIsLoading(false);
  //     setIsAuthenticated(!!token);
  //   }
  //   checkAuth();
  // }, [setIsAuthenticated])

  // useEffect(() => {
  //   if (isReady && isAuthenticated) {
  //     // Optionally, you can perform any additional actions when the user is authenticated
  //     console.log("User is authenticated");
  //   } else {
  //     // Optionally, you can perform any additional actions when the user is not authenticated
  //     console.log("User is not authenticated");
  //   }
  // }, [isAuthenticated, isReady])

  React.useEffect(() => console.log("RootLayout mounted"), []);

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
