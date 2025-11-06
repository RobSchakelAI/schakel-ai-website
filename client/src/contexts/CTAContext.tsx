import { createContext, useContext, useState, ReactNode } from 'react';

type CTAOrigin = 'hero' | 'contact' | null;

interface CTAContextType {
  isExpanded: boolean;
  origin: CTAOrigin;
  openCTA: (origin: CTAOrigin) => void;
  closeCTA: () => void;
}

const CTAContext = createContext<CTAContextType | undefined>(undefined);

export function CTAProvider({ children }: { children: ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [origin, setOrigin] = useState<CTAOrigin>(null);

  const openCTA = (newOrigin: CTAOrigin) => {
    setOrigin(newOrigin);
    setIsExpanded(true);
  };
  
  const closeCTA = () => {
    setIsExpanded(false);
    setTimeout(() => setOrigin(null), 300);
  };

  return (
    <CTAContext.Provider value={{ isExpanded, origin, openCTA, closeCTA }}>
      {children}
    </CTAContext.Provider>
  );
}

export function useCTA() {
  const context = useContext(CTAContext);
  if (context === undefined) {
    throw new Error('useCTA must be used within a CTAProvider');
  }
  return context;
}
