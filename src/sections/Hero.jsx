import HeroPipeline from '../components/HeroPipeline';
import MaskReveal from '../components/MaskReveal';
import useReveal from '../hooks/useReveal';
import { StarIcon } from '../components/LineIcons';
import './Hero.css';

const TRUST_ITEMS = [
  { Icon: StarIcon, label: 'No Credit Card' },
  { Icon: StarIcon, label: '14-Day Free Trial' },
  { Icon: StarIcon, label: 'Quick Setup' },
];

export default function Hero() {
  const [ref, visible] = useReveal(0.1);
  return (
    <section className="hero" id="top">
      <div className="container hero__grid">
        <div ref={ref} className={`hero__copy ${visible ? 'is-visible' : ''}`}>
          <span className="eyebrow">AI-Assisted QA Platform</span>
          <h1>
            <MaskReveal text="From testing bottlenecks to" />{' '}
            <MaskReveal text="browser-verified confidence." className="hero__highlight" />
          </h1>
          <p className="hero__sub">
            Bring in a requirement, Jira issue, or document. TestDart generates test cases,
            runs approved tests in a real browser, and delivers a clear report.
          </p>
          <div className="hero__actions">
            <button type="button" className="btn btn-primary">Get Started</button>
            <a href="#demo" className="btn btn-secondary">Watch Demo</a>
          </div>
          <div className="hero__trust">
            {TRUST_ITEMS.map(({ Icon, label }) => (
              <span className="hero__trust-item" key={label}>
                <span className="hero__trust-icon"><Icon /></span>
                {label}
              </span>
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
