import { Request, Response } from 'express';
import { HealthResource, HealthTip } from '../types';

// Sample health resources
const healthResources: HealthResource[] = [
  {
    id: '1',
    title: 'Nutrition in Second Trimester',
    category: 'Nutrition',
    content: 'Proper nutrition during the second trimester is crucial...',
    readTime: '5 min',
    language: 'english',
  },
  {
    id: '2',
    title: 'Safe Exercises for Pregnancy',
    category: 'Fitness',
    content: 'Exercise during pregnancy provides numerous benefits...',
    readTime: '7 min',
    language: 'english',
  },
  {
    id: '3',
    title: 'Understanding Baby Kicks',
    category: 'Development',
    content: 'Feeling your baby move is one of the most exciting parts...',
    readTime: '4 min',
    language: 'english',
  },
];

// Sample health tips
const healthTips: HealthTip[] = [
  {
    id: '1',
    title: 'Stay Hydrated',
    description: 'Drink at least 8-10 glasses of water daily for optimal health',
    category: 'Wellness',
    icon: 'heart',
    language: 'english',
  },
  {
    id: '2',
    title: 'Essential Prenatal Vitamins',
    description: 'Take folic acid, iron, calcium, and omega-3 supplements daily',
    category: 'Nutrition',
    icon: 'activity',
    language: 'english',
  },
  {
    id: '3',
    title: 'Importance of Early Prenatal Care',
    description: 'Start prenatal care early for the best pregnancy outcomes',
    category: 'Healthcare',
    icon: 'calendar',
    language: 'english',
  },
];

export class ResourceController {
  static async getHealthResources(req: Request, res: Response) {
    try {
      const { language } = req.query;

      let filteredResources = healthResources;
      if (language) {
        filteredResources = healthResources.filter(
          (resource) => resource.language === language
        );
      }

      res.json({ resources: filteredResources });
    } catch (error) {
      console.error('Get health resources error:', error);
      res.status(500).json({ error: 'Failed to fetch health resources' });
    }
  }

  static async getHealthTips(req: Request, res: Response) {
    try {
      const { language } = req.query;

      let filteredTips = healthTips;
      if (language) {
        filteredTips = healthTips.filter((tip) => tip.language === language);
      }

      res.json({ tips: filteredTips });
    } catch (error) {
      console.error('Get health tips error:', error);
      res.status(500).json({ error: 'Failed to fetch health tips' });
    }
  }

  static async getResourceById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const resource = healthResources.find((r) => r.id === id);

      if (!resource) {
        return res.status(404).json({ error: 'Resource not found' });
      }

      res.json({ resource });
    } catch (error) {
      console.error('Get resource error:', error);
      res.status(500).json({ error: 'Failed to fetch resource' });
    }
  }
}
