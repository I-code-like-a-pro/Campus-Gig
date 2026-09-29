export type View = 'landing' | 'register' | 'runner' | 'hirer';

export type Campus = 'Main Campus' | 'Town Campus' | 'Annex Campus';

export type RunnerRequirement = 'Someone close to me' | Campus;

export type JobStatus = 'open' | 'hired' | 'draft';

export type Job = {
  id: string;
  title: string;
  payment: string;
  description: string;
  requirement: RunnerRequirement;
  status: JobStatus;
  proposals: number;
};
