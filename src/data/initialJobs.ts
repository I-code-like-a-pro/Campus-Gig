import type { Job } from '../types';

export const initialJobs: Job[] = [
  {
    id: '1',
    title: 'Campus Brand Rep',
    payment: '15000',
    description:
      'I want you to go pick up my flyers from the print shop and help hand them out at the faculty gate this Saturday.',
    requirement: 'Main Campus',
    status: 'open',
    proposals: 4,
  },
  {
    id: '2',
    title: 'Weekend Tutor',
    payment: '8000',
    description: 'Need help with first-year math revision for two hours on Sunday afternoon.',
    requirement: 'Town Campus',
    status: 'open',
    proposals: 2,
  },
  {
    id: '3',
    title: 'Package Pickup',
    payment: '3000',
    description: 'Pick up a small package from the gate and bring it to the hostel common room.',
    requirement: 'Someone close to me',
    status: 'hired',
    proposals: 6,
  },
];
