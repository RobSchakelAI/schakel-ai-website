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

  // Nodes evenly distributed along arc length (calculated by arc-length parameterization)
  const nodes = [
    { id: 0, icon: AlertCircle, label: 'Nu', x: 15, y: 78, color: '#ef4444' },
    { id: 1, icon: Search, label: 'Analyseren', x: 37.21, y: 71.61, color: '#6EBFAA' },
    { id: 2, icon: Zap, label: 'Bouwen', x: 56.09, y: 58.37, color: '#4b37bd' },
    { id: 3, icon: TrendingUp, label: 'Groeien', x: 70.75, y: 39.93, color: '#2C9880' },
    { id: 4, icon: CheckCircle2, label: 'Impact', x: 85, y: 22, color: '#6EBFAA' }
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
          
          {/* Radial gradient voor ronde glow */}
          <radialGradient id="node-glow">
            <stop offset="0%" stopOpacity="0.4" />
            <stop offset="50%" stopOpacity="0.2" />
            <stop offset="100%" stopOpacity="0" />
          </radialGradient>

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

        {/* Perfect vloeiende exponentiële groeicurve met cubic Bezier */}
        <motion.path
          d="M 15 78 C 25 77, 40 72, 50 64 C 60 56, 72 38, 85 22"
          fill="none"
          stroke="url(#mint-gradient)"
          strokeWidth="0.8"
          strokeOpacity="0.4"
        />

        {/* Nodes */}
        {nodes.map((node) => {
          const isActive = activeNode === node.id;
          const isPast = activeNode > node.id;
          
          return (
            <g key={node.id}>
              {/* Glow effect voor actieve node - meerdere lagen voor zachte ronde glow */}
              {isActive && (
                <>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="10"
                    fill={node.color}
                    opacity="0.15"
                  />
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="7"
                    fill={node.color}
                    opacity="0.25"
                  />
                </>
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
          {activeNode === 0 && 'Handmatig werk dat tijd kost'}
          {activeNode === 1 && 'Identificeren van kansen'}
          {activeNode === 2 && 'AI-oplossing die direct werkt'}
          {activeNode === 3 && 'Schaalbaar en toekomstbestendig'}
          {activeNode === 4 && 'Aantoonbaar rendement'}
        </span>
      </div>
    </div>
  );
}
