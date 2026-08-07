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

const IDENTITY_ORDER = FEATURES.map((_, i) => i);
const DRAG_THRESHOLD = 6; // px of pointer movement before a press becomes a drag
const SNAP_RATIO = 0.55; // fraction of card width/height within which a slot magnetically catches

function snapshotRects(nodeMap) {
  const rects = {};
  Object.entries(nodeMap).forEach(([title, el]) => {
    if (el) rects[title] = el.getBoundingClientRect();
  });
  return rects;
}

export default function Features() {
  const [ref, visible] = useReveal();
  const [order, setOrder] = useState(IDENTITY_ORDER);
  const [focusedTitle, setFocusedTitle] = useState(null);

  const gridRef = useRef(null);
  const nodesRef = useRef({});
  const prevRectsRef = useRef(null);
  const dragRef = useRef(null); // holds all mutable state for an in-flight drag

  // FLIP: whenever card order changes (drag-swap or reset), the cards that
  // moved are already in their new DOM position; give each one an inverse
  // transform back to where it visually *was*, then release it into a
  // transition so it glides into the new slot instead of jump-cutting.
  useLayoutEffect(() => {
    const prev = prevRectsRef.current;
    if (!prev) return;
    prevRectsRef.current = null;

    Object.entries(nodesRef.current).forEach(([title, el]) => {
      if (!el) return;
      const before = prev[title];
      if (!before) return;
      const after = el.getBoundingClientRect();
      const dx = before.left - after.left;
      const dy = before.top - after.top;
      if (!dx && !dy) return;
      el.style.transition = 'none';
      el.style.transform = `translate(${dx}px, ${dy}px)`;
      // eslint-disable-next-line no-unused-expressions
      el.getBoundingClientRect(); // force reflow so the transition below actually animates
      requestAnimationFrame(() => {
        el.style.transition = 'transform 0.45s cubic-bezier(0.22, 0.8, 0.28, 1)';
        el.style.transform = '';
        const clear = () => {
          el.style.transition = '';
          el.removeEventListener('transitionend', clear);
        };
        el.addEventListener('transitionend', clear);
      });
    });
  }, [order]);

  useEffect(() => {
    if (!focusedTitle) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setFocusedTitle(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [focusedTitle]);

  const reorderWithFlip = (nextOrder) => {
    prevRectsRef.current = snapshotRects(nodesRef.current);
    setOrder(nextOrder);
  };

  const resetLayout = () => {
    setFocusedTitle(null);
    reorderWithFlip(IDENTITY_ORDER);
  };

  const handlePointerDown = (e, title) => {
    if (e.button !== undefined && e.button !== 0) return;

    const el = nodesRef.current[title];
    if (!el || !gridRef.current) return;

    const container = gridRef.current.getBoundingClientRect();
    const startRect = el.getBoundingClientRect();

    // Fixed slot centers for every other card, captured once at drag start
    // (they don't move until a swap actually commits).
    const slots = Object.entries(nodesRef.current)
      .filter(([t]) => t !== title)
      .map(([t, node]) => {
        const r = node.getBoundingClientRect();
        return { title: t, cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
      });

    dragRef.current = {
      title,
      el,
      pointerType: e.pointerType,
      startX: e.clientX,
      startY: e.clientY,
      startRect,
      container,
      minDx: container.left - startRect.left,
      maxDx: container.right - startRect.right,
      minDy: container.top - startRect.top,
      maxDy: container.bottom - startRect.bottom,
      slots,
      snapTarget: null,
      moved: false,
      dragging: false,
      lastDist: 0,
      rafId: 0,
      pendingX: 0,
      pendingY: 0,
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  const applyDragFrame = () => {
    const d = dragRef.current;
    if (!d) return;
    d.rafId = 0;

    const dx = Math.max(d.minDx, Math.min(d.maxDx, d.pendingX));
    const dy = Math.max(d.minDy, Math.min(d.maxDy, d.pendingY));

    d.el.style.transform = `translate(${dx}px, ${dy}px) scale(1.025)`;

    const cx = d.startRect.left + d.startRect.width / 2 + dx;
    const cy = d.startRect.top + d.startRect.height / 2 + dy;
    const w = d.startRect.width;

    let nearest = null;
    let nearestDist = Infinity;
    d.slots.forEach((slot) => {
      const dist = Math.hypot(slot.cx - cx, slot.cy - cy);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearest = slot;
      }
    });

    const nextTarget = nearest && nearestDist < w * SNAP_RATIO ? nearest.title : null;
    if (nextTarget !== d.snapTarget) {
      if (d.snapTarget) nodesRef.current[d.snapTarget]?.classList.remove('is-snap-target');
      if (nextTarget) nodesRef.current[nextTarget]?.classList.add('is-snap-target');
      d.snapTarget = nextTarget;
    }
  };

  const handlePointerMove = (e) => {
    const d = dragRef.current;
    if (!d) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    d.lastDist = Math.hypot(dx, dy);

    if (!d.dragging) {
      // Touch: never hijack the gesture into a card-drag — a finger move
      // is left alone to scroll the page. Only a clean tap (tiny total
      // movement) is handled, in the pointerup click-branch below.
      if (d.pointerType === 'touch') return;
      if (d.lastDist < DRAG_THRESHOLD) return;
      d.dragging = true;
      d.moved = true;
      d.el.classList.add('is-dragging');
      d.el.style.zIndex = '30';
    }

    d.pendingX = dx;
    d.pendingY = dy;
    if (!d.rafId) d.rafId = requestAnimationFrame(applyDragFrame);
  };

  const handlePointerUp = () => {
    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', handlePointerUp);

    const d = dragRef.current;
    dragRef.current = null;
    if (!d) return;

    if (d.rafId) cancelAnimationFrame(d.rafId);
    if (d.snapTarget) nodesRef.current[d.snapTarget]?.classList.remove('is-snap-target');

    if (!d.moved) {
      // A press that never escalated to a drag: if the pointer also barely
      // moved it's a click/tap (toggle focus). If it moved a lot without
      // escalating, it was a touch pointer scrolling the page — ignore it.
      if (d.lastDist < DRAG_THRESHOLD) {
        setFocusedTitle((cur) => (cur === d.title ? null : d.title));
      }
      return;
    }

    d.el.classList.remove('is-dragging');
    d.el.style.zIndex = '';

    if (d.snapTarget) {
      const from = order.findIndex((i) => FEATURES[i].title === d.title);
      const to = order.findIndex((i) => FEATURES[i].title === d.snapTarget);
      if (from !== -1 && to !== -1) {
        const next = order.slice();
        [next[from], next[to]] = [next[to], next[from]];
        // Snapshot rects *before* clearing the drag transform, so the FLIP
        // "First" position is where the card visually is (under the
        // pointer), not its old grid slot — otherwise it would jump back
        // home for a frame before animating into the new slot.
        prevRectsRef.current = snapshotRects(nodesRef.current);
        d.el.style.transform = '';
        setOrder(next);
        return;
      }
    }

    // No valid drop target: glide back home.
    d.el.style.transition = 'transform 0.35s cubic-bezier(0.22, 0.8, 0.28, 1)';
    d.el.style.transform = '';
    const clear = () => {
      d.el.style.transition = '';
      d.el.removeEventListener('transitionend', clear);
    };
    d.el.addEventListener('transitionend', clear);
  };

  return (
    <section className="section section--bg" id="features">
      <div className="container">
        <div className="features-head">
          <div className="section-head">
            <span className="eyebrow">Platform</span>
            <h2>Everything around the testing workflow, in one place</h2>
          </div>
          <button type="button" className="features-reset" onClick={resetLayout} aria-label="Reset card layout">
            <span className="features-reset__icon" aria-hidden="true">&#8634;</span> Reset Layout
          </button>
        </div>

        <div
          ref={(node) => { gridRef.current = node; ref.current = node; }}
          className={`features-grid ${visible ? 'is-visible' : ''} ${focusedTitle ? 'has-focus' : ''}`}
        >
          {order.map((idx, i) => {
            const f = FEATURES[idx];
            const isFocused = focusedTitle === f.title;
            return (
              <div
                className={`feature-card${isFocused ? ' is-focused' : ''}`}
                key={f.title}
                ref={(node) => { nodesRef.current[f.title] = node; }}
                style={{ '--delay': `${i * 40}ms`, '--float-offset': `${(i % 3) * 700}ms` }}
                onPointerDown={(e) => handlePointerDown(e, f.title)}
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
