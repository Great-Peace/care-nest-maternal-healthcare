import api from './api';
import { UserData, AuthResponse } from '../types';

export const authService = {
  async register(userData: UserData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  async login(phoneNumber: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', { phoneNumber });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
