
import { useAuthStore } from "@/src/store/authStore";
import { Stack } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function ProtectedLayout() {
    const { accessToken, _hasHydrated } = useAuthStore();

    if (!_hasHydrated) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-gray-500">Loading...</Text>
            </View>
        );
    }

    return (
        <>
            <Stack>
                <Stack.Protected guard={!!accessToken || accessToken !== null}>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                </Stack.Protected>
            </Stack>

        </>
    );
}
