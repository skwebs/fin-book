// store/authStore.ts
import { secureStorage } from '@/src/storage/secureStorage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';


interface AuthState {
    isLoggedIn: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    user: { id: string; name: string; email?: string } | null;
    setAuth: (authData: {
        isLoggedIn: boolean;
        accessToken: string | null;
        refreshToken: string | null;
        user: { id: string; name: string; email?: string } | null;
    }) => void;
    clearAuth: () => void;
    _hasHydrated: boolean;
    setHasHydrated: (state: boolean) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isLoggedIn: false,
            accessToken: null,
            refreshToken: null,
            user: null,
            isLoading: false,
            setAuth: ({ accessToken, refreshToken, user }) =>
                set({ accessToken, refreshToken, user, isLoggedIn: true }),
            clearAuth: () => set({ isLoggedIn: false, accessToken: null, refreshToken: null, user: null }),
            _hasHydrated: false,
            setHasHydrated: (state) => set({ _hasHydrated: state }),
            setIsLoading: (isLoading) => set({ isLoading }),
        }),
        {
            name: 'auth-storage', // Unique key for SecureStore
            storage: createJSONStorage(() => secureStorage),
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            },
        }
    )
);