'use client';

import { useState } from 'react';
import LandingScreen from '@/components/LandingScreen';
import InterviewRoom from '@/components/InterviewRoom';

export default function Home() {
  const [started, setStarted] = useState(false);

  return (
    <main className="min-h-screen">
      {!started ? (
        <LandingScreen onBegin={() => setStarted(true)} />
      ) : (
        <InterviewRoom />
      )}
    </main>
  );
}
