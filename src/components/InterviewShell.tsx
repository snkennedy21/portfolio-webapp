'use client';

import { ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSuccessSound } from '@/hooks/useSuccessSound';
import AnimatedBorder from './AnimatedBorder';

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
      {/* Animated Content Area */}
      <div className="flex-1 overflow-hidden relative">
        {children}
      </div>

      {/* Fixed Input */}
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
    </div>
  );
}
