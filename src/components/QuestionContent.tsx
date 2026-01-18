'use client';

import { motion } from 'framer-motion';
import SuggestedQuestions from './SuggestedQuestions';

interface QuestionContentProps {
  suggestedQuestions: string[];
  onSelectQuestion: (question: string) => void;
  isLoading: boolean;
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

export default function QuestionContent({
  suggestedQuestions,
  onSelectQuestion,
  isLoading,
}: QuestionContentProps) {
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
      <div className="max-w-3xl mx-auto space-y-6">
        <p className="text-[#71717a] text-center text-lg">
          What would you like to ask?
        </p>
        <SuggestedQuestions
          questions={suggestedQuestions}
          onSelect={onSelectQuestion}
          disabled={isLoading}
        />
      </div>
    </motion.div>
  );
}
