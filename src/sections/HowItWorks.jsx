import useReveal from '../hooks/useReveal';
import SectionHead from '../components/SectionHead';
import Spotlight from '../components/Spotlight';
import { CheckIcon } from '../components/LineIcons';
import chromeIcon from '../assets/icons/chrome.svg';
import firefoxIcon from '../assets/icons/firefox.svg';
import edgeIcon from '../assets/icons/edge.svg';
import './HowItWorks.css';

const TEST_ITEMS = [
  { id: 'TC-101', title: 'Filter search results by multiple categories at once', steps: 4, priority: 'High' },
  { id: 'TC-102', title: 'Sort results by price without losing active filters', steps: 3, priority: 'Medium' },
  { id: 'TC-103', title: 'Persist filters after navigating back from a result', steps: 3, priority: 'Medium' },
  { id: 'TC-104', title: 'Show an accurate result count as filters change', steps: 2, priority: 'Low' },
];

const RUN_STEPS = [
  { label: 'Navigate to /search', state: 'done' },
  { label: 'Apply category and price filters', state: 'done' },
  { label: 'Confirm result count updates', state: 'active' },
  { label: 'Assert filters persist after navigating back', state: 'pending' },
];

const RESULTS = [
  { id: 'TC-101', title: 'Filter search results by multiple categories at once', result: 'pass' },
  { id: 'TC-102', title: 'Sort results by price without losing active filters', result: 'pass' },
  { id: 'TC-103', title: 'Persist filters after navigating back from a result', result: 'fail' },
  { id: 'TC-104', title: 'Show an accurate result count as filters change', result: 'pass' },
];

function RequirementVisual() {
  return (
    <div className="hiw-panel">
      <span className="hiw-panel__label">Requirement</span>
      <p className="hiw-doc">
        Users should be able to filter search results by multiple categories and price range,
        with the result count and applied filters staying accurate while they browse.
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
            <div className="hiw-case__top">
              <span className="hiw-case__id">{c.id}</span>
              <span className="hiw-case__title">{c.title}</span>
              <span className="hiw-tag hiw-tag--new">New</span>
            </div>
            <span className="hiw-case__meta">{c.steps} steps &middot; {c.priority} priority</span>
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
            <div className="hiw-case__top">
              <span className="hiw-case__id">{c.id}</span>
              <span className="hiw-case__title">{c.title}</span>
              <span className="hiw-tag hiw-tag--ready"><CheckIcon /> Ready</span>
            </div>
            <span className="hiw-case__meta">{c.steps} steps &middot; {c.priority} priority</span>
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
          <span>Running: Search &amp; Filters Suite</span>
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
        <span className="hiw-panel__label">Test Report for Search &amp; Filters Suite</span>
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
    description: 'Bring in a requirement, document, or project input that describes what needs to be tested.',
    Visual: RequirementVisual,
  },
  {
    label: 'Generate',
    title: 'Turn it into test cases',
    description: 'testdart uses the available context to create structured test cases covering the expected behavior.',
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
    description: 'testdart executes the selected tests in a real browser and shows the progress as the run happens.',
    Visual: ExecutionVisual,
  },
  {
    label: 'Report',
    title: 'Get a clear testing result',
    description: 'Execution results are brought together into a readable report so your team can quickly understand the outcome.',
    Visual: ReportVisual,
  },
];

const STICKY_TOP = 112;
const STICKY_STEP = 14;

export default function HowItWorks() {
  const [ref, visible] = useReveal(0.15);

  return (
    <section className="section section--bg" id="how-it-works">
      <div className="container hiw-layout">
        <div className={`hiw-intro ${visible ? 'is-visible' : ''}`} ref={ref}>
          <SectionHead>
            <span className="eyebrow">HOW IT WORKS</span>
            <h2>From your requirement to a clear test result</h2>
            <p>
              testdart takes the testing work from the information you already have to executable
              tests and readable results, keeping the journey connected from start to finish.
            </p>
          </SectionHead>
        </div>

        <ul className="hiw-cards-stack">
          {STEPS.map((step, i) => {
            const Visual = step.Visual;
            return (
              <Spotlight
                as="li"
                className="hiw-stack-card"
                key={step.label}
                style={{ top: `${STICKY_TOP + i * STICKY_STEP}px`, zIndex: i + 1 }}
              >
                <div className="hiw-stack-card__head">
                  <span className="hiw-stack-card__index">{String(i + 1).padStart(2, '0')}</span>
                  <span className="hiw-stack-card__label">{step.label}</span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <div className="hiw-stack-card__visual"><Visual /></div>
              </Spotlight>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
