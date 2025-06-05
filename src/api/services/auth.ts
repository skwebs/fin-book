import client from '@/src/api/client';
// import { AuthResponse } from '@/src/types/auth';
import { AuthResponse } from './../../types/auth';

interface LoginCredentials {
    email: string;
    password: string;
}

interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
}

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await client.post('/login', credentials);
    return response.data;
};

export const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await client.post('/register', credentials);
    return response.data;
};