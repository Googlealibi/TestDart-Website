import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import useReveal from '../hooks/useReveal';
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

const TILT_MAX_DEG = 6; // cursor-follow hover tilt ceiling — restrained, not a gimmick
const DEAL_MS = 700;

export default function Features() {
  const [ref, visible] = useReveal();
  const [focusedTitle, setFocusedTitle] = useState(null);

  const gridRef = useRef(null);
  const nodesRef = useRef({});
  const finePointerRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const tiltRafRef = useRef(0);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    finePointerRef.current =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reducedMotionRef.current;
  }, []);

  // Deck deal: before first paint, gather every card back toward a single
  // point above the grid (like a stacked hand of cards), rotated and
  // scaled down. When the section scrolls into view, they're dealt out
  // to their real grid slot in one clean move — the "deck of cards"
  // interaction, without any persistent drag/reorder machinery.
  useLayoutEffect(() => {
    if (reducedMotionRef.current) return;
    const grid = gridRef.current;
    if (!grid) return;
    const gridRect = grid.getBoundingClientRect();
    const originX = gridRect.left + gridRect.width / 2;
    const originY = gridRect.top + 30;

    Object.values(nodesRef.current).forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = originX - (r.left + r.width / 2);
      const dy = originY - (r.top + r.height / 2);
      const rot = (i % 2 === 0 ? -1 : 1) * (5 + (i % 3) * 3.5);
      el.style.transition = 'none';
      el.style.opacity = '0';
      el.style.zIndex = String(20 - i);
      el.style.transform = `translate(${dx}px, ${dy}px) rotate(${rot}deg) scale(0.78)`;
    });
  }, []);

  useEffect(() => {
    if (!visible || reducedMotionRef.current) return;
    Object.entries(nodesRef.current).forEach(([, el]) => {
      if (!el) return;
      requestAnimationFrame(() => {
        el.style.transition = `transform ${DEAL_MS}ms cubic-bezier(0.16, 1, 0.3, 1) var(--delay, 0ms), opacity 500ms ease var(--delay, 0ms)`;
        el.style.opacity = '1';
        el.style.transform = '';
        const clear = () => {
          el.style.transition = '';
          el.style.zIndex = '';
          el.removeEventListener('transitionend', clear);
        };
        el.addEventListener('transitionend', clear);
      });
    });
  }, [visible]);

  useEffect(() => {
    if (!focusedTitle) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setFocusedTitle(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [focusedTitle]);

  // Cursor-follow 3D tilt on hover — self-contained perspective per card,
  // rAF-batched direct style writes (same lightweight pattern used across
  // the site), so it costs nothing when the pointer isn't a mouse.
  const handleCardMouseMove = (e, title) => {
    if (!finePointerRef.current || focusedTitle) return;
    const el = nodesRef.current[title];
    if (!el) return;
    const { clientX, clientY } = e;
    if (tiltRafRef.current) return;
    tiltRafRef.current = requestAnimationFrame(() => {
      tiltRafRef.current = 0;
      const rect = el.getBoundingClientRect();
      const px = (clientX - rect.left) / rect.width - 0.5;
      const py = (clientY - rect.top) / rect.height - 0.5;
      const rx = (py * -TILT_MAX_DEG).toFixed(2);
      const ry = (px * TILT_MAX_DEG).toFixed(2);
      el.style.transform = `perspective(1000px) translateY(-5px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
    });
  };
  const handleCardMouseLeave = (title) => {
    const el = nodesRef.current[title];
    if (el) el.style.transform = '';
  };

  return (
    <section className="section section--bg" id="features">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Platform</span>
          <h2>Everything around the testing workflow, in one place</h2>
        </div>

        <div
          ref={(node) => { gridRef.current = node; ref.current = node; }}
          className={`features-grid ${visible ? 'is-visible' : ''} ${focusedTitle ? 'has-focus' : ''}`}
        >
          {FEATURES.map((f, i) => {
            const isFocused = focusedTitle === f.title;
            return (
              <div
                className={`feature-card${isFocused ? ' is-focused' : ''}`}
                key={f.title}
                ref={(node) => { nodesRef.current[f.title] = node; }}
                style={{ '--delay': `${i * 70}ms` }}
                onMouseMove={(e) => handleCardMouseMove(e, f.title)}
                onMouseLeave={() => handleCardMouseLeave(f.title)}
                onClick={() => setFocusedTitle((cur) => (cur === f.title ? null : f.title))}
              >
                {f.badge ? (
                  <div className="feature-card__icon feature-card__icon--jira">{f.badge}</div>
                ) : (
                  <div className="feature-card__icon"><img src={f.icon} alt="" /></div>
                )}
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
