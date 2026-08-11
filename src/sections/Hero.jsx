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
          {/* <span className="eyebrow">For QA & Engineering Teams</span> */}
          <h1>
            <MaskReveal text="Testing taking too long, right before your release?" />{' '}
            <MaskReveal text="Move from requirement to tested results, without the last-minute rush." className="hero__highlight" />
          </h1>
          <p className="hero__sub">
            Last-minute changes shouldn't leave your QA team rushing to get everything tested.
            TestDart connects requirements, test creation, browser execution, and results in
            one workflow, helping your team reduce repetitive testing and keep releases moving.
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
