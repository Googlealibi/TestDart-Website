import { useEffect, useRef } from 'react';

// Mild, on-brand version of the fluid vector-field background: a grid of
// short strokes drifting in a slow trig field, bending toward the cursor
// within a small radius. Sits under .site-bg__grid / __traces at the same
// z-index (0), fixed + pointer-events:none, so it never intercepts input or
// shifts page content.
const REDUCED_MOTION = typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function FluidFlowCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || REDUCED_MOTION) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let width = 0;
    let height = 0;
    let rafId = 0;
    let time = 0;

    // Small cursor influence — was 220px in the original prompt, too large here.
    const CURSOR_RADIUS = 90;
    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    const onLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);

    const baseColor = '45, 107, 42'; // --green-dark
    const accentColor = '55, 134, 53'; // --green-rgb

    const render = () => {
      time += 0.006;
      mouse.x += (mouse.targetX - mouse.x) * 0.35;
      mouse.y += (mouse.targetY - mouse.y) * 0.35;

      ctx.clearRect(0, 0, width, height);

      const spacing = 14;
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;
      ctx.lineWidth = 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing;
          const y = j * spacing;

          let angle = Math.sin(x * 0.003 + time) + Math.cos(y * 0.003 + time);

          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let isNear = false;
          if (dist < CURSOR_RADIUS && dist > 0) {
            isNear = true;
            const pushAngle = Math.atan2(dy, dx) + Math.PI;
            const force = 1 - dist / CURSOR_RADIUS;
            angle = angle * (1 - force) + pushAngle * force;
          }

          const lineLen = isNear ? 7 : 4.5;
          const x2 = x + Math.cos(angle) * lineLen;
          const y2 = y + Math.sin(angle) * lineLen;

          const alpha = isNear ? 0.55 : 0.18 + Math.sin(x * 0.01 + y * 0.01 + time) * 0.08;

          ctx.strokeStyle = `rgba(${isNear ? accentColor : baseColor}, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }

      rafId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  if (REDUCED_MOTION) return null;

  return <canvas ref={canvasRef} className="site-bg__fluid" />;
}
