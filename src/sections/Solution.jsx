import useReveal from '../hooks/useReveal';
import SectionHead from '../components/SectionHead';
import Spotlight from '../components/Spotlight';
import './Solution.css';

const REASONS = [
  {
    title: 'Manual test writing eats into release time',
    body: 'Give your team a faster way to handle the work that repeatedly slows testing down. testdart helps turn project requirements into structured tests without starting the same preparation from scratch every time.',
    outcome: 'Automate test creation and keep your releases moving.',
  },
  {
    title: "Context shouldn't have to be re-explained every time",
    body: 'Your requirements already contain the context your team needs. testdart uses that project information to help create meaningful tests instead of making your QA team manually translate every requirement into test cases.',
    outcome: 'Speed, without losing sight of what matters.',
  },
  {
    title: 'Scattered tools slow everyone down',
    body: 'Last-minute changes and release deadlines shouldn’t turn testing into a bottleneck. testdart helps your team move from test creation toward execution without relying on disconnected tools and repetitive handoffs.',
    outcome: "No more guessing what's still running.",
  },
  {
    title: 'Inconsistent testing creates blind spots',
    body: 'Testing should help your team ship better software, not consume all of its time. testdart reduces the repetitive work around testing so QA and engineering teams can focus more on finding issues and improving the product.',
    outcome: 'Less time digging through logs, more time fixing what matters.',
  },
];

const STICKY_TOP = 112;
const STICKY_STEP = 14;

export default function Solution() {
  const [ref, visible] = useReveal(0.15);

  return (
    <section className="section section--bg" id="why-testdart">
      <div className="container reason-layout">
        <div className={`reason-intro ${visible ? 'is-visible' : ''}`} ref={ref}>
          <SectionHead>
            <span className="eyebrow">WHY TESTDART</span>
            <h2>Still spending too much time getting your software ready to release?</h2>
            <p>
              Manual test writing, scattered tools, and inconsistent coverage all add up long
              before a release ships. testdart is built to close those gaps, so your team spends
              less time managing testing and more time improving the product.
            </p>
          </SectionHead>

          <div className="cta__actions reason-intro__cta">
            <button type="button" className="btn btn-primary">Get Started</button>
            <a href="#ai-generation" className="btn btn-secondary">Explore Features</a>
          </div>
        </div>

        <ul className="reason-cards">
          {REASONS.map((r, i) => (
            <Spotlight
              as="li"
              className="reason-card"
              key={r.title}
              style={{ top: `${STICKY_TOP + i * STICKY_STEP}px`, zIndex: i + 1 }}
            >
              <span className="reason-card__index">{String(i + 1).padStart(2, '0')}</span>
              <h3>{r.title}</h3>
              <p>{r.body}</p>
              <span className="reason-card__outcome">{r.outcome}</span>
            </Spotlight>
          ))}
        </ul>
      </div>
    </section>
  );
}
