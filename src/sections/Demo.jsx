import useReveal from '../hooks/useReveal';
import './Demo.css';

const SEQUENCE = ['Generate Test Cases', 'Approve', 'Execute', 'View Report'];

export default function Demo() {
  const [ref, visible] = useReveal();
  return (
    <section className="section section--surface" id="demo">
      <div className="container">
        <div className="section-head section-head--center">
          <span className="eyebrow">Product Demo</span>
          <h2>See the full workflow, start to finish</h2>
          <p>Generate test cases, approve them, watch the run, and open the report — one continuous flow.</p>
        </div>

        <div ref={ref} className={`demo reveal ${visible ? 'is-visible' : ''}`}>
          <div className="demo__frame chrome-frame">
            <div className="chrome-frame__bar">
              <span className="chrome-frame__dot" /><span className="chrome-frame__dot" /><span className="chrome-frame__dot" />
              <span className="chrome-frame__url">app.testdart.io/demo</span>
            </div>
            <div className="demo__stage">
              <span className="demo__badge">Placeholder</span>
              <button className="demo__play" aria-label="Demo video not yet available" disabled>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M6 4L18 11L6 18V4Z" fill="white"/></svg>
              </button>
              <span className="demo__caption">Demo video</span>
            </div>
          </div>

          <div className="demo__sequence">
            {SEQUENCE.map((step, i) => (
              <div className="demo__seq-item" key={step}>
                <span className="demo__seq-num">{i + 1}</span>
                <span>{step}</span>
                {i < SEQUENCE.length - 1 && <span className="demo__seq-arrow">→</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
