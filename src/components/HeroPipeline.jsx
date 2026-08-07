import AppShellMock from './AppShellMock';
import useTilt from '../hooks/useTilt';
import './HeroPipeline.css';

const ROWS = [
  { id: 'TC-014', name: 'User can reset password via email link', status: 'Passed' },
  { id: 'TC-015', name: 'Checkout fails gracefully on expired card', status: 'Passed' },
  { id: 'TC-016', name: 'Search returns results for partial match', status: 'Running' },
  { id: 'TC-017', name: 'Admin can invite user with viewer role', status: 'Queued' },
];

const statusClass = { Passed: 'is-pass', Running: 'is-running', Queued: 'is-queued' };

const GENERATED = [
  'Reject invalid login',
  'Lock after 5 attempts',
  'Allow valid credentials',
];

// A quiet 3D scene of the actual TestDart pipeline: Requirement -> Test
// Cases -> Approval -> Browser Execution -> Report, as floating UI layers
// around the execution window. Depth comes from translateZ inside a
// perspective/preserve-3d stack, motion from a slow per-layer float loop
// plus the shared pointer-tilt hook — no canvas/WebGL, just transforms.
export default function HeroPipeline() {
  const stageRef = useTilt({ maxDeg: 4, disableBelow: 900 });

  return (
    <div className="hero-pipeline" ref={stageRef}>
      <div className="hero-pipeline__card hero-pipeline__card--requirement">
        <span className="hero-pipeline__label">Requirement</span>
        <div className="hero-pipeline__lines">
          <span /><span /><span />
        </div>
      </div>

      <div className="hero-pipeline__pill hero-pipeline__pill--approval">
        <span className="hero-pipeline__pill-dot" />
        Approved
      </div>

      <div className="hero-pipeline__window">
        <AppShellMock>
          <div className="hero-mock">
            <div className="hero-mock__head">
              <span>Regression Suite — Checkout</span>
              <span className="hero-mock__live"><i /> Live</span>
            </div>
            <div className="hero-mock__list">
              {ROWS.map((row) => (
                <div className="hero-mock__row" key={row.id}>
                  <span className="hero-mock__id">{row.id}</span>
                  <span className="hero-mock__name">{row.name}</span>
                  <span className={`hero-mock__status ${statusClass[row.status]}`}>{row.status}</span>
                </div>
              ))}
            </div>
          </div>
        </AppShellMock>
      </div>

      <div className="hero-pipeline__card hero-pipeline__card--tests">
        <span className="hero-pipeline__label">Generated</span>
        <div className="hero-pipeline__checklist">
          {GENERATED.map((label) => (
            <div className="hero-pipeline__check-row" key={label}>
              <span className="hero-pipeline__check-dot" />
              {label}
            </div>
          ))}
        </div>
      </div>

      <div className="hero-pipeline__card hero-pipeline__card--report">
        <span className="hero-pipeline__report-badge">✓</span>
        <span className="hero-pipeline__label">Report Ready</span>
      </div>
    </div>
  );
}
