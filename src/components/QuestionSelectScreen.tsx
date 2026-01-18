'use client';

import { useState } from 'react';
import TransitionWrapper, { TransitionDirection } from './TransitionWrapper';
import SuggestedQuestions from './SuggestedQuestions';
import QuickLinks from './QuickLinks';

interface QAPair {
  id: string;
  question: string;
  answer: string;
  timestamp: Date;
}

interface QuestionSelectScreenProps {
  direction: TransitionDirection;
  onAskQuestion: (question: string) => void;
  onOpenHistory: () => void;
  suggestedQuestions: string[];
  history: QAPair[];
  isLoading: boolean;
}

export default function QuestionSelectScreen({
  direction,
  onAskQuestion,
  onOpenHistory,
  suggestedQuestions,
  history,
  isLoading,
}: QuestionSelectScreenProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onAskQuestion(input);
    setInput('');
  };

  const handleQuestionSelect = (question: string) => {
    if (isLoading) return;
    onAskQuestion(question);
  };

  return (
    <TransitionWrapper direction={direction} className="z-10">
      <div className="flex flex-col h-screen bg-[#fafaf9]">
        {/* Header */}
        <header className="p-6 border-b border-[#e7e5e4] bg-white">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src="/profile-picture.png"
                alt="Sean Kennedy"
                className="w-16 h-16 rounded-full object-cover border border-[#e7e5e4]"
              />
              <div>
                <h1 className="text-xl font-semibold text-[#18181b]">Sean Kennedy</h1>
                <p className="text-[#71717a]">Full-Stack Developer</p>
                <p className="text-sm text-[#22d3ee]">Ready to answer your questions</p>
              </div>
            </div>
            {history.length > 0 && (
              <button
                onClick={onOpenHistory}
                className="p-2 rounded-lg border border-[#e7e5e4] bg-white hover:bg-[#f5f5f4] transition-colors"
                title="View conversation history"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-[#71717a]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>
            )}
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-[#71717a] text-center text-lg">
              What would you like to ask?
            </p>
            <SuggestedQuestions
              questions={suggestedQuestions}
              onSelect={handleQuestionSelect}
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-[#e7e5e4] bg-white p-4">
          <div className="max-w-3xl mx-auto space-y-4">
            <form onSubmit={handleSubmit}>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Or ask your own question..."
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

            <QuickLinks />
          </div>
        </div>
      </div>
    </TransitionWrapper>
  );
}
