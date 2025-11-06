import logoImg from '@assets/schakel-logo-cropped.png';

export default function Logo({ className = "h-10" }: { className?: string }) {
  return (
    <img 
      src={logoImg} 
      alt="Schakel AI Agency" 
      className={className}
    />
  );
}
