import { motion, AnimatePresence } from 'framer-motion';
import { Mail, FileSpreadsheet, FileText, MessageSquare, Database, Calendar, FileBarChart, Inbox, Phone, Users } from 'lucide-react';

export default function WorkEvolution() {
  const icons = [
    { Icon: Mail, id: 'mail', depth: 1 },
    { Icon: FileSpreadsheet, id: 'spreadsheet', depth: 0.8 },
    { Icon: FileText, id: 'document', depth: 1.2 },
    { Icon: MessageSquare, id: 'chat', depth: 0.9 },
    { Icon: Database, id: 'crm', depth: 1.1 },
    { Icon: Calendar, id: 'calendar', depth: 1 },
    { Icon: FileBarChart, id: 'analytics', depth: 0.85 },
    { Icon: Inbox, id: 'inbox', depth: 1.15 },
    { Icon: Phone, id: 'phone', depth: 0.95 },
    { Icon: Users, id: 'contacts', depth: 1.05 }
  ];

  // Chaotic starting positions - more spread out for drama
  const chaoticPositions = [
    { x: 10, y: 20 }, { x: 70, y: 65 }, { x: 20, y: 75 },
    { x: 80, y: 25 }, { x: 35, y: 45 }, { x: 60, y: 70 },
    { x: 15, y: 55 }, { x: 75, y: 40 }, { x: 45, y: 30 }, { x: 55, y: 60 }
  ];

  return (
    <div className="w-full h-[400px] relative overflow-hidden rounded-lg bg-[#0b0b0b]" data-testid="visual-evolution">
      {/* Main headline - large and prominent at top */}
      <motion.div 
        className="absolute top-8 left-0 right-0 text-center z-20"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 1, 1, 1, 0.8],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          times: [0, 0.1, 0.54, 0.77, 0.85, 1],
        }}
      >
        <motion.h2 
          className="text-2xl md:text-3xl font-display font-bold tracking-tight"
          animate={{
            color: ['#ef4444', '#f97316', '#6EBFAA', '#2C9880', '#2C9880', '#ef4444'],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            times: [0, 0.23, 0.54, 0.77, 0.92, 1],
          }}
        >
          <motion.span
            animate={{ opacity: [1, 1, 1, 0, 0, 1] }}
            transition={{
              duration: 13,
              repeat: Infinity,
              times: [0, 0.77, 0.84, 0.92, 0.99, 1],
            }}
          >
            VAN CHAOS NAAR FLOW
          </motion.span>
          <motion.span
            className="absolute left-0 right-0"
            animate={{ opacity: [0, 0, 0, 1, 1, 0] }}
            transition={{
              duration: 13,
              repeat: Infinity,
              times: [0, 0.77, 0.84, 0.85, 0.92, 1],
            }}
          >
            FLOW ACHIEVED
          </motion.span>
        </motion.h2>
        
        {/* Subline */}
        <motion.p
          className="text-sm md:text-base text-foreground/70 mt-2 px-6"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 1, 1, 0],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            times: [0, 0.15, 0.77, 0.84, 1],
          }}
        >
          AI die werk eenvoudiger, sneller en leuker maakt.
        </motion.p>
      </motion.div>

      {/* SVG background with connection lines and orbs */}
      <svg
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Dynamic gradient from chaos (red/orange) to order (cyan/green) */}
          <linearGradient id="evolutionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9">
              <animate
                attributeName="stopColor"
                values="#ef4444;#f97316;#6EBFAA;#2C9880;#10b981;#ef4444"
                dur="13s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#f97316" stopOpacity="0.9">
              <animate
                attributeName="stopColor"
                values="#f97316;#6EBFAA;#2C9880;#10b981;#6EBFAA;#f97316"
                dur="13s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>

          {/* Glow filters */}
          <filter id="nodeGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="flowGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Chaotic intersecting lines (phase 1-2) */}
        <g opacity="0.3">
          {[
            "M 100 150 L 300 250",
            "M 200 100 L 400 200",
            "M 500 180 L 350 280",
            "M 150 250 L 550 150",
            "M 250 120 L 600 240",
          ].map((path, i) => (
            <path
              key={`chaos-${i}`}
              d={path}
              stroke="url(#evolutionGradient)"
              strokeWidth="1.5"
              fill="none"
              opacity="0"
            >
              <animate
                attributeName="opacity"
                values="0;0.6;0.4;0.2;0;0;0"
                keyTimes="0;0.1;0.23;0.4;0.54;0.92;1"
                dur="13s"
                repeatCount="indefinite"
              />
            </path>
          ))}
        </g>

        {/* Transitional connection lines forming (phase 2-3) */}
        <g opacity="0.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={`connect-${i}`}
              x1={100 + i * 140}
              y1="220"
              x2={240 + i * 140}
              y2="220"
              stroke="url(#evolutionGradient)"
              strokeWidth="2"
              opacity="0"
            >
              <animate
                attributeName="opacity"
                values="0;0;0.3;0.6;0.8;0.8;0"
                keyTimes="0;0.23;0.4;0.54;0.77;0.92;1"
                dur="13s"
                repeatCount="indefinite"
              />
            </line>
          ))}
        </g>

        {/* Final organized flow curve (phase 3-4) */}
        <path
          d="M 60 220 Q 200 200, 400 220 T 740 220"
          stroke="url(#evolutionGradient)"
          strokeWidth="3"
          fill="none"
          filter="url(#flowGlow)"
          opacity="0"
        >
          <animate
            attributeName="opacity"
            values="0;0;0;0.4;0.9;0.9;0"
            keyTimes="0;0.4;0.54;0.62;0.85;0.92;1"
            dur="13s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-dasharray"
            values="0 1500;1500 0"
            dur="13s"
            repeatCount="indefinite"
          />
        </path>

        {/* AI coordination orbs (phase 2-3) */}
        {[
          { cx: 250, cy: 220 },
          { cx: 400, cy: 220 },
          { cx: 550, cy: 220 },
        ].map((pos, i) => (
          <circle
            key={`orb-${i}`}
            cx={pos.cx}
            cy={pos.cy}
            r="0"
            fill="#6EBFAA"
            opacity="0.5"
            filter="url(#nodeGlow)"
          >
            <animate
              attributeName="r"
              values="0;0;8;14;16;10;0"
              keyTimes="0;0.23;0.4;0.54;0.77;0.92;1"
              dur="13s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;0;0.5;0.7;0.8;0.5;0"
              keyTimes="0;0.23;0.4;0.54;0.77;0.92;1"
              dur="13s"
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* Data flow dots (phase 3-4) */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <circle
            key={`dot-${i}`}
            r="3.5"
            fill="#6EBFAA"
            filter="url(#flowGlow)"
            opacity="0"
          >
            <animateMotion
              dur="6s"
              begin={`${(i * 1) + 7}s`}
              repeatCount="indefinite"
              path="M 60 220 Q 200 200, 400 220 T 740 220"
            />
            <animate
              attributeName="opacity"
              values="0;0;0;0.9;0.9;0.9;0"
              keyTimes="0;0.54;0.62;0.7;0.85;0.92;1"
              dur="13s"
              begin={`${i * 0.4}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>

      {/* Animated icon components */}
      <div className="absolute inset-0">
        {icons.map((item, idx) => {
          const { Icon, depth } = item;
          const total = icons.length;
          
          // Organized final positions - horizontal flow
          const organizedX = 10 + (idx / total) * 80;
          const organizedY = 52;

          // Generate chaotic movements with direction changes
          const chaosKeyframes = [
            { x: 0, y: 0, rotate: 0 },
            { x: (Math.random() - 0.5) * 30, y: (Math.random() - 0.5) * 30, rotate: Math.random() * 90 },
            { x: (Math.random() - 0.5) * 25, y: (Math.random() - 0.5) * 25, rotate: Math.random() * -60 },
          ];

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
                opacity: [0, 1, 1, 1, 1, 1, 0.8],
                scale: [
                  0,
                  depth,
                  depth * 0.95,
                  depth * 1.05,
                  depth,
                  depth,
                  depth * 0.95
                ],
                x: [
                  '0%',
                  `${chaosKeyframes[0].x}%`,
                  `${chaosKeyframes[1].x}%`,
                  `${chaosKeyframes[2].x}%`,
                  `${(organizedX - chaoticPositions[idx].x)}%`,
                  `${(organizedX - chaoticPositions[idx].x)}%`,
                  `${(organizedX - chaoticPositions[idx].x)}%`,
                ],
                y: [
                  '0%',
                  `${chaosKeyframes[0].y}%`,
                  `${chaosKeyframes[1].y}%`,
                  `${chaosKeyframes[2].y}%`,
                  `${(organizedY - chaoticPositions[idx].y)}%`,
                  `${(organizedY - chaoticPositions[idx].y)}%`,
                  `${(organizedY - chaoticPositions[idx].y)}%`,
                ],
                rotate: [
                  0,
                  chaosKeyframes[0].rotate,
                  chaosKeyframes[1].rotate,
                  chaosKeyframes[2].rotate,
                  0,
                  0,
                  0
                ],
              }}
              transition={{
                duration: 13,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.1, 0.15, 0.23, 0.54, 0.92, 1],
              }}
            >
              <motion.div
                className="p-2.5 rounded-lg backdrop-blur-sm"
                style={{
                  backgroundColor: 'rgba(15, 15, 15, 0.7)',
                }}
                animate={{
                  borderColor: [
                    'rgba(239, 68, 68, 0.4)',
                    'rgba(249, 115, 22, 0.4)',
                    'rgba(110, 191, 170, 0.5)',
                    'rgba(44, 152, 128, 0.6)',
                    'rgba(44, 152, 128, 0.6)',
                    'rgba(239, 68, 68, 0.4)',
                  ],
                  boxShadow: [
                    '0 0 0px rgba(239, 68, 68, 0)',
                    '0 0 8px rgba(249, 115, 22, 0.3)',
                    '0 0 12px rgba(110, 191, 170, 0.4)',
                    '0 0 16px rgba(44, 152, 128, 0.6)',
                    '0 0 16px rgba(44, 152, 128, 0.6)',
                    '0 0 0px rgba(239, 68, 68, 0)',
                  ],
                }}
                transition={{
                  duration: 13,
                  repeat: Infinity,
                  times: [0, 0.23, 0.54, 0.77, 0.92, 1],
                }}
              >
                <motion.div
                  animate={{
                    color: [
                      '#ef4444',
                      '#f97316',
                      '#6EBFAA',
                      '#2C9880',
                      '#2C9880',
                      '#ef4444',
                    ],
                  }}
                  transition={{
                    duration: 13,
                    repeat: Infinity,
                    times: [0, 0.23, 0.54, 0.77, 0.92, 1],
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
