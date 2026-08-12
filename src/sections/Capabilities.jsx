import useReveal from '../hooks/useReveal';
import AppShellMock from '../components/AppShellMock';
import {
  DocumentIcon, ImportIcon, BrowserIcon, ActivityIcon,
  LinkIcon, ClipboardIcon, ClockIcon, SparkleIcon, PlayIcon,
} from '../components/LineIcons';
import chromeIcon from '../assets/icons/chrome.svg';
import firefoxIcon from '../assets/icons/firefox.svg';
import edgeIcon from '../assets/icons/edge.svg';
import './Capabilities.css';

const CASES = [
  { id: 'TC-041', title: 'Apply valid promo code and update order total', steps: 4, priority: 'High' },
  { id: 'TC-042', title: 'Complete checkout with a saved payment method', steps: 5, priority: 'High' },
  { id: 'TC-043', title: 'Recalculate tax when shipping address changes', steps: 3, priority: 'Medium' },
  { id: 'TC-044', title: 'Split an order across two warehouses correctly', steps: 6, priority: 'Medium' },
];

const RUN_STEPS = [
  { label: 'Navigate to /checkout', state: 'done' },
  { label: 'Apply promo code SAVE20', state: 'done' },
  { label: 'Confirm order total updates with discount', state: 'active' },
  { label: 'Assert order confirmation is displayed', state: 'pending' },
];

const ROWS = [
  {
    eyebrow: 'AI Test Generation',
    title: 'Skip the Blank Page When Writing Tests',
    body: "Give testdart a requirement or document and get back structured test cases with clear steps and priority, ready for your team to review before anything runs.",
    list: [
      { Icon: DocumentIcon, text: 'Start from a requirement or document' },
      { Icon: ImportIcon, text: 'Get structured steps and priority set automatically' },
      { Icon: BrowserIcon, text: 'Review and edit before anything is marked ready' },
      { Icon: ActivityIcon, text: "Skip rebuilding tests from scratch for every requirement" },
    ],
    cta: { label: 'Get Started' },
  },
  {
    eyebrow: 'Project Brain',
    title: 'Unified Memory of Your Project',
    body: "Upload your project documentation once, and testdart stores it in your Project Brain. From there, every requirement you run can pull from that same context automatically, so you're not uploading or explaining your application over and over again.",
    list: [
      { Icon: LinkIcon, text: 'Upload your project documentation once to build your Project Brain' },
      { Icon: ClipboardIcon, text: 'testdart stores it and keeps it available for every requirement' },
      { Icon: ClockIcon, text: "Each new requirement automatically pulls from what's already uploaded" },
      { Icon: SparkleIcon, text: 'No need to upload or re-explain the same project details again' },
    ],
    cta: { label: 'Get Started' },
  },
  {
    eyebrow: 'Self-Healing Execution',
    title: '100% self-healing. No code at all.',
    body: "Applications change all the time, a button moves, a label gets renamed, a flow gets tweaked. Instead of every small change breaking your tests, testdart is built to notice what changed and adjust the test so it can keep running. That means less time spent patching broken tests after every update, and more time spent actually testing your application.",
    list: [
      { Icon: PlayIcon, text: 'Reduce the need to write and maintain test scripts manually' },
      { Icon: SparkleIcon, text: 'Keep running through small application changes without a rewrite' },
      { Icon: ClipboardIcon, text: 'Adapt affected test steps when your application changes' },
      { Icon: ClockIcon, text: 'Spend less time fixing tests and more time testing your application' },
    ],
    cta: { label: 'Get Started' },
  },
];

function GenerationVisual() {
  return (
    <div className="capability-visual--split">
      <div className="capability-panel">
        <span className="capability-label">Requirement</span>
        <div className="capability-req">
          Users must be able to apply a valid promo code at checkout and see the order total,
          including tax and shipping, update immediately before completing payment.
        </div>
      </div>

      <div className="capability-arrow"><span>AI</span></div>

      <div className="capability-panel capability-panel--result">
        <span className="capability-label">Generated Test Cases</span>
        <div className="capability-cases">
          {CASES.map((c) => (
            <div className="capability-case" key={c.id}>
              <div className="capability-case__top">
                <span className="capability-case-id">{c.id}</span>
                <span className="capability-case-title">{c.title}</span>
                <span className={`capability-case-priority p-${c.priority.toLowerCase()}`}>{c.priority}</span>
              </div>
              <span className="capability-case__meta">{c.steps} steps</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MemoryVisual() {
  return (
    <div className="capability-panel capability-panel--full">
      <span className="capability-label">Project Brain</span>
      <div className="memory-mock">
        <svg className="memory-mock__wires" viewBox="0 0 200 160" preserveAspectRatio="none">
          <path d="M30 24 L100 80" />
          <path d="M170 24 L100 80" />
          <path d="M30 136 L100 80" />
          <path d="M170 136 L100 80" />
        </svg>
        <span className="memory-mock__node" style={{ left: '15%', top: '15%' }}>Requirement</span>
        <span className="memory-mock__node" style={{ left: '85%', top: '15%' }}>Test Case</span>
        <span className="memory-mock__node" style={{ left: '15%', top: '85%' }}>Execution</span>
        <span className="memory-mock__node" style={{ left: '85%', top: '85%' }}>Report</span>
        <span className="memory-mock__hub">Project<br />Memory</span>
      </div>
    </div>
  );
}

function ExecutionVisual() {
  return (
    <AppShellMock url="app.testdart.io/project/automation-run">
      <div className="run-mock">
        <div className="run-mock__head">
          <span>Running: Checkout &amp; Pricing Suite</span>
          <span className="run-mock__browsers">
            <img src={chromeIcon} alt="" /><img src={firefoxIcon} alt="" /><img src={edgeIcon} alt="" />
          </span>
        </div>
        <div className="run-mock__bar"><div className="run-mock__bar-fill" /></div>
        <div className="run-mock__steps">
          {RUN_STEPS.map((s) => (
            <div className={`run-mock__step is-${s.state}`} key={s.label}>
              <span className="run-mock__dot" />
              {s.label}
            </div>
          ))}
        </div>
      </div>
    </AppShellMock>
  );
}

const VISUALS = [GenerationVisual, MemoryVisual, ExecutionVisual];

function CapabilityRow({ row, Visual, reverse }) {
  const [ref, visible] = useReveal();
  return (
    <div className={`capability-row ${reverse ? 'capability-row--reverse' : ''}`}>
      <div className="capability-copy">
        <span className="eyebrow">{row.eyebrow}</span>
        <h2>{row.title}</h2>
        <p>{row.body}</p>
        <ul className="capability-list">
          {row.list.map(({ Icon, text }) => (
            <li key={text}>
              <span className="capability-list-icon"><Icon /></span>
              {text}
            </li>
          ))}
        </ul>
        {row.cta && (
          <div className="cta__actions" style={{ justifyContent: 'flex-start' }}>
            {row.cta.href ? (
              <a href={row.cta.href} className="btn btn-primary">{row.cta.label}</a>
            ) : (
              <button type="button" className="btn btn-primary">{row.cta.label}</button>
            )}
          </div>
        )}
      </div>

      <div ref={ref} className={`capability-visual reveal ${visible ? 'is-visible' : ''}`}>
        <Visual />
      </div>
    </div>
  );
}

export default function Capabilities() {
  return (
    <section className="section section--surface" id="ai-generation">
      <div className="container">
        <div className="capability-rows">
          {ROWS.map((row, i) => (
            <CapabilityRow key={row.title} row={row} Visual={VISUALS[i]} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
