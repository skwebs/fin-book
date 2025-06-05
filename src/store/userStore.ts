// // store/userStore.ts
// import { create } from 'zustand';
// import { createJSONStorage, persist } from 'zustand/middleware';
// import { secureStorage } from '../storage/secureStorage';

// interface UserState {
//     user: { id: string; name: string } | null;
//     setUser: (user: { id: string; name: string } | null) => void;
// }

// export const useUserStore = create<UserState>()(
//     persist(
//         (set) => ({
//             user: null,
//             setUser: (user) => set({ user }),
//         }),
//         {
//             name: 'user-storage', // Unique key for the storage
//             storage: createJSONStorage(() => secureStorage),
//         }
//     )
// );

// store/userStore.ts
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { secureStorage } from '../storage/secureStorage';

interface UserState {
    user: { id: string; name: string } | null;
    setUser: (user: { id: string; name: string } | null) => void;
    _hasHydrated: boolean;
    setHasHydrated: (state: boolean) => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            _hasHydrated: false,
            setHasHydrated: (state) => set({ _hasHydrated: state }),
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => secureStorage),
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            },
        }
    )
);