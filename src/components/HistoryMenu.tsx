'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface QAPair {
  id: string;
  question: string;
  answer: string;
  timestamp: Date;
}

interface HistoryMenuProps {
  isOpen: boolean;
  onClose: () => void;
  history: QAPair[];
}

export default function HistoryMenu({
  isOpen,
  onClose,
  history,
}: HistoryMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/20 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#fafaf9] shadow-2xl z-50"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#e7e5e4] bg-white">
              <h2 className="text-xl font-semibold text-[#18181b]">Conversation History</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-[#f5f5f4] transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-[#71717a]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* History Items */}
            <div className="overflow-y-auto h-[calc(100%-80px)] p-4">
              {history.length === 0 ? (
                <div className="p-6 text-center text-[#71717a]">
                  No conversation history yet
                </div>
              ) : (
                <div className="space-y-4">
                  {history.map((item, index) => (
                    <div key={item.id} className="space-y-3">
                      {/* Question */}
                      <p className="text-sm text-[#71717a] italic">
                        "{item.question}"
                      </p>

                      {/* Answer */}
                      <div className="bg-white border border-[#e7e5e4] rounded-2xl px-4 py-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Image
                            src="/profile-picture.png"
                            alt="Sean Kennedy"
                            width={20}
                            height={20}
                            className="rounded-full"
                          />
                          <span className="text-xs text-[#8b5cf6] font-medium">Sean</span>
                        </div>
                        <p className="text-sm text-[#18181b] leading-relaxed whitespace-pre-wrap">
                          {item.answer}
                        </p>
                      </div>

                      {/* Separator between Q&A pairs */}
                      {index < history.length - 1 && (
                        <div className="border-b border-[#e7e5e4] pt-2" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
