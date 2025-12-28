
import React from 'react';
import { motion } from 'framer-motion';

const ChristmasFrame: React.FC = () => {
  // Цвета для гирлянды
  const lightColors = ['#FFD700', '#FF4500', '#3498db', '#ffffff', '#f1c40f'];

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Верхняя и нижняя ветки */}
      <div className="absolute top-0 left-0 w-full h-24 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20" />
      
      {/* SVG Рамка из веток */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="branchGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#064e3b" />
            <stop offset="100%" stopColor="#022c22" />
          </linearGradient>
          
          {/* Фильтр для свечения огоньков */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Группы веток по краям (упрощенная стилизация) */}
        {[
          { side: 'top', d: "M0 0 Q 720 40 1440 0 L 1440 20 Q 720 60 0 20 Z" },
          { side: 'bottom', d: "M0 100% Q 720 95% 1440 100% L 1440 98% Q 720 92% 0 98% Z" },
          { side: 'left', d: "M0 0 Q 30 540 0 1080 L 15 1080 Q 45 540 15 0 Z" },
          { side: 'right', d: "M100% 0 Q 98% 540 100% 1080 L 99% 1080 Q 97% 540 99% 0 Z" }
        ].map((branch, i) => (
          <path 
            key={i} 
            d={branch.d} 
            fill="url(#branchGrad)" 
            className="opacity-90 shadow-2xl"
          />
        ))}

        {/* Гирлянда (нити) */}
        <path 
          d="M0 20 Q 360 50 720 20 T 1440 20" 
          stroke="#064e3b" 
          strokeWidth="1" 
          fill="none" 
          opacity="0.5" 
        />
        <path 
          d="M0 98% Q 360 95% 720 98% T 1440 98%" 
          stroke="#064e3b" 
          strokeWidth="1" 
          fill="none" 
          opacity="0.5" 
        />
      </svg>

      {/* Огоньки гирлянды */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => {
          const isHorizontal = i < 20;
          const side = i < 10 ? 'top' : i < 20 ? 'bottom' : i < 30 ? 'left' : 'right';
          const pos = (i % 10) * 11;
          
          let style: React.CSSProperties = {};
          if (side === 'top') style = { top: '15px', left: `${pos}%` };
          else if (side === 'bottom') style = { bottom: '15px', left: `${pos}%` };
          else if (side === 'left') style = { left: '10px', top: `${pos}%` };
          else style = { right: '10px', top: `${pos}%` };

          const color = lightColors[i % lightColors.length];

          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{ 
                ...style, 
                backgroundColor: color,
                boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`
              }}
              animate={{
                opacity: [0.4, 1, 0.4],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 1.5 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          );
        })}
      </div>

      {/* Уголки с более густыми ветками */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] rotate-45 opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] -rotate-45 opacity-10 pointer-events-none" />
    </div>
  );
};

export default ChristmasFrame;
