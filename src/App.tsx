import { useState, type ReactNode, type Dispatch, type SetStateAction } from 'react';

type View = 'landing' | 'register' | 'runner' | 'hirer';

type Campus = 'Main Campus' | 'Town Campus' | 'Annex Campus';

type RunnerRequirement = 'Someone close to me' | Campus;

type Job = {
  id: string;
  title: string;
  payment: string;
  description: string;
  requirement: RunnerRequirement;
  status: 'open' | 'hired' | 'draft';
  proposals: number;
};

const CAMPUSES: Campus[] = ['Main Campus', 'Town Campus', 'Annex Campus'];

const REQUIREMENTS: RunnerRequirement[] = [
  'Someone close to me',
  'Main Campus',
  'Town Campus',
  'Annex Campus',
];

const initialJobs: Job[] = [
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

const navItems = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Jobs', href: '#jobs' },
  { label: 'For students', href: '#jobs' },
  { label: 'Pricing', href: '#pricing' },
];

const steps = [
  {
    number: '01',
    title: 'Create a profile',
    text: 'Add your campus, skills, and when you are free. Takes a couple of minutes.',
  },
  {
    number: '02',
    title: 'Find a gig',
    text: 'Browse listings from students and local businesses near your school.',
  },
  {
    number: '03',
    title: 'Get paid',
    text: 'Do the work, confirm completion, and receive payouts in naira.',
  },
];

const offers = [
  'Campus rep roles',
  'Event staffing',
  'Design & content',
  'Delivery & errands',
  'Tutoring',
  'Social media help',
];

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
  };

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

function formatPay(amount: string) {
  const n = Number(amount.replace(/[^\d]/g, ''));
  if (!n) return `₦${amount}`;
  return `₦${n.toLocaleString('en-NG')}`;
}

function RegisterPage({
  onBack,
  onHirer,
  onRunner,
}: {
  onBack: () => void;
  onHirer: () => void;
  onRunner: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#f7f8f6] text-[#122019]">
      <header className="border-b border-[#dee6e1] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <BrandMark onClick={onBack} />
          <DummyButton variant="secondary" className="px-4 py-2" onClick={onBack}>
            Back
          </DummyButton>
        </div>
      </header>

      <main className="mx-auto flex max-w-lg flex-col px-5 py-16 sm:px-8 sm:py-20">
        <h1 className="[font-family:var(--font-display)] text-3xl font-semibold text-[#00351b] sm:text-4xl">
          Create your account
        </h1>
        <p className="mt-3 text-base leading-7 text-[#5b6660]">
          How will you use CampusGig? Pick one to continue.
        </p>

        <div className="mt-10 flex flex-col gap-4">
          <button
            type="button"
            onClick={onHirer}
            className="rounded-xl border border-[#dee6e1] bg-white p-5 text-left hover:border-[#006633]"
          >
            <p className="[font-family:var(--font-display)] text-xl font-semibold text-[#122019]">
              Hirer
            </p>
            <p className="mt-2 text-sm leading-6 text-[#5b6660]">
              Post gigs on campus and hire students to get things done.
            </p>
          </button>

          <button
            type="button"
            onClick={onRunner}
            className="rounded-xl border border-[#dee6e1] bg-white p-5 text-left hover:border-[#006633]"
          >
            <p className="[font-family:var(--font-display)] text-xl font-semibold text-[#122019]">
              Runner
            </p>
            <p className="mt-2 text-sm leading-6 text-[#5b6660]">
              Browse open gigs, pick up work, and get paid in naira.
            </p>
          </button>
        </div>

        <p className="mt-8 text-sm text-[#5b6660]">
          Already have an account?{' '}
          <button type="button" className="font-semibold text-[#006633] underline">
            Log in
          </button>
        </p>
      </main>
    </div>
  );
}

