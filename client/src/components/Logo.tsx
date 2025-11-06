import { useTheme } from '@/contexts/ThemeContext';
import logoNormal from '@assets/schakel-logo-cropped.png';
import logoInverted from '@assets/Schakel logo inverted nieuw_1762440951065.png';

export default function Logo({ className = "h-10" }: { className?: string }) {
  const { theme } = useTheme();
  
  // Light theme = witte achtergrond → zwarte letters (normal)
  // Dark theme = donkere achtergrond → witte letters (inverted)
  return (
    <img 
      src={theme === 'light' ? logoNormal : logoInverted} 
      alt="Schakel AI" 
      className={className}
    />
  );
}
