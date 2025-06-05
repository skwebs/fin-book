
import useAuthStore from '@/ZustandAuthStore';
import { Redirect, Stack } from 'expo-router';
import React from 'react';
const AuthLayout = () => {
    const { isAuthenticated } = useAuthStore();

    if (isAuthenticated) {
        return (
            <>
                <Redirect href="/" />
            </>
        );
    }
    return (
        <Stack>
            <Stack.Screen name="login" options={{ headerShown: false, animation: "none" }} />
            <Stack.Screen name="register" options={{ headerShown: false, }} />
            <Stack.Screen name="+not-found" />
        </Stack>
    )
}

export default AuthLayout