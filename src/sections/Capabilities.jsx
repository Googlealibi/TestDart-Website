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
  { id: 'TC-041', title: 'Reject login with invalid password', priority: 'Pass' },
  { id: 'TC-042', title: 'Lock account after 5 failed attempts', priority: 'Fail' },
  { id: 'TC-043', title: 'Allow login with valid credentials', priority: 'Pass' },
  { id: 'TC-044', title: 'Show inline error for empty fields', priority: 'Fail' },
];

const RUN_STEPS = [
  { label: 'Navigate to /login', state: 'done' },
  { label: 'Enter invalid credentials', state: 'done' },
  { label: 'Submit form and capture response', state: 'active' },
  { label: 'Assert error message is visible', state: 'pending' },
];

const ROWS = [
  {
    eyebrow: 'AI Generation & Execution',
    title: 'From requirement to running test, instantly',
    body: "TestDart turns a requirement, document, or Jira issue into structured test cases, then hands them straight to an automation agent that runs them in a real browser — so nothing sits waiting between writing a test and watching it execute.",
    list: [
      { Icon: DocumentIcon, text: 'Free text or a supported document as input' },
      { Icon: ImportIcon, text: 'Jira issues imported directly as requirements' },
      { Icon: BrowserIcon, text: 'Executed in a real browser, not a simulated one' },
      { Icon: ActivityIcon, text: 'Live progress visible while a run is in flight' },
    ],
  },
  {
    eyebrow: 'Project Memory',
    title: 'Unified memory of your project',
    body: 'Every requirement, test case, execution, and report stays linked inside one connected project context. TestDart keeps track of how everything fits together, so new test cases build on your existing suites and history instead of starting from a blank page.',
    list: [
      { Icon: LinkIcon, text: 'Requirements, test cases, executions, and reports stay linked' },
      { Icon: ClipboardIcon, text: 'Test suites and folders keep everything organized as the project grows' },
      { Icon: ClockIcon, text: 'Full audit history tracks what changed, and when' },
      { Icon: SparkleIcon, text: 'New test cases build on existing project context automatically' },
    ],
  },
  {
    eyebrow: 'Self-Healing Execution',
    title: '100% self-healing. No code at all.',
    body: "Test cases run without a single line of automation script. TestDart's browser agent interprets each step the way a person would, so when a button moves or a label changes, the run adapts instead of breaking — keeping your suite reliable without constant maintenance.",
    list: [
      { Icon: PlayIcon, text: 'No automation scripts to write or maintain' },
      { Icon: SparkleIcon, text: 'Execution adapts automatically when the UI changes' },
      { Icon: ClipboardIcon, text: 'Test cases stay written in plain, structured steps' },
      { Icon: ClockIcon, text: 'Less time fixing broken tests, more time reading results' },
    ],
  },
];

function GenerationVisual() {
  return (
    <div className="capability-visual--split">
      <div className="capability-panel">
        <span className="capability-label">Requirement</span>
        <div className="capability-req">
          Users must not be able to log in after 5 consecutive failed password attempts.
          The account should lock and show a clear error message.
        </div>
      </div>

      <div className="capability-arrow"><span>AI</span></div>

      <div className="capability-panel capability-panel--result">
        <span className="capability-label">Generated Test Cases</span>
        <div className="capability-cases">
          {CASES.map((c) => (
            <div className="capability-case" key={c.id}>
              <span className="capability-case-id">{c.id}</span>
              <span className="capability-case-title">{c.title}</span>
              <span className={`capability-case-priority p-${c.priority.toLowerCase()}`}>{c.priority}</span>
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
      <span className="capability-label">Project Memory</span>
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
          <span>Running: Login &amp; Auth Suite</span>
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
