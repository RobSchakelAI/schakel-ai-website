export default function Logo({ className = "h-10" }: { className?: string }) {
  return (
    <img 
      src="/logo.jpg" 
      alt="Schakel AI - AI Agency" 
      className={className}
    />
  );
}
