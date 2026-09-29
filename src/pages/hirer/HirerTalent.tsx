import { useState } from 'react';

const sampleTalent = [
  { name: 'Ifeanyi Eze', skill: 'Event staffing', campus: 'Main Campus' },
  { name: 'Blessing Okon', skill: 'Tutoring', campus: 'Town Campus' },
  { name: 'Sadiq Musa', skill: 'Errands & delivery', campus: 'Annex Campus' },
  { name: 'Ngozi Udo', skill: 'Content & design', campus: 'Main Campus' },
];

export default function HirerTalent() {
  const [invitedTalent, setInvitedTalent] = useState<Record<string, boolean>>({});

  function inviteTalent(name: string) {
    setInvitedTalent((prev) => ({ ...prev, [name]: !prev[name] }));
  }

  return (
    <div>
      <h1 className="[font-family:var(--font-display)] text-3xl font-semibold text-[#00351b]">
        Talent
      </h1>
      <p className="mt-2 text-base text-[#5b6660]">
        Browse students available for gigs on campus.
      </p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {sampleTalent.map((person) => (
          <li key={person.name} className="rounded-xl border border-[#dee6e1] bg-white p-5">
            <p className="font-semibold text-[#122019]">{person.name}</p>
            <p className="mt-1 text-sm text-[#5b6660]">
              {person.skill} · {person.campus}
            </p>
            <button
              type="button"
              onClick={() => inviteTalent(person.name)}
              className={`mt-3 rounded-lg px-4 py-2 text-xs font-semibold ${
                invitedTalent[person.name]
                  ? 'border border-[#006633] bg-white text-[#006633]'
                  : 'bg-[#006633] text-white hover:bg-[#00522a]'
              }`}
            >
              {invitedTalent[person.name] ? 'Invited ✓' : 'Invite'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
