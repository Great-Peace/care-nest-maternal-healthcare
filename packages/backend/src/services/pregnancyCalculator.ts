import { addDays, differenceInDays } from 'date-fns';

export interface PregnancyInfo {
  week: number;
  dueDate: string;
  trimester: string;
}

export class PregnancyCalculator {
  static calculateFromLMP(lmpDate: string): PregnancyInfo {
    if (!lmpDate) {
      return { week: 0, dueDate: '', trimester: '' };
    }

    const today = new Date();
    const lmp = new Date(lmpDate);
    const diffDays = differenceInDays(today, lmp);
    const week = Math.floor(diffDays / 7);

    // Calculate due date (280 days from LMP)
    const dueDateObj = addDays(lmp, 280);
    const dueDate = dueDateObj.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    // Determine trimester
    let trimester = '';
    if (week <= 13) {
      trimester = 'First Trimester';
    } else if (week <= 26) {
      trimester = 'Second Trimester';
    } else {
      trimester = 'Third Trimester';
    }

    return { week, dueDate, trimester };
  }

  static getDaysUntilDue(dueDate: string): number {
    const today = new Date();
    const due = new Date(dueDate);
    return differenceInDays(due, today);
  }

  static getWeeksRemaining(currentWeek: number): number {
    return Math.max(0, 40 - currentWeek);
  }
}
