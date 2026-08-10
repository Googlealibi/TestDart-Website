import useReveal from '../hooks/useReveal';
import SectionHead from '../components/SectionHead';
import { ClipboardIcon, LinkIcon, PlayIcon, BarChartIcon, ClockIcon, SparkleIcon } from '../components/LineIcons';
import './Problem.css';

function ChecklistMock() {
  return (
    <div className="problem-mock">
      <div className="problem-mock__row">
        <span className="problem-mock__box" />
        <span className="problem-mock__line problem-mock__line--wide" />
      </div>
      <div className="problem-mock__row">
        <span className="problem-mock__box" />
        <span className="problem-mock__line problem-mock__line--accent" />
      </div>
      <div className="problem-mock__row">
        <span className="problem-mock__box" />
        <span className="problem-mock__line" />
      </div>
      <span className="problem-mock__badge problem-mock__badge--clock"><ClockIcon /></span>
    </div>
  );
}

function LinksMock() {
  return (
    <div className="problem-mock problem-mock--links">
      <svg className="problem-mock__wires" viewBox="0 0 100 70" preserveAspectRatio="none">
        <path d="M22 20 L50 45" />
        <path d="M50 45 L78 22" />
        <path d="M50 45 L50 12" />
      </svg>
      <span className="problem-mock__doc" style={{ left: '8%', top: '4px' }} />
      <span className="problem-mock__doc" style={{ left: '38%', top: '48px' }} />
      <span className="problem-mock__doc" style={{ left: '68%', top: '6px' }} />
      <span className="problem-mock__badge problem-mock__badge--query">?</span>
    </div>
  );
}

function ExecutionMock() {
  return (
    <div className="problem-mock problem-mock--exec">
      <div className="problem-mock__dots"><i /><i /><i /></div>
      <div className="problem-mock__label">Running…</div>
      <div className="problem-mock__bar"><div className="problem-mock__bar-fill" /></div>
      <span className="problem-mock__badge problem-mock__badge--gauge" />
    </div>
  );
}

function ReportMock() {
  return (
    <div className="problem-mock problem-mock--report">
      <div className="problem-mock__chip">Report</div>
      <div className="problem-mock__report-row">
        <span className="problem-mock__pie" />
        <span className="problem-mock__bars">
          <i /><i /><i />
        </span>
      </div>
    </div>
  );
}

const POINTS = [
  {
    Icon: ClipboardIcon,
    Mock: ChecklistMock,
    title: 'Test cases take too long to create',
    body: 'Turning requirements into detailed test cases manually takes valuable QA time.',
  },
  {
    Icon: LinkIcon,
    Mock: LinksMock,
    title: 'Requirements and tests get disconnected',
    body: 'Important context can be scattered across requirements, documents, and testing workflows.',
  },
  {
    Icon: PlayIcon,
    Mock: ExecutionMock,
    title: 'Execution becomes a bottleneck',
    body: 'Running repetitive browser tests manually slows down feedback.',
  },
  {
    Icon: BarChartIcon,
    Mock: ReportMock,
    title: 'Reports come after the work is done',
    body: 'Turning execution results into useful, actionable reports adds another manual step.',
  },
];

const TAGS = [
  { Icon: LinkIcon, label: 'Disconnected tools' },
  { Icon: ClipboardIcon, label: 'Manual work' },
  { Icon: ClockIcon, label: 'Wasted time' },
  { Icon: BarChartIcon, label: 'Delayed quality' },
];

export default function Problem() {
  const [ref, visible] = useReveal(0.2);
  return (
    <section className="section section--surface" id="problem">
      <div className="problem-bg" aria-hidden="true">
        <svg viewBox="0 0 900 260" preserveAspectRatio="none">
          <path d="M0 90 C 220 220, 480 -40, 900 130" />
          <circle cx="230" cy="120" r="3" />
          <circle cx="470" cy="45" r="3" />
          <circle cx="700" cy="95" r="3" />
        </svg>
      </div>
      <div className="container">
        <div ref={ref} className={`problem-content ${visible ? 'is-visible' : ''}`}>
          <SectionHead className="problem-head">
            <span className="eyebrow">Where QA Gets Stuck</span>
            <h2>Testing gets harder when every step lives in a different place.</h2>
            <p>Testing shouldn't slow down the teams building the product.</p>
          </SectionHead>

          <div className="problem-grid">
            {POINTS.map(({ Icon, Mock, title, body }, i) => (
              <div className="problem-card card" key={title} style={{ '--delay': `${150 + i * 130}ms` }}>
                <div className="problem-card__icon">
                  <Icon />
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
                <Mock />
              </div>
            ))}
          </div>

          <div className="problem-timeline" aria-hidden="true">
            <div className="problem-timeline__line" />
            {POINTS.map((point) => (
              <span className="problem-timeline__dot" key={point.title} />
            ))}
            <svg className="problem-timeline__loop" viewBox="0 0 60 40">
              <path d="M4 6 C 20 6, 50 10, 50 28" />
              <path d="M42 22 L50 30 L58 21" />
            </svg>
          </div>

          <div className="problem-tags">
            {TAGS.map(({ Icon, label }) => (
              <span className="problem-tags__item" key={label}>
                <Icon /> {label}
              </span>
            ))}
          </div>

          <div className="cta__actions">
            <button type="button" className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </section>
  );
}
