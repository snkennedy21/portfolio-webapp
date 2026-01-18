'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSuccessSound } from '@/hooks/useSuccessSound';
import AnimatedBorder from './AnimatedBorder';

interface SuggestedQuestionsProps {
  questions: string[];
  onSelect: (question: string) => void;
  disabled?: boolean;
}

export default function SuggestedQuestions({
  questions,
  onSelect,
  disabled = false,
}: SuggestedQuestionsProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const playSound = useSuccessSound();

  if (questions.length === 0) return null;

  const handleClick = (question: string, index: number) => {
    if (disabled || selectedIndex !== null) return;

    setSelectedIndex(index);
    playSound();

    // Delay the actual selection until animation completes
    setTimeout(() => {
      onSelect(question);
      setSelectedIndex(null);
    }, 700);
  };

  return (
    <div className="space-y-2">
      {questions.map((question, index) => {
        const isSelected = selectedIndex === index;

        return (
          <button
            key={index}
            onClick={() => handleClick(question, index)}
            disabled={disabled || selectedIndex !== null}
            className={`relative w-full text-left px-4 py-3 pr-12 rounded-lg border bg-white text-[#18181b] transition-all duration-300 disabled:cursor-not-allowed ${
              isSelected
                ? 'border-transparent'
                : 'border-[#e7e5e4] hover:bg-[#f5f5f4] hover:border-[#22d3ee]'
            } ${selectedIndex !== null && !isSelected ? 'opacity-50' : ''}`}
          >
            <span className="text-[#71717a] mr-2">&ldquo;</span>
            {question}
            <span className="text-[#71717a] ml-1">&rdquo;</span>

            {/* Animated border */}
            <AnimatedBorder isVisible={isSelected} />

            {/* Checkmark circle on the right */}
            <AnimatePresence>
              {isSelected && (
                <motion.div
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#22c55e] rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 25,
                    delay: 0.2
                  }}
                >
                  <motion.svg
                    className="w-4 h-4 text-white"
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
              )}
            </AnimatePresence>
          </button>
        );
      })}
    </div>
  );
}
