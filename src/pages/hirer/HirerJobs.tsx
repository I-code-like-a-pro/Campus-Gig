import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useJobs } from '../../context/JobsContext';
import { formatPay } from '../../utils/formatPay';

export default function HirerJobs() {
  const { jobs } = useJobs();
  const [search, setSearch] = useState('');

  const filteredJobs = jobs.filter((job) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      job.title.toLowerCase().includes(q) ||
      job.description.toLowerCase().includes(q) ||
      job.requirement.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="[font-family:var(--font-display)] text-3xl font-semibold text-[#00351b]">
          Your jobs
        </h1>
        <Link
          to="/hirer/post"
          className="rounded-lg border-0 bg-[#006633] px-5 py-3 text-sm font-semibold text-white no-underline hover:bg-[#00522a]"
        >
          Post a gig
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search jobs…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mt-6 w-full rounded-lg border border-[#dee6e1] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#006633]"
      />

      <ul className="mt-6 flex flex-col gap-4">
        {filteredJobs.map((job) => (
          <li key={job.id} className="rounded-xl border border-[#dee6e1] bg-white p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Link
                  to={`/hirer/jobs/${job.id}`}
                  className="[font-family:var(--font-display)] text-xl font-semibold text-[#122019] no-underline hover:text-[#006633]"
                >
                  {job.title}
                </Link>
                <p className="mt-1 text-xs font-medium text-[#5b6660]">
                  {job.status.toUpperCase()} · {job.proposals} proposals
                </p>
              </div>
              <p className="shrink-0 [font-family:var(--font-display)] text-lg font-semibold text-[#006633]">
                {formatPay(job.payment)}
              </p>
            </div>
            <p className="mt-3 text-sm leading-6 text-[#5b6660]">{job.description}</p>
          </li>
        ))}
        {filteredJobs.length === 0 && (
          <p className="py-8 text-center text-sm text-[#5b6660]">No jobs found.</p>
        )}
      </ul>
    </div>
  );
}
