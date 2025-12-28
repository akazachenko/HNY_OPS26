import React, { useEffect, useState } from 'react';

const Snowfall: React.FC = () => {
  const [snowflakes, setSnowflakes] = useState<{
    id: number;
    left: number;
    duration: number;
    delay: number;
    size: number;
    opacity: number;
    char: string;
  }[]>([]);

  useEffect(() => {
    // Используем разные символы для разнообразия
    const chars = ['❄', '❅', '❆', '•'];
    const flakes = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 10 + Math.random() * 20, // Медленное падение
      delay: -(Math.random() * 20),
      size: 0.8 + Math.random() * 1.5,
      opacity: 0.1 + Math.random() * 0.4,
      char: chars[Math.floor(Math.random() * chars.length)]
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    // z-50 обеспечивает видимость поверх фонов экранов, pointer-events-none пропускает клики
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute text-white top-[-5%]"
          style={{
            left: `${flake.left}%`,
            fontSize: `${flake.size}rem`,
            opacity: flake.opacity,
            animation: `fall ${flake.duration}s linear infinite`,
            animationDelay: `${flake.delay}s`,
            textShadow: '0 0 5px rgba(255,255,255,0.8)'
          }}
        >
          {flake.char}
        </div>
      ))}
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-10vh) translateX(-10px) rotate(0deg);
          }
          50% {
            transform: translateX(10px) rotate(180deg);
          }
          100% {
            transform: translateY(110vh) translateX(-10px) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Snowfall;