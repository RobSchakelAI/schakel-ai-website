import { useTheme } from '@/contexts/ThemeContext';
import logoLight from '@assets/Schakel logo nieuw_1762451003084.png';
import logoDark from '@assets/schakel-logo-cropped.png';

export default function Logo({ className = "h-10" }: { className?: string }) {
  const { theme } = useTheme();
  
  if (theme === 'light') {
    return (
      <div className={`${className} overflow-hidden flex items-center justify-center`}>
        <img 
          src={logoLight} 
          alt="Schakel AI" 
          className="h-full"
          style={{
            clipPath: 'inset(35% 0 35% 0)',
            transform: 'scale(3.33)',
            transformOrigin: 'center center'
          }}
        />
      </div>
    );
  }
  
  return (
    <img 
      src={logoDark} 
      alt="Schakel AI" 
      className={className}
    />
  );
}
