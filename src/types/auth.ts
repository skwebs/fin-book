// export interface AuthResponse {
//     token: string;
//     user: {
//         id: number;
//         name: string;
//         email: string;
//     };
// }
// src/types/auth.ts
export interface AuthResponse {
    token?: string;
    user?: { id: string; email: string };
    error?: string;
}