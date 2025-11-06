import logoImg from '@assets/Logo INVERTED NB PNG GESNEDEN_1762431235487.png';

export default function Logo({ className = "h-10" }: { className?: string }) {
  return (
    <img 
      src={logoImg} 
      alt="Schakel AI Agency" 
      className={className}
    />
  );
}
