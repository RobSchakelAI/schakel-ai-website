export function trackEvent(eventName: string, eventData?: Record<string, string | number>) {
  if (typeof window === 'undefined') return;
  
  try {
    const umami = (window as any).umami;
    if (umami && typeof umami.track === 'function') {
      console.log('[Analytics] Tracking event:', eventName, eventData);
      if (eventData) {
        umami.track(eventName, eventData);
      } else {
        umami.track(eventName);
      }
    } else {
      console.warn('[Analytics] Umami not loaded yet');
    }
  } catch (error) {
    console.error('[Analytics] Tracking error:', error);
  }
}
