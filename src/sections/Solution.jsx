import { useState } from 'react';
import useReveal from '../hooks/useReveal';
import SectionHead from '../components/SectionHead';
import './Solution.css';

const STAGES = ['Requirement', 'Test Case', 'Approval', 'Execution', 'Report'];

const REASONS = [
  {
    stage: 1,
    title: 'Start with what your team already has',
    body: 'Bring in requirements, documents, or existing Jira issues, and TestDart turns them into structured test cases, no rebuilding context from scratch.',
    outcome: 'Less prep work before testing even starts.',
  },
  {
    stage: 2,
    title: 'Move faster without losing control',
    body: 'Review test cases before they run, so your team stays in the loop while TestDart handles the repetitive setup.',
    outcome: 'Speed, without losing sight of what matters.',
  },
  {
    stage: 3,
    title: 'Watch testing happen, not just the result',
    body: 'Once test cases are approved, TestDart runs them and shows progress as it happens, so your team always knows where things stand.',
    outcome: 'No more guessing what’s still running.',
  },
  {
    stage: 4,
    title: 'End with answers, not more questions',
    body: 'Results come back clear and readable, so your team knows what passed, what failed, and what to fix next.',
    outcome: 'Less time digging through logs, more time fixing what matters.',
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
          <h2>Why Teams Choose TestDart to Move Testing Forward</h2>
          <p>
            Testing shouldn't be the reason a release slips. TestDart brings requirements, test
            creation, execution, and reporting together in one workflow&mdash;so your team spends
            less time moving work between tools and more time getting releases out the door.
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

        <div className="cta__actions">
          <button type="button" className="btn btn-primary">Get Started</button>
          <a href="#ai-generation" className="btn btn-secondary">Explore Features</a>
        </div>
      </div>
    </section>
  );
}
