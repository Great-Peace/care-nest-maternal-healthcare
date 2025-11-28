import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { AppointmentService } from '../services/appointmentService';

export class AppointmentController {
  static async createAppointment(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const appointmentData = {
        ...req.body,
        userId,
        status: req.body.status || 'upcoming',
      };

      const appointment = await AppointmentService.createAppointment(appointmentData);

      res.status(201).json({
        message: 'Appointment created successfully',
        appointment,
      });
    } catch (error) {
      console.error('Create appointment error:', error);
      res.status(500).json({ error: 'Failed to create appointment' });
    }
  }

  static async getAppointments(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const appointments = await AppointmentService.getAppointmentsByUserId(userId);

      res.json({ appointments });
    } catch (error) {
      console.error('Get appointments error:', error);
      res.status(500).json({ error: 'Failed to fetch appointments' });
    }
  }

  static async getUpcomingAppointments(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const appointments = await AppointmentService.getUpcomingAppointments(userId);

      res.json({ appointments });
    } catch (error) {
      console.error('Get upcoming appointments error:', error);
      res.status(500).json({ error: 'Failed to fetch upcoming appointments' });
    }
  }

  static async updateAppointment(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      const { id } = req.params;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const appointment = await AppointmentService.getAppointmentById(id);
      if (!appointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }

      if (appointment.userId !== userId) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      const updatedAppointment = await AppointmentService.updateAppointment(id, req.body);

      res.json({
        message: 'Appointment updated successfully',
        appointment: updatedAppointment,
      });
    } catch (error) {
      console.error('Update appointment error:', error);
      res.status(500).json({ error: 'Failed to update appointment' });
    }
  }

  static async deleteAppointment(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      const { id } = req.params;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const appointment = await AppointmentService.getAppointmentById(id);
      if (!appointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }

      if (appointment.userId !== userId) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      await AppointmentService.deleteAppointment(id);

      res.json({ message: 'Appointment deleted successfully' });
    } catch (error) {
      console.error('Delete appointment error:', error);
      res.status(500).json({ error: 'Failed to delete appointment' });
    }
  }
}
