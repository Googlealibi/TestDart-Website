import './SectionDivider.css';

const REDUCED_MOTION = typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// A decorative seam between sections, not a straight cut. Draws one soft
// curve across the boundary with a pulse riding it — the same trace/pulse
// language as SiteBackground, so the join reads as that system surfacing
// briefly rather than a separate ornament. `variant="dark"` is used at the
// two seams that lead into the dark CTA/footer blocks.
export default function SectionDivider({ variant = 'light' }) {
  const id = `divider-${Math.random().toString(36).slice(2, 8)}`;
  return (
    <div className={`section-divider section-divider--${variant}`} aria-hidden="true">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" focusable="false">
        <path
          id={id}
          className="section-divider__path"
          d="M0 64 C 220 20, 420 108, 720 62 S 1220 16, 1440 60"
        />
        {!REDUCED_MOTION && (
          <circle r="2.6" className="section-divider__pulse">
            <animateMotion dur="7s" repeatCount="indefinite" rotate="auto">
              <mpath href={`#${id}`} />
            </animateMotion>
          </circle>
        )}
      </svg>
    </div>
  );
}
