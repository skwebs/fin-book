
// import useAuthStore from '@/ZustandAuthStore';
import { useAuthStore } from '@/src/store/authStore';
import { Stack } from 'expo-router';
import React from 'react';
const AuthLayout = () => {
    // const { isAuthenticated } = useAuthStore();
    const { accessToken } = useAuthStore();

    return (
        <Stack>
            <Stack.Protected guard={!accessToken || accessToken == null}>
                <Stack.Screen name="login" options={{ headerShown: false, animation: "none" }} />
                <Stack.Screen name="register" options={{ headerShown: false, }} />
                <Stack.Screen name="+not-found" />
            </Stack.Protected>
        </Stack>
    )
}

export default AuthLayout