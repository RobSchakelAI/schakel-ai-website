import { motion } from 'framer-motion';
import { Mail, FileSpreadsheet, FileText, MessageSquare, Database, Calendar, FileBarChart, Inbox, Phone, Users } from 'lucide-react';

export default function WorkEvolution() {
  const icons = [
    { Icon: Mail, id: 'mail', depth: 1 },
    { Icon: FileSpreadsheet, id: 'spreadsheet', depth: 0.9 },
    { Icon: FileText, id: 'document', depth: 1.1 },
    { Icon: MessageSquare, id: 'chat', depth: 0.95 },
    { Icon: Database, id: 'crm', depth: 1.05 },
    { Icon: Calendar, id: 'calendar', depth: 1 },
    { Icon: FileBarChart, id: 'analytics', depth: 0.85 },
    { Icon: Inbox, id: 'inbox', depth: 1.15 },
    { Icon: Phone, id: 'phone', depth: 0.92 },
    { Icon: Users, id: 'contacts', depth: 1.08 }
  ];

  // Chaotic starting positions - spread across the canvas
  const chaoticPositions = [
    { x: 12, y: 25 }, { x: 68, y: 62 }, { x: 22, y: 70 },
    { x: 78, y: 30 }, { x: 38, y: 48 }, { x: 58, y: 68 },
    { x: 18, y: 58 }, { x: 72, y: 42 }, { x: 48, y: 35 }, { x: 52, y: 58 }
  ];

  // Phase 1: 0-4s (chaos)
  // Phase 2: 4-7s (transition to stillness, lines appear)
  // Phase 3: 7-11s (flow - S-curve forms)
  // Phase 4: 11-14s (balance - stillness)

  return (
    <div className="w-full h-[400px] relative overflow-hidden rounded-lg bg-[#0a0a0a]" data-testid="visual-evolution">
      {/* Headline - stays visible throughout */}
      <motion.div 
        className="absolute top-8 left-0 right-0 text-center z-20 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 1, 1, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          times: [0, 0.07, 0.5, 0.93, 1],
        }}
      >
        <motion.h2 
          className="text-2xl md:text-3xl font-display font-bold tracking-tight"
          animate={{
            color: ['#ff4d4d', '#ff9966', '#ff9966', '#6EBFAA', '#5affb0', '#5affb0'],
            textShadow: [
              '0 0 0px rgba(90, 255, 176, 0)',
              '0 0 0px rgba(90, 255, 176, 0)',
              '0 0 0px rgba(90, 255, 176, 0)',
              '0 0 0px rgba(90, 255, 176, 0)',
              '0 0 20px rgba(90, 255, 176, 0.6)',
              '0 0 20px rgba(90, 255, 176, 0.6)',
            ],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            times: [0, 0.29, 0.5, 0.64, 0.79, 1],
            ease: "easeInOut",
          }}
        >
          VAN CHAOS NAAR FLOW
        </motion.h2>
        
        {/* Subline */}
        <motion.p
          className="text-sm md:text-base text-foreground/70 mt-2 px-6"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.7, 0.7, 0.7, 0.7],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            times: [0, 0.14, 0.5, 0.93, 1],
          }}
        >
          AI die werk eenvoudiger, sneller en leuker maakt.
        </motion.p>
      </motion.div>

      {/* SVG layer for connection lines and effects */}
      <svg
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradient that evolves: orange → purple → cyan → green */}
          <linearGradient id="phaseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff9966" stopOpacity="0">
              <animate
                attributeName="stopColor"
                values="#ff9966;#ff9966;#9966ff;#00ffff;#5affb0;#5affb0"
                dur="14s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stopOpacity"
                values="0;0;0.8;0.9;0.9;0"
                keyTimes="0;0.29;0.43;0.64;0.93;1"
                dur="14s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#9966ff" stopOpacity="0">
              <animate
                attributeName="stopColor"
                values="#9966ff;#9966ff;#00ffff;#5affb0;#00ffff;#9966ff"
                dur="14s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stopOpacity"
                values="0;0;0.8;0.9;0.9;0"
                keyTimes="0;0.29;0.43;0.64;0.93;1"
                dur="14s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>

          {/* Glow filters */}
          <filter id="lineGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Phase 2: Lines connecting icons (appear after chaos slows down) */}
        <g opacity="0.4">
          {/* Short connecting lines between adjacent icons */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
            const x1 = 80 + i * 80;
            const y1 = 230;
            const x2 = 160 + i * 80;
            const y2 = 230;
            
            return (
              <line
                key={`connect-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="url(#phaseGradient)"
                strokeWidth="2"
                opacity="0"
              >
                <animate
                  attributeName="opacity"
                  values="0;0;0;0.5;0.7;0.7;0"
                  keyTimes="0;0.29;0.36;0.5;0.79;0.93;1"
                  dur="14s"
                  repeatCount="indefinite"
                />
              </line>
            );
          })}
        </g>

        {/* Phase 3: S-curve flow path (glowing wave) */}
        <path
          d="M 60 230 Q 200 190, 400 230 T 740 230"
          stroke="url(#phaseGradient)"
          strokeWidth="3.5"
          fill="none"
          filter="url(#lineGlow)"
          opacity="0"
        >
          <animate
            attributeName="opacity"
            values="0;0;0;0;0.5;0.9;0.9;0"
            keyTimes="0;0.36;0.43;0.5;0.57;0.79;0.93;1"
            dur="14s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-dasharray"
            values="0 1500;1500 0"
            dur="14s"
            repeatCount="indefinite"
          />
        </path>

        {/* Phase 3-4: Pulsing nodes on the S-curve (AI coordination points) */}
        {[200, 400, 600].map((cx, i) => (
          <circle
            key={`node-${i}`}
            cx={cx}
            cy={cx === 400 ? 230 : cx === 200 ? 210 : 210}
            r="0"
            fill="#5affb0"
            opacity="0.6"
            filter="url(#softGlow)"
          >
            <animate
              attributeName="r"
              values="0;0;0;10;14;14;0"
              keyTimes="0;0.43;0.5;0.57;0.79;0.93;1"
              dur="14s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;0;0;0.5;0.7;0.7;0"
              keyTimes="0;0.43;0.5;0.57;0.79;0.93;1"
              dur="14s"
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* Phase 3-4: Data dots flowing along the S-curve */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <circle
            key={`flow-dot-${i}`}
            r="4"
            fill="#00ffff"
            filter="url(#lineGlow)"
            opacity="0"
          >
            <animateMotion
              dur="7s"
              begin={`${7 + (i * 0.7)}s`}
              repeatCount="indefinite"
              path="M 60 230 Q 200 190, 400 230 T 740 230"
            />
            <animate
              attributeName="opacity"
              values="0;0;0;0;0.8;0.8;0.8;0"
              keyTimes="0;0.43;0.5;0.57;0.64;0.86;0.93;1"
              dur="14s"
              begin={`${i * 0.7}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* Phase 4: Gentle shimmer/glans over the entire system */}
        <rect
          x="0"
          y="0"
          width="800"
          height="400"
          fill="url(#phaseGradient)"
          opacity="0"
        >
          <animate
            attributeName="opacity"
            values="0;0;0;0;0;0.08;0.12;0"
            keyTimes="0;0.64;0.71;0.79;0.86;0.9;0.93;1"
            dur="14s"
            repeatCount="indefinite"
          />
        </rect>
      </svg>

      {/* Animated icon components */}
      <div className="absolute inset-0">
        {icons.map((item, idx) => {
          const { Icon, depth } = item;
          const total = icons.length;
          
          // Final organized position on S-curve
          const organizedX = 10 + (idx / total) * 80;
          const organizedY = 52;

          // Generate chaotic movement patterns for phase 1
          const chaos1 = { x: (Math.random() - 0.5) * 40, y: (Math.random() - 0.5) * 35, rotate: Math.random() * 120 };
          const chaos2 = { x: (Math.random() - 0.5) * 35, y: (Math.random() - 0.5) * 30, rotate: Math.random() * -90 };
          const chaos3 = { x: (Math.random() - 0.5) * 30, y: (Math.random() - 0.5) * 35, rotate: Math.random() * 110 };

          return (
            <motion.div
              key={item.id}
              className="absolute"
              style={{
                left: `${chaoticPositions[idx].x}%`,
                top: `${chaoticPositions[idx].y}%`,
                zIndex: Math.floor(depth * 10),
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 1, 1, 1, 1, 1, 0.9],
                scale: [
                  0,
                  depth * 1.05,
                  depth * 0.98,
                  depth * 1.02,
                  depth * 0.95,
                  depth,
                  depth,
                  depth,
                ],
                x: [
                  '0%',
                  `${chaos1.x}%`,
                  `${chaos2.x}%`,
                  `${chaos3.x}%`,
                  '0%',
                  `${(organizedX - chaoticPositions[idx].x)}%`,
                  `${(organizedX - chaoticPositions[idx].x)}%`,
                  `${(organizedX - chaoticPositions[idx].x)}%`,
                ],
                y: [
                  '0%',
                  `${chaos1.y}%`,
                  `${chaos2.y}%`,
                  `${chaos3.y}%`,
                  '0%',
                  `${(organizedY - chaoticPositions[idx].y)}%`,
                  `${(organizedY - chaoticPositions[idx].y)}%`,
                  `${(organizedY - chaoticPositions[idx].y)}%`,
                ],
                rotate: [
                  0,
                  chaos1.rotate,
                  chaos2.rotate,
                  chaos3.rotate,
                  0,
                  0,
                  0,
                  0,
                ],
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.1, 0.2, 0.29, 0.43, 0.64, 0.93, 1],
              }}
            >
              <motion.div
                className="p-2.5 rounded-lg backdrop-blur-sm border"
                style={{
                  backgroundColor: 'rgba(10, 10, 10, 0.75)',
                }}
                animate={{
                  borderColor: [
                    'rgba(255, 77, 77, 0.5)',
                    'rgba(255, 153, 102, 0.5)',
                    'rgba(255, 153, 102, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(0, 255, 255, 0.6)',
                    'rgba(90, 255, 176, 0.7)',
                    'rgba(90, 255, 176, 0.7)',
                    'rgba(90, 255, 176, 0.5)',
                  ],
                  boxShadow: [
                    '0 0 0px rgba(255, 77, 77, 0)',
                    '0 0 12px rgba(255, 153, 102, 0.4)',
                    '0 0 12px rgba(255, 153, 102, 0.4)',
                    '0 0 15px rgba(153, 102, 255, 0.5)',
                    '0 0 18px rgba(0, 255, 255, 0.5)',
                    '0 0 20px rgba(90, 255, 176, 0.6)',
                    '0 0 20px rgba(90, 255, 176, 0.6)',
                    '0 0 15px rgba(90, 255, 176, 0.4)',
                  ],
                }}
                transition={{
                  duration: 14,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.14, 0.29, 0.43, 0.64, 0.79, 0.93, 1],
                }}
              >
                <motion.div
                  animate={{
                    color: [
                      '#ff4d4d',
                      '#ff9966',
                      '#ff9966',
                      '#9966ff',
                      '#00ffff',
                      '#5affb0',
                      '#5affb0',
                      '#5affb0',
                    ],
                  }}
                  transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.14, 0.29, 0.43, 0.64, 0.79, 0.93, 1],
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
