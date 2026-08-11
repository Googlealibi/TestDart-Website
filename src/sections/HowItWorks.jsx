import { useEffect, useRef, useState } from 'react';
import SectionHead from '../components/SectionHead';
import { CheckIcon } from '../components/LineIcons';
import chromeIcon from '../assets/icons/chrome.svg';
import firefoxIcon from '../assets/icons/firefox.svg';
import edgeIcon from '../assets/icons/edge.svg';
import './HowItWorks.css';

const TEST_ITEMS = [
  { id: 'TC-101', title: 'Log in with a valid email and password' },
  { id: 'TC-102', title: 'Redirect to the dashboard after login' },
  { id: 'TC-103', title: 'Display the account name in the header' },
  { id: 'TC-104', title: 'Allow password reset from the login screen' },
];

const RUN_STEPS = [
  { label: 'Navigate to /login', state: 'done' },
  { label: 'Enter valid email and password', state: 'done' },
  { label: 'Submit the login form', state: 'active' },
  { label: 'Confirm the dashboard loads', state: 'pending' },
];

const RESULTS = [
  { id: 'TC-101', title: 'Log in with a valid email and password', result: 'pass' },
  { id: 'TC-102', title: 'Redirect to the dashboard after login', result: 'pass' },
  { id: 'TC-103', title: 'Display the account name in the header', result: 'fail' },
  { id: 'TC-104', title: 'Allow password reset from the login screen', result: 'pass' },
];

function RequirementVisual() {
  return (
    <div className="hiw-panel">
      <span className="hiw-panel__label">Requirement</span>
      <p className="hiw-doc">
        Users should be able to log in with a valid email and password and land on their
        personal dashboard.
      </p>
    </div>
  );
}

