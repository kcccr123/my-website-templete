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

const segmentText = (text: string) => {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
    return Array.from(segmenter.segment(text), ({ segment }) => segment);
  }

  return Array.from(text);
};

function TypedTextContent({ 
  text, 
  typingSpeed = 80, 
  className = '',
  textClassName = '',
  cursorClassName = '',
  showCursor = true,
  onComplete
}: TypedTextProps) {
  const segments = segmentText(text);
  const [visibleSegments, setVisibleSegments] = useState(0);
  const displayedText = segments.slice(0, visibleSegments).join('');
  const isComplete = visibleSegments >= segments.length;

  useEffect(() => {
    if (segments.length === 0) {
      onComplete?.();
      return;
    }

    const typingInterval = window.setInterval(() => {
      setVisibleSegments((current) => {
        const next = current + 1;

        if (next >= segments.length) {
          window.clearInterval(typingInterval);
          onComplete?.();
          return segments.length;
        }

        return next;
      });
    }, typingSpeed);

    return () => window.clearInterval(typingInterval);
  }, [segments.length, typingSpeed, onComplete]);

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

export default function TypedText(props: TypedTextProps) {
  return <TypedTextContent key={props.text} {...props} />;
}
