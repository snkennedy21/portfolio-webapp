'use client';

import { ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSuccessSound } from '@/hooks/useSuccessSound';
import AnimatedBorder from './AnimatedBorder';
import ProgressBar from './ProgressBar';

type ResponseMode = 'graph' | 'ai';

interface InterviewShellProps {
  children: ReactNode;
  onSubmitQuestion: (question: string) => void;
  isLoading: boolean;
  questionCount: number;
  totalQuestions: number;
  onOpenHistory: () => void;
  hasHistory: boolean;
  hideInput?: boolean;
  responseMode: ResponseMode;
  onToggleMode: () => void;
}

export default function InterviewShell({
  children,
  onSubmitQuestion,
  isLoading,
  questionCount,
  totalQuestions,
  onOpenHistory,
  hasHistory,
  hideInput = false,
  responseMode,
  onToggleMode,
}: InterviewShellProps) {
  const [input, setInput] = useState('');
  const [showCheckmark, setShowCheckmark] = useState(false);
  const playSound = useSuccessSound();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || showCheckmark) return;

    const question = input;
    setShowCheckmark(true);
    playSound();

    setTimeout(() => {
      setInput('');
      setShowCheckmark(false);
      onSubmitQuestion(question);
    }, 700);
  };

  return (
    <div className="flex flex-col h-screen bg-[#fafaf9]">
      {/* Progress Bar Header */}
      <div className="border-b border-[#e7e5e4] bg-white px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <div className="flex-1">
            <ProgressBar current={questionCount} total={totalQuestions} />
          </div>
          {/* Mode Toggle - Development Only */}
          {process.env.NODE_ENV === 'development' && (
            <button
              onClick={onToggleMode}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors border border-[#e7e5e4] hover:border-[#22d3ee]"
              title={responseMode === 'graph' ? 'Using pre-written responses' : 'Using AI responses'}
            >
              <span className={responseMode === 'graph' ? 'text-[#8b5cf6]' : 'text-[#71717a]'}>
                Graph
              </span>
              <div className="relative w-8 h-4 bg-[#e7e5e4] rounded-full">
                <div
                  className={`absolute top-0.5 w-3 h-3 rounded-full transition-all duration-200 ${
                    responseMode === 'ai'
                      ? 'left-4 bg-[#22d3ee]'
                      : 'left-0.5 bg-[#8b5cf6]'
                  }`}
                />
              </div>
              <span className={responseMode === 'ai' ? 'text-[#22d3ee]' : 'text-[#71717a]'}>
                AI
              </span>
            </button>
          )}
        </div>
      </div>

      {/* History Button - Fixed Position */}
      {hasHistory && (
        <button
          onClick={onOpenHistory}
          className="fixed top-4 right-4 p-2 rounded-lg bg-white border border-[#e7e5e4] hover:bg-[#f5f5f4] hover:border-[#22d3ee] transition-colors shadow-sm z-30"
          title="View conversation history"
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
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      )}

      {/* Animated Content Area */}
      <div className={`flex-1 relative ${hideInput ? 'overflow-visible' : 'overflow-hidden'}`}>
        {children}
      </div>

      {/* Fixed Input */}
      {!hideInput && (
      <div className="border-t border-[#e7e5e4] bg-white p-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="flex gap-3">
              {/* Input wrapper for animated border */}
              <div className="relative flex-1">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask your own question..."
                  disabled={showCheckmark}
                  className={`w-full px-4 py-3 rounded-lg border bg-white text-[#18181b] placeholder-[#71717a] focus:outline-none focus:ring-2 focus:ring-[#22d3ee] focus:border-transparent disabled:opacity-50 ${
                    showCheckmark ? 'border-transparent' : 'border-[#e7e5e4]'
                  }`}
                />
                <AnimatedBorder isVisible={showCheckmark} />
              </div>

              {/* Button wrapper for animated border */}
              <div className="relative">
                <button
                  type="submit"
                  disabled={isLoading || !input.trim() || showCheckmark}
                  className="relative px-6 py-3 rounded-lg bg-gradient-to-r from-[#22d3ee] to-[#8b5cf6] text-white font-medium hover:from-[#06b6d4] hover:to-[#7c3aed] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 min-w-[80px] flex items-center justify-center"
                >
                  <AnimatePresence mode="wait">
                    {showCheckmark ? (
                      <motion.div
                        key="checkmark"
                        className="w-5 h-5 bg-[#818cf8] rounded-full flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{
                          type: 'spring',
                          stiffness: 500,
                          damping: 25,
                          delay: 0.2
                        }}
                      >
                        <motion.svg
                          className="w-3 h-3 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={3}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <motion.path
                            d="M5 13l4 4L19 7"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{
                              duration: 0.3,
                              delay: 0.3,
                              ease: 'easeOut',
                            }}
                          />
                        </motion.svg>
                      </motion.div>
                    ) : (
                      <motion.span
                        key="text"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Ask
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
                <AnimatedBorder isVisible={showCheckmark} />
              </div>
            </div>
          </form>
        </div>
      </div>
      )}
    </div>
  );
}