function GeneratedVisual() {
  return (
    <div className="hiw-panel">
      <span className="hiw-panel__label">Generated Test Cases</span>
      <div className="hiw-cases">
        {TEST_ITEMS.map((c) => (
          <div className="hiw-case" key={c.id}>
            <span className="hiw-case__id">{c.id}</span>
            <span className="hiw-case__title">{c.title}</span>
            <span className="hiw-tag hiw-tag--new">New</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReadyVisual() {
  return (
    <div className="hiw-panel">
      <span className="hiw-panel__label">Ready to Run</span>
      <div className="hiw-cases">
        {TEST_ITEMS.map((c) => (
          <div className="hiw-case" key={c.id}>
            <span className="hiw-case__id">{c.id}</span>
            <span className="hiw-case__title">{c.title}</span>
            <span className="hiw-tag hiw-tag--ready"><CheckIcon /> Ready</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExecutionVisual() {
  return (
    <div className="chrome-frame">
      <div className="chrome-frame__bar">
        <span className="chrome-frame__dot" /><span className="chrome-frame__dot" /><span className="chrome-frame__dot" />
        <span className="chrome-frame__url">app.testdart.io/project/automation-run</span>
      </div>
      <div className="hiw-run">
        <div className="hiw-run__head">
          <span>Running: Login Suite</span>
          <span className="hiw-run__browsers">
            <img src={chromeIcon} alt="" /><img src={firefoxIcon} alt="" /><img src={edgeIcon} alt="" />
          </span>
        </div>
        <div className="hiw-run__bar"><div className="hiw-run__bar-fill" /></div>
        <div className="hiw-run__steps">
          {RUN_STEPS.map((s) => (
            <div className={`hiw-run__step is-${s.state}`} key={s.label}>
              <span className="hiw-run__dot" />
              {s.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReportVisual() {
  const passed = RESULTS.filter((r) => r.result === 'pass').length;
  const failed = RESULTS.length - passed;
  return (
    <div className="hiw-panel">
      <div className="hiw-report__head">
        <span className="hiw-panel__label">Test Report — Login Suite</span>
        <div className="hiw-report__summary">
          <span className="hiw-tag hiw-tag--pass">{passed} Passed</span>
          <span className="hiw-tag hiw-tag--fail">{failed} Failed</span>
        </div>
      </div>
      <div className="hiw-cases">
        {RESULTS.map((r) => (
          <div className="hiw-case" key={r.id}>
            <span className="hiw-case__id">{r.id}</span>
            <span className="hiw-case__title">{r.title}</span>
            <span className={`hiw-tag hiw-tag--${r.result}`}>{r.result === 'pass' ? 'Pass' : 'Fail'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const STEPS = [
  {
    label: 'Requirement',
    title: 'Start with your requirement',
    description: 'Bring in a requirement, Jira issue, document, or project input that describes what needs to be tested.',
    Visual: RequirementVisual,
  },
  {
    label: 'Generate',
    title: 'Turn it into test cases',
    description: 'TestDart uses the available context to create structured test cases covering the expected behavior.',
    Visual: GeneratedVisual,
  },
  {
    label: 'Prepare',
    title: 'Prepare tests for execution',
    description: 'Review the generated tests and move the ones you need forward without rebuilding them manually.',
    Visual: ReadyVisual,
  },
  {
    label: 'Execute',
    title: 'Run the tests in a real browser',
    description: 'TestDart executes the selected tests in a real browser and shows the progress as the run happens.',
    Visual: ExecutionVisual,
  },
  {
    label: 'Report',
    title: 'Get a clear testing result',
    description: 'Execution results are brought together into a readable report so your team can quickly understand the outcome.',
    Visual: ReportVisual,
  },
];

// Percentage coordinates (of the journey container) each step's card sits
// near — alternating left/right all the way through, evenly spaced, so
// the rhythm (and the gap around each card) stays the same for every
// step including the last one instead of breaking to a centered spot.
// The path SVG is built from these same points, so the line always
// matches where the cards actually are.
const NODES = [
  { x: 24, y: 10 },
  { x: 76, y: 30 },
  { x: 24, y: 50 },
  { x: 76, y: 70 },
  { x: 24, y: 90 },
];
const CTRL_DY = 10; // vertical handle offset — how pronounced each curve is

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

export default function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);
  const journeyRef = useRef(null);

  // Scroll-driven, but NOT scroll-jacked: the container has no artificial
  // extra height and nothing is pinned/sticky, so this never holds the
  // page hostage — it only reads normal scroll position (rAF-throttled,
  // gated to while the section is actually on screen) to decide which
  // step is active and how far the path's glow has filled in.
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

  const progressFraction = activeIndex / (NODES.length - 1);

  return (
    <section className="section section--bg" id="how-it-works">
      <div className="container">
        <SectionHead>
          <span className="eyebrow">HOW IT WORKS</span>
          <h2>From your requirement to a clear test result</h2>
          <p>
            TestDart takes the testing work from the information you already have to executable
            tests and readable results, keeping the journey connected from start to finish.
          </p>
        </SectionHead>

        <div ref={journeyRef} className="hiw-journey">
          <svg className="hiw-journey__path" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path d={PATH_D} className="hiw-journey__path-line" vectorEffect="non-scaling-stroke" />
            {/* Mild glow that fills in along the line as you move through
                the steps — pathLength="1" makes the dash math trivial
                (0 = nothing traveled yet, 1 = reached the end), so there's
                no ball to look like it's moving on its own. */}
            <path
              d={PATH_D}
              className="hiw-journey__path-glow"
              vectorEffect="non-scaling-stroke"
              pathLength="1"
              style={{ strokeDashoffset: 1 - progressFraction }}
            />
          </svg>

          {NODES.map((n, i) => (
            <span
              key={`wp-${n.x}-${n.y}`}
              className={`hiw-journey__waypoint ${i <= activeIndex ? 'is-passed' : ''}`}
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
              aria-hidden="true"
            />
          ))}

          {STEPS.map((step, i) => {
            const Visual = step.Visual;
            const side = i % 2 === 0 ? 'is-left' : 'is-right';
            return (
              <div className={`hiw-journey__row ${side}`} key={step.label}>
                <div
                  className={`hiw-journey__card ${i === activeIndex ? 'is-active' : ''} ${i < activeIndex ? 'is-done' : ''} ${i === STEPS.length - 1 ? 'is-last' : ''}`}
                >
                  <div className="hiw-journey__card-head">
                    <span className="hiw-journey__num">
                      {i < activeIndex ? <CheckIcon /> : String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="hiw-journey__label">{step.label}</span>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  <div className="hiw-journey__visual"><Visual /></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
