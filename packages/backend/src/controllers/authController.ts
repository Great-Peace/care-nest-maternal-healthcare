import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserService } from '../services/userService';
import { PregnancyCalculator } from '../services/pregnancyCalculator';
import { config } from '../config';
import { UserData } from '../types';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const userData: UserData = req.body;

      // Check if user already exists
      const existingUser = await UserService.getUserByPhone(userData.phoneNumber);
      if (existingUser) {
        return res.status(400).json({ error: 'User with this phone number already exists' });
      }

      // Calculate pregnancy information
      if (userData.lastMenstrualPeriod) {
        const pregnancyInfo = PregnancyCalculator.calculateFromLMP(
          userData.lastMenstrualPeriod
        );
        userData.pregnancyWeek = pregnancyInfo.week;
        userData.dueDate = pregnancyInfo.dueDate;
        userData.trimester = pregnancyInfo.trimester;
      }

      // Create user
      const newUser = await UserService.createUser(userData);

      // Generate JWT token
      const token = jwt.sign(
        { id: newUser.id, phoneNumber: newUser.phoneNumber },
        config.jwtSecret,
        { expiresIn: '30d' }
      );

      res.status(201).json({
        message: 'Registration successful',
        token,
        user: newUser,
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Registration failed' });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { phoneNumber } = req.body;

      if (!phoneNumber) {
        return res.status(400).json({ error: 'Phone number is required' });
      }

      // Find user by phone number
      const user = await UserService.getUserByPhone(phoneNumber);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, phoneNumber: user.phoneNumber },
        config.jwtSecret,
        { expiresIn: '30d' }
      );

      res.json({
        message: 'Login successful',
        token,
        user,
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Login failed' });
    }
  }
}
