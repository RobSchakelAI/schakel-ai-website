import { motion } from 'framer-motion';
import { Mail, FileSpreadsheet, FileText, MessageSquare, Database, Calendar } from 'lucide-react';

export default function WorkEvolution() {
  const icons = [
    { Icon: Mail, id: 'mail' },
    { Icon: FileSpreadsheet, id: 'spreadsheet' },
    { Icon: FileText, id: 'document' },
    { Icon: MessageSquare, id: 'chat' },
    { Icon: Database, id: 'crm' },
    { Icon: Calendar, id: 'calendar' }
  ];

  // Animation keyframes for 8-second loop with 4 phases
  // Phase 1 (0-2s): Manual - chaotic movement
  // Phase 2 (2-4s): Assisted - forming connections
  // Phase 3 (4-6s): Automated - organized flow
  // Phase 4 (6-8s): AI-First - stable, efficient flow

  return (
    <div className="w-full h-[400px] relative overflow-hidden rounded-lg bg-[#0b0b0b]" data-testid="visual-evolution">
      <svg
        viewBox="0 0 800 400"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradient from chaos (red/orange) to order (cyan/green) */}
          <linearGradient id="chaosGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8">
              <animate
                attributeName="stopColor"
                values="#ef4444;#f97316;#6EBFAA;#2C9880;#ef4444"
                dur="8s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#f97316" stopOpacity="0.8">
              <animate
                attributeName="stopColor"
                values="#f97316;#6EBFAA;#2C9880;#10b981;#f97316"
                dur="8s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>

          {/* Glow filter for icons and connections */}
          <filter id="iconGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Subtle glow for data flow */}
          <filter id="flowGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connection lines that evolve from chaos to organized flow */}
        <g opacity="0.4">
          {/* Chaotic intersecting lines (visible in phase 1-2) */}
          <path
            d="M 100 100 L 300 250 M 200 150 L 400 200 M 500 180 L 300 300"
            stroke="url(#chaosGradient)"
            strokeWidth="1"
            fill="none"
            opacity="0"
          >
            <animate
              attributeName="opacity"
              values="0.6;0.4;0.2;0;0.6"
              keyTimes="0;0.25;0.5;0.75;1"
              dur="8s"
              repeatCount="indefinite"
            />
          </path>

          {/* Organized flow line (visible in phase 3-4) */}
          <path
            d="M 50 200 Q 200 180, 400 200 T 750 200"
            stroke="url(#chaosGradient)"
            strokeWidth="2"
            fill="none"
            filter="url(#flowGlow)"
            opacity="0"
          >
            <animate
              attributeName="opacity"
              values="0;0;0.3;0.8;0"
              keyTimes="0;0.5;0.625;0.875;1"
              dur="8s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-dasharray"
              values="0 1000;1000 0"
              dur="8s"
              repeatCount="indefinite"
            />
          </path>
        </g>

        {/* AI orbs that appear in assisted phase */}
        <circle cx="250" cy="200" r="0" fill="#6EBFAA" opacity="0.3" filter="url(#flowGlow)">
          <animate
            attributeName="r"
            values="0;8;12;8;0"
            keyTimes="0;0.25;0.5;0.75;1"
            dur="8s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;0.4;0.6;0.4;0"
            keyTimes="0;0.25;0.5;0.75;1"
            dur="8s"
            repeatCount="indefinite"
          />
        </circle>

        <circle cx="550" cy="200" r="0" fill="#2C9880" opacity="0.3" filter="url(#flowGlow)">
          <animate
            attributeName="r"
            values="0;0;8;12;0"
            keyTimes="0;0.25;0.5;0.75;1"
            dur="8s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;0;0.4;0.6;0"
            keyTimes="0;0.25;0.5;0.75;1"
            dur="8s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Data flow dots in AI-First phase */}
        {[0, 1, 2, 3, 4].map((i) => (
          <circle
            key={`flow-${i}`}
            r="3"
            fill="#6EBFAA"
            filter="url(#flowGlow)"
            opacity="0"
          >
            <animateMotion
              dur="4s"
              begin={`${i * 0.8}s`}
              repeatCount="indefinite"
              path="M 50 200 Q 200 180, 400 200 T 750 200"
            />
            <animate
              attributeName="opacity"
              values="0;0;0;0.8;0.8;0"
              keyTimes="0;0.625;0.75;0.8;0.95;1"
              dur="8s"
              begin={`${i * 0.8}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>

      {/* Animated icon components */}
      <div className="absolute inset-0">
        {icons.map((item, idx) => {
          const { Icon } = item;
          const total = icons.length;
          
          // Chaotic starting positions (phase 1)
          const chaoticPositions = [
            { x: 15, y: 25 },
            { x: 65, y: 60 },
            { x: 25, y: 75 },
            { x: 75, y: 30 },
            { x: 40, y: 50 },
            { x: 55, y: 70 }
          ];

          // Organized final positions (phase 4) - horizontal flow
          const organizedX = 15 + (idx / total) * 70;
          const organizedY = 48;

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
                opacity: [0, 1, 1, 1, 0],
                scale: [0, 1, 1, 1, 0],
                x: [
                  '0%',
                  `${Math.random() * 20 - 10}%`, // chaotic movement
                  `${Math.random() * 15 - 7.5}%`, // assisted
                  `${(organizedX - chaoticPositions[idx].x) / 100 * window.innerWidth}px`, // organized
                  `${(organizedX - chaoticPositions[idx].x) / 100 * window.innerWidth}px`, // stable
                ],
                y: [
                  '0%',
                  `${Math.random() * 20 - 10}%`, // chaotic
                  `${Math.random() * 10 - 5}%`, // assisted
                  `${(organizedY - chaoticPositions[idx].y) / 100 * window.innerHeight}px`, // organized
                  `${(organizedY - chaoticPositions[idx].y) / 100 * window.innerHeight}px`, // stable
                ],
                rotate: [0, Math.random() * 360, Math.random() * 180, 0, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.25, 0.5, 0.75, 1],
              }}
            >
              <div
                className="p-2 rounded-lg backdrop-blur-sm transition-colors"
                style={{
                  backgroundColor: 'rgba(15, 15, 15, 0.6)',
                  border: '1px solid rgba(110, 191, 170, 0.3)',
                }}
              >
                <Icon 
                  className="w-6 h-6" 
                  style={{
                    color: idx < 2 ? '#ef4444' : idx < 4 ? '#6EBFAA' : '#2C9880'
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Phase labels (optional) */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-medium tracking-wider"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.6, 0.6, 0.6, 0.6, 0.6],
          color: ['#ef4444', '#f97316', '#6EBFAA', '#2C9880', '#ef4444'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          times: [0, 0.25, 0.5, 0.75, 1],
        }}
      >
        <motion.span
          animate={{
            opacity: [1, 0, 0, 0, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
        >
          MANUAL
        </motion.span>
        <motion.span
          className="absolute left-0"
          animate={{
            opacity: [0, 1, 0, 0, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
        >
          ASSISTED
        </motion.span>
        <motion.span
          className="absolute left-0"
          animate={{
            opacity: [0, 0, 1, 0, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
        >
          AUTOMATED
        </motion.span>
        <motion.span
          className="absolute left-0"
          animate={{
            opacity: [0, 0, 0, 1, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
        >
          AI-FIRST
        </motion.span>
      </motion.div>
    </div>
  );
}
