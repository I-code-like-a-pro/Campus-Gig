import { useJobs } from '../../context/JobsContext';
import { Link } from 'react-router-dom';

export default function HirerDashboard() {
  const { jobs } = useJobs();

  const openJobs = jobs.filter((j) => j.status === 'open');
  const hiredJobs = jobs.filter((j) => j.status === 'hired');
  const totalProposals = jobs.reduce((sum, j) => sum + j.proposals, 0);

  return (
    <div>
      <h1 className="[font-family:var(--font-display)] text-3xl font-semibold text-[#00351b]">
        Dashboard
      </h1>
      <p className="mt-2 text-base text-[#5b6660]">Overview of your CampusGig activity.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-[#dee6e1] bg-white p-5">
          <p className="text-sm font-medium text-[#5b6660]">Open gigs</p>
          <p className="mt-1 [font-family:var(--font-display)] text-3xl font-semibold text-[#122019]">
            {openJobs.length}
          </p>
        </div>
        <div className="rounded-xl border border-[#dee6e1] bg-white p-5">
          <p className="text-sm font-medium text-[#5b6660]">Hired</p>
          <p className="mt-1 [font-family:var(--font-display)] text-3xl font-semibold text-[#122019]">
            {hiredJobs.length}
          </p>
        </div>
        <div className="rounded-xl border border-[#dee6e1] bg-white p-5">
          <p className="text-sm font-medium text-[#5b6660]">Total proposals</p>
          <p className="mt-1 [font-family:var(--font-display)] text-3xl font-semibold text-[#122019]">
            {totalProposals}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <Link
          to="/hirer/post"
          className="inline-block rounded-lg border-0 bg-[#006633] px-5 py-3 text-sm font-semibold text-white no-underline hover:bg-[#00522a]"
        >
          Post a new gig
        </Link>
      </div>
    </div>
  );
}
