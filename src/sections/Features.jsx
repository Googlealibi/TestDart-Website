import { useEffect, useLayoutEffect, useRef } from 'react';
import useReveal from '../hooks/useReveal';
import SectionHead from '../components/SectionHead';
import requirementsIcon from '../assets/icons/requirements.svg';
import executionIcon from '../assets/icons/execution.svg';
import reportsIcon from '../assets/icons/reports.svg';
import historyIcon from '../assets/icons/history.svg';
import libraryIcon from '../assets/icons/library.svg';
import adminIcon from '../assets/icons/admin-panel.svg';
import testgenIcon from '../assets/icons/testgen.svg';
import playIcon from '../assets/icons/play.svg';
import './Features.css';

const FEATURES = [
  { icon: libraryIcon, title: 'Test Suite & Case Management', body: 'Organize test cases into suites and folders, with clone, move, and CSV import/export.' },
  { icon: requirementsIcon, title: 'Requirements Management', body: 'Keep requirements linked to the suites and folders they drive.' },
  { icon: testgenIcon, title: 'AI Test Case Generation', body: 'Generate structured test cases from a requirement, document, or Jira issue.' },
  { icon: playIcon, title: 'Agentic Browser Execution', body: 'An agent runs approved test cases in a real browser, with live progress.' },
  { icon: executionIcon, title: 'Execution Tracking & History', body: 'Track run status, bulk-update results, and comment on individual test cases.' },
  { icon: reportsIcon, title: 'AI-Generated Test Reports', body: 'Turn execution results into a readable report with a pass/fail verdict.' },
  { badge: 'Jira', title: 'Jira Integration', body: 'Connect Jira and import an issue directly into TestDart as a requirement.' },
  { icon: historyIcon, title: 'Audit History', body: 'See what changed on a test case, requirement, or execution, and when.' },
  { icon: adminIcon, title: 'Team & Organization Management', body: 'Invite teammates, assign roles, and manage access at the organization level.' },
];

const TILT_MAX_DEG = 2.5; // cursor-follow hover tilt ceiling — a highlight, not a pop-out
const DEAL_MS = 700;

function colsForWidth(w) {
  if (w <= 700) return 1;
  if (w <= 980) return 2;
  return 3;
}

