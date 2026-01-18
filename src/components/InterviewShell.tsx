'use client';

import { ReactNode, useState } from 'react';

interface InterviewShellProps {
  children: ReactNode;
  onSubmitQuestion: (question: string) => void;
  isLoading: boolean;
}

export default function InterviewShell({
  children,
  onSubmitQuestion,
  isLoading,
}: InterviewShellProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSubmitQuestion(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen bg-[#fafaf9]">
      {/* Animated Content Area */}
      <div className="flex-1 overflow-hidden relative">
        {children}
      </div>

      {/* Fixed Input */}
      <div className="border-t border-[#e7e5e4] bg-white p-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your own question..."
                className="flex-1 px-4 py-3 rounded-lg border border-[#e7e5e4] bg-white text-[#18181b] placeholder-[#71717a] focus:outline-none focus:ring-2 focus:ring-[#22d3ee] focus:border-transparent"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#22d3ee] to-[#8b5cf6] text-white font-medium hover:from-[#06b6d4] hover:to-[#7c3aed] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150"
              >
                Ask
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
