import { Stack } from "expo-router";

export default function ProtectedLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                // animation: "fade",
            }}
        >
            <Stack.Screen name="index" />
            <Stack.Screen name="settings" />
            <Stack.Screen name="profile" />
            <Stack.Screen name="notifications" />
        </Stack>
    );
}
