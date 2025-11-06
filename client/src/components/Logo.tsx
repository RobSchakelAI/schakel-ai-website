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
        clipPath: 'inset(32% 0 32% 0)',
        transform: 'scale(2.78)',
        objectFit: 'contain'
      } : undefined}
    />
  );
}
