import { useEffect } from 'react';

export function useScrollTracking() {
  useEffect(() => {
    const sections = ['vision', 'services', 'approach', 'about', 'contact'];
    const trackedSections = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const sectionId = entry.target.id;
            
            if (!trackedSections.has(sectionId)) {
              trackedSections.add(sectionId);
              
              if (typeof window !== 'undefined' && (window as any).umami) {
                (window as any).umami.track('section-view', { 
                  section: sectionId,
                  scrollDepth: Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100)
                });
              }
            }
          }
        });
      },
      {
        threshold: [0.5],
        rootMargin: '0px'
      }
    );

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);
}
