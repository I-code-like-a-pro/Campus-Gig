import { useState } from 'react';
import type { Job, RunnerRequirement } from '../types';
import { initialJobs as seededJobs } from '../data/initialJobs';

export function useJobs(initial?: Job[]) {
  const [jobs, setJobs] = useState<Job[]>(initial ?? seededJobs);

  function addJob(job: Omit<Job, 'id'>) {
    setJobs((prev) => [{ ...job, id: String(Date.now()) }, ...prev]);
  }

  function editJob(id: string, patch: Partial<Omit<Job, 'id'>>) {
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, ...patch } : j)));
  }

  function closeJob(id: string) {
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, status: 'draft' } : j)));
  }

  function hireJob(id: string) {
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, status: 'hired' } : j)));
  }

  function incrementProposals(id: string) {
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, proposals: j.proposals + 1 } : j)));
  }

  return {
    jobs,
    setJobs,
    addJob,
    editJob,
    closeJob,
    hireJob,
    incrementProposals,
  } as const;
}

export type UseJobs = ReturnType<typeof useJobs>;
