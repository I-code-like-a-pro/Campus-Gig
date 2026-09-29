import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../context/JobsContext';
import { formatPay } from '../utils/formatPay';

function DummyButton({
  children,
  className,
  variant = 'primary',
  onClick,
  type = 'button',
}: {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'dark';
  onClick?: () => void;
  type?: 'button' | 'submit';
}) {
  const styles = {
    primary: 'border-0 bg-[#006633] text-white hover:bg-[#00522a]',
    secondary: 'border border-[#dee6e1] bg-white text-[#122019] hover:border-[#006633]',
    danger: 'border-0 bg-[#c0392b] text-white hover:bg-[#a52f22]',
    dark: 'border-0 bg-[#00351b] text-white hover:bg-[#002814]',
  } as const;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-lg px-5 py-3 text-sm font-semibold ${styles[variant]} ${className ?? ''}`}
    >
      {children}
    </button>
  );
}

function BrandMark({ onClick }: { onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex items-center gap-3 text-left">
      <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#c0392b] bg-[#006633] [font-family:var(--font-display)] text-lg font-semibold text-white italic">
        C
      </span>
      <span className="[font-family:var(--font-display)] text-xl font-semibold text-[#00351b]">
        CampusGig
      </span>
    </button>
  );
}

export default function RunnerPage() {
  const navigate = useNavigate();
  const { jobs } = useJobs();

  return (
    <div className="min-h-screen bg-[#f7f8f6] text-[#122019]">
      <header className="border-b border-[#dee6e1] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <BrandMark onClick={() => navigate('/')} />
          <button
            type="button"
            className="ml-auto hidden h-10 w-10 items-center justify-center rounded-lg border border-[#dee6e1] bg-white text-lg font-semibold text-[#122019] sm:inline-flex"
            onClick={() => navigate('/')}
            aria-label="Go back"
            title="Go back"
          >
            ←
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-5 py-12 sm:px-8">
        <h1 className="[font-family:var(--font-display)] text-3xl font-semibold text-[#00351b]">
          Open jobs
        </h1>
        <p className="mt-2 text-base text-[#5b6660]">
          Pick a gig that fits your campus and schedule.
        </p>

        <ul className="mt-8 flex flex-col gap-4">
          {jobs.map((job) => (
            <li key={job.id} className="rounded-xl border border-[#dee6e1] bg-white p-5">
              <div className="flex items-start justify-between gap-4">
                <h2 className="[font-family:var(--font-display)] text-xl font-semibold text-[#122019]">
                  {job.title}
                </h2>
                <p className="shrink-0 [font-family:var(--font-display)] text-lg font-semibold text-[#006633]">
                  {formatPay(job.payment)}
                </p>
              </div>
              <p className="mt-3 text-sm leading-6 text-[#5b6660]">{job.description}</p>
              <p className="mt-3 text-sm">
                <span className="text-[#5b6660]">Requires: </span>
                <span className="font-semibold text-[#122019]">{job.requirement}</span>
              </p>
              <DummyButton className="mt-4">Apply</DummyButton>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
