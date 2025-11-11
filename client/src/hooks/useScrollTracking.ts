import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

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
              const scrollDepth = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
              trackEvent('section-view', { section: sectionId, scrollDepth });
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
