
import React, { useEffect, useRef } from 'react';

interface RealisticSnowflake {
  x: number;
  y: number;
  z: number; // Depth factor: 0 (far) to 1 (near)
  radius: number;
  speed: number;
  baseOpacity: number;
  twinkleOffset: number;
  twinkleSpeed: number;
  windOffset: number;
  windStep: number;
  rotation: number;
  rotationSpeed: number;
}

const Snowfall: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let snowflakes: RealisticSnowflake[] = [];

    const createSnowflakes = () => {
      // Balanced count for festive coverage
      const count = 220; 
      snowflakes = [];
      for (let i = 0; i < count; i++) {
        const z = Math.random(); // 0 is far, 1 is close
        snowflakes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: z,
          // Slightly reduced sizing for a more delicate and elegant look
          radius: (z * 5.0) + 1.8, 
          speed: (z * 0.9) + 0.3, 
          baseOpacity: (z * 0.5) + 0.15,
          twinkleOffset: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.01 + Math.random() * 0.03,
          windOffset: Math.random() * Math.PI * 2,
          windStep: 0.002 + Math.random() * 0.005,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.012,
        });
      }
    };

    const drawSnowflakeShape = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, rotation: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.lineWidth = radius * 0.14; // Slightly thicker line relative to radius for visibility at smaller sizes
      ctx.lineCap = 'round';

      // Draw 6 main arms
      for (let i = 0; i < 6; i++) {
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -radius);
        
        // Add small branches to each arm for realism
        const branchPos = radius * 0.6;
        const branchSize = radius * 0.35;
        
        ctx.moveTo(0, -branchPos);
        ctx.lineTo(-branchSize, -branchPos - branchSize);
        ctx.moveTo(0, -branchPos);
        ctx.lineTo(branchSize, -branchPos - branchSize);
        
        ctx.rotate(Math.PI / 3);
      }
      
      ctx.stroke();
      
      // Add a small center glow
      ctx.beginPath();
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius * 0.5);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.7})`);
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.arc(0, 0, radius * 0.5, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createSnowflakes();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      snowflakes.forEach((snowflake) => {
        // Twinkle logic
        snowflake.twinkleOffset += snowflake.twinkleSpeed;
        const currentTwinkle = Math.sin(snowflake.twinkleOffset) * 0.4 + 0.6;
        const currentOpacity = snowflake.baseOpacity * currentTwinkle;

        // Draw the complex shape
        drawSnowflakeShape(
          ctx, 
          snowflake.x, 
          snowflake.y, 
          snowflake.radius, 
          snowflake.rotation, 
          currentOpacity
        );

        // Update properties
        snowflake.y += snowflake.speed;
        snowflake.rotation += snowflake.rotationSpeed;
        snowflake.windOffset += snowflake.windStep;
        // Subtle horizontal sway
        snowflake.x += Math.sin(snowflake.windOffset) * (snowflake.z * 1.2);

        // Reset if off screen
        if (snowflake.y > canvas.height + snowflake.radius * 2) {
          snowflake.y = -snowflake.radius * 2;
          snowflake.x = Math.random() * canvas.width;
        }
        if (snowflake.x > canvas.width + snowflake.radius * 2) {
          snowflake.x = -snowflake.radius * 2;
        } else if (snowflake.x < -snowflake.radius * 2) {
          snowflake.x = canvas.width + snowflake.radius * 2;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10" />;
};

export default Snowfall;
