'use client';

import { motion } from 'framer-motion';
import { useCallback, useEffect } from 'react';
import { useCelebrationSound } from '@/hooks/useCelebrationSound';

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

// Generate confetti particles once on mount
const generateConfettiParticles = () => {
  const colors = [
    '#22d3ee', '#8b5cf6', '#f472b6', '#fbbf24', '#34d399',
    '#fb7185', '#a78bfa', '#67e8f9', '#f97316', '#84cc16',
    '#06b6d4', '#ec4899', '#eab308', '#10b981', '#6366f1'
  ];
  const shapes = ['rounded-full', 'rounded-sm', 'rounded-none'];

  return [...Array(100)].map((_, i) => ({
    id: i,
    color: colors[i % colors.length],
    shape: shapes[Math.floor(Math.random() * shapes.length)],
    size: 4 + Math.random() * 8,
    startX: Math.random() * 100, // percentage across screen
    delay: Math.random() * 2, // stagger the start
    duration: 2 + Math.random() * 2, // fall duration
    rotation: Math.random() * 720 - 360,
    swayAmount: 20 + Math.random() * 40, // horizontal sway
  }));
};

const confettiParticles = generateConfettiParticles();

export default function InterviewComplete({
  totalQuestions,
  history,
  onRestart,
}: InterviewCompleteProps) {
  const playCelebration = useCelebrationSound();

  // Play celebration sound when component mounts
  useEffect(() => {
    // Small delay to sync with the animation
    const timer = setTimeout(() => {
      playCelebration();
    }, 300);
    return () => clearTimeout(timer);
  }, [playCelebration]);

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
      {/* Confetti rain */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {confettiParticles.map((particle) => (
          <motion.div
            key={`confetti-rain-${particle.id}`}
            className={`absolute ${particle.shape}`}
            style={{
              width: particle.size,
              height: particle.size * (particle.shape === 'rounded-none' ? 0.4 : 1),
              backgroundColor: particle.color,
              left: `${particle.startX}%`,
              top: -20,
            }}
            initial={{
              y: 0,
              x: 0,
              rotate: 0,
              opacity: 1,
            }}
            animate={{
              y: window?.innerHeight ? window.innerHeight + 100 : 1000,
              x: [0, particle.swayAmount, -particle.swayAmount, particle.swayAmount / 2, 0],
              rotate: particle.rotation,
              opacity: [1, 1, 1, 0.8, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              ease: 'linear',
              x: {
                duration: particle.duration,
                ease: 'easeInOut',
                times: [0, 0.25, 0.5, 0.75, 1],
              },
            }}
          />
        ))}
      </div>

      <div className="min-h-full flex items-center justify-center relative z-10">
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
