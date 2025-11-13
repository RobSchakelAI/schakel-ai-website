import { useTheme } from '@/contexts/ThemeContext';

export default function Logo({ className = "h-10" }: { className?: string }) {
  const { theme } = useTheme();
  
  return (
    <img 
      src={theme === 'light' ? '/logo-light.png' : '/logo-dark.png'}
      alt="Schakel AI" 
      className={className}
      width={320}
      height={90}
    />
  );
}
