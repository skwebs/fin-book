
import { useAuthStore } from "@/src/store/authStore";
import { Redirect, Stack } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function ProtectedLayout() {
    const { _hasHydrated, isLoggedIn } = useAuthStore();




    if (!_hasHydrated) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-gray-500">Loading...</Text>
            </View>
        );
    }

    if (!isLoggedIn) {
        return <Redirect href="/login" />
    }


    return (
        <>
            <Stack>
                <Stack.Protected guard={isLoggedIn}>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                </Stack.Protected>
            </Stack>

        </>
    );
}
