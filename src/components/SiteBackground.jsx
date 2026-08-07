import { useEffect, useRef } from 'react';
import './SiteBackground.css';

// The site's original background language: a small set of long, curved
// "signal traces" — the same visual idea as the Requirement -> Test ->
// Execution -> Report pipeline the product itself runs, just abstracted
// into geometry. Traces slowly draw themselves in as the page scrolls
// (stroke-dashoffset tied to scroll progress) and a pulse travels each
// path continuously, standing in for a test run moving through the
// pipeline. A faint dot grid underneath reads as a blueprint surface.
// Everything is fixed behind the content (see .hero/.section z-index in
// index.css) so it reads as one continuous surface the whole page sits on,
// not a per-section decoration.
const REDUCED_MOTION = typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function SiteBackground() {
  const rootRef = useRef(null);
  const rafRef = useRef(0);
  const pointerRafRef = useRef(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    if (REDUCED_MOTION) return undefined;

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        root.style.setProperty('--scroll', progress.toFixed(4));
      });
    };

    const onPointerMove = (e) => {
      if (pointerRafRef.current) return;
      pointerRafRef.current = requestAnimationFrame(() => {
        pointerRafRef.current = 0;
        const px = e.clientX / window.innerWidth - 0.5;
        const py = e.clientY / window.innerHeight - 0.5;
        root.style.setProperty('--px', px.toFixed(4));
        root.style.setProperty('--py', py.toFixed(4));
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointerMove);
      cancelAnimationFrame(rafRef.current);
      cancelAnimationFrame(pointerRafRef.current);
    };
  }, []);

  return (
    <div className="site-bg" ref={rootRef} aria-hidden="true">
      <div className="site-bg__grid" />
      <svg
        className="site-bg__traces"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <path
          id="trace-a"
          className="site-bg__path site-bg__path--a"
          d="M -100 640 C 220 540, 360 780, 620 660 S 1020 400, 1300 520 S 1560 700, 1900 560"
        />
        <path
          id="trace-b"
          className="site-bg__path site-bg__path--b"
          d="M -120 180 C 200 260, 420 60, 700 160 S 1100 340, 1360 200 S 1700 60, 1980 180"
        />
        <path
          id="trace-c"
          className="site-bg__path site-bg__path--c"
          d="M -100 420 C 260 380, 300 560, 560 440 S 900 260, 1180 400 S 1600 480, 1900 380"
        />
        {!REDUCED_MOTION && (
          <>
            <circle r="3.2" className="site-bg__pulse site-bg__pulse--a">
              <animateMotion dur="11s" repeatCount="indefinite" rotate="auto">
                <mpath href="#trace-a" />
              </animateMotion>
            </circle>
            <circle r="2.6" className="site-bg__pulse site-bg__pulse--b">
              <animateMotion dur="14s" repeatCount="indefinite" rotate="auto" begin="-4s">
                <mpath href="#trace-b" />
              </animateMotion>
            </circle>
            <circle r="2.8" className="site-bg__pulse site-bg__pulse--c">
              <animateMotion dur="12.5s" repeatCount="indefinite" rotate="auto" begin="-7s">
                <mpath href="#trace-c" />
              </animateMotion>
            </circle>
          </>
        )}
      </svg>
    </div>
  );
}
