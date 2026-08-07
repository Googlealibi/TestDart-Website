import { Fragment } from 'react';
import HeroPipeline from '../components/HeroPipeline';
import { SparkleIcon, BrowserIcon, ReportIcon } from '../components/LineIcons';
import './Hero.css';

const TRUST_ITEMS = [
  { Icon: SparkleIcon, label: 'AI-generated test cases' },
  { Icon: BrowserIcon, label: 'Real browser execution' },
  { Icon: ReportIcon, label: 'AI-written reports' },
];

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__grid">
        <div className="hero__copy">
          <span className="eyebrow">AI-Assisted QA Platform</span>
          <h1>From testing bottlenecks to <span className="hero__highlight">browser-verified confidence.</span></h1>
          <p className="hero__sub">
            Bring in a requirement, Jira issue, or document. TestDart generates test cases,
            runs approved tests in a real browser, and delivers a clear report.
          </p>
          <div className="hero__actions">
            <button type="button" className="btn btn-primary">Get Started</button>
            <a href="#demo" className="btn btn-secondary">Watch Demo</a>
          </div>
          <div className="hero__trust">
            {TRUST_ITEMS.map(({ Icon, label }, i) => (
              <Fragment key={label}>
                <span className="hero__trust-item">
                  <span className="hero__trust-icon"><Icon /></span>
                  {label}
                </span>
                {i < TRUST_ITEMS.length - 1 && <span className="dot" />}
              </Fragment>
            ))}
          </div>
        </div>

        <div className="hero__visual">
          <HeroPipeline />
        </div>
      </div>
    </section>
  );
}
