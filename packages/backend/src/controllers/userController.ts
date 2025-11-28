import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { UserService } from '../services/userService';
import { PregnancyCalculator } from '../services/pregnancyCalculator';

export class UserController {
  static async getProfile(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const user = await UserService.getUserById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({ user });
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({ error: 'Failed to fetch profile' });
    }
  }

  static async updateProfile(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const updates = req.body;

      // Recalculate pregnancy info if LMP is updated
      if (updates.lastMenstrualPeriod) {
        const pregnancyInfo = PregnancyCalculator.calculateFromLMP(
          updates.lastMenstrualPeriod
        );
        updates.pregnancyWeek = pregnancyInfo.week;
        updates.dueDate = pregnancyInfo.dueDate;
        updates.trimester = pregnancyInfo.trimester;
      }

      const updatedUser = await UserService.updateUser(userId, updates);
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({
        message: 'Profile updated successfully',
        user: updatedUser,
      });
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({ error: 'Failed to update profile' });
    }
  }

  static async deleteProfile(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const deleted = await UserService.deleteUser(userId);
      if (!deleted) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({ message: 'Profile deleted successfully' });
    } catch (error) {
      console.error('Delete profile error:', error);
      res.status(500).json({ error: 'Failed to delete profile' });
    }
  }
}
