import { useState } from 'react';

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

export default function HirerMessages() {
  const [selectedMessageId, setSelectedMessageId] = useState<string>('m1');
  const selectedMessage = sampleMessages.find((m) => m.id === selectedMessageId) ?? null;

  return (
    <div>
      <h1 className="[font-family:var(--font-display)] text-3xl font-semibold text-[#00351b]">
        Messages
      </h1>
      <p className="mt-2 text-base text-[#5b6660]">Conversations with runners.</p>

      <div className="mt-8 grid gap-4 lg:grid-cols-[280px_1fr]">
        {/* Message list */}
        <ul className="flex flex-col gap-1">
          {sampleMessages.map((msg) => (
            <li key={msg.id}>
              <button
                type="button"
                onClick={() => setSelectedMessageId(msg.id)}
                className={`w-full rounded-lg px-4 py-3 text-left ${
                  selectedMessageId === msg.id
                    ? 'bg-[#006633] text-white'
                    : 'bg-white text-[#122019] hover:bg-[#f7f8f6]'
                }`}
              >
                <p className="text-sm font-semibold">{msg.name}</p>
                <p
                  className={`mt-0.5 text-xs ${selectedMessageId === msg.id ? 'text-[#cfe3d8]' : 'text-[#5b6660]'}`}
                >
                  {msg.preview}
                </p>
                <p
                  className={`mt-1 text-xs ${selectedMessageId === msg.id ? 'text-[#cfe3d8]' : 'text-[#5b6660]'}`}
                >
                  {msg.time}
                </p>
              </button>
            </li>
          ))}
        </ul>

        {/* Thread */}
        {selectedMessage && (
          <div className="rounded-xl border border-[#dee6e1] bg-white p-5">
            <p className="text-sm font-semibold text-[#122019]">
              {selectedMessage.name}{' '}
              <span className="font-normal text-[#5b6660]">· {selectedMessage.topic}</span>
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {selectedMessage.thread.map((msg, i) => (
                <li
                  key={i}
                  className={`rounded-lg px-4 py-3 text-sm ${
                    msg.sender === 'You'
                      ? 'ml-auto bg-[#006633] text-white'
                      : 'mr-auto bg-[#f7f8f6] text-[#122019]'
                  }`}
                  style={{ maxWidth: '80%' }}
                >
                  <p className="text-xs font-semibold">{msg.sender}</p>
                  <p className="mt-1">{msg.text}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
