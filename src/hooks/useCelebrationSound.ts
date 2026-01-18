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

      // Play a celebratory ascending arpeggio (C major chord ascending)
      // C5 -> E5 -> G5 -> C6 (octave higher)
      playTone(523.25, now, 0.2, 0.15);        // C5
      playTone(659.25, now + 0.12, 0.2, 0.18); // E5
      playTone(783.99, now + 0.24, 0.2, 0.2);  // G5
      playTone(1046.5, now + 0.36, 0.4, 0.25); // C6 (longer, louder for finale)

    } catch (error) {
      // Silently fail if Web Audio API isn't available
      console.warn('Could not play celebration sound:', error);
    }
  }, []);

  return playSound;
}
