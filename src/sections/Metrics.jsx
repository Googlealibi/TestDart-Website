import useReveal from '../hooks/useReveal';
import SectionHead from '../components/SectionHead';
import './Metrics.css';

const STATS = [
  { value: '10×', label: 'Faster test case creation' },
  { value: '98%', label: 'Less repetitive QA effort' },
  { value: 'Real-time', label: 'Browser execution visibility' },
  { value: 'End-to-end', label: 'Requirement → Test → Execution → Report' },
];

export default function Metrics() {
  const [ref, visible] = useReveal(0.25);
  return (
    <section className="section section--bg metrics-section" id="metrics">
      <div className="container">
        <SectionHead className="section-head--center section-head--tight">
          <span className="eyebrow">Product Impact</span>
          <h2>Built for Faster, More Reliable Testing</h2>
          <p>A connected, AI-assisted workflow changes how quickly QA teams move from requirement to result.</p>
        </SectionHead>

        <div ref={ref} className={`metrics-grid ${visible ? 'is-visible' : ''}`}>
          {STATS.map(({ value, label }, i) => (
            <div className="metrics-tile card" key={label} style={{ '--delay': `${i * 100}ms` }}>
              <span className="metrics-tile__value">{value}</span>
              <span className="metrics-tile__label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
