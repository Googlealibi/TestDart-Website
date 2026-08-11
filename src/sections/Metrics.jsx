import useReveal from '../hooks/useReveal';
import SectionHead from '../components/SectionHead';
import './Metrics.css';

const STATS = [
  { value: '10×', label: 'Turn requirements into test cases 10x faster than doing it by hand.' },
  { value: '98%', label: 'Cut up to 98% of the repetitive work that slows your team down before every release.' },
  { value: 'Real-time', label: 'Watch your tests run in real time, no chasing updates.' },
  { value: 'End-to-end', label: 'Stay connected end-to-end, from requirement to final result.' },
];

export default function Metrics() {
  const [ref, visible] = useReveal(0.25);
  return (
    <section className="section section--bg metrics-section" id="metrics">
      <div className="container">
        <SectionHead className="section-head--center section-head--tight">
          <span className="eyebrow">WHAT YOUR TEAM CAN EXPECT</span>
          <h2>We'll help you cut down the time testing takes, so your releases go out sooner.</h2>
          <p>When testing starts slowing down your release, TestDart helps your team move faster. Bring your requirements in, turn them into structured tests, and keep the work connected without the usual back-and-forth.</p>
        </SectionHead>

        <div ref={ref} className={`metrics-grid ${visible ? 'is-visible' : ''}`}>
          {STATS.map(({ value, label }, i) => (
            <div className="metrics-tile card" key={label} style={{ '--delay': `${i * 100}ms` }}>
              <span className="metrics-tile__value">{value}</span>
              <span className="metrics-tile__label">{label}</span>
            </div>
          ))}
        </div>

        <div className="cta__actions">
          <button type="button" className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </section>
  );
}
