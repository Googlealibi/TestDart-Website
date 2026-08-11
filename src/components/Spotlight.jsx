import { useRef, useState } from 'react';
import './Spotlight.css';

// Cursor-follow radial glow, wraps any element (`as`) without disturbing
// whatever handlers/props it already carries — used on card grids/lists
// where each item needs its own independent mouse tracking.
export default function Spotlight({
  as: Tag = 'div',
  spotlightColor = 'rgba(55, 134, 53, 0.16)',
  className = '',
  children,
  onMouseEnter,
  onMouseLeave,
  ...rest
}) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <Tag
      ref={ref}
      className={`spotlight ${className}`.trim()}
      onMouseMove={handleMove}
      onMouseEnter={(e) => { setOpacity(1); onMouseEnter?.(e); }}
      onMouseLeave={(e) => { setOpacity(0); onMouseLeave?.(e); }}
      {...rest}
    >
      <span
        className="spotlight__glow"
        aria-hidden="true"
        style={{ opacity, background: `radial-gradient(480px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 45%)` }}
      />
      {children}
    </Tag>
  );
}
