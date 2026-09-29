import { useJobs } from '../../context/JobsContext';
import { formatPay } from '../../utils/formatPay';

export default function HirerReports() {
  const { jobs } = useJobs();

  const openJobs = jobs.filter((j) => j.status === 'open');
  const hiredJobs = jobs.filter((j) => j.status === 'hired');
  const draftJobs = jobs.filter((j) => j.status === 'draft');
  const totalSpend = jobs.reduce((sum, j) => {
    const cleaned = j.payment.replace(/[^\d]/g, '');
    return sum + (cleaned ? Number(cleaned) : 0);
  }, 0);

  return (
    <div>
      <h1 className="[font-family:var(--font-display)] text-3xl font-semibold text-[#00351b]">
        Reports
      </h1>
      <p className="mt-2 text-base text-[#5b6660]">Summary of your hiring activity.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-[#dee6e1] bg-white p-5">
          <p className="text-sm font-medium text-[#5b6660]">Total gigs</p>
          <p className="mt-1 [font-family:var(--font-display)] text-3xl font-semibold text-[#122019]">
            {jobs.length}
          </p>
        </div>
        <div className="rounded-xl border border-[#dee6e1] bg-white p-5">
          <p className="text-sm font-medium text-[#5b6660]">Open</p>
          <p className="mt-1 [font-family:var(--font-display)] text-3xl font-semibold text-[#006633]">
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
          <p className="text-sm font-medium text-[#5b6660]">Draft / Closed</p>
          <p className="mt-1 [font-family:var(--font-display)] text-3xl font-semibold text-[#122019]">
            {draftJobs.length}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-[#dee6e1] bg-white p-5">
        <p className="text-sm font-medium text-[#5b6660]">Total budget posted</p>
        <p className="mt-1 [font-family:var(--font-display)] text-3xl font-semibold text-[#122019]">
          {formatPay(String(totalSpend))}
        </p>
      </div>
    </div>
  );
}
