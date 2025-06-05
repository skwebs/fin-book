import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';

export const useAuth = () => {
    const [token, setToken] = useState<string | null>(null);

    const logout = async () => {
        await SecureStore.deleteItemAsync('auth_token');
        setToken(null);
    };

    return { token, setToken, logout };
};