import { useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

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

export default function LandingPage() {
  const navigate = useNavigate();
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
            <DummyButton className="px-3 py-2 sm:px-4" onClick={() => navigate('/register')}>
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
              <DummyButton onClick={() => navigate('/register')}>Register</DummyButton>
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
