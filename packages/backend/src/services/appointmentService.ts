import { Appointment } from '../types';

// In-memory storage (replace with database in production)
const appointments: Map<string, Appointment> = new Map();

export class AppointmentService {
  static async createAppointment(appointmentData: Omit<Appointment, 'id'>): Promise<Appointment> {
    const id = `appt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const appointment: Appointment = {
      ...appointmentData,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    appointments.set(id, appointment);
    return appointment;
  }

  static async getAppointmentById(id: string): Promise<Appointment | null> {
    return appointments.get(id) || null;
  }

  static async getAppointmentsByUserId(userId: string): Promise<Appointment[]> {
    return Array.from(appointments.values()).filter(
      (appt) => appt.userId === userId
    );
  }

  static async updateAppointment(
    id: string,
    updates: Partial<Appointment>
  ): Promise<Appointment | null> {
    const appointment = appointments.get(id);
    if (!appointment) return null;

    const updatedAppointment: Appointment = {
      ...appointment,
      ...updates,
      id: appointment.id,
      updatedAt: new Date(),
    };

    appointments.set(id, updatedAppointment);
    return updatedAppointment;
  }

  static async deleteAppointment(id: string): Promise<boolean> {
    return appointments.delete(id);
  }

  static async getUpcomingAppointments(userId: string): Promise<Appointment[]> {
    const userAppointments = await this.getAppointmentsByUserId(userId);
    const now = new Date();

    return userAppointments
      .filter((appt) => {
        const apptDate = new Date(appt.date);
        return apptDate >= now && appt.status === 'upcoming';
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }
}
