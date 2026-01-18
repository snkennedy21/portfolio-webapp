'use client';

import TransitionWrapper, { TransitionDirection } from './TransitionWrapper';

interface LandingScreenProps {
  onBegin: () => void;
  direction: TransitionDirection;
}

export default function LandingScreen({ onBegin, direction }: LandingScreenProps) {
  return (
    <TransitionWrapper direction={direction} className="z-20">
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafaf9] px-4">
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
      </div>
    </TransitionWrapper>
  );
}
