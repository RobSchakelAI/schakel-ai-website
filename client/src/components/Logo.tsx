import logoImg from '@assets/schakel-logo.png';

export default function Logo({ className = "h-10" }: { className?: string }) {
  return (
    <img 
      src={logoImg} 
      alt="Schakel AI - AI Agency" 
      className={className}
    />
  );
}
