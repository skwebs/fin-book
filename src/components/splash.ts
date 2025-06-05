import { SplashScreen } from 'expo-router';
import useSessionStorage from './../states/SessionStorage';


export function SplashScreenController() {
    const { isLoading } = useSessionStorage();

    if (!isLoading) {
        SplashScreen.hideAsync();
    }

    return null;
}
