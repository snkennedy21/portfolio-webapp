'use client';

import { motion } from 'framer-motion';
import { useSuccessSound } from '@/hooks/useSuccessSound';
import { useEffect, useCallback } from 'react';

interface QAPair {
  id: string;
  question: string;
  answer: string;
  timestamp: Date;
}

interface InterviewCompleteProps {
  totalQuestions: number;
  history: QAPair[];
  onRestart?: () => void;
}

const contentVariants = {
  initial: {
    scale: 0.7,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
  },
  exit: {
    scale: 1.5,
    opacity: 0,
    filter: 'blur(10px)',
  },
};

export default function InterviewComplete({
  totalQuestions,
  history,
  onRestart,
}: InterviewCompleteProps) {
  const playSound = useSuccessSound();

  useEffect(() => {
    // Play a celebratory sound on mount
    playSound();
  }, [playSound]);

  const generateTranscript = useCallback(() => {
    const header = `Interview Transcript\nDate: ${new Date().toLocaleDateString()}\nCandidate: Sean Kennedy\n\n${'='.repeat(50)}\n\n`;

    const content = history
      .map(
        (qa, index) =>
          `Q${index + 1}: ${qa.question}\n\nSean: ${qa.answer}\n\n${'-'.repeat(50)}\n\n`
      )
      .join('');

    return header + content;
  }, [history]);

  const handleDownload = useCallback(() => {
    const transcript = generateTranscript();
    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `interview-transcript-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [generateTranscript]);

  return (
    <motion.div
      className="absolute inset-0 overflow-y-auto p-6"
      variants={contentVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <div className="min-h-full flex items-center justify-center">
      <div className="max-w-lg mx-auto text-center">
        {/* Celebration icon */}
        <motion.div
          className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-[#22d3ee] to-[#8b5cf6] rounded-full flex items-center justify-center"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
            delay: 0.2,
          }}
        >
          <motion.svg
            className="w-10 h-10 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <motion.path
              d="M5 13l4 4L19 7"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.5,
                ease: 'easeOut',
              }}
            />
          </motion.svg>
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="text-3xl font-bold text-[#18181b] mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Interview Complete!
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="text-[#71717a] mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          You've asked {totalQuestions} questions and learned about Sean's background,
          experience, and approach to software engineering.
        </motion.p>

        {/* Stats card */}
        <motion.div
          className="bg-white border border-[#e7e5e4] rounded-2xl p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-[#71717a] mb-2">Questions Completed</p>
          <p className="text-4xl font-bold bg-gradient-to-r from-[#22d3ee] to-[#8b5cf6] bg-clip-text text-transparent">
            {totalQuestions} / {totalQuestions}
          </p>
        </motion.div>

        {/* Actions */}
        <div className="space-y-3">
          <motion.button
            onClick={handleDownload}
            className="w-full py-3 rounded-lg border bg-white text-[#18181b] font-medium transition-all duration-300 border-[#e7e5e4] hover:bg-[#f5f5f4] hover:border-[#22d3ee]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            Download Transcript
          </motion.button>

          {onRestart && (
            <motion.button
              onClick={onRestart}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-[#22d3ee] to-[#8b5cf6] text-white font-medium hover:from-[#06b6d4] hover:to-[#7c3aed] transition-all duration-150"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Start Over
            </motion.button>
          )}
        </div>
      </div>
      </div>
    </motion.div>
  );
}
