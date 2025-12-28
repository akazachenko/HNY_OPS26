
import React, { useMemo } from 'react';

const SnowflakeIcon = ({ size, opacity, duration, delay, left }: { size: number, opacity: number, duration: number, delay: number, left: number }) => (
  <svg 
    viewBox="0 0 24 24" 
    className="absolute pointer-events-none animate-snow"
    style={{
      width: size,
      height: size,
      opacity,
      left: `${left}%`,
      top: '-10%',
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
    }}
    fill="none" 
    stroke="white" 
    strokeWidth="0.5"
  >
    <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19M12 7l2 2m-4-2l-2 2m8 8l-2 2m-4-2l-2 2M7 12l2 2m-2-4l2-2m8 8l2 2m-2-4l2-2" />
    <circle cx="12" cy="12" r="1.5" />
  </svg>
);

export const Snowflakes: React.FC = () => {
  const snowflakes = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      size: Math.random() * 20 + 15,
      opacity: Math.random() * 0.4 + 0.1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 20,
      left: Math.random() * 100,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {snowflakes.map(sf => (
        <SnowflakeIcon key={sf.id} {...sf} />
      ))}
      <style>{`
        @keyframes snow {
          0% { transform: translateY(0vh) rotate(0deg); }
          100% { transform: translateY(110vh) rotate(360deg); }
        }
        .animate-snow {
          animation-name: snow;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }
      `}</style>
    </div>
  );
};
