import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Search, Zap, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function AutomationFlow() {
  const [activeNode, setActiveNode] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode(prev => (prev + 1) % 5);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Exponentiële curve: y = 80 - (x/85)^2.5 * 58
  const nodes = [
    { id: 0, icon: AlertCircle, label: 'Chaos', x: 15, y: 78, color: '#ef4444' },
    { id: 1, icon: Search, label: 'Patroon', x: 30, y: 74, color: '#6EBFAA' },
    { id: 2, icon: Zap, label: 'Automatiseer', x: 50, y: 63, color: '#4b37bd' },
    { id: 3, icon: TrendingUp, label: 'Schaal', x: 70, y: 42, color: '#2C9880' },
    { id: 4, icon: CheckCircle2, label: 'Controle', x: 85, y: 22, color: '#6EBFAA' }
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
        style={{ maxWidth: '650px', maxHeight: '500px' }}
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
              {/* Basis lijn - exponentiële groeicurve met gladde overgang */}
              <motion.path
                d={`M ${fromNode.x} ${fromNode.y} C ${fromNode.x + (toNode.x - fromNode.x) * 0.5} ${fromNode.y}, ${fromNode.x + (toNode.x - fromNode.x) * 0.5} ${toNode.y}, ${toNode.x} ${toNode.y}`}
                fill="none"
                stroke="url(#mint-gradient)"
                strokeWidth="0.8"
                strokeOpacity="0.4"
              />
              
              {/* Geanimeerde data pulse */}
              {isActive && (
                <circle
                  r="2"
                  fill="#6EBFAA"
                  filter="url(#glow)"
                  opacity="0"
                >
                  <animateMotion
                    dur="1.5s"
                    repeatCount="1"
                    path={`M ${fromNode.x} ${fromNode.y} C ${fromNode.x + (toNode.x - fromNode.x) * 0.5} ${fromNode.y}, ${fromNode.x + (toNode.x - fromNode.x) * 0.5} ${toNode.y}, ${toNode.x} ${toNode.y}`}
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
                  r="8"
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
                r="5"
                fill={isActive ? node.color : isPast ? node.color : 'hsl(var(--muted))'}
                stroke={isActive ? node.color : 'hsl(var(--border))'}
                strokeWidth="0.8"
                initial={{ scale: 0.8 }}
                animate={{ 
                  scale: isActive ? 1.3 : 1,
                }}
                transition={{ duration: 0.3 }}
                filter={isActive ? "url(#glow)" : undefined}
              />
              
              {/* Label */}
              <text
                x={node.x}
                y={node.y + 10}
                textAnchor="middle"
                fill={isActive ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))'}
                fontSize="3.5"
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
          {activeNode === 0 && 'Handmatig proces'}
          {activeNode === 1 && 'AI leert structuur'}
          {activeNode === 2 && 'AI neemt over'}
          {activeNode === 3 && 'Schaalbaar systeem'}
          {activeNode === 4 && 'Rust & Rendement ✓'}
        </span>
      </div>
    </div>
  );
}
