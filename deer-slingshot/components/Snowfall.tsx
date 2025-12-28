
import React, { useEffect, useRef } from 'react';

const Snowfall: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const snowflakes: Array<{ 
      x: number; 
      y: number; 
      radius: number; 
      speed: number; 
      opacity: number;
      blur: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createSnowflakes = () => {
      // Увеличиваем количество снежинок для более густого снега
      for (let i = 0; i < 200; i++) {
        snowflakes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2.5 + 0.5,
          speed: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.7 + 0.2,
          blur: Math.random() > 0.8 ? 2 : 0 // Некоторые снежинки размыты (близко к камере)
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      snowflakes.forEach((flake) => {
        ctx.beginPath();
        if (flake.blur > 0) {
          ctx.shadowBlur = flake.blur;
          ctx.shadowColor = 'white';
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
        ctx.fill();

        flake.y += flake.speed;
        flake.x += Math.sin(flake.y / 50) * 0.5;

        if (flake.y > canvas.height) {
          flake.y = -10;
          flake.x = Math.random() * canvas.width;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    createSnowflakes();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10" />;
};

export default Snowfall;
