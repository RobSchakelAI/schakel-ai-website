import { useTheme } from '@/contexts/ThemeContext';
import logoLight from '@assets/schakel-logo-light-cropped.png';
import logoDark from '@assets/schakel-logo-cropped.png';

export default function Logo({ className = "h-10" }: { className?: string }) {
  const { theme } = useTheme();
  
  return (
    <img 
      src={theme === 'light' ? logoLight : logoDark} 
      alt="Schakel AI" 
      className={className}
      loading="lazy"
    />
  );
}
