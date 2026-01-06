'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypedTextProps {
  text: string;
  typingSpeed?: number;
  className?: string;
  textClassName?: string;
  cursorClassName?: string;
  showCursor?: boolean;
  onComplete?: () => void;
}

export default function TypedText({ 
  text, 
  typingSpeed = 80, 
  className = '',
  textClassName = '',
  cursorClassName = '',
  showCursor = true,
  onComplete
}: TypedTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsComplete(true);
        onComplete?.();
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [text, typingSpeed, onComplete]);

  return (
    <div className={className}>
      <span className={textClassName}>{displayedText}</span>
      {showCursor && (
        <motion.span
          animate={{ opacity: isComplete ? 0 : [1, 0] }}
          transition={{ 
            duration: 0.8, 
            repeat: isComplete ? 0 : Infinity, 
            repeatType: "reverse" 
          }}
          className={`inline-block w-0.5 h-[1em] bg-white ml-1 align-middle ${cursorClassName}`}
        />
      )}
    </div>
  );
}
