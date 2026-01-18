'use client';

import { motion } from 'framer-motion';
import SuggestedQuestions from './SuggestedQuestions';

interface ResponseContentProps {
  question: string;
  answer: string;
  isStreaming: boolean;
  followUpQuestions: string[];
  onFollowUp: (question: string) => void;
  onAskDifferent: () => void;
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

export default function ResponseContent({
  question,
  answer,
  isStreaming,
  followUpQuestions,
  onFollowUp,
  onAskDifferent,
}: ResponseContentProps) {
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
              onClick={onAskDifferent}
              className="w-full text-center py-3 text-[#71717a] hover:text-[#18181b] transition-colors"
            >
              Or ask something different
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
