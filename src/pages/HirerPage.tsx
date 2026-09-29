import { useState } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';

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

const nav = [
  { to: 'dashboard', label: 'Dashboard' },
  { to: 'jobs', label: 'Jobs' },
  { to: 'talent', label: 'Talent' },
  { to: 'messages', label: 'Messages' },
  { to: 'reports', label: 'Reports' },
];

export default function HirerPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Determine which nav item is active based on the current URL
  const activeSection = location.pathname.split('/')[2] ?? 'dashboard';

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
          <BrandMark onClick={() => navigate('/')} />
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'block' : 'hidden'
          } fixed inset-y-0 left-0 top-[61px] z-30 w-56 border-r border-[#dee6e1] bg-white p-4 lg:relative lg:top-0 lg:block`}
        >
          <nav className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={`rounded-lg px-4 py-2.5 text-sm font-medium no-underline ${
                  activeSection === item.to
                    ? 'bg-[#006633] text-white'
                    : 'text-[#5b6660] hover:bg-[#f7f8f6] hover:text-[#122019]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-6">
            <Link
              to="post"
              onClick={() => setSidebarOpen(false)}
              className="block w-full rounded-lg border-0 bg-[#c0392b] px-4 py-2.5 text-center text-sm font-semibold text-white no-underline hover:bg-[#a52f22]"
            >
              Post a gig
            </Link>
          </div>
        </aside>

        {/* Main content — nested route renders here */}
        <main className="min-h-[calc(100vh-61px)] flex-1 p-5 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
