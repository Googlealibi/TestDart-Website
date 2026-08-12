import useReveal from '../hooks/useReveal';
import SectionHead from '../components/SectionHead';
import Spotlight from '../components/Spotlight';
import './Solution.css';

const REASONS = [
  {
    title: 'Stop spending release time on repetitive testing',
    body: 'Give your team a faster way to handle the work that repeatedly slows testing down. TestDart helps turn project requirements into structured tests without starting the same preparation from scratch every time.',
    outcome: 'Less prep work before testing even starts.',
  },
  {
    title: 'Let your requirements do more of the work',
    body: 'Your requirements already contain the context your team needs. TestDart uses that project information to help create meaningful tests instead of making your QA team manually translate every requirement into test cases.',
    outcome: 'Speed, without losing sight of what matters.',
  },
  {
    title: 'Keep testing moving when deadlines get tight',
    body: 'Last-minute changes and release deadlines shouldn’t turn testing into a bottleneck. TestDart helps your team move from test creation toward execution without relying on disconnected tools and repetitive handoffs.',
    outcome: 'No more guessing what’s still running.',
  },
  {
    title: 'Spend more time improving quality, less time managing tests',
    body: 'Testing should help your team ship better software, not consume all of its time. TestDart reduces the repetitive work around testing so QA and engineering teams can focus more on finding issues and improving the product.',
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
              Your team shouldn't have to spend days turning requirements into tests, repeating
              the same QA work, and chasing results before every release. TestDart brings
              AI-assisted testing into one connected experience so your team can spend less time
              preparing and managing tests, and more time getting the product ready to ship.
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
