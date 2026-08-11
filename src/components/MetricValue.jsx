import { useEffect, useState } from 'react';

// Numeric stats count up from zero; word stats flip from a "before" state
// into the real value — so the tile reads as a value changing, not a
// static label appearing.
export default function MetricValue({ value, before, visible, delay = 0 }) {
  const numeric = value.match(/^(\d+)(.*)$/);

  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!numeric || !visible) return undefined;
    const target = parseInt(numeric[1], 10);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(target);
      return undefined;
    }
    const duration = 900;
    let raf;
    const startTime = performance.now() + delay;
    const tick = (now) => {
      const t = Math.min(1, Math.max(0, (now - startTime) / duration));
      const eased = 1 - (1 - t) ** 3;
      setCount(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible]);

  if (numeric) {
    return <span className="metrics-tile__value">{count}{numeric[2]}</span>;
  }

  return (
    <span className="metrics-tile__value">
      <span className="metrics-tile__flip">
        <span
          className={`metrics-tile__flip-inner ${visible ? 'is-flipped' : ''}`}
          style={{ transitionDelay: `${delay}ms` }}
        >
          <span className="metrics-tile__flip-line">{before || value}</span>
          <span className="metrics-tile__flip-line">{value}</span>
        </span>
      </span>
    </span>
  );
}
