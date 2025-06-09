
// import useAuthStore from '@/ZustandAuthStore';
import { useAuthStore } from '@/src/store/authStore';
import { Redirect, Stack } from 'expo-router';
import React from 'react';
const AuthLayout = () => {
    // const { isAuthenticated } = useAuthStore();
    const { isLoggedIn } = useAuthStore();

    if (isLoggedIn) {
        return <Redirect href="/" />
    }

    return (
        <Stack>
            <Stack.Protected guard={!isLoggedIn}>
                <Stack.Screen name="login" options={{ headerShown: false, animation: "none" }} />
                <Stack.Screen name="register" options={{ headerShown: false, }} />
                <Stack.Screen name="+not-found" />
            </Stack.Protected>
        </Stack>
    )
}

export default AuthLayout