import React, { useEffect, useRef } from 'react';

const Starfield = () => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const COLORS = ['139, 92, 246', '99, 102, 241']; // violet-500, indigo-500 (RGB)
    const PARTICLE_COUNT = 110;
    const MOUSE_RADIUS = 150;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.2 + 0.4,
          baseOpacity: Math.random() * 0.5 + 0.2,
          opacity: Math.random() * 0.5 + 0.2,
          twinkleSpeed: Math.random() * 0.015 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
      particlesRef.current = particles;
    };

    resizeCanvas();
    createParticles();

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -5) p.x = canvas.width + 5;
        if (p.x > canvas.width + 5) p.x = -5;
        if (p.y < -5) p.y = canvas.height + 5;
        if (p.y > canvas.height + 5) p.y = -5;

        p.twinklePhase += p.twinkleSpeed;
        p.opacity = p.baseOpacity + Math.sin(p.twinklePhase) * 0.15;
        if (p.opacity < 0.05) p.opacity = 0.05;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS) {
          const lineOpacity = (1 - dist / MOUSE_RADIUS) * 0.35;
          const gradient = ctx.createLinearGradient(mouse.x, mouse.y, p.x, p.y);
          gradient.addColorStop(0, `rgba(139, 92, 246, ${lineOpacity})`);
          gradient.addColorStop(1, `rgba(${p.color}, 0)`);

          ctx.beginPath();
          
          // 1. Force a bright neon violet color with high opacity (80%)
          ctx.strokeStyle = 'rgba(167, 139, 250, 0.5)'; 
          
          // 2. Significantly increase line thickness from 1.5 to 2.5 pixels
          ctx.lineWidth = 0.6; 
          
          // 3. Add a canvas blur glow effect (The Magic Factor)
          ctx.shadowBlur = 4;
          ctx.shadowColor = '#8b5cf6';
          
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
          
          // 4. Reset shadow blur immediately so it doesn't make standard stars blurry
          ctx.shadowBlur = 0;

        }

        const glowRadius = p.radius * 4;
        const glow = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, glowRadius
        );
        glow.addColorStop(0, `rgba(${p.color}, ${p.opacity})`);
        glow.addColorStop(1, `rgba(${p.color}, 0)`);

        ctx.beginPath();
        ctx.fillStyle = glow;
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.color}, ${Math.min(p.opacity + 0.3, 1)})`;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    >
      <canvas ref={canvasRef} style={{ display: 'block' }} />
    </div>
  );
};

export default Starfield;
