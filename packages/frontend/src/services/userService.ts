import api from './api';
import { UserData } from '../types';

export const userService = {
  async getProfile(): Promise<UserData> {
    const response = await api.get<{ user: UserData }>('/users/profile');
    return response.data.user;
  },

  async updateProfile(updates: Partial<UserData>): Promise<UserData> {
    const response = await api.put<{ user: UserData }>('/users/profile', updates);
    return response.data.user;
  },

  async deleteProfile(): Promise<void> {
    await api.delete('/users/profile');
  },
};
