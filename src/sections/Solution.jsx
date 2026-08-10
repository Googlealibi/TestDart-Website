import { useState } from 'react';
import useReveal from '../hooks/useReveal';
import SectionHead from '../components/SectionHead';
import './Solution.css';

const STAGES = ['Requirement', 'Test Case', 'Approval', 'Execution', 'Report'];

const REASONS = [
  {
    stage: 1,
    title: 'Start with what your team already has',
    body: 'Turn requirements, documents, or imported Jira issues into structured test cases without rebuilding the same testing context manually.',
    outcome: 'Less manual test-case preparation, less context switching.',
  },
  {
    stage: 2,
    title: 'Automate the work. Keep the decision.',
    body: 'Review and approve generated test cases before they move into execution, keeping QA teams involved at the points that matter.',
    outcome: 'Automation without removing human review and control.',
  },
  {
    stage: 3,
    title: 'Move from approved tests to browser execution',
    body: 'Run approved test cases through a real browser workflow and make execution progress visible instead of relying on repetitive manual execution.',
    outcome: 'Faster feedback from approved test cases.',
  },
  {
    stage: 4,
    title: 'End with results your team can act on',
    body: 'Turn execution outcomes into readable reports so teams can understand what passed, what failed, and what needs attention.',
    outcome: 'Less time interpreting results, more time fixing issues.',
  },
];

export default function Solution() {
  const [ref, visible] = useReveal(0.15);
  const [active, setActive] = useState(null);
  const activeStage = active === null ? null : REASONS[active].stage;

  return (
    <section className="section section--bg" id="why-testdart">
      <div className="container">
        <SectionHead>
          <span className="eyebrow">Why TestDart</span>
          <h2>Turn QA Bottlenecks Into Test Confidence</h2>
          <p>
            TestDart brings requirements, test case generation, human approval, browser execution,
            and reporting into one connected testing workflow&mdash;so QA teams spend less time
            moving work between tools and more time validating what matters.
          </p>
        </SectionHead>

        <div ref={ref} className={`solution-flow ${visible ? 'is-visible' : ''}`}>
          <div className="solution-flow__rail" aria-hidden="true">
            <div className="solution-flow__line">
              <div
                className="solution-flow__line-fill"
                style={{ width: activeStage !== null ? `${(activeStage / (STAGES.length - 1)) * 100}%` : '0%' }}
              />
            </div>
            {STAGES.map((label, i) => (
              <div
                key={label}
                className={`solution-flow__stage ${activeStage !== null && i <= activeStage ? 'is-passed' : ''} ${activeStage === i ? 'is-active' : ''}`}
              >
                <span className="solution-flow__dot" />
                <span className="solution-flow__stage-label">{label}</span>
              </div>
            ))}
          </div>

          <div className="solution-flow__reasons">
            {REASONS.map((r, i) => (
              <div
                key={r.title}
                className={`solution-reason ${active === i ? 'is-active' : ''}`}
                style={{ '--delay': `${i * 90}ms` }}
                tabIndex={0}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
              >
                <span className="solution-reason__connector" aria-hidden="true" />
                <span className="solution-reason__index">0{i + 1}</span>
                <h3>{r.title}</h3>
                <p>{r.body}</p>
                <span className="solution-reason__outcome">{r.outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
