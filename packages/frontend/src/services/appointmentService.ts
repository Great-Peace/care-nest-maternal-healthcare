import api from './api';
import { Appointment } from '../types';

export const appointmentService = {
  async createAppointment(appointmentData: Omit<Appointment, 'id'>): Promise<Appointment> {
    const response = await api.post<{ appointment: Appointment }>('/appointments', appointmentData);
    return response.data.appointment;
  },

  async getAppointments(): Promise<Appointment[]> {
    const response = await api.get<{ appointments: Appointment[] }>('/appointments');
    return response.data.appointments;
  },

  async getUpcomingAppointments(): Promise<Appointment[]> {
    const response = await api.get<{ appointments: Appointment[] }>('/appointments/upcoming');
    return response.data.appointments;
  },

  async updateAppointment(id: string, updates: Partial<Appointment>): Promise<Appointment> {
    const response = await api.put<{ appointment: Appointment }>(`/appointments/${id}`, updates);
    return response.data.appointment;
  },

  async deleteAppointment(id: string): Promise<void> {
    await api.delete(`/appointments/${id}`);
  },
};
