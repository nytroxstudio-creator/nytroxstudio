import React, { useEffect, useRef } from 'react';

interface Star {
  baseX: number;
  baseY: number;
  offsetX: number;
  offsetY: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  hasGlint: boolean;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  active: boolean;
}

export const HeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2 for performance
    let width = window.innerWidth;
    let height = window.innerHeight;

    const updateCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    updateCanvasSize();

    // Mouse state & optimized interaction radius
    const radius = 220;
    const radiusSq = radius * radius; // Fast distance-squared comparison
    const maxDisplacement = 22;

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      isHovered: false
    };

    // Device-adaptive star density: ~100 stars on mobile, ~260 on desktop
    const isMobile = width < 768;
    const starCount = isMobile ? 110 : Math.min(Math.floor((width * height) / 5500), 280);
    const stars: Star[] = [];

    const starColors = [
      'rgba(255, 255, 255, ',
      'rgba(255, 255, 255, ',
      'rgba(240, 245, 255, ',
      'rgba(225, 235, 250, ',
      'rgba(250, 250, 255, '
    ];

    for (let i = 0; i < starCount; i++) {
      const roll = Math.random();
      let size = 0.5 + Math.random() * 0.6;
      let baseAlpha = 0.35 + Math.random() * 0.45;
      let hasGlint = false;

      if (roll > 0.88) {
        size = 1.3 + Math.random() * 0.4;
        baseAlpha = 0.75 + Math.random() * 0.25;
        hasGlint = Math.random() > 0.45;
      } else if (roll > 0.60) {
        size = 0.9 + Math.random() * 0.4;
        baseAlpha = 0.5 + Math.random() * 0.35;
      }

      const initialX = Math.random() * width;
      const initialY = Math.random() * height;

      stars.push({
        baseX: initialX,
        baseY: initialY,
        offsetX: 0,
        offsetY: 0,
        size,
        alpha: baseAlpha,
        baseAlpha,
        twinkleSpeed: 0.012 + Math.random() * 0.028,
        twinklePhase: Math.random() * Math.PI * 2,
        hasGlint,
        color: starColors[Math.floor(Math.random() * starColors.length)]
      });
    }

    // Shooting star state
    let shootingStar: ShootingStar = {
      x: 0,
      y: 0,
      length: 0,
      speed: 0,
      angle: 0,
      opacity: 0,
      active: false
    };

    const spawnShootingStar = () => {
      shootingStar = {
        x: Math.random() * width * 0.75 + width * 0.1,
        y: Math.random() * height * 0.35,
        length: 70 + Math.random() * 60,
        speed: 14 + Math.random() * 8,
        angle: (Math.PI / 4) + (Math.random() - 0.5) * 0.2,
        opacity: 0.85,
        active: true
      };
    };

    let shootingStarTimer = 0;
    let nextShootingStarInterval = 400 + Math.random() * 300;

    // Event Listeners with passive performance
    const handleResize = () => {
      updateCanvasSize();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isHovered = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
        mouse.isHovered = true;
      }
    };

    const handleMouseLeave = () => {
      mouse.isHovered = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Optimized 60fps Render Loop
    const render = () => {
      // Smooth mouse tracking
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Render stars with Fast Distance-Squared Physics
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        const dx = mouse.x - star.baseX;
        const dy = mouse.y - star.baseY;
        const distSq = dx * dx + dy * dy;

        let targetOffsetX = 0;
        let targetOffsetY = 0;
        let proxBoost = 0;

        // Instant distance-squared check avoids costly Math.sqrt
        if (mouse.isHovered && distSq < radiusSq && distSq > 0.01) {
          const dist = Math.sqrt(distSq);
          const normalized = (radius - dist) / radius;
          const falloff = normalized * normalized;

          targetOffsetX = (dx / dist) * maxDisplacement * falloff;
          targetOffsetY = (dy / dist) * maxDisplacement * falloff;
          proxBoost = falloff * 0.35;
        }

        // Smooth spring physics
        star.offsetX += (targetOffsetX - star.offsetX) * 0.08;
        star.offsetY += (targetOffsetY - star.offsetY) * 0.08;

        const posX = star.baseX + star.offsetX;
        const posY = star.baseY + star.offsetY;

        // Twinkle calculation
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = (Math.sin(star.twinklePhase) + 1) * 0.5;
        const currentAlpha = Math.min(1, Math.max(0.15, star.baseAlpha * (0.65 + twinkle * 0.35) + proxBoost));

        // Draw Star Core
        ctx.beginPath();
        ctx.arc(posX, posY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color}${currentAlpha})`;

        if (star.size > 1.2) {
          ctx.shadowBlur = 3;
          ctx.shadowColor = '#ffffff';
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fill();

        // Diamond Glint on Bright Accent Stars
        if (star.hasGlint && currentAlpha > 0.6) {
          const glintLength = star.size * 2.8 * (0.8 + twinkle * 0.2);
          const glintAlpha = currentAlpha * 0.6;

          ctx.beginPath();
          ctx.moveTo(posX - glintLength, posY);
          ctx.lineTo(posX + glintLength, posY);
          ctx.moveTo(posX, posY - glintLength);
          ctx.lineTo(posX, posY + glintLength);
          ctx.strokeStyle = `rgba(255, 255, 255, ${glintAlpha})`;
          ctx.lineWidth = 0.7;
          ctx.shadowBlur = 2;
          ctx.shadowColor = '#ffffff';
          ctx.stroke();
        }
      }

      // Shooting Star
      shootingStarTimer++;
      if (shootingStarTimer > nextShootingStarInterval && !shootingStar.active) {
        spawnShootingStar();
        shootingStarTimer = 0;
        nextShootingStarInterval = 400 + Math.random() * 300;
      }

      if (shootingStar.active) {
        const dx = Math.cos(shootingStar.angle) * shootingStar.speed;
        const dy = Math.sin(shootingStar.angle) * shootingStar.speed;

        shootingStar.x += dx;
        shootingStar.y += dy;
        shootingStar.opacity -= 0.018;

        if (shootingStar.opacity <= 0 || shootingStar.x > width || shootingStar.y > height) {
          shootingStar.active = false;
        } else {
          const tailX = shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length;
          const tailY = shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length;

          const grad = ctx.createLinearGradient(
            shootingStar.x,
            shootingStar.y,
            tailX,
            tailY
          );
          grad.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.opacity * 0.9})`);
          grad.addColorStop(0.3, `rgba(220, 235, 255, ${shootingStar.opacity * 0.4})`);
          grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.beginPath();
          ctx.moveTo(shootingStar.x, shootingStar.y);
          ctx.lineTo(tailX, tailY);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.4;
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#ffffff';
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Background ambient lighting layers */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] rounded-full bg-zinc-800/15 blur-[140px] pointer-events-none animate-pulse-subtle" />
      <div className="absolute top-1/2 -right-20 w-[45vw] h-[45vh] rounded-full bg-zinc-900/25 blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[50vw] h-[50vh] rounded-full bg-zinc-900/20 blur-[120px] pointer-events-none" />

      {/* 60fps Optimized Starry Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full will-change-transform" />
    </div>
  );
};