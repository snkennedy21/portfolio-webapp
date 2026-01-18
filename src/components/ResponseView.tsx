'use client';

import TransitionWrapper, { TransitionDirection } from './TransitionWrapper';
import SuggestedQuestions from './SuggestedQuestions';

interface ResponseViewProps {
  direction: TransitionDirection;
  question: string;
  answer: string;
  isStreaming: boolean;
  followUpQuestions: string[];
  onFollowUp: (question: string) => void;
  onBack: () => void;
}

export default function ResponseView({
  direction,
  question,
  answer,
  isStreaming,
  followUpQuestions,
  onFollowUp,
  onBack,
}: ResponseViewProps) {
  return (
    <TransitionWrapper direction={direction} className="z-10">
      <div className="flex flex-col h-screen bg-[#fafaf9]">
        {/* Header */}
        <header className="p-6 border-b border-[#e7e5e4] bg-white">
          <div className="max-w-3xl mx-auto flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 rounded-lg border border-[#e7e5e4] bg-white hover:bg-[#f5f5f4] transition-colors"
              title="Ask another question"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-[#71717a]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
            </button>
            <div className="flex items-center gap-3">
              <img
                src="/profile-picture.png"
                alt="Sean Kennedy"
                className="w-10 h-10 rounded-full object-cover border border-[#e7e5e4]"
              />
              <div>
                <h1 className="text-lg font-semibold text-[#18181b]">Sean Kennedy</h1>
                <p className="text-sm text-[#71717a]">Full-Stack Developer</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* User Question */}
            <div className="flex justify-end">
              <div className="max-w-[85%] bg-[#f0f9ff] rounded-2xl px-5 py-4">
                <p className="text-xs text-[#71717a] mb-2 font-medium">You asked</p>
                <p className="text-lg text-[#18181b] font-medium">{question}</p>
              </div>
            </div>

            {/* AI Response */}
            <div className="flex justify-start">
              <div className="max-w-[85%] bg-white border border-[#e7e5e4] rounded-2xl px-5 py-4">
                <p className="text-xs text-[#8b5cf6] mb-2 font-medium">Sean</p>
                {answer ? (
                  <p className="text-base text-[#18181b] leading-relaxed whitespace-pre-wrap">
                    {answer}
                  </p>
                ) : (
                  <div className="flex space-x-1 py-2">
                    <div className="w-2 h-2 bg-[#71717a] rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-[#71717a] rounded-full animate-bounce [animation-delay:0.1s]" />
                    <div className="w-2 h-2 bg-[#71717a] rounded-full animate-bounce [animation-delay:0.2s]" />
                  </div>
                )}
              </div>
            </div>

            {/* Follow-up Questions */}
            {!isStreaming && answer && (
              <div className="pt-6 space-y-4">
                <p className="text-sm text-[#71717a]">Continue the conversation:</p>
                <SuggestedQuestions
                  questions={followUpQuestions}
                  onSelect={onFollowUp}
                  disabled={isStreaming}
                />
                <button
                  onClick={onBack}
                  className="w-full text-center py-3 text-[#71717a] hover:text-[#18181b] transition-colors"
                >
                  Or ask something different
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </TransitionWrapper>
  );
}
