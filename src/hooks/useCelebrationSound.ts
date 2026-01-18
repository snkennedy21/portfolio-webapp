'use client';

import { useCallback, useRef } from 'react';

export function useCelebrationSound() {
  const audioContextRef = useRef<AudioContext | null>(null);

  const playSound = useCallback(() => {
    try {
      // Create or reuse AudioContext
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }

      const ctx = audioContextRef.current;

      // Resume context if suspended (browser autoplay policy)
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;

      const playTone = (frequency: number, startTime: number, duration: number, volume: number = 0.2) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';

        // Quick attack, smooth decay
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
      };

      // Smooth ascending scale
      playTone(783.99, now, 0.3, 0.18);        // G5
      playTone(1046.5, now + 0.2, 0.35, 0.2);  // C6
      playTone(1318.5, now + 0.45, 0.35, 0.22); // E6
      playTone(1568.0, now + 0.65, 0.35, 0.22); // G6
      playTone(2093.0, now + 0.9, 0.8, 0.25);  // C7 (finale)

    } catch (error) {
      // Silently fail if Web Audio API isn't available
      console.warn('Could not play celebration sound:', error);
    }
  }, []);

  return playSound;
}
