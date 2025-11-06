import { createContext, useContext, useState, ReactNode } from 'react';

interface CTAContextType {
  isExpanded: boolean;
  openCTA: () => void;
  closeCTA: () => void;
}

const CTAContext = createContext<CTAContextType | undefined>(undefined);

export function CTAProvider({ children }: { children: ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const openCTA = () => setIsExpanded(true);
  const closeCTA = () => setIsExpanded(false);

  return (
    <CTAContext.Provider value={{ isExpanded, openCTA, closeCTA }}>
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