export default function Features() {
  const [ref, visible] = useReveal();

  const gridRef = useRef(null);
  const nodesRef = useRef({});
  const finePointerRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const tiltRafRef = useRef(0);

  // Idle-motion state: which cards have finished dealing in (only those
  // are safe to hand to the idle loop), which are currently under the
  // pointer (skipped so the hover tilt owns them outright), the current
  // column count (for row-based parallax), and the loop's own rAF id.
  const settledRef = useRef(new Set());
  const hoveredRef = useRef(new Set());
  const colsRef = useRef(3);
  const idleRafRef = useRef(0);
  const idleActiveRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    finePointerRef.current =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reducedMotionRef.current;
    colsRef.current = colsForWidth(window.innerWidth);
    const onResize = () => { colsRef.current = colsForWidth(window.innerWidth); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Advanced idle motion: a single rAF loop drives every settled, non-
  // hovered card at once — a per-card sinusoidal float + gentle rotateZ
  // sway (unique phase/speed per card, so they drift independently
  // rather than in lockstep), layered with a scroll-linked parallax: as
  // the section moves through the viewport, top-row cards drift one way
  // and bottom-row cards drift the other, giving the grid real depth
  // instead of every card just bobbing identically. The loop only runs
  // while the section is actually on screen.
  useEffect(() => {
    if (reducedMotionRef.current) return undefined;

    const tick = (time) => {
      idleRafRef.current = requestAnimationFrame(tick);
      const grid = gridRef.current;
      if (!grid) return;

      const gridRect = grid.getBoundingClientRect();
      const centerOffset = window.innerHeight / 2 - (gridRect.top + gridRect.height / 2);
      const scrollFactor = Math.max(-1, Math.min(1, centerOffset / window.innerHeight));
      const t = time / 1000;
      const cols = colsRef.current;

      FEATURES.forEach((f, i) => {
        if (!settledRef.current.has(f.title)) return;
        if (hoveredRef.current.has(f.title)) return;
        const el = nodesRef.current[f.title];
        if (!el) return;

        const row = Math.floor(i / cols) - (Math.ceil(FEATURES.length / cols) - 1) / 2;
        const phase = i * 0.85;
        const floatY = Math.sin(t * 0.55 + phase) * 4.5;
        const rotZ = Math.sin(t * 0.32 + phase) * 1.3;
        const parallaxY = row * scrollFactor * 12;

        el.style.transform = `translateY(${(floatY + parallaxY).toFixed(2)}px) rotateZ(${rotZ.toFixed(2)}deg)`;
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !idleActiveRef.current) {
          idleActiveRef.current = true;
          idleRafRef.current = requestAnimationFrame(tick);
        } else if (!entry.isIntersecting && idleActiveRef.current) {
          idleActiveRef.current = false;
          cancelAnimationFrame(idleRafRef.current);
        }
      },
      { threshold: 0 }
    );
    if (gridRef.current) observer.observe(gridRef.current);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(idleRafRef.current);
    };
  }, []);

  // Deck deal, staged in two effects fired only once the section actually
  // scrolls into view (not at page mount): a layout effect stacks every
  // card back toward a single point above the grid (measuring rects is
  // the expensive part — doing it unconditionally at mount, for a
  // section that might be off-screen for a while, is exactly what made
  // page load feel janky). Cards are plain `opacity: 0` via CSS by
  // default, so nothing needs to render or measure before this fires.
  useLayoutEffect(() => {
    if (!visible || reducedMotionRef.current) return;
    const grid = gridRef.current;
    if (!grid) return;
    const gridRect = grid.getBoundingClientRect();
    const originX = gridRect.left + gridRect.width / 2;
    const originY = gridRect.top + 30;

    // Read every card's rect first, then write — interleaving a read and
    // a style write per card forces the browser to recompute layout on
    // each iteration (classic layout-thrashing), which is exactly the
    // kind of hitch that shows up as a stutter right as the deck starts
    // dealing out.
    const entries = Object.entries(nodesRef.current);
    const rects = entries.map(([, el]) => el?.getBoundingClientRect());

    entries.forEach(([, el], i) => {
      const r = rects[i];
      if (!el || !r) return;
      const dx = originX - (r.left + r.width / 2);
      const dy = originY - (r.top + r.height / 2);
      const rot = (i % 2 === 0 ? -1 : 1) * (5 + (i % 3) * 3.5);
      el.style.transition = 'none';
      el.style.zIndex = String(20 - i);
      el.style.transform = `translate(${dx}px, ${dy}px) rotate(${rot}deg) scale(0.78)`;
    });
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    if (reducedMotionRef.current) {
      // No stack/deal was ever staged — just make the cards visible.
      Object.values(nodesRef.current).forEach((el) => { if (el) el.style.opacity = '1'; });
      FEATURES.forEach((f) => settledRef.current.add(f.title));
      return;
    }
    Object.entries(nodesRef.current).forEach(([title, el]) => {
      if (!el) return;
      requestAnimationFrame(() => {
        el.style.transition = `transform ${DEAL_MS}ms cubic-bezier(0.16, 1, 0.3, 1) var(--delay, 0ms), opacity 500ms ease var(--delay, 0ms)`;
        el.style.opacity = '1';
        el.style.transform = '';
        const clear = () => {
          el.style.transition = '';
          el.style.zIndex = '';
          el.removeEventListener('transitionend', clear);
          settledRef.current.add(title); // now safe to hand off to the idle loop
        };
        el.addEventListener('transitionend', clear);
      });
    });
  }, [visible]);

  // Cursor-follow 3D tilt on hover — self-contained perspective per card,
  // rAF-batched direct style writes (same lightweight pattern used across
  // the site), so it costs nothing when the pointer isn't a mouse.
  const hoverRectRef = useRef(null);
  const handleCardMouseEnter = (title, e) => {
    hoveredRef.current.add(title); // idle loop hands this card off to the hover tilt
    // Measure once per hover session, not on every mousemove frame — the
    // card doesn't move while hovered (idle loop skips it), so re-reading
    // its rect 60x/sec was a forced-layout read on every single frame,
    // which is what made the tilt feel like it was stuttering.
    hoverRectRef.current = e.currentTarget.getBoundingClientRect();
  };
  const handleCardMouseMove = (e, title) => {
    if (!finePointerRef.current || !hoverRectRef.current) return;
    const el = nodesRef.current[title];
    if (!el) return;
    const { clientX, clientY } = e;
    if (tiltRafRef.current) return;
    tiltRafRef.current = requestAnimationFrame(() => {
      tiltRafRef.current = 0;
      const rect = hoverRectRef.current;
      if (!rect) return;
      const px = (clientX - rect.left) / rect.width - 0.5;
      const py = (clientY - rect.top) / rect.height - 0.5;
      const rx = (py * -TILT_MAX_DEG).toFixed(2);
      const ry = (px * TILT_MAX_DEG).toFixed(2);
      el.style.transform = `perspective(1200px) translateY(-2px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.008)`;
    });
  };
  const handleCardMouseLeave = (title) => {
    // Idle loop picks this card back up on its very next frame (it writes
    // transform untransitioned every tick, so no CSS transition here —
    // one would just make the continuous drift feel smeared/laggy).
    hoveredRef.current.delete(title);
    hoverRectRef.current = null;
  };

  return (
    <section className="section section--bg" id="features">
      <div className="container">
        <SectionHead>
          <span className="eyebrow">Platform</span>
          <h2>Everything around the testing workflow, in one place</h2>
        </SectionHead>

        <div
          ref={(node) => { gridRef.current = node; ref.current = node; }}
          className={`features-grid ${visible ? 'is-visible' : ''}`}
        >
          {FEATURES.map((f, i) => (
            <div
              className="feature-card"
              key={f.title}
              ref={(node) => { nodesRef.current[f.title] = node; }}
              style={{ '--delay': `${i * 70}ms` }}
              onMouseEnter={(e) => handleCardMouseEnter(f.title, e)}
              onMouseMove={(e) => handleCardMouseMove(e, f.title)}
              onMouseLeave={() => handleCardMouseLeave(f.title)}
            >
              {f.badge ? (
                <div className="feature-card__icon feature-card__icon--jira">{f.badge}</div>
              ) : (
                <div className="feature-card__icon"><img src={f.icon} alt="" /></div>
              )}
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
