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
        clipPath: 'inset(20% 0 20% 0)',
        transform: 'scale(1.67)',
        objectFit: 'contain'
      } : undefined}
    />
  );
}
