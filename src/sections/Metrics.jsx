import useReveal from '../hooks/useReveal';
import SectionHead from '../components/SectionHead';
import MetricValue from '../components/MetricValue';
import './Metrics.css';

const STATS = [
  { value: '10×', word: 'Faster', label: 'Turn requirements into test cases 10x faster than doing it by hand.' },
  { value: '98%', word: 'Automated', label: 'Cut up to 98% of the repetitive work that slows your team down before every release.' },
  { value: 'Real-time', before: 'Delayed', word: 'Visibility', label: 'Watch your tests run in real time, no chasing updates.' },
  { value: 'End-to-end', before: 'Disconnected', word: 'Connected', label: 'Stay connected end-to-end, from requirement to final result.' },
];

export default function Metrics() {
  const [ref, visible] = useReveal(0.25);
  return (
    <section className="section section--bg metrics-section" id="metrics">
      <div className="container">
        <SectionHead className="section-head--center section-head--tight">
          <span className="eyebrow">WHAT YOUR TEAM CAN EXPECT</span>
          <h2>We'll help you cut down the time testing takes, so your releases go out sooner.</h2>
          <p>A look at what typically changes for a QA team after adopting testdart.</p>
        </SectionHead>

        <div ref={ref} className={`metrics-grid ${visible ? 'is-visible' : ''}`}>
          {STATS.map(({ value, before, word, label }, i) => (
            <div className="metrics-tile card" key={label} style={{ '--delay': `${i * 100}ms` }}>
              <MetricValue value={value} before={before} visible={visible} delay={i * 120} />
              <span className="metrics-tile__word">{word}</span>
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
