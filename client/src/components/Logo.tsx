import { useTheme } from '@/contexts/ThemeContext';

export default function Logo({ className = "h-10" }: { className?: string }) {
  const { theme } = useTheme();
  
  return (
    <picture>
      {theme === 'light' ? (
        <>
          <source srcSet="/logo-light.webp" type="image/webp" />
          <img 
            src="/logo-light.png" 
            alt="Schakel AI" 
            className={className}
            width={320}
            height={90}
            fetchPriority="high"
          />
        </>
      ) : (
        <>
          <source srcSet="/logo-dark.webp" type="image/webp" />
          <img 
            src="/logo-dark.png" 
            alt="Schakel AI" 
            className={className}
            width={320}
            height={90}
            fetchPriority="high"
          />
        </>
      )}
    </picture>
  );
}
