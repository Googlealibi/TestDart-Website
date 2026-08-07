import { useEffect, useRef } from 'react';

// Pointer-driven perspective tilt. Writes CSS vars (--rx/--ry) directly on
// the DOM node instead of React state, so continuous mousemove never
// triggers a re-render. Skipped under reduced-motion and below `disableBelow`,
// where the section's own responsive layout takes over.
export default function useTilt({ maxDeg = 5, disableBelow = 900 } = {}) {
  const stageRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (window.matchMedia(`(max-width: ${disableBelow}px)`).matches) return undefined;

    const handleMove = (e) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = stage.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        stage.style.setProperty('--ry', `${px * maxDeg}deg`);
        stage.style.setProperty('--rx', `${py * -maxDeg}deg`);
      });
    };
    const handleLeave = () => {
      stage.style.setProperty('--rx', '0deg');
      stage.style.setProperty('--ry', '0deg');
    };

    stage.addEventListener('mousemove', handleMove);
    stage.addEventListener('mouseleave', handleLeave);
    return () => {
      stage.removeEventListener('mousemove', handleMove);
      stage.removeEventListener('mouseleave', handleLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [maxDeg, disableBelow]);

  return stageRef;
}
