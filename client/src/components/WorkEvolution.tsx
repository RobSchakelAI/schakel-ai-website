import { motion } from 'framer-motion';
import { Mail, FileSpreadsheet, FileText, MessageSquare, Database, Calendar, Cloud, Settings } from 'lucide-react';

export default function WorkEvolution() {
  // 8 workflow icons
  const icons = [
    { Icon: Mail, id: 'mail' },
    { Icon: MessageSquare, id: 'chat' },
    { Icon: FileText, id: 'document' },
    { Icon: FileSpreadsheet, id: 'spreadsheet' },
    { Icon: Settings, id: 'gear' },
    { Icon: Cloud, id: 'cloud' },
    { Icon: Database, id: 'crm' },
    { Icon: Calendar, id: 'calendar' }
  ];

  const total = icons.length;

  // Chaotic starting positions - spread randomly across canvas
  const chaoticPositions = [
    { x: 15, y: 30 }, { x: 70, y: 60 }, { x: 25, y: 70 },
    { x: 75, y: 35 }, { x: 40, y: 45 }, { x: 60, y: 65 },
    { x: 20, y: 55 }, { x: 80, y: 50 }
  ];

  // Calculate circle/oval positions for phase 3 (centered, radius-based)
  const getCirclePosition = (index: number, total: number) => {
    const centerX = 50; // center of canvas
    const centerY = 57; // slightly below center for better composition
    const radiusX = 35; // horizontal radius
    const radiusY = 25; // vertical radius (oval)
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2; // start from top
    
    return {
      x: centerX + radiusX * Math.cos(angle),
      y: centerY + radiusY * Math.sin(angle)
    };
  };

  return (
    <div className="w-full h-[400px] relative overflow-hidden rounded-lg bg-[#0a0a0a]" data-testid="visual-evolution">
      {/* Headline - stays visible and stable throughout */}
      <div className="absolute top-8 left-0 right-0 text-center z-20 pointer-events-none">
        <motion.h2 
          className="text-2xl md:text-3xl font-display font-bold tracking-tight"
          animate={{
            color: ['#ff4d4d', '#ff9966', '#ff9966', '#6EBFAA', '#6EBFAA', '#6EBFAA'],
            textShadow: [
              '0 0 0px rgba(110, 191, 170, 0)',
              '0 0 0px rgba(110, 191, 170, 0)',
              '0 0 0px rgba(110, 191, 170, 0)',
              '0 0 0px rgba(110, 191, 170, 0)',
              '0 0 25px rgba(110, 191, 170, 0.7)',
              '0 0 25px rgba(110, 191, 170, 0.7)',
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            times: [0, 0.27, 0.47, 0.67, 0.8, 1],
            ease: "easeInOut",
          }}
        >
          Van chaos naar flow
        </motion.h2>
        
        <p className="text-sm md:text-base text-foreground/70 mt-2 px-6">
          AI die werk eenvoudiger, sneller en leuker maakt.
        </p>
      </div>

      {/* SVG layer for connection lines */}
      <svg
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradient from red/orange → brand green */}
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff9966" stopOpacity="0">
              <animate
                attributeName="stopColor"
                values="#ff9966;#ff9966;#ff9966;#6EBFAA;#6EBFAA;#6EBFAA"
                dur="15s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stopOpacity"
                values="0;0;0.8;0.9;0.9;0.9"
                keyTimes="0;0.27;0.35;0.47;0.87;1"
                dur="15s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#6EBFAA" stopOpacity="0">
              <animate
                attributeName="stopColor"
                values="#ff9966;#ff9966;#6EBFAA;#6EBFAA;#6EBFAA;#ff9966"
                dur="15s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stopOpacity"
                values="0;0;0.8;0.9;0.9;0.9"
                keyTimes="0;0.27;0.35;0.47;0.87;1"
                dur="15s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>

          {/* Soft glow filter */}
          <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Pulse filter for transitie phase */}
          <filter id="pulse" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Phase 2-3-4: Connection lines between icons in circle/oval formation */}
        <g>
          {icons.map((_, i) => {
            const nextIdx = (i + 1) % total;
            const pos1 = getCirclePosition(i, total);
            const pos2 = getCirclePosition(nextIdx, total);
            
            return (
              <line
                key={`line-${i}`}
                x1={pos1.x * 8}
                y1={pos1.y * 4}
                x2={pos2.x * 8}
                y2={pos2.y * 4}
                stroke="url(#connectionGradient)"
                strokeWidth="0"
                filter="url(#pulse)"
              >
                {/* Lines appear in phase 2, after icons slow down */}
                <animate
                  attributeName="strokeWidth"
                  values="0;0;0;2.5;2.5;2.5"
                  keyTimes="0;0.27;0.3;0.35;0.87;1"
                  dur="15s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0;0;0;0.7;0.8;0.8"
                  keyTimes="0;0.27;0.3;0.35;0.87;1"
                  dur="15s"
                  repeatCount="indefinite"
                />
              </line>
            );
          })}
        </g>

        {/* Phase 3-4: Nodes at connection points (where icons sit on circle) */}
        {icons.map((_, i) => {
          const pos = getCirclePosition(i, total);
          
          return (
            <circle
              key={`node-${i}`}
              cx={pos.x * 8}
              cy={pos.y * 4}
              r="0"
              fill="#6EBFAA"
              opacity="0.5"
              filter="url(#softGlow)"
            >
              <animate
                attributeName="r"
                values="0;0;0;0;8;10;10"
                keyTimes="0;0.35;0.4;0.47;0.53;0.73;1"
                dur="15s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0;0;0;0;0.5;0.6;0.6"
                keyTimes="0;0.35;0.4;0.47;0.53;0.73;1"
                dur="15s"
                repeatCount="indefinite"
              />
            </circle>
          );
        })}

        {/* Phase 3-4: Data dots flowing along the circle */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const startAngle = (i / 6) * 360;
          const pathCommands = `
            M ${50 + 35 * Math.cos((startAngle - 90) * Math.PI / 180)} ${57 + 25 * Math.sin((startAngle - 90) * Math.PI / 180)}
            A 35 25 0 1 1 ${50 + 35 * Math.cos((startAngle - 89) * Math.PI / 180)} ${57 + 25 * Math.sin((startAngle - 89) * Math.PI / 180)}
          `.replace(/\s+/g, ' ').trim();
          
          return (
            <circle
              key={`dot-${i}`}
              r="3.5"
              fill="#6EBFAA"
              filter="url(#softGlow)"
              opacity="0"
            >
              <animateMotion
                dur="8s"
                begin={`${7 + i * 1.2}s`}
                repeatCount="indefinite"
                path={`M ${(50 + 35 * Math.cos(-Math.PI/2)) * 8} ${(57 + 25 * Math.sin(-Math.PI/2)) * 4}
                       A ${35 * 8} ${25 * 4} 0 1 1 ${(50 + 35 * Math.cos(-Math.PI/2 + 0.01)) * 8} ${(57 + 25 * Math.sin(-Math.PI/2 + 0.01)) * 4}`}
              />
              <animate
                attributeName="opacity"
                values="0;0;0;0;0.8;0.8;0.8"
                keyTimes="0;0.4;0.45;0.47;0.53;0.87;1"
                dur="15s"
                begin={`${i * 1.2}s`}
                repeatCount="indefinite"
              />
            </circle>
          );
        })}

        {/* Phase 4: Breathing glow overlay (3-4s cycle within the final phase) */}
        <ellipse
          cx="400"
          cy="228"
          rx="280"
          ry="100"
          fill="none"
          stroke="#6EBFAA"
          strokeWidth="0"
          opacity="0"
        >
          <animate
            attributeName="strokeWidth"
            values="0;0;0;0;0;0;15;15"
            keyTimes="0;0.6;0.7;0.72;0.73;0.75;0.87;1"
            dur="15s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;0;0;0;0;0;0.15;0.25;0.15;0.15"
            keyTimes="0;0.6;0.7;0.72;0.73;0.75;0.8;0.85;0.9;1"
            dur="15s"
            repeatCount="indefinite"
          />
        </ellipse>
      </svg>

      {/* Animated icon components */}
      <div className="absolute inset-0">
        {icons.map((item, idx) => {
          const { Icon } = item;
          const circlePos = getCirclePosition(idx, total);

          // Generate unique chaotic movement for phase 1
          const chaos = [
            { x: (Math.random() - 0.5) * 50, y: (Math.random() - 0.5) * 40, rotate: Math.random() * 180 - 90 },
            { x: (Math.random() - 0.5) * 45, y: (Math.random() - 0.5) * 35, rotate: Math.random() * 180 - 90 },
            { x: (Math.random() - 0.5) * 40, y: (Math.random() - 0.5) * 38, rotate: Math.random() * 180 - 90 },
          ];

          return (
            <motion.div
              key={item.id}
              className="absolute"
              style={{
                left: `${chaoticPositions[idx].x}%`,
                top: `${chaoticPositions[idx].y}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 1, 1, 1, 1, 1],
                scale: [0, 1.1, 1.05, 1, 1, 1, 1],
                x: [
                  '0%',
                  `${chaos[0].x}%`,
                  `${chaos[1].x}%`,
                  `${chaos[2].x}%`,
                  '0%',
                  `${(circlePos.x - chaoticPositions[idx].x)}%`,
                  `${(circlePos.x - chaoticPositions[idx].x)}%`,
                ],
                y: [
                  '0%',
                  `${chaos[0].y}%`,
                  `${chaos[1].y}%`,
                  `${chaos[2].y}%`,
                  '0%',
                  `${(circlePos.y - chaoticPositions[idx].y)}%`,
                  `${(circlePos.y - chaoticPositions[idx].y)}%`,
                ],
                rotate: [
                  0,
                  chaos[0].rotate,
                  chaos[1].rotate,
                  chaos[2].rotate,
                  0,
                  0,
                  0,
                ],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.1, 0.18, 0.27, 0.35, 0.47, 1],
              }}
            >
              <motion.div
                className="p-2.5 rounded-lg backdrop-blur-sm border"
                style={{
                  backgroundColor: 'rgba(10, 10, 10, 0.8)',
                }}
                animate={{
                  borderColor: [
                    'rgba(255, 77, 77, 0.5)',
                    'rgba(255, 153, 102, 0.5)',
                    'rgba(255, 153, 102, 0.5)',
                    'rgba(110, 191, 170, 0.6)',
                    'rgba(110, 191, 170, 0.7)',
                    'rgba(110, 191, 170, 0.7)',
                    'rgba(110, 191, 170, 0.7)',
                  ],
                  boxShadow: [
                    '0 0 8px rgba(255, 77, 77, 0.3)',
                    '0 0 12px rgba(255, 153, 102, 0.4)',
                    '0 0 12px rgba(255, 153, 102, 0.4)',
                    '0 0 15px rgba(110, 191, 170, 0.5)',
                    '0 0 18px rgba(110, 191, 170, 0.6)',
                    '0 0 18px rgba(110, 191, 170, 0.6)',
                    '0 0 18px rgba(110, 191, 170, 0.6)',
                  ],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.13, 0.27, 0.47, 0.67, 0.87, 1],
                }}
              >
                <motion.div
                  animate={{
                    color: [
                      '#ff4d4d',
                      '#ff9966',
                      '#ff9966',
                      '#6EBFAA',
                      '#6EBFAA',
                      '#6EBFAA',
                      '#6EBFAA',
                    ],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.13, 0.27, 0.47, 0.67, 0.87, 1],
                  }}
                >
                  <Icon className="w-7 h-7" />
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
