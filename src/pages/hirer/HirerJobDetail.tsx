import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useJobs } from '../../context/JobsContext';
import { formatPay } from '../../utils/formatPay';
import type { RunnerRequirement } from '../../types';

const sampleProposals = [
  {
    id: 'p1',
    name: 'Ada Okafor',
    campus: 'Main Campus',
    rate: '₦2,500/hr',
    cover: 'I am on Main Campus and can pick this up Saturday morning.',
  },
  {
    id: 'p2',
    name: 'Chidi Bassey',
    campus: 'Town Campus',
    rate: '₦2,000/hr',
    cover: 'Done similar flyer runs before. Free after 2pm.',
  },
  {
    id: 'p3',
    name: 'Fatima Yusuf',
    campus: 'Annex Campus',
    rate: '₦3,000/hr',
    cover: 'Close by and can start as soon as you confirm.',
  },
];

export default function HirerJobDetail() {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const { jobs, setJobs } = useJobs();

  const job = jobs.find((j) => j.id === jobId);

  const [editing, setEditing] = useState(false);
  const [editDraft, setEditDraft] = useState({
    title: '',
    payment: '',
    description: '',
    requirement: 'Main Campus' as RunnerRequirement,
  });
  const [hiredProposalId, setHiredProposalId] = useState<string | null>(null);

  if (!job) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg font-semibold text-[#122019]">Job not found</p>
        <button
          type="button"
          onClick={() => navigate('/hirer/jobs')}
          className="mt-4 rounded-lg bg-[#006633] px-5 py-3 text-sm font-semibold text-white hover:bg-[#00522a]"
        >
          Back to jobs
        </button>
      </div>
    );
  }

  function startEdit() {
    if (!job) return;
    setEditing(true);
    setEditDraft({
      title: job.title,
      payment: job.payment,
      description: job.description,
      requirement: job.requirement,
    });
  }

  function saveEdit() {
    if (!editDraft.title.trim() || !editDraft.description.trim() || !editDraft.payment.trim())
      return;

    setJobs((prev) =>
      prev.map((j) =>
        j.id === jobId
          ? {
              ...j,
              title: editDraft.title.trim(),
              payment: editDraft.payment.trim(),
              description: editDraft.description.trim(),
              requirement: editDraft.requirement,
            }
          : j
      )
    );
    setEditing(false);
  }

  function closeJob() {
    setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, status: 'draft' } : j)));
    navigate('/hirer/jobs');
  }

  function hireProposal(proposalId: string) {
    setHiredProposalId(proposalId);
    setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, status: 'hired' } : j)));
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => navigate('/hirer/jobs')}
        className="mb-6 text-sm font-semibold text-[#006633] hover:underline"
      >
        ← Back to jobs
      </button>

      {editing ? (
        <div className="rounded-xl border border-[#dee6e1] bg-white p-6">
          <h2 className="[font-family:var(--font-display)] text-2xl font-semibold text-[#00351b]">
            Edit job
          </h2>
          <div className="mt-4 flex flex-col gap-4">
            <input
              type="text"
              value={editDraft.title}
              onChange={(e) => setEditDraft((d) => ({ ...d, title: e.target.value }))}
              placeholder="Job title"
              className="rounded-lg border border-[#dee6e1] px-4 py-2.5 text-sm outline-none focus:border-[#006633]"
            />
            <input
              type="text"
              value={editDraft.payment}
              onChange={(e) => setEditDraft((d) => ({ ...d, payment: e.target.value }))}
              placeholder="Payment (e.g. 15000)"
              className="rounded-lg border border-[#dee6e1] px-4 py-2.5 text-sm outline-none focus:border-[#006633]"
            />
            <textarea
              value={editDraft.description}
              onChange={(e) => setEditDraft((d) => ({ ...d, description: e.target.value }))}
              placeholder="Description"
              rows={3}
              className="rounded-lg border border-[#dee6e1] px-4 py-2.5 text-sm outline-none focus:border-[#006633]"
            />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={saveEdit}
                className="rounded-lg bg-[#006633] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#00522a]"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="rounded-lg border border-[#dee6e1] px-5 py-2.5 text-sm font-semibold text-[#122019] hover:border-[#006633]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-[#dee6e1] bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="[font-family:var(--font-display)] text-2xl font-semibold text-[#122019]">
                {job.title}
              </h2>
              <p className="mt-1 text-xs font-medium text-[#5b6660]">
                {job.status.toUpperCase()} · {job.proposals} proposals · {job.requirement}
              </p>
            </div>
            <p className="shrink-0 [font-family:var(--font-display)] text-xl font-semibold text-[#006633]">
              {formatPay(job.payment)}
            </p>
          </div>
          <p className="mt-4 text-sm leading-6 text-[#5b6660]">{job.description}</p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={startEdit}
              className="rounded-lg border border-[#dee6e1] px-5 py-2.5 text-sm font-semibold text-[#122019] hover:border-[#006633]"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={closeJob}
              className="rounded-lg bg-[#c0392b] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#a52f22]"
            >
              Close job
            </button>
          </div>
        </div>
      )}

      {/* Proposals */}
      <h3 className="mt-8 [font-family:var(--font-display)] text-xl font-semibold text-[#00351b]">
        Proposals
      </h3>
      <ul className="mt-4 flex flex-col gap-3">
        {sampleProposals.map((p) => (
          <li key={p.id} className="rounded-xl border border-[#dee6e1] bg-white p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-[#122019]">{p.name}</p>
                <p className="text-xs text-[#5b6660]">
                  {p.campus} · {p.rate}
                </p>
              </div>
              {hiredProposalId === p.id ? (
                <span className="rounded-full bg-[#006633] px-3 py-1 text-xs font-semibold text-white">
                  Hired
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => hireProposal(p.id)}
                  disabled={!!hiredProposalId}
                  className="rounded-lg bg-[#006633] px-4 py-2 text-xs font-semibold text-white hover:bg-[#00522a] disabled:opacity-50"
                >
                  Hire
                </button>
              )}
            </div>
            <p className="mt-2 text-sm leading-6 text-[#5b6660]">{p.cover}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
