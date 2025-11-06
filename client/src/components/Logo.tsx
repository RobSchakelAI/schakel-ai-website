import { useTheme } from '@/contexts/ThemeContext';
import logoLight from '@assets/Schakel logo nieuw_1762451003084.png';
import logoDark from '@assets/schakel-logo-cropped.png';

export default function Logo({ className = "h-10" }: { className?: string }) {
  const { theme } = useTheme();
  
  return (
    <img 
      src={theme === 'light' ? logoLight : logoDark} 
      alt="Schakel AI" 
      className={className}
      style={theme === 'light' ? {
        clipPath: 'inset(37% 0 37% 0)',
        transform: 'scale(3.85)',
        objectFit: 'contain'
      } : undefined}
    />
  );
}