function RunnerPage({ jobs, onBack }: { jobs: Job[]; onBack: () => void }) {
  return (
    <div className="min-h-screen bg-[#f7f8f6] text-[#122019]">
      <header className="border-b border-[#dee6e1] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <BrandMark onClick={onBack} />
          <button
            type="button"
            className="ml-auto hidden h-10 w-10 items-center justify-center rounded-lg border border-[#dee6e1] bg-white text-lg font-semibold text-[#122019] sm:inline-flex"
            onClick={onBack}
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

type HirerSection = 'dashboard' | 'jobs' | 'talent' | 'messages' | 'reports' | 'post' | 'detail';

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

const sampleTalent = [
  { name: 'Ifeanyi Eze', skill: 'Event staffing', campus: 'Main Campus' },
  { name: 'Blessing Okon', skill: 'Tutoring', campus: 'Town Campus' },
  { name: 'Sadiq Musa', skill: 'Errands & delivery', campus: 'Annex Campus' },
  { name: 'Ngozi Udo', skill: 'Content & design', campus: 'Main Campus' },
];

const sampleMessages = [
  {
    id: 'm1',
    name: 'Ada Okafor',
    topic: 'Campus Brand Rep',
    preview: 'I can pick up the flyers by 9am Saturday.',
    time: '2m ago',
    thread: [
      { sender: 'Ada', text: 'Hi, I can pick up the flyers by 9am Saturday.' },
      { sender: 'You', text: 'Perfect. Please confirm your campus location.' },
      { sender: 'Ada', text: 'Main Campus gate, I will be there.' },
    ],
  },
  {
    id: 'm2',
    name: 'Chidi Bassey',
    topic: 'Weekend Tutor',
    preview: 'I am available after 2pm on Sunday.',
    time: '1h ago',
    thread: [
      { sender: 'Chidi', text: 'I am available after 2pm on Sunday.' },
      { sender: 'You', text: 'Great. Please send a sample lesson plan.' },
    ],
  },
  {
    id: 'm3',
    name: 'Fatima Yusuf',
    topic: 'Package Pickup',
    preview: 'I can collect it right away.',
    time: 'Today',
    thread: [{ sender: 'Fatima', text: 'I can collect it right away.' }],
  },
];

function HirerPage({
  jobs,
  onBack,
  onPostJob,
  setJobs,
}: {
  jobs: Job[];
  onBack: () => void;
  onPostJob: (job: Omit<Job, 'id'>) => void;
  setJobs: Dispatch<SetStateAction<Job[]>>;
}) {
  const [section, setSection] = useState<HirerSection>('dashboard');
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [postStep, setPostStep] = useState(1);
  const [title, setTitle] = useState('');
  const [payment, setPayment] = useState('');
  const [description, setDescription] = useState('');
  const [requirement, setRequirement] = useState<RunnerRequirement>('Main Campus');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lastPostedTitle, setLastPostedTitle] = useState('');
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [selectedMessageId, setSelectedMessageId] = useState<string>('m1');
  const [invitedTalent, setInvitedTalent] = useState<Record<string, boolean>>({});
  const [hiredProposalIds, setHiredProposalIds] = useState<Record<string, string>>({});
  const [editDraft, setEditDraft] = useState({
    title: '',
    payment: '',
    description: '',
    requirement: 'Main Campus' as RunnerRequirement,
  });

  const openJobs = jobs.filter((j) => j.status === 'open');
  const hiredJobs = jobs.filter((j) => j.status === 'hired');
  const totalProposals = jobs.reduce((sum, j) => sum + j.proposals, 0);
  const selectedJob = jobs.find((j) => j.id === selectedJobId) ?? null;
  const selectedMessage =
    sampleMessages.find((message) => message.id === selectedMessageId) ?? null;

  const filteredJobs = jobs.filter((job) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      job.title.toLowerCase().includes(q) ||
      job.description.toLowerCase().includes(q) ||
      job.requirement.toLowerCase().includes(q)
    );
  });

  function openPost() {
    setPostStep(1);
    setTitle('');
    setPayment('');
    setDescription('');
    setRequirement('Main Campus');
    setSection('post');
    setSidebarOpen(false);
  }

  function openJob(id: string) {
    setSelectedJobId(id);
    setSection('detail');
    setSidebarOpen(false);
    setEditingJobId(null);
  }

  function openEditJob(job: Job) {
    setEditingJobId(job.id);
    setEditDraft({
      title: job.title,
      payment: job.payment,
      description: job.description,
      requirement: job.requirement,
    });
  }

  function saveEditedJob() {
    if (!selectedJobId || !editingJobId) return;
    if (!editDraft.title.trim() || !editDraft.description.trim() || !editDraft.payment.trim())
      return;

    setJobs((prev) =>
      prev.map((job) =>
        job.id === editingJobId
          ? {
              ...job,
              title: editDraft.title.trim(),
              payment: editDraft.payment.trim(),
              description: editDraft.description.trim(),
              requirement: editDraft.requirement,
            }
          : job
      )
    );
    setEditingJobId(null);
  }

  function goSection(next: HirerSection) {
    setSection(next);
    setSidebarOpen(false);
  }

  function submitJob() {
    if (!title.trim() || !payment.trim() || !description.trim()) return;
    onPostJob({
      title: title.trim(),
      payment: payment.trim(),
      description: description.trim(),
      requirement,
      status: 'open',
      proposals: 0,
    });
    setLastPostedTitle(title.trim());
    setSection('jobs');
    setPostStep(1);
  }

  function closeJob(jobId: string) {
    setJobs((prev) => prev.map((job) => (job.id === jobId ? { ...job, status: 'draft' } : job)));
    if (selectedJobId === jobId) {
      setSection('jobs');
    }
  }

  function hireProposal(jobId: string, proposalId: string) {
    setHiredProposalIds((prev) => ({ ...prev, [jobId]: proposalId }));
    setJobs((prev) => prev.map((job) => (job.id === jobId ? { ...job, status: 'hired' } : job)));
  }

  function inviteTalent(name: string) {
    setInvitedTalent((prev) => ({ ...prev, [name]: !prev[name] }));
  }

  const nav = [
    { id: 'dashboard' as const, label: 'Dashboard' },
    { id: 'jobs' as const, label: 'Jobs' },
    { id: 'talent' as const, label: 'Talent' },
    { id: 'messages' as const, label: 'Messages' },
    { id: 'reports' as const, label: 'Reports' },
  ];

  return (
    <div className="min-h-screen bg-[#f2f2f2] text-[#122019]">
      <header className="sticky top-0 z-40 border-b border-[#dee6e1] bg-white">
        <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#dee6e1] p-2 text-sm font-semibold lg:hidden"
            onClick={() => setSidebarOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={sidebarOpen}
          >
            <span className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-5 rounded-full bg-[#122019]" />
              <span className="block h-0.5 w-5 rounded-full bg-[#122019]" />
              <span className="block h-0.5 w-5 rounded-full bg-[#122019]" />
            </span>
          </button>
          <BrandMark onClick={onBack} />
          <div className="mx-2 hidden min-w-0 flex-1 md:block">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your jobs..."
              className="w-full max-w-md rounded-full border border-[#dee6e1] bg-[#f7f8f6] px-4 py-2 text-sm outline-none focus:border-[#006633]"
            />
          </div>
          <DummyButton className="ml-auto px-4 py-2" onClick={openPost}>
            Post a job
          </DummyButton>
          <button
            type="button"
            className="hidden h-10 w-10 items-center justify-center rounded-lg border border-[#dee6e1] bg-white text-xl font-semibold text-[#122019] sm:inline-flex"
            onClick={onBack}
            aria-label="Go back"
            title="Go back"
          >
            ←
          </button>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl">
        {sidebarOpen && (
          <button
            type="button"
            className="fixed inset-0 z-30 bg-black/30 lg:hidden"
            aria-label="Close menu"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={`fixed top-[57px] bottom-0 left-0 z-30 w-60 border-r border-[#dee6e1] bg-white p-4 transition-transform lg:sticky lg:top-[57px] lg:h-[calc(100vh-57px)] lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <p className="px-3 text-xs font-bold tracking-wide text-[#5b6660] uppercase">Hirer hub</p>
          <nav className="mt-3 flex flex-col gap-1">
            {nav.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goSection(item.id)}
                className={`rounded-lg px-3 py-2.5 text-left text-sm font-semibold ${
                  section === item.id || (item.id === 'jobs' && section === 'detail')
                    ? 'bg-[#e6f2ec] text-[#006633]'
                    : 'text-[#122019] hover:bg-[#f7f8f6]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <DummyButton className="mt-6 w-full" onClick={openPost}>
            Post a job
          </DummyButton>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {section === 'dashboard' && (
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="[font-family:var(--font-display)] text-3xl font-semibold text-[#00351b]">
                  Welcome back
                </h1>
                <p className="mt-1 text-sm text-[#5b6660]">
                  Manage postings, review proposals, and hire runners on campus.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { label: 'Active jobs', value: String(openJobs.length) },
                  { label: 'Proposals', value: String(totalProposals) },
                  { label: 'Hired', value: String(hiredJobs.length) },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-[#dee6e1] bg-white p-5">
                    <p className="text-sm text-[#5b6660]">{stat.label}</p>
                    <p className="mt-2 [font-family:var(--font-display)] text-3xl font-semibold text-[#122019]">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              <section className="rounded-xl border border-[#dee6e1] bg-white">
                <div className="flex items-center justify-between border-b border-[#dee6e1] px-5 py-4">
                  <h2 className="text-lg font-semibold">Your jobs</h2>
                  <button
                    type="button"
                    className="text-sm font-semibold text-[#006633]"
                    onClick={() => goSection('jobs')}
                  >
                    View all
                  </button>
                </div>
                <ul>
                  {jobs.slice(0, 3).map((job) => (
                    <li key={job.id} className="border-b border-[#dee6e1] last:border-b-0">
                      <button
                        type="button"
                        onClick={() => openJob(job.id)}
                        className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left hover:bg-[#f7f8f6]"
                      >
                        <div>
                          <p className="font-semibold text-[#122019]">{job.title}</p>
                          <p className="mt-1 text-sm text-[#5b6660]">
                            {job.requirement} · {job.proposals} proposals · {job.status}
                          </p>
                        </div>
                        <p className="shrink-0 font-semibold text-[#006633]">
                          {formatPay(job.payment)}
                        </p>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-xl border border-[#dee6e1] bg-white p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Suggested talent</h2>
                  <button
                    type="button"
                    className="text-sm font-semibold text-[#006633]"
                    onClick={() => goSection('talent')}
                  >
                    Browse talent
                  </button>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {sampleTalent.slice(0, 4).map((person) => (
                    <div
                      key={person.name}
                      className="flex items-center justify-between rounded-lg border border-[#dee6e1] p-4"
                    >
                      <div>
                        <p className="font-semibold">{person.name}</p>
                        <p className="text-sm text-[#5b6660]">
                          {person.skill} · {person.campus}
                        </p>
                      </div>
                      <DummyButton
                        variant={invitedTalent[person.name] ? 'secondary' : 'primary'}
                        className="px-3 py-2"
                        onClick={() => inviteTalent(person.name)}
                      >
                        {invitedTalent[person.name] ? 'Invited' : 'Invite'}
                      </DummyButton>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {section === 'jobs' && (
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h1 className="[font-family:var(--font-display)] text-3xl font-semibold text-[#00351b]">
                    Jobs
                  </h1>
                  <p className="mt-1 text-sm text-[#5b6660]">
                    All jobs you have posted on CampusGig.
                  </p>
                </div>
                <DummyButton onClick={openPost}>Post a job</DummyButton>
              </div>

              {lastPostedTitle && (
                <div className="rounded-xl border border-[#cfe3d8] bg-[#edf9f1] px-4 py-3 text-sm text-[#00351b]">
                  Job posted: <span className="font-semibold">{lastPostedTitle}</span>
                </div>
              )}

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter by title, description, or campus..."
                className="w-full rounded-lg border border-[#dee6e1] bg-white px-4 py-3 text-sm outline-none focus:border-[#006633] md:hidden"
              />

              <ul className="flex flex-col gap-3">
                {filteredJobs.map((job) => (
                  <li key={job.id}>
                    <button
                      type="button"
                      onClick={() => openJob(job.id)}
                      className="w-full rounded-xl border border-[#dee6e1] bg-white p-5 text-left hover:border-[#006633]"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-lg font-semibold">{job.title}</p>
                          <p className="mt-1 line-clamp-2 text-sm text-[#5b6660]">
                            {job.description}
                          </p>
                          <p className="mt-2 text-sm text-[#5b6660]">
                            Requires {job.requirement} · {job.proposals} proposals
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-[#006633]">{formatPay(job.payment)}</p>
                          <p className="mt-1 text-xs font-bold tracking-wide text-[#5b6660] uppercase">
                            {job.status}
                          </p>
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
                {filteredJobs.length === 0 && (
                  <li className="rounded-xl border border-dashed border-[#dee6e1] bg-white p-8 text-center text-sm text-[#5b6660]">
                    No jobs match your search.
                  </li>
                )}
              </ul>
            </div>
          )}

          {section === 'detail' && selectedJob && (
            <div className="flex flex-col gap-5">
              <button
                type="button"
                className="w-fit text-sm font-semibold text-[#006633]"
                onClick={() => goSection('jobs')}
              >
                ← Back to jobs
              </button>

              <div className="rounded-xl border border-[#dee6e1] bg-white p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold tracking-wide text-[#5b6660] uppercase">
                      {selectedJob.status}
                    </p>
                    <h1 className="mt-1 [font-family:var(--font-display)] text-3xl font-semibold text-[#00351b]">
                      {selectedJob.title}
                    </h1>
                    <p className="mt-2 text-sm text-[#5b6660]">
                      Requires {selectedJob.requirement}
                    </p>
                  </div>
                  <p className="[font-family:var(--font-display)] text-2xl font-semibold text-[#006633]">
                    {formatPay(selectedJob.payment)}
                  </p>
                </div>
                <p className="mt-4 text-base leading-7 text-[#122019]">{selectedJob.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <DummyButton onClick={() => openEditJob(selectedJob)}>Edit job</DummyButton>
                  <DummyButton variant="secondary" onClick={() => closeJob(selectedJob.id)}>
                    Close job
                  </DummyButton>
                </div>
              </div>

              {editingJobId === selectedJob.id && (
                <div className="rounded-xl border border-[#dee6e1] bg-white p-6">
                  <h2 className="text-lg font-semibold">Edit job</h2>
                  <div className="mt-4 flex flex-col gap-4">
                    <label className="flex flex-col gap-2 text-sm font-semibold">
                      Title
                      <input
                        value={editDraft.title}
                        onChange={(e) =>
                          setEditDraft((prev) => ({ ...prev, title: e.target.value }))
                        }
                        className="rounded-lg border border-[#dee6e1] px-4 py-3 text-sm font-normal outline-none focus:border-[#006633]"
                      />
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-semibold">
                      Payment amount (₦)
                      <input
                        value={editDraft.payment}
                        onChange={(e) =>
                          setEditDraft((prev) => ({ ...prev, payment: e.target.value }))
                        }
                        className="rounded-lg border border-[#dee6e1] px-4 py-3 text-sm font-normal outline-none focus:border-[#006633]"
                      />
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-semibold">
                      Description
                      <textarea
                        value={editDraft.description}
                        onChange={(e) =>
                          setEditDraft((prev) => ({ ...prev, description: e.target.value }))
                        }
                        rows={5}
                        className="resize-y rounded-lg border border-[#dee6e1] px-4 py-3 text-sm font-normal outline-none focus:border-[#006633]"
                      />
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-semibold">
                      Requirement
                      <select
                        value={editDraft.requirement}
                        onChange={(e) =>
                          setEditDraft((prev) => ({
                            ...prev,
                            requirement: e.target.value as RunnerRequirement,
                          }))
                        }
                        className="rounded-lg border border-[#dee6e1] px-4 py-3 text-sm font-normal outline-none focus:border-[#006633]"
                      >
                        {REQUIREMENTS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </label>
                    <div className="flex gap-2">
                      <DummyButton onClick={saveEditedJob}>Save changes</DummyButton>
                      <DummyButton variant="secondary" onClick={() => setEditingJobId(null)}>
                        Cancel
                      </DummyButton>
                    </div>
                  </div>
                </div>
              )}

              <section className="rounded-xl border border-[#dee6e1] bg-white">
                <div className="border-b border-[#dee6e1] px-5 py-4">
                  <h2 className="text-lg font-semibold">
                    Proposals ({selectedJob.proposals || sampleProposals.length})
                  </h2>
                </div>
                <ul>
                  {sampleProposals.map((proposal) => {
                    const isHired = hiredProposalIds[selectedJob.id] === proposal.id;
                    return (
                      <li
                        key={proposal.id}
                        className="flex flex-col gap-3 border-b border-[#dee6e1] px-5 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div>
                          <p className="font-semibold">{proposal.name}</p>
                          <p className="text-sm text-[#5b6660]">
                            {proposal.campus} · {proposal.rate}
                          </p>
                          <p className="mt-1 text-sm text-[#122019]">{proposal.cover}</p>
                        </div>
                        <div className="flex gap-2">
                          <DummyButton variant="secondary" className="px-3 py-2">
                            Message
                          </DummyButton>
                          <DummyButton
                            className="px-3 py-2"
                            variant={isHired ? 'secondary' : 'primary'}
                            onClick={() => hireProposal(selectedJob.id, proposal.id)}
                          >
                            {isHired ? 'Hired' : 'Hire'}
                          </DummyButton>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            </div>
          )}

          {section === 'post' && (
            <div className="mx-auto max-w-2xl">
              <h1 className="[font-family:var(--font-display)] text-3xl font-semibold text-[#00351b]">
                Post a job
              </h1>
              <p className="mt-1 text-sm text-[#5b6660]">Step {postStep} of 4</p>

              <div className="mt-4 flex gap-2">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`h-1.5 flex-1 rounded-full ${
                      step <= postStep ? 'bg-[#006633]' : 'bg-[#dee6e1]'
                    }`}
                  />
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-[#dee6e1] bg-white p-6">
                {postStep === 1 && (
                  <div className="flex flex-col gap-4">
                    <h2 className="text-lg font-semibold">Job details</h2>
                    <label className="flex flex-col gap-2 text-sm font-semibold">
                      Title
                      <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Campus Brand Rep"
                        className="rounded-lg border border-[#dee6e1] px-4 py-3 text-sm font-normal outline-none focus:border-[#006633]"
                      />
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-semibold">
                      Description
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="I want you to go pick up my..."
                        rows={5}
                        className="resize-y rounded-lg border border-[#dee6e1] px-4 py-3 text-sm font-normal outline-none focus:border-[#006633]"
                      />
                    </label>
                  </div>
                )}

                {postStep === 2 && (
                  <div className="flex flex-col gap-4">
                    <h2 className="text-lg font-semibold">Runner requirements</h2>
                    <p className="text-sm text-[#5b6660]">
                      Who should take this gig? Someone nearby, or on a specific campus.
                    </p>
                    <label className="flex flex-col gap-2 text-sm font-semibold">
                      Requirement
                      <select
                        value={requirement}
                        onChange={(e) => setRequirement(e.target.value as RunnerRequirement)}
                        className="rounded-lg border border-[#dee6e1] px-4 py-3 text-sm font-normal outline-none focus:border-[#006633]"
                      >
                        {REQUIREMENTS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </label>
                    <p className="text-xs text-[#5b6660]">Campuses: {CAMPUSES.join(', ')}.</p>
                  </div>
                )}

                {postStep === 3 && (
                  <div className="flex flex-col gap-4">
                    <h2 className="text-lg font-semibold">Budget</h2>
                    <label className="flex flex-col gap-2 text-sm font-semibold">
                      Payment amount (₦)
                      <input
                        value={payment}
                        onChange={(e) => setPayment(e.target.value)}
                        placeholder="e.g. 15000"
                        inputMode="numeric"
                        className="rounded-lg border border-[#dee6e1] px-4 py-3 text-sm font-normal outline-none focus:border-[#006633]"
                      />
                    </label>
                  </div>
                )}

                {postStep === 4 && (
                  <div className="flex flex-col gap-3">
                    <h2 className="text-lg font-semibold">Review & post</h2>
                    <div className="rounded-lg border border-[#dee6e1] bg-[#f7f8f6] p-4 text-sm">
                      <p className="text-base font-semibold">{title || 'Untitled job'}</p>
                      <p className="mt-2 text-[#5b6660]">{description || 'No description yet.'}</p>
                      <p className="mt-3">
                        <span className="text-[#5b6660]">Requires: </span>
                        <span className="font-semibold">{requirement}</span>
                      </p>
                      <p className="mt-1">
                        <span className="text-[#5b6660]">Pay: </span>
                        <span className="font-semibold text-[#006633]">
                          {payment ? formatPay(payment) : '—'}
                        </span>
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-6 flex flex-wrap justify-between gap-3">
                  <DummyButton
                    variant="secondary"
                    onClick={() => {
                      if (postStep === 1) goSection('dashboard');
                      else setPostStep((s) => s - 1);
                    }}
                  >
                    {postStep === 1 ? 'Cancel' : 'Back'}
                  </DummyButton>
                  {postStep < 4 ? (
                    <DummyButton
                      onClick={() => {
                        if (postStep === 1 && (!title.trim() || !description.trim())) return;
                        if (postStep === 3 && !payment.trim()) return;
                        setPostStep((s) => s + 1);
                      }}
                    >
                      Next
                    </DummyButton>
                  ) : (
                    <DummyButton onClick={submitJob}>Post job</DummyButton>
                  )}
                </div>
              </div>
            </div>
          )}

          {section === 'talent' && (
            <div className="flex flex-col gap-5">
              <div>
                <h1 className="[font-family:var(--font-display)] text-3xl font-semibold text-[#00351b]">
                  Talent
                </h1>
                <p className="mt-1 text-sm text-[#5b6660]">
                  Suggested runners across Main, Town, and Annex campuses.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {sampleTalent.map((person) => (
                  <div
                    key={person.name}
                    className="rounded-xl border border-[#dee6e1] bg-white p-5"
                  >
                    <p className="text-lg font-semibold">{person.name}</p>
                    <p className="mt-1 text-sm text-[#5b6660]">
                      {person.skill} · {person.campus}
                    </p>
                    <div className="mt-4 flex gap-2">
                      <DummyButton
                        className="px-3 py-2"
                        variant={invitedTalent[person.name] ? 'secondary' : 'primary'}
                        onClick={() => inviteTalent(person.name)}
                      >
                        {invitedTalent[person.name] ? 'Invited' : 'Invite'}
                      </DummyButton>
                      <DummyButton variant="secondary" className="px-3 py-2">
                        Save
                      </DummyButton>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {section === 'messages' && (
            <div className="flex flex-col gap-5">
              <h1 className="[font-family:var(--font-display)] text-3xl font-semibold text-[#00351b]">
                Messages
              </h1>

              <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
                <div className="rounded-xl border border-[#dee6e1] bg-white">
                  <div className="border-b border-[#dee6e1] px-4 py-3">
                    <h2 className="font-semibold">Inbox</h2>
                  </div>
                  <div className="flex flex-col">
                    {sampleMessages.map((message) => (
                      <button
                        key={message.id}
                        type="button"
                        onClick={() => setSelectedMessageId(message.id)}
                        className={`border-b border-[#dee6e1] px-4 py-3 text-left last:border-b-0 ${
                          selectedMessageId === message.id ? 'bg-[#e6f2ec]' : 'bg-white'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-semibold text-[#122019]">{message.name}</p>
                            <p className="text-xs text-[#5b6660]">{message.topic}</p>
                          </div>
                          <span className="text-[11px] text-[#5b6660]">{message.time}</span>
                        </div>
                        <p className="mt-2 text-sm text-[#5b6660]">{message.preview}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-[#dee6e1] bg-white p-5">
                  {selectedMessage ? (
                    <>
                      <div className="flex items-center justify-between gap-3 border-b border-[#dee6e1] pb-4">
                        <div>
                          <p className="font-semibold text-[#122019]">{selectedMessage.name}</p>
                          <p className="text-sm text-[#5b6660]">{selectedMessage.topic}</p>
                        </div>
                        <DummyButton variant="secondary" className="px-3 py-2">
                          Reply
                        </DummyButton>
                      </div>

                      <div className="mt-4 space-y-3">
                        {selectedMessage.thread.map((item, index) => (
                          <div
                            key={`${selectedMessage.id}-${index}`}
                            className={`max-w-md rounded-xl px-3 py-2 text-sm ${
                              item.sender === 'You'
                                ? 'ml-auto bg-[#e6f2ec] text-[#00351b]'
                                : 'bg-[#f7f8f6] text-[#122019]'
                            }`}
                          >
                            <p className="text-[11px] font-semibold tracking-wide text-[#5b6660] uppercase">
                              {item.sender}
                            </p>
                            <p className="mt-1">{item.text}</p>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="flex h-full min-h-[240px] items-center justify-center text-center text-sm text-[#5b6660]">
                      Select a conversation.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {section === 'reports' && (
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between gap-3">
                <h1 className="[font-family:var(--font-display)] text-3xl font-semibold text-[#00351b]">
                  Reports
                </h1>
                <DummyButton variant="secondary" className="px-3 py-2">
                  Export report
                </DummyButton>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { label: 'Spend this month', value: '₦26,000' },
                  { label: 'Jobs posted', value: String(jobs.length) },
                  { label: 'Hire rate', value: '33%' },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-[#dee6e1] bg-white p-5">
                    <p className="text-sm text-[#5b6660]">{item.label}</p>
                    <p className="mt-2 [font-family:var(--font-display)] text-2xl font-semibold">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-[#dee6e1] bg-white p-6 text-sm text-[#5b6660]">
                <div className="mb-4 flex items-center justify-between">
                  <p className="font-semibold text-[#122019]">Recent activity</p>
                  <span className="text-xs tracking-wide text-[#5b6660] uppercase">This month</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex justify-between gap-3 border-b border-[#dee6e1] pb-2">
                    <span>Campus Brand Rep</span>
                    <span className="font-semibold text-[#006633]">₦15,000</span>
                  </li>
                  <li className="flex justify-between gap-3 border-b border-[#dee6e1] pb-2">
                    <span>Weekend Tutor</span>
                    <span className="font-semibold text-[#006633]">₦8,000</span>
                  </li>
                  <li className="flex justify-between gap-3">
                    <span>Package Pickup</span>
                    <span className="font-semibold text-[#006633]">₦3,000</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function LandingPage({ onRegister }: { onRegister: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f8f6] text-[#122019]">
      <header className="sticky top-0 z-50 border-b border-[#dee6e1] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <BrandMark />

          <nav className="hidden items-center gap-8 text-sm font-medium text-[#5b6660] md:flex">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="no-underline hover:text-[#122019]">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <DummyButton variant="secondary" className="px-3 py-2 sm:px-4">
              Log in
            </DummyButton>
            <DummyButton className="px-3 py-2 sm:px-4" onClick={onRegister}>
              Register
            </DummyButton>
            <button
              type="button"
              className="inline-flex rounded-lg border border-[#dee6e1] px-3 py-2 text-sm font-semibold md:hidden"
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-[#dee6e1] bg-white px-5 py-4 md:hidden">
            <nav className="flex flex-col gap-3 text-sm font-medium">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="py-1 text-[#122019] no-underline"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main>
        <section className="px-5 pt-14 pb-16 sm:px-8 sm:pt-20 sm:pb-24">
          <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="[font-family:var(--font-display)] text-5xl leading-[1.05] font-semibold tracking-tight text-[#00351b] sm:text-6xl">
                CampusGig
              </p>
              <h1 className="mt-4 max-w-md text-2xl leading-snug font-semibold text-[#122019] sm:text-3xl">
                Short jobs on your campus — posted by students and local businesses.
              </h1>
              <p className="mt-5 max-w-md text-base leading-7 text-[#5b6660]">
                Find event staffing, tutoring, errands, and campus rep work near you. Get paid in
                naira.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <DummyButton variant="danger">Browse jobs</DummyButton>
                <a
                  href="#how-it-works"
                  className="inline-flex rounded-lg border border-[#dee6e1] bg-white px-5 py-3 text-sm font-semibold text-[#122019] no-underline hover:border-[#006633]"
                >
                  How it works
                </a>
              </div>

              <p className="mt-6 text-sm text-[#5b6660]">
                Starting with Main Campus and nearby campuses.
              </p>
            </div>

            <div className="noticeboard">
              <div className="pin-ticket">
                <span className="pin" aria-hidden="true" />
                <article className="ticket border border-[#dee6e1] bg-white p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold tracking-wide text-[#5b6660]">OPEN GIG</p>
                      <h2 className="mt-1 [font-family:var(--font-display)] text-xl font-semibold text-[#122019] sm:text-2xl">
                        Campus Brand Rep
                      </h2>
                    </div>
                    <p className="[font-family:var(--font-display)] text-lg font-semibold whitespace-nowrap text-[#006633]">
                      ₦15,000
                    </p>
                  </div>

                  <div className="stub-line" />

                  <div className="text-sm">
                    <div className="flex justify-between gap-4">
                      <span className="text-[#5b6660]">Campus</span>
                      <span className="font-semibold text-[#122019]">Main Campus</span>
                    </div>
                    <p className="mt-3 leading-6 text-[#5b6660]">
                      I want you to go pick up my flyers from the print shop and help hand them out
                      at the faculty gate this Saturday…{' '}
                      <button type="button" className="font-semibold text-[#006633] underline">
                        read more
                      </button>
                    </p>
                  </div>

                  <DummyButton className="mt-5 w-full">View this gig</DummyButton>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="scroll-mt-24 border-t border-[#dee6e1] bg-white px-5 py-16 sm:px-8 sm:py-20"
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="[font-family:var(--font-display)] text-3xl font-semibold text-[#00351b] sm:text-4xl">
              How it works
            </h2>
            <p className="mt-3 max-w-lg text-base text-[#5b6660]">
              Three steps. No fancy matching scores — just real gigs near your school.
            </p>

            <ol className="mt-12 grid gap-10 sm:grid-cols-3">
              {steps.map((step) => (
                <li key={step.number} className="border-t-2 border-[#006633] pt-5">
                  <p className="[font-family:var(--font-display)] text-sm font-semibold text-[#006633]">
                    {step.number}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-[#122019]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5b6660]">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          id="jobs"
          className="scroll-mt-24 border-t border-[#dee6e1] px-5 py-16 sm:px-8 sm:py-20"
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="[font-family:var(--font-display)] text-3xl font-semibold text-[#00351b] sm:text-4xl">
              What you can do
            </h2>
            <p className="mt-3 max-w-lg text-base text-[#5b6660]">
              Common gigs students already take on around campus.
            </p>

            <ul className="mt-10 grid gap-0 border-t border-[#dee6e1] sm:grid-cols-2">
              {offers.map((offer) => (
                <li
                  key={offer}
                  className="border-b border-[#dee6e1] px-0 py-4 text-base font-medium text-[#122019] sm:px-1"
                >
                  {offer}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="pricing"
          className="scroll-mt-24 border-t border-[#dee6e1] bg-white px-5 py-16 sm:px-8 sm:py-20"
        >
          <div className="mx-auto max-w-6xl">
            <div className="rounded-xl bg-[#00351b] px-6 py-10 text-white sm:px-10 sm:py-12">
              <h2 className="[font-family:var(--font-display)] text-3xl font-semibold sm:text-4xl">
                Free to start
              </h2>
              <p className="mt-2 [font-family:var(--font-display)] text-5xl font-semibold">
                ₦0<span className="text-xl font-medium text-[#bfe0cf]"> / month</span>
              </p>
              <p className="mt-4 max-w-md text-base leading-7 text-[#cfe3d8]">
                Create a profile, browse campus listings, and apply. Pay only if you later choose
                optional premium tools.
              </p>
              <ul className="mt-8 grid gap-2 text-sm text-[#cfe3d8] sm:grid-cols-2">
                <li>Verified student profile</li>
                <li>Campus-only listings</li>
                <li>Alerts for new gigs</li>
                <li>Payouts in naira</li>
              </ul>
            </div>
          </div>
        </section>

        <section
          id="get-started"
          className="scroll-mt-24 border-t border-[#dee6e1] px-5 py-16 sm:px-8 sm:py-20"
        >
          <div className="mx-auto max-w-6xl text-center">
            <h2 className="[font-family:var(--font-display)] text-3xl font-semibold text-[#00351b] sm:text-4xl">
              Ready to pick up a gig?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-base text-[#5b6660]">
              Join CampusGig, set up your profile, and see what is open on your campus.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <DummyButton onClick={onRegister}>Register</DummyButton>
              <DummyButton variant="secondary">Log in</DummyButton>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#dee6e1] bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-5 py-8 text-sm text-[#5b6660] sm:flex-row sm:items-center sm:px-8">
          <p className="[font-family:var(--font-display)] font-semibold text-[#122019]">
            CampusGig
          </p>
          <p>© 2026 CampusGig. Built for students, by students.</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  const [view, setView] = useState<View>('landing');
  const [jobs, setJobs] = useState<Job[]>(initialJobs);

  function addJob(job: Omit<Job, 'id'>) {
    setJobs((prev) => [{ ...job, id: String(Date.now()) }, ...prev]);
  }

  if (view === 'register') {
    return (
      <RegisterPage
        onBack={() => setView('landing')}
        onHirer={() => setView('hirer')}
        onRunner={() => setView('runner')}
      />
    );
  }

  if (view === 'runner') {
    return <RunnerPage jobs={jobs} onBack={() => setView('register')} />;
  }

  if (view === 'hirer') {
    return (
      <HirerPage
        jobs={jobs}
        onBack={() => setView('register')}
        onPostJob={addJob}
        setJobs={setJobs}
      />
    );
  }

  return <LandingPage onRegister={() => setView('register')} />;
}

export default App;
