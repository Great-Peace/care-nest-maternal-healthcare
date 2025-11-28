export interface PregnancyInfo {
  week: number;
  dueDate: string;
  trimester: string;
}

export const calculatePregnancyInfo = (lmpDate: string): PregnancyInfo => {
  if (!lmpDate) return { week: 0, dueDate: '', trimester: '' };

  const today = new Date();
  const lmp = new Date(lmpDate);
  const diffTime = Math.abs(today.getTime() - lmp.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const week = Math.floor(diffDays / 7);

  const dueDate = new Date(lmp);
  dueDate.setDate(dueDate.getDate() + 280);
  const due = dueDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  let trimester = '';
  if (week <= 13) trimester = 'First Trimester';
  else if (week <= 26) trimester = 'Second Trimester';
  else trimester = 'Third Trimester';

  return { week, dueDate: due, trimester };
};
