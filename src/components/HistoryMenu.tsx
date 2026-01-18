'use client';

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
  onSelectItem: (id: string) => void;
}

export default function HistoryMenu({
  isOpen,
  onClose,
  history,
  onSelectItem,
}: HistoryMenuProps) {
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  };

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
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#e7e5e4]">
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
            <div className="overflow-y-auto h-[calc(100%-80px)]">
              {history.length === 0 ? (
                <div className="p-6 text-center text-[#71717a]">
                  No conversation history yet
                </div>
              ) : (
                <div className="divide-y divide-[#e7e5e4]">
                  {history.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectItem(item.id);
                        onClose();
                      }}
                      className="w-full text-left p-4 hover:bg-[#f5f5f4] transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-[#18181b] font-medium truncate">
                            {item.question}
                          </p>
                          <p className="text-sm text-[#71717a] mt-1 line-clamp-2">
                            {item.answer}
                          </p>
                        </div>
                        <span className="text-xs text-[#a1a1aa] whitespace-nowrap">
                          {formatTime(item.timestamp)}
                        </span>
                      </div>
                    </button>
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
