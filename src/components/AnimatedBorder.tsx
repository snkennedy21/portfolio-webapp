'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

interface AnimatedBorderProps {
  isVisible: boolean;
  color?: string;
  strokeWidth?: number;
  duration?: number;
  borderRadius?: number;
}

export default function AnimatedBorder({
  isVisible,
  color = '#22c55e',
  strokeWidth = 2,
  duration = 0.4,
  borderRadius = 8,
}: AnimatedBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (containerRef.current) {
      const updateDimensions = () => {
        if (containerRef.current) {
          setDimensions({
            width: containerRef.current.offsetWidth,
            height: containerRef.current.offsetHeight,
          });
        }
      };

      updateDimensions();
      window.addEventListener('resize', updateDimensions);
      return () => window.removeEventListener('resize', updateDimensions);
    }
  }, [isVisible]);

  const { width, height } = dimensions;
  const r = borderRadius;
  const offset = strokeWidth / 2;

  // Create path for left half (top center -> left -> bottom center)
  const leftPath = `
    M ${width / 2} ${offset}
    L ${r + offset} ${offset}
    Q ${offset} ${offset} ${offset} ${r + offset}
    L ${offset} ${height - r - offset}
    Q ${offset} ${height - offset} ${r + offset} ${height - offset}
    L ${width / 2} ${height - offset}
  `;

  // Create path for right half (top center -> right -> bottom center)
  const rightPath = `
    M ${width / 2} ${offset}
    L ${width - r - offset} ${offset}
    Q ${width - offset} ${offset} ${width - offset} ${r + offset}
    L ${width - offset} ${height - r - offset}
    Q ${width - offset} ${height - offset} ${width - r - offset} ${height - offset}
    L ${width / 2} ${height - offset}
  `;

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none">
      {isVisible && width > 0 && height > 0 && (
        <svg
          className="absolute inset-0 w-full h-full"
          width={width}
          height={height}
        >
          {/* Left half */}
          <motion.path
            d={leftPath}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              pathLength: { duration, ease: 'easeOut' },
              opacity: { duration: 0.2 },
            }}
          />
          {/* Right half */}
          <motion.path
            d={rightPath}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              pathLength: { duration, ease: 'easeOut' },
              opacity: { duration: 0.2 },
            }}
          />
        </svg>
      )}
    </div>
  );
}
