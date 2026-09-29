import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../../context/JobsContext';
import type { RunnerRequirement } from '../../types';

export default function HirerPostJob() {
  const navigate = useNavigate();
  const { addJob } = useJobs();

  const [title, setTitle] = useState('');
  const [payment, setPayment] = useState('');
  const [description, setDescription] = useState('');
  const [requirement, setRequirement] = useState<RunnerRequirement>('Main Campus');
  const [step, setStep] = useState(1);

  function submitJob() {
    if (!title.trim() || !payment.trim() || !description.trim()) return;
    addJob({
      title: title.trim(),
      payment: payment.trim(),
      description: description.trim(),
      requirement,
      status: 'open',
      proposals: 0,
    });
    navigate('/hirer/jobs');
  }

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="[font-family:var(--font-display)] text-3xl font-semibold text-[#00351b]">
        Post a gig
      </h1>
      <p className="mt-2 text-base text-[#5b6660]">Step {step} of 2</p>

      {step === 1 && (
        <div className="mt-8 flex flex-col gap-4">
          <div>
            <label htmlFor="title" className="mb-1 block text-sm font-medium text-[#122019]">
              Job title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Campus Brand Rep"
              className="w-full rounded-lg border border-[#dee6e1] px-4 py-2.5 text-sm outline-none focus:border-[#006633]"
            />
          </div>
          <div>
            <label htmlFor="payment" className="mb-1 block text-sm font-medium text-[#122019]">
              Payment (₦)
            </label>
            <input
              id="payment"
              type="text"
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              placeholder="e.g. 15000"
              className="w-full rounded-lg border border-[#dee6e1] px-4 py-2.5 text-sm outline-none focus:border-[#006633]"
            />
          </div>
          <div>
            <label htmlFor="requirement" className="mb-1 block text-sm font-medium text-[#122019]">
              Runner requirement
            </label>
            <select
              id="requirement"
              value={requirement}
              onChange={(e) => setRequirement(e.target.value as RunnerRequirement)}
              className="w-full rounded-lg border border-[#dee6e1] px-4 py-2.5 text-sm outline-none focus:border-[#006633]"
            >
              <option value="Main Campus">Main Campus</option>
              <option value="Town Campus">Town Campus</option>
              <option value="Annex Campus">Annex Campus</option>
              <option value="Someone close to me">Someone close to me</option>
            </select>
          </div>
          <button
            type="button"
            onClick={() => {
              if (title.trim() && payment.trim()) setStep(2);
            }}
            className="mt-2 rounded-lg bg-[#006633] px-5 py-3 text-sm font-semibold text-white hover:bg-[#00522a]"
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="mt-8 flex flex-col gap-4">
          <div>
            <label htmlFor="description" className="mb-1 block text-sm font-medium text-[#122019]">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell runners what the gig involves…"
              rows={5}
              className="w-full rounded-lg border border-[#dee6e1] px-4 py-2.5 text-sm outline-none focus:border-[#006633]"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="rounded-lg border border-[#dee6e1] px-5 py-3 text-sm font-semibold text-[#122019] hover:border-[#006633]"
            >
              Back
            </button>
            <button
              type="button"
              onClick={submitJob}
              className="rounded-lg bg-[#006633] px-5 py-3 text-sm font-semibold text-white hover:bg-[#00522a]"
            >
              Post gig
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
