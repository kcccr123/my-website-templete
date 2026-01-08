'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface IntroContextType {
  shouldShowIntro: boolean;
  markIntroSeen: () => void;
}

const IntroContext = createContext<IntroContextType | undefined>(undefined);

export function IntroProvider({ children }: { children: ReactNode }) {
  const [shouldShowIntro, setShouldShowIntro] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if user has already seen intro this session
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    
    if (hasSeenIntro === 'true') {
      // Already seen intro this session
      setShouldShowIntro(false);
      setIsChecking(false);
      return;
    }

    // Check if this is an external navigation
    const referrer = document.referrer;
    const currentHost = window.location.hostname;
    
    // Show intro if:
    // 1. No referrer (direct navigation, bookmark, or new tab), OR
    // 2. Referrer is from a different domain
    const isExternalNavigation = !referrer || !referrer.includes(currentHost);
    
    if (isExternalNavigation) {
      setShouldShowIntro(true);
    }
    
    setIsChecking(false);
  }, []);

  const markIntroSeen = () => {
    sessionStorage.setItem('hasSeenIntro', 'true');
    setShouldShowIntro(false);
  };

  // Don't render children until we've checked intro status
  // This prevents flash of main content before intro
  if (isChecking) {
    return null;
  }

  return (
    <IntroContext.Provider value={{ shouldShowIntro, markIntroSeen }}>
      {children}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  const context = useContext(IntroContext);
  if (context === undefined) {
    throw new Error('useIntro must be used within IntroProvider');
  }
  return context;
}
