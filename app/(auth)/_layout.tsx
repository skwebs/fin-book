
import useAuthStore from '@/ZustandAuthStore';
import { Redirect, Stack } from 'expo-router';
import React from 'react';
const AuthLayout = () => {
    const { isAuthenticated } = useAuthStore();
    // const router = useRouter(); // This is to ensure the router is initialized, if needed
    // useEffect(() => {
    //     if (isAuthenticated) {
    //         router.replace('/'); // Redirect to home if already authenticated
    //     }
    // }, [isAuthenticated, router]);

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
            <Stack.Screen name="register" options={{ headerShown: false, animation: "none" }} />
            <Stack.Screen name="+not-found" />
        </Stack>
    )
}

export default AuthLayout