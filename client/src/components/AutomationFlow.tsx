import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Zap, Database, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function AutomationFlow() {
  const [activeNode, setActiveNode] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode(prev => (prev + 1) % 5);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const nodes = [
    { id: 0, icon: MessageSquare, label: 'Input', x: 10, y: 50, color: '#6EBFAA' },
    { id: 1, icon: Database, label: 'Verwerk', x: 30, y: 30, color: '#2C9880' },
    { id: 2, icon: Bot, label: 'AI', x: 50, y: 50, color: '#4b37bd' },
    { id: 3, icon: Zap, label: 'Automatiseer', x: 70, y: 30, color: '#6EBFAA' },
    { id: 4, icon: CheckCircle2, label: 'Output', x: 90, y: 50, color: '#2C9880' }
  ];

  const connections = [
    { from: 0, to: 1 },
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 4 }
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full"
        style={{ maxWidth: '500px', maxHeight: '400px' }}
      >
        <defs>
          <linearGradient id="mint-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6EBFAA" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#4b37bd" stopOpacity="0.8" />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,6 L9,3 z" fill="url(#mint-gradient)" />
          </marker>
        </defs>

        {/* Verbindingslijnen met animatie */}
        {connections.map((conn, idx) => {
          const fromNode = nodes[conn.from];
          const toNode = nodes[conn.to];
          const isActive = activeNode === conn.to;
          
          return (
            <g key={idx}>
              {/* Basis lijn */}
              <motion.path
                d={`M ${fromNode.x} ${fromNode.y} Q ${(fromNode.x + toNode.x) / 2} ${Math.min(fromNode.y, toNode.y) - 10} ${toNode.x} ${toNode.y}`}
                fill="none"
                stroke="url(#mint-gradient)"
                strokeWidth="0.5"
                strokeOpacity="0.3"
                markerEnd="url(#arrowhead)"
              />
              
              {/* Geanimeerde data pulse */}
              {isActive && (
                <circle
                  r="1.5"
                  fill="#6EBFAA"
                  filter="url(#glow)"
                  opacity="0"
                >
                  <animateMotion
                    dur="1.5s"
                    repeatCount="1"
                    path={`M ${fromNode.x} ${fromNode.y} Q ${(fromNode.x + toNode.x) / 2} ${Math.min(fromNode.y, toNode.y) - 10} ${toNode.x} ${toNode.y}`}
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    dur="1.5s"
                    repeatCount="1"
                  />
                </circle>
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const isActive = activeNode === node.id;
          const isPast = activeNode > node.id;
          
          return (
            <g key={node.id}>
              {/* Glow effect voor actieve node */}
              {isActive && (
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r="6"
                  fill={node.color}
                  opacity="0.3"
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
              
              {/* Node cirkel */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="4"
                fill={isActive ? node.color : isPast ? node.color : 'hsl(var(--muted))'}
                stroke={isActive ? node.color : 'hsl(var(--border))'}
                strokeWidth="0.5"
                initial={{ scale: 0.8 }}
                animate={{ 
                  scale: isActive ? 1.2 : 1,
                }}
                transition={{ duration: 0.3 }}
                filter={isActive ? "url(#glow)" : undefined}
              />
              
              {/* Label */}
              <text
                x={node.x}
                y={node.y + 8}
                textAnchor="middle"
                fill={isActive ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))'}
                fontSize="3"
                fontWeight={isActive ? 'bold' : 'normal'}
                className="font-sans"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Floating particles voor chaos-naar-orde effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: i % 2 === 0 ? '#6EBFAA' : '#4b37bd',
              left: `${10 + i * 10}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            initial={{ 
              opacity: 0.8,
              scale: 1,
              x: Math.random() * 40 - 20,
              y: Math.random() * 40 - 20
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.2, 0.8],
              x: [
                Math.random() * 40 - 20,
                Math.random() * 40 - 20,
                Math.random() * 40 - 20
              ],
              y: [
                Math.random() * 40 - 20,
                Math.random() * 40 - 20,
                Math.random() * 40 - 20
              ]
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2
            }}
          />
        ))}
      </div>

      {/* Status indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border">
        <div className="flex gap-1">
          {nodes.map((node, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{
                backgroundColor: activeNode >= i ? node.color : 'hsl(var(--muted))',
                opacity: activeNode >= i ? 1 : 0.3
              }}
            />
          ))}
        </div>
        <span className="text-xs text-muted-foreground font-medium">
          {activeNode === 0 && 'Handmatig'}
          {activeNode === 1 && 'Verwerken...'}
          {activeNode === 2 && 'AI aan het werk'}
          {activeNode === 3 && 'Automatiseren'}
          {activeNode === 4 && 'Geautomatiseerd ✓'}
        </span>
      </div>
    </div>
  );
}
