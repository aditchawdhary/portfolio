import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  vx: number;
  vy: number;
}

interface MouseStar {
  x: number;
  y: number;
  size: number;
  opacity: number;
  vx: number;
  vy: number;
  life: number;
}

export const StarField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  
  useEffect(() => {
    const starArray: Star[] = [];
    for (let i = 0; i < 500; i++) {
      starArray.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 1.2,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: 0.02 + Math.random() * 0.03,
        twinkleOffset: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3
      });
    }
    starsRef.current = starArray;
  }, []);
  
  const mouseStarsRef = useRef<MouseStar[]>([]);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const lastEmitTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
      
      const now = Date.now();
      if (now - lastEmitTimeRef.current > 50) {
        lastEmitTimeRef.current = now;
        
        // Emit single star
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 2;
        mouseStarsRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          size: 2 + Math.random() * 3,
          opacity: 1,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      time += 0.01;
      
      // Create dark royal navy blue gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#040b15');
      gradient.addColorStop(0.5, '#060e1a');
      gradient.addColorStop(1, '#040b15');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw drifting stars with twinkling
      starsRef.current.forEach(star => {
        // Drift motion
        star.x += star.vx;
        star.y += star.vy;
        
        // Wrap around screen edges
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
        
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
        const opacity = star.opacity * (0.5 + twinkle * 0.5);
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
        
        // Add glow for larger stars
        if (star.size > 1.5) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
          ctx.fill();
        }
      });

      // Update and draw mouse trail stars
      mouseStarsRef.current = mouseStarsRef.current.filter(star => {
        star.x += star.vx;
        star.y += star.vy;
        star.life -= 0.02;
        star.opacity = star.life;
        
        if (star.life > 0) {
          // Draw star
          ctx.save();
          ctx.translate(star.x, star.y);
          
          // Draw sparkle shape
          for (let i = 0; i < 4; i++) {
            ctx.rotate(Math.PI / 4);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -star.size);
            ctx.strokeStyle = `rgba(255, 220, 150, ${star.opacity})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
          
          // Center glow
          ctx.beginPath();
          ctx.arc(0, 0, star.size * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 240, 200, ${star.opacity})`;
          ctx.fill();
          
          // Outer glow
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, star.size * 2);
          gradient.addColorStop(0, `rgba(255, 220, 150, ${star.opacity * 0.5})`);
          gradient.addColorStop(1, 'rgba(255, 220, 150, 0)');
          ctx.beginPath();
          ctx.arc(0, 0, star.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
          
          ctx.restore();
          
          return true;
        }
        return false;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};
