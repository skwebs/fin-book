import { useAuthStore } from '@/src/store/authStore';
import { SplashScreen } from 'expo-router';



export function SplashScreenController() {
    const { _hasHydrated, isLoading } = useAuthStore();
    // const { isLoading } = useSessionStorage();

    if (!isLoading) {
        SplashScreen.hideAsync();
    }

    return null;
}
