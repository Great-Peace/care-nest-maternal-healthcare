import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import appointmentRoutes from './appointment.routes';
import resourceRoutes from './resource.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/health', resourceRoutes);

// Health check endpoint
router.get('/health-check', (req, res) => {
  res.json({ status: 'ok', message: 'CareNest API is running' });
});

export default router;
