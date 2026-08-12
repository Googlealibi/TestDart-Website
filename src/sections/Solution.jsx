import { useEffect, useRef, useState } from 'react';
import SectionHead from '../components/SectionHead';
import './Solution.css';

const REASONS = [
  {
    title: 'Manual test writing eats into release time',
    body: 'Give your team a faster way to handle the work that repeatedly slows testing down. testdart helps turn project requirements into structured tests without starting the same preparation from scratch every time.',
    outcome: 'Automate test creation and keep your releases moving.',
  },
  {
    title: "Context shouldn't have to be re-explained every time",
    body: 'Your requirements already contain the context your team needs. testdart uses that project information to help create meaningful tests instead of making your QA team manually translate every requirement into test cases.',
    outcome: 'Speed, without losing sight of what matters.',
  },
  {
    title: 'Scattered tools slow everyone down',
    body: 'Last-minute changes and release deadlines shouldn’t turn testing into a bottleneck. testdart helps your team move from test creation toward execution without relying on disconnected tools and repetitive handoffs.',
    outcome: "No more guessing what's still running.",
  },
  {
    title: 'Inconsistent testing creates blind spots',
    body: 'Testing should help your team ship better software, not consume all of its time. testdart reduces the repetitive work around testing so QA and engineering teams can focus more on finding issues and improving the product.',
    outcome: 'Less time digging through logs, more time fixing what matters.',
  },
];

// Percentage coordinates (of the journey container) each card sits near —
// alternating left/right, evenly spaced, same rhythm for every reason
// including the last one. The path SVG is built from these same points,
// so the line always matches where the cards actually are.
const NODES = [
  { x: 24, y: 12 },
  { x: 76, y: 38 },
  { x: 24, y: 64 },
  { x: 76, y: 90 },
];
const CTRL_DY = 12; // vertical handle offset — how pronounced each curve is

const SEGMENTS = NODES.slice(0, -1).map((p0, i) => {
  const p1 = NODES[i + 1];
  return {
    p0,
    c1: { x: p0.x, y: p0.y + CTRL_DY },
    c2: { x: p1.x, y: p1.y - CTRL_DY },
    p1,
  };
});

const PATH_D = `M${NODES[0].x},${NODES[0].y} ${SEGMENTS
  .map((s) => `C${s.c1.x},${s.c1.y} ${s.c2.x},${s.c2.y} ${s.p1.x},${s.p1.y}`)
  .join(' ')}`;

export default function Solution() {
  const [activeIndex, setActiveIndex] = useState(0);
  const journeyRef = useRef(null);

  // Scroll-driven, but NOT scroll-jacked: reads normal scroll position
  // (rAF-throttled, gated to while the section is on screen) to decide
  // which reason is active. The path's glow segment is a separate, purely
  // CSS animation loop — it keeps moving on its own, independent of scroll.
  useEffect(() => {
    const el = journeyRef.current;
    if (!el) return undefined;

    let raf = 0;
    let inView = false;

    const measure = () => {
      raf = 0;
      if (!inView) return;
      const rect = el.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const progress = Math.min(1, Math.max(0, (viewportCenter - rect.top) / rect.height));
      const idx = Math.min(NODES.length - 1, Math.max(0, Math.round(progress * (NODES.length - 1))));
      setActiveIndex(idx);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(measure);
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) measure();
    }, { threshold: 0 });
    observer.observe(el);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <section className="section section--bg" id="why-testdart">
      <div className="container">
        <SectionHead>
          <span className="eyebrow">WHY TESTDART</span>
          <h2>Still spending too much time getting your software ready to release?</h2>
          <p>
            Manual test writing, scattered tools, and inconsistent coverage all add up long
            before a release ships. testdart is built to close those gaps, so your team spends
            less time managing testing and more time improving the product.
          </p>
        </SectionHead>

        <div ref={journeyRef} className="reason-journey">
          <svg className="reason-journey__path" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path d={PATH_D} className="reason-journey__path-line" vectorEffect="non-scaling-stroke" />
            <path
              d={PATH_D}
              className="reason-journey__path-glow"
              vectorEffect="non-scaling-stroke"
              pathLength="1"
            />
          </svg>

          {NODES.map((n, i) => (
            <span
              key={`wp-${n.x}-${n.y}`}
              className={`reason-journey__waypoint ${i <= activeIndex ? 'is-passed' : ''}`}
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
              aria-hidden="true"
            />
          ))}

          {REASONS.map((r, i) => {
            const side = i % 2 === 0 ? 'is-left' : 'is-right';
            return (
              <div className={`reason-journey__row ${side}`} key={r.title}>
                <div
                  className={`reason-journey__card ${i === activeIndex ? 'is-active' : ''} ${i < activeIndex ? 'is-done' : ''} ${i === REASONS.length - 1 ? 'is-last' : ''}`}
                >
                  <h3>{r.title}</h3>
                  <p>{r.body}</p>
                  <span className="reason-journey__outcome">{r.outcome}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="cta__actions reason-cta">
          <button type="button" className="btn btn-primary">Get Started</button>
          <a href="#ai-generation" className="btn btn-secondary">Explore Features</a>
        </div>
      </div>
    </section>
  );
}
