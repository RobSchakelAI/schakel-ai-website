import logoImg from '@assets/Schakel logo inverted nieuw_1762440951065.png';

export default function Logo({ className = "h-10" }: { className?: string }) {
  return (
    <img 
      src={logoImg} 
      alt="Schakel AI Agency" 
      className={className}
    />
  );
}
