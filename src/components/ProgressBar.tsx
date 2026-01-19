'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = Math.min((current / total) * 100, 100);
  const isComplete = current >= total;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-[#71717a]">
          {isComplete ? 'Interview Complete!' : `${current} of ${total} complete`}
        </span>
        <span className="text-sm font-medium text-[#18181b]">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="h-2 bg-[#e7e5e4] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#22d3ee] to-[#8b5cf6] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{
            duration: 0.5,
            ease: 'easeOut',
          }}
        />
      </div>
    </div>
  );
}
