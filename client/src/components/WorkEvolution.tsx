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
  const TOTAL_DURATION = 17;

  // Random starting positions spread across canvas
  const startPositions = [
    { x: 15, y: 30 }, { x: 70, y: 60 }, { x: 25, y: 70 },
    { x: 75, y: 35 }, { x: 40, y: 45 }, { x: 60, y: 65 },
    { x: 20, y: 55 }, { x: 80, y: 50 }
  ];

  // Calculate circle/oval positions for final balanced system
  const getCirclePosition = (index: number, total: number) => {
    const centerX = 50;
    const centerY = 57;
    const radiusX = 35;
    const radiusY = 25;
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    
    return {
      x: centerX + radiusX * Math.cos(angle),
      y: centerY + radiusY * Math.sin(angle)
    };
  };

  // Phase subtitles
  const phases = [
    { title: "Handmatig & gefragmenteerd", time: [0, 0.35] },      // 0-6s
    { title: "AI wordt geïntroduceerd", time: [0.35, 0.53] },      // 6-9s
    { title: "Processen komen in balans", time: [0.53, 0.76] },    // 9-13s
    { title: "Intelligente rust", time: [0.76, 1] }                // 13-17s
  ];

  return (
    <div className="w-full h-[400px] relative overflow-hidden rounded-lg bg-[#0a0a0a]" data-testid="visual-evolution">
      {/* Main headline - stays visible throughout */}
      <div className="absolute top-6 left-0 right-0 text-center z-20 pointer-events-none">
        <motion.h2 
          className="text-2xl md:text-3xl font-display font-bold tracking-tight"
          animate={{
            color: ['#ff4d4d', '#ff4d4d', '#ff9966', '#6EBFAA', '#6EBFAA'],
          }}
          transition={{
            duration: TOTAL_DURATION,
            repeat: Infinity,
            times: [0, 0.35, 0.53, 0.76, 1],
            ease: "easeInOut",
          }}
        >
          Van chaos naar flow
        </motion.h2>
        
        {/* Dynamic subtitle that changes per phase */}
        <div className="relative h-6 mt-2">
          {phases.map((phase, idx) => (
            <motion.p
              key={idx}
              className="absolute left-0 right-0 text-sm md:text-base text-foreground/70 px-6"
              animate={{
                opacity: [
                  idx === 0 ? 1 : 0,
                  idx === 0 ? 1 : 0,
                  idx === 1 ? 1 : 0,
                  idx === 2 ? 1 : 0,
                  idx === 3 ? 1 : 0,
                ],
              }}
              transition={{
                duration: TOTAL_DURATION,
                repeat: Infinity,
                times: [0, 0.35, 0.53, 0.76, 1],
              }}
            >
              {phase.title}
            </motion.p>
          ))}
        </div>
      </div>

      {/* SVG layer for connection lines and effects */}
      <svg
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradient: red → orange → green */}
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff9966" stopOpacity="0">
              <animate
                attributeName="stopColor"
                values="#ff9966;#ff9966;#ff9966;#6EBFAA;#6EBFAA"
                dur="17s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stopOpacity"
                values="0;0;0.85;0.9;0.9"
                keyTimes="0;0.35;0.44;0.76;1"
                dur="17s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#6EBFAA" stopOpacity="0">
              <animate
                attributeName="stopColor"
                values="#ff9966;#ff9966;#6EBFAA;#6EBFAA;#ff9966"
                dur="17s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stopOpacity"
                values="0;0;0.85;0.9;0.9"
                keyTimes="0;0.35;0.44;0.76;1"
                dur="17s"
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

          {/* AI introduction marker - brief flash/pulse */}
          <radialGradient id="aiIntro">
            <stop offset="0%" stopColor="#ff9966" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ff9966" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Phase 2: AI introduction - brief central pulse */}
        <circle cx="400" cy="228" r="0" fill="url(#aiIntro)">
          <animate
            attributeName="r"
            values="0;0;80;120;0;0"
            keyTimes="0;0.35;0.37;0.39;0.41;1"
            dur="17s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Phase 2-3-4: Connection lines between icons in circle formation */}
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
                filter="url(#softGlow)"
              >
                {/* Lines appear AFTER icons stop in phase 2 */}
                <animate
                  attributeName="strokeWidth"
                  values="0;0;0;2.5;2.5;2.5"
                  keyTimes="0;0.35;0.41;0.44;0.88;1"
                  dur="17s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0;0;0;0.75;0.8;0.8"
                  keyTimes="0;0.35;0.41;0.44;0.88;1"
                  dur="17s"
                  repeatCount="indefinite"
                />
              </line>
            );
          })}
        </g>

        {/* Phase 3-4: Nodes at connection points */}
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
                keyTimes="0;0.44;0.5;0.53;0.59;0.76;1"
                dur="17s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0;0;0;0;0.5;0.6;0.6"
                keyTimes="0;0.44;0.5;0.53;0.59;0.76;1"
                dur="17s"
                repeatCount="indefinite"
              />
            </circle>
          );
        })}

        {/* Phase 3-4: Data dots flowing along circle */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle
            key={`dot-${i}`}
            r="3.5"
            fill="#6EBFAA"
            filter="url(#softGlow)"
            opacity="0"
          >
            <animateMotion
              dur="8s"
              begin={`${9 + i * 1.2}s`}
              repeatCount="indefinite"
              path={`M ${(50 + 35 * Math.cos(-Math.PI/2)) * 8} ${(57 + 25 * Math.sin(-Math.PI/2)) * 4}
                     A ${35 * 8} ${25 * 4} 0 1 1 ${(50 + 35 * Math.cos(-Math.PI/2 + 0.01)) * 8} ${(57 + 25 * Math.sin(-Math.PI/2 + 0.01)) * 4}`}
            />
            <animate
              attributeName="opacity"
              values="0;0;0;0;0.8;0.8;0.8"
              keyTimes="0;0.5;0.52;0.53;0.59;0.88;1"
              dur="17s"
              begin={`${i * 1.2}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* Phase 4: Gentle breathing pulse overlay */}
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
            values="0;0;0;0;12;18;12;12"
            keyTimes="0;0.7;0.74;0.76;0.8;0.85;0.9;1"
            dur="17s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;0;0;0;0.12;0.2;0.12;0.12"
            keyTimes="0;0.7;0.74;0.76;0.8;0.85;0.9;1"
            dur="17s"
            repeatCount="indefinite"
          />
        </ellipse>
      </svg>

      {/* Animated icon components */}
      <div className="absolute inset-0">
        {icons.map((item, idx) => {
          const { Icon } = item;
          const circlePos = getCirclePosition(idx, total);

          // EXTREME chaos movements - each icon gets unique crazy path
          const chaosPatterns = [
            // Icon 0: Fast left to right across screen
            [
              { x: -80, y: 10, rotate: 180 },
              { x: 100, y: -15, rotate: 360 },
              { x: -60, y: 20, rotate: 540 },
            ],
            // Icon 1: Diagonal bottom-left to top-right super fast
            [
              { x: -70, y: 80, rotate: -90 },
              { x: 120, y: -70, rotate: 270 },
              { x: -50, y: 60, rotate: 450 },
            ],
            // Icon 2: Vertical - bottom to top
            [
              { x: 5, y: 90, rotate: 120 },
              { x: -10, y: -80, rotate: 300 },
              { x: 15, y: 70, rotate: 480 },
            ],
            // Icon 3: Wild circular motion
            [
              { x: 80, y: 40, rotate: 240 },
              { x: -90, y: -50, rotate: -120 },
              { x: 100, y: 60, rotate: 360 },
            ],
            // Icon 4: Fast horizontal back and forth
            [
              { x: 110, y: -20, rotate: 180 },
              { x: -100, y: 25, rotate: 360 },
              { x: 90, y: -15, rotate: 540 },
            ],
            // Icon 5: Diagonal top-left to bottom-right
            [
              { x: -75, y: -60, rotate: 90 },
              { x: 95, y: 80, rotate: 270 },
              { x: -65, y: -50, rotate: 450 },
            ],
            // Icon 6: Erratic zigzag
            [
              { x: -50, y: 30, rotate: 200 },
              { x: 80, y: -40, rotate: -100 },
              { x: -70, y: 50, rotate: 400 },
            ],
            // Icon 7: Random all directions
            [
              { x: 60, y: -70, rotate: 150 },
              { x: -85, y: 65, rotate: 330 },
              { x: 75, y: -55, rotate: 510 },
            ],
          ];

          const chaos = chaosPatterns[idx];

          return (
            <motion.div
              key={item.id}
              className="absolute"
              style={{
                left: `${startPositions[idx].x}%`,
                top: `${startPositions[idx].y}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 1, 1, 1, 1, 1],
                scale: [0, 1.2, 1.15, 1.1, 1, 1, 1],
                x: [
                  '0%',
                  `${chaos[0].x}%`,
                  `${chaos[1].x}%`,
                  `${chaos[2].x}%`,
                  '0%',
                  `${(circlePos.x - startPositions[idx].x)}%`,
                  `${(circlePos.x - startPositions[idx].x)}%`,
                ],
                y: [
                  '0%',
                  `${chaos[0].y}%`,
                  `${chaos[1].y}%`,
                  `${chaos[2].y}%`,
                  '0%',
                  `${(circlePos.y - startPositions[idx].y)}%`,
                  `${(circlePos.y - startPositions[idx].y)}%`,
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
                duration: TOTAL_DURATION,
                repeat: Infinity,
                ease: idx % 2 === 0 ? "linear" : "easeInOut", // Mix of speeds
                times: [0, 0.12, 0.24, 0.35, 0.41, 0.53, 1],
              }}
            >
              <motion.div
                className="p-2.5 rounded-lg backdrop-blur-sm border"
                style={{
                  backgroundColor: 'rgba(10, 10, 10, 0.8)',
                }}
                animate={{
                  borderColor: [
                    'rgba(255, 77, 77, 0.6)',
                    'rgba(255, 77, 77, 0.6)',
                    'rgba(255, 153, 102, 0.6)',
                    'rgba(110, 191, 170, 0.7)',
                    'rgba(110, 191, 170, 0.7)',
                  ],
                  boxShadow: [
                    '0 0 10px rgba(255, 77, 77, 0.4)',
                    '0 0 10px rgba(255, 77, 77, 0.4)',
                    '0 0 12px rgba(255, 153, 102, 0.4)',
                    '0 0 16px rgba(110, 191, 170, 0.6)',
                    '0 0 16px rgba(110, 191, 170, 0.6)',
                  ],
                }}
                transition={{
                  duration: TOTAL_DURATION,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.35, 0.53, 0.76, 1],
                }}
              >
                <motion.div
                  animate={{
                    color: [
                      '#ff4d4d',
                      '#ff4d4d',
                      '#ff9966',
                      '#6EBFAA',
                      '#6EBFAA',
                    ],
                  }}
                  transition={{
                    duration: TOTAL_DURATION,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.35, 0.53, 0.76, 1],
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
