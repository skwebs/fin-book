// store/authStore.ts
import { secureStorage } from '@/src/storage/secureStorage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';


interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    user: { id: string; name: string; email?: string } | null;
    setAuth: (authData: {
        accessToken: string | null;
        refreshToken: string | null;
        user: { id: string; name: string; email?: string } | null;
    }) => void;
    clearAuth: () => void;
    _hasHydrated: boolean;
    setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            accessToken: null,
            refreshToken: null,
            user: null,
            setAuth: ({ accessToken, refreshToken, user }) =>
                set({ accessToken, refreshToken, user }),
            clearAuth: () => set({ accessToken: null, refreshToken: null, user: null }),
            _hasHydrated: false,
            setHasHydrated: (state) => set({ _hasHydrated: state }),
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