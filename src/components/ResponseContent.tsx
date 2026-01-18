'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import SuggestedQuestions from './SuggestedQuestions';
import { useSuccessSound } from '@/hooks/useSuccessSound';

interface ResponseContentProps {
  question: string;
  answer: string;
  isStreaming: boolean;
  followUpQuestions: string[];
  onFollowUp: (question: string) => void;
  onAskDifferent: () => void;
  isLastQuestion?: boolean;
  onFinish?: () => void;
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
  isLastQuestion = false,
  onFinish,
}: ResponseContentProps) {
  const playSound = useSuccessSound();

  const handleFinish = () => {
    playSound();
    onFinish?.();
  };
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
      <div className="max-w-3xl mx-auto">
        {/* Question as subtle header */}
        <p className="text-sm text-[#71717a] italic mb-6">
          "{question}"
        </p>

        {/* AI Response - Hero element */}
        <div className="bg-white border border-[#e7e5e4] rounded-2xl px-6 py-5">
          <div className="flex items-center gap-2 mb-3">
            <Image
              src="/profile-picture.png"
              alt="Sean Kennedy"
              width={24}
              height={24}
              className="rounded-full"
            />
            <span className="text-xs text-[#8b5cf6] font-medium">Sean</span>
          </div>
          {answer ? (
            <p className="text-lg text-[#18181b] leading-relaxed whitespace-pre-wrap">
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

        {/* Follow-up Questions or Finish Button */}
        {!isStreaming && answer && (
          isLastQuestion ? (
            <div className="pt-8">
              <button
                onClick={handleFinish}
                className="w-full py-4 rounded-lg bg-gradient-to-r from-[#22d3ee] to-[#8b5cf6] text-white font-medium hover:from-[#06b6d4] hover:to-[#7c3aed] transition-all duration-150"
              >
                Finish Interview
              </button>
            </div>
          ) : (
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
          )
        )}
      </div>
    </motion.div>
  );
}
