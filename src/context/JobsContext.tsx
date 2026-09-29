import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Job } from '../types';
import { initialJobs } from '../data/initialJobs';

type JobsContextValue = {
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  addJob: (job: Omit<Job, 'id'>) => void;
};

const JobsContext = createContext<JobsContextValue | null>(null);

export function JobsProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);

  function addJob(job: Omit<Job, 'id'>) {
    setJobs((prev) => [{ ...job, id: String(Date.now()) }, ...prev]);
  }

  return (
    <JobsContext.Provider value={{ jobs, setJobs, addJob }}>
      {children}
    </JobsContext.Provider>
  );
}

export function useJobs() {
  const ctx = useContext(JobsContext);
  if (!ctx) {
    throw new Error('useJobs must be used within a <JobsProvider>');
  }
  return ctx;
}
