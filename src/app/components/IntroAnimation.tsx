'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntro } from '../utils/IntroContext';

interface IntroAnimationProps {
  children: React.ReactNode;
}

export default function IntroAnimation({ children }: IntroAnimationProps) {
  const { shouldShowIntro, markIntroSeen } = useIntro();
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  
  const fullText = "Hi my name is Kevin";
  const typingSpeed = 80; // milliseconds per character
  const pauseBeforeFade = 800; // pause after typing completes

  useEffect(() => {
    if (!shouldShowIntro) {
      setIsComplete(true);
      return;
    }

    let currentIndex = 0;
    
    // Typing animation
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        
        // After typing completes, wait then fade out
        setTimeout(() => {
          setIsComplete(true);
          markIntroSeen();
        }, pauseBeforeFade);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [shouldShowIntro, markIntroSeen]);

  // If intro should not show or already completed, just return children
  if (!shouldShowIntro || isComplete) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="intro"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      >
        <div className="text-4xl md:text-5xl lg:text-6xl font-sans text-white">
          {displayedText}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
            className="inline-block w-1 h-8 md:h-10 lg:h-12 bg-white ml-1 align-middle"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
