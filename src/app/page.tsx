'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LandingScreen from '@/components/LandingScreen';
import InterviewRoom from '@/components/InterviewRoom';

export default function Home() {
  const [started, setStarted] = useState(false);
  const [showInterview, setShowInterview] = useState(false);

  const handleBegin = () => {
    setStarted(true);
    // Show interview room immediately so both are visible during transition
    setShowInterview(true);
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <AnimatePresence>
        {!started && (
          <LandingScreen key="landing" onBegin={handleBegin} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showInterview && (
          <InterviewRoom key="interview" />
        )}
      </AnimatePresence>
    </main>
  );
}
