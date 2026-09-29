import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

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

export default function RegisterPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f7f8f6] text-[#122019]">
      <header className="border-b border-[#dee6e1] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <BrandMark onClick={() => navigate('/')} />
          <DummyButton variant="secondary" className="px-4 py-2" onClick={() => navigate('/')}>
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
            onClick={() => navigate('/hirer')}
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
            onClick={() => navigate('/runner')}
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
