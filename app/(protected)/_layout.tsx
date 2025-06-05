// import useAuthStore from '@/ZustandAuthStore';
import { useAuthStore } from "@/src/store/authStore";
import { Redirect, Stack } from "expo-router";
import React from "react";

export default function ProtectedLayout() {
    // const { isAuthenticated } = useAuthStore();
    const { accessToken } = useAuthStore();
    if (!accessToken) {
        return (
            <>
                <Redirect href="/login" />
            </>
        );
    }
    return (
        <>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>

        </>
    );
}
