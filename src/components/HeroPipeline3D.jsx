import useTilt from '../hooks/useTilt';
import './HeroPipeline3D.css';

const GENERATED = [
  'Reject invalid login',
  'Lock after 5 attempts',
  'Allow valid credentials',
];

const RUN_ROWS = [
  { id: 'TC-014', status: 'Passed' },
  { id: 'TC-015', status: 'Passed' },
  { id: 'TC-016', status: 'Running' },
];

const statusClass = { Passed: 'is-pass', Running: 'is-running' };

// A real 3D scene of the TestDart pipeline itself — Requirement, Generated
// Tests, Browser Execution, Report — as four floating panels at different
// depths inside a perspective stack, connected by an animated signal path.
// Cursor tilt (useTilt) rotates the whole scene; because each panel sits at
// a different translateZ, the tilt reads as real parallax depth, not a
// flat image moving. This is meant to be read, not just looked at: it's
// the same four-stage story the product runs, in order, front to back.
export default function HeroPipeline3D() {
  const stageRef = useTilt({ maxDeg: 9, disableBelow: 900 });

  return (
    <div className="hp3d-stage" ref={stageRef}>
      <div className="hp3d-glow" />

      <div className="hp3d-scene">
        <svg className="hp3d-links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path id="hp3d-path" className="hp3d-links__line" d="M14,16 C10,40 20,46 24,62 S48,44 54,40 S82,52 82,68" />
          <circle r="1.6" className="hp3d-links__pulse">
            <animateMotion dur="5.5s" repeatCount="indefinite">
              <mpath href="#hp3d-path" />
            </animateMotion>
          </circle>
        </svg>

        <div className="hp3d-card hp3d-card--requirement" aria-hidden="true">
          <span className="hp3d-card__label">Requirement</span>
          <div className="hp3d-lines"><span /><span /><span /></div>
        </div>

        <div className="hp3d-card hp3d-card--generated" aria-hidden="true">
          <span className="hp3d-card__label">Generated</span>
          <div className="hp3d-checklist">
            {GENERATED.map((label) => (
              <div className="hp3d-check-row" key={label}>
                <span className="hp3d-check-dot" />
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="chrome-frame hp3d-card hp3d-card--browser" aria-hidden="true">
          <div className="chrome-frame__bar">
            <span className="chrome-frame__dot" /><span className="chrome-frame__dot" /><span className="chrome-frame__dot" />
            <span className="chrome-frame__url">app.testdart.io/run</span>
          </div>
          <div className="hp3d-browser__body">
            <div className="hp3d-browser__head">
              <span>Regression Suite</span>
              <span className="hp3d-browser__live"><i /> Live</span>
            </div>
            {RUN_ROWS.map((row) => (
              <div className="hp3d-browser__row" key={row.id}>
                <span className="hp3d-browser__id">{row.id}</span>
                <span className={`hp3d-browser__status ${statusClass[row.status]}`}>{row.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hp3d-card hp3d-card--report" aria-hidden="true">
          <span className="hp3d-card__badge">✓</span>
          <span className="hp3d-card__label">Report Ready</span>
        </div>
      </div>
    </div>
  );
}
