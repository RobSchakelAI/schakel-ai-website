export default function Logo({ className = "h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Icon background - rounded square in mint */}
      <rect x="4" y="4" width="72" height="72" rx="16" fill="#6EBFAA"/>
      
      {/* S shape - two parallel bars forming the S */}
      <g transform="translate(40, 40)">
        {/* Top-left to bottom-right thick bar */}
        <rect 
          x="-18" 
          y="-24" 
          width="12" 
          height="48" 
          rx="2"
          fill="white"
          transform="rotate(-45)"
        />
        
        {/* Parallel thinner bar */}
        <rect 
          x="-8" 
          y="-24" 
          width="8" 
          height="48" 
          rx="2"
          fill="white"
          transform="rotate(-45)"
        />
      </g>
      
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
