'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export type TransitionDirection = 'forward' | 'backward';

interface TransitionWrapperProps {
  children: ReactNode;
  direction?: TransitionDirection;
  className?: string;
}

const forwardVariants = {
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

const backwardVariants = {
  initial: {
    scale: 1.5,
    opacity: 0,
    filter: 'blur(10px)',
  },
  animate: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0px)',
  },
  exit: {
    scale: 0.7,
    opacity: 0,
  },
};

export default function TransitionWrapper({
  children,
  direction = 'forward',
  className = '',
}: TransitionWrapperProps) {
  const variants = direction === 'forward' ? forwardVariants : backwardVariants;

  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
