import { useTheme } from '@/contexts/ThemeContext';
import logoLight from '@assets/Schakel logo nieuw_1762451003084.png';
import logoDark from '@assets/schakel-logo-cropped.png';

export default function Logo({ className = "h-10" }: { className?: string }) {
  const { theme } = useTheme();
  
  return (
    <div className={`${className} overflow-hidden relative`}>
      <img 
        src={theme === 'light' ? logoLight : logoDark} 
        alt="Schakel AI" 
        className="w-full"
        style={{
          transform: theme === 'light' ? 'scale(1.4) translateY(-1px)' : 'none',
          objectFit: 'contain'
        }}
      />
    </div>
  );
}
