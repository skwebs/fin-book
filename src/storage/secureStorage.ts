// // storage/secureStorage.ts
// import * as SecureStore from 'expo-secure-store';
// import { StateStorage } from 'zustand/middleware';

// export const secureStorage: StateStorage = {
//     getItem: async (name: string): Promise<string | null> => {
//         try {
//             return await SecureStore.getItemAsync(name);
//         } catch (error) {
//             console.error('Error retrieving from SecureStore:', error);
//             return null;
//         }
//     },
//     setItem: async (name: string, value: string): Promise<void> => {
//         try {
//             await SecureStore.setItemAsync(name, value);
//         } catch (error) {
//             console.error('Error saving to SecureStore:', error);
//         }
//     },
//     removeItem: async (name: string): Promise<void> => {
//         try {
//             await SecureStore.deleteItemAsync(name);
//         } catch (error) {
//             console.error('Error removing from SecureStore:', error);
//         }
//     },
// };


// storage/secureStorage.ts
import * as SecureStore from 'expo-secure-store';
import { StateStorage } from 'zustand/middleware';

export const secureStorage: StateStorage = {
    getItem: async (name: string): Promise<string | null> => {
        try {
            return await SecureStore.getItemAsync(name);
        } catch (error) {
            console.error('Error retrieving from SecureStore:', error);
            return null;
        }
    },
    setItem: async (name: string, value: string): Promise<void> => {
        try {
            await SecureStore.setItemAsync(name, value);
        } catch (error) {
            console.error('Error saving to SecureStore:', error);
        }
    },
    removeItem: async (name: string): Promise<void> => {
        try {
            await SecureStore.deleteItemAsync(name);
        } catch (error) {
            console.error('Error removing from SecureStore:', error);
        }
    },
};