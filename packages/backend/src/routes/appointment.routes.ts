import { Router } from 'express';
import { AppointmentController } from '../controllers/appointmentController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.post('/', authenticateToken, AppointmentController.createAppointment);
router.get('/', authenticateToken, AppointmentController.getAppointments);
router.get('/upcoming', authenticateToken, AppointmentController.getUpcomingAppointments);
router.put('/:id', authenticateToken, AppointmentController.updateAppointment);
router.delete('/:id', authenticateToken, AppointmentController.deleteAppointment);

export default router;
