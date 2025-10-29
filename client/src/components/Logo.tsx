export default function Logo({ className = "h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Icon background - rounded square in mint */}
      <rect x="4" y="4" width="72" height="72" rx="16" fill="#6EBFAA"/>
      
      {/* Two identical thick capsule-shaped links rotated 180° from each other */}
      {/* The white S appears in the negative space between them */}
      
      {/* First link - L shape starting top-left going down then right */}
      <path
        d="M 18 18 L 18 36 L 48 36"
        stroke="white"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Second link - mirrored L shape starting bottom-right going up then left (180° rotated) */}
      <path
        d="M 62 62 L 62 44 L 32 44"
        stroke="white"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* SCHAKEL text */}
      <text 
        x="100" 
        y="45" 
        fontFamily="system-ui, -apple-system, sans-serif" 
        fontSize="32" 
        fontWeight="900"
        fill="currentColor"
        letterSpacing="-0.5"
      >
        SCHAKEL
      </text>
      
      {/* AI AGENCY text */}
      <text 
        x="100" 
        y="65" 
        fontFamily="system-ui, -apple-system, sans-serif" 
        fontSize="14" 
        fontWeight="400"
        fill="currentColor"
        letterSpacing="2"
      >
        AI AGENCY
      </text>
    </svg>
  );
}
