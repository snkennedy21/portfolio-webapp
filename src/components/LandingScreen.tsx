'use client';

import { useState } from 'react';
import TransitionWrapper, { TransitionDirection } from './TransitionWrapper';
import AnimatedBorder from './AnimatedBorder';
import { useSuccessSound } from '@/hooks/useSuccessSound';

interface LandingScreenProps {
  onBegin: () => void;
  direction: TransitionDirection;
}

export default function LandingScreen({ onBegin, direction }: LandingScreenProps) {
  const [isSelected, setIsSelected] = useState(false);
  const playSound = useSuccessSound();

  const handleClick = () => {
    if (isSelected) return;

    setIsSelected(true);
    playSound();

    setTimeout(() => {
      onBegin();
    }, 700);
  };

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

          <div className="mt-8 flex flex-col items-center gap-4">
            <button
              onClick={handleClick}
              disabled={isSelected}
              className={`relative px-8 py-3 rounded-lg border bg-white text-[#18181b] text-lg font-medium transition-all duration-300 disabled:cursor-not-allowed ${
                isSelected
                  ? 'border-transparent'
                  : 'border-[#e7e5e4] hover:bg-[#f5f5f4] hover:border-[#22d3ee]'
              }`}
            >
              Begin Interview
              <AnimatedBorder isVisible={isSelected} />
            </button>
          </div>
        </div>
      </div>
    </TransitionWrapper>
  );
}
