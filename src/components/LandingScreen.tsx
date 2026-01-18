'use client';

import { motion } from 'framer-motion';

interface LandingScreenProps {
  onBegin: () => void;
}

export default function LandingScreen({ onBegin }: LandingScreenProps) {
  return (
    <motion.div
      className="absolute inset-0 min-h-screen flex flex-col items-center justify-center bg-[#fafaf9] px-4 z-20"
      initial={{ scale: 1, opacity: 1 }}
      exit={{
        scale: 1.5,
        opacity: 0,
        filter: 'blur(10px)',
      }}
      transition={{
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <div className="text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-[#18181b]">
          THE INTERVIEW
        </h1>

        <p className="text-lg md:text-xl text-[#71717a] max-w-md mx-auto">
          You&apos;re about to interview Sean Kennedy.
        </p>

        <button
          onClick={onBegin}
          className="mt-8 px-8 py-3 bg-gradient-to-r from-[#22d3ee] to-[#8b5cf6] text-white text-lg font-medium rounded-lg hover:from-[#06b6d4] hover:to-[#7c3aed] transition-all duration-200"
        >
          Begin Interview
        </button>
      </div>
    </motion.div>
  );
}
