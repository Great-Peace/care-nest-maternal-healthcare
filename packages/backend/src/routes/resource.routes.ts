import { Router } from 'express';
import { ResourceController } from '../controllers/resourceController';

const router = Router();

router.get('/resources', ResourceController.getHealthResources);
router.get('/resources/:id', ResourceController.getResourceById);
router.get('/tips', ResourceController.getHealthTips);

export default router;
