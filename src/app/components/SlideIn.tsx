'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SlideInProps {
  children: ReactNode;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  delay?: number;
  duration?: number;
  maxHeight?: string;
  maxWidth?: string;
  minHeight?: string;
  className?: string;
}

export default function SlideIn({ 
  children, 
  direction = 'bottom',
  delay = 0,
  duration = 0.6,
  maxHeight = '100%',
  maxWidth = '100%',
  minHeight,
  className = ''
}: SlideInProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case 'left':
        return { x: -100, y: 0 };
      case 'right':
        return { x: 100, y: 0 };
      case 'top':
        return { x: 0, y: -100 };
      case 'bottom':
        return { x: 0, y: 100 };
    }
  };

  return (
    <motion.div
      initial={{ 
        ...getInitialPosition(),
        opacity: 0 
      }}
      animate={{ 
        x: 0, 
        y: 0, 
        opacity: 1 
      }}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
      className={className}
      style={{ maxHeight, maxWidth, minHeight, display: 'flex', flexDirection: 'column' }}
    >
      {children}
    </motion.div>
  );
}
