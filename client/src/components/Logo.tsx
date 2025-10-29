export default function Logo({ className = "h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Icon background - rounded square in mint */}
      <rect x="4" y="4" width="72" height="72" rx="16" fill="#6EBFAA"/>
      
      {/* Two identical link/chain shapes rotated 180° from each other */}
      {/* The white S appears in the negative space between them */}
      
      {/* First link shape - top right to bottom left curve */}
      <path
        d="M 52 16 
           L 64 16 
           Q 68 16, 68 20
           L 68 32
           Q 68 36, 64 36
           L 40 36
           Q 36 36, 36 40
           L 36 52
           Q 36 56, 32 56
           L 20 56"
        stroke="white"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Second link shape - rotated 180° (bottom left to top right) */}
      <path
        d="M 28 64
           L 16 64
           Q 12 64, 12 60
           L 12 48
           Q 12 44, 16 44
           L 40 44
           Q 44 44, 44 40
           L 44 28
           Q 44 24, 48 24
           L 60 24"
        stroke="white"
        strokeWidth="10"
        strokeLinecap="round"
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
