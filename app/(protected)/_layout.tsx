import useAuthStore from '@/ZustandAuthStore';
import { Redirect, Stack } from "expo-router";

export default function ProtectedLayout() {
    const { isAuthenticated } = useAuthStore();

    if (!isAuthenticated) {
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
