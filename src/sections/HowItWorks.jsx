import { useEffect, useRef, useState } from 'react';
import useReveal from '../hooks/useReveal';
import SectionHead from '../components/SectionHead';
import requirementsIcon from '../assets/icons/requirements.svg';
import testgenIcon from '../assets/icons/testgen.svg';
import bugReportIcon from '../assets/icons/bug-report.svg';
import executionIcon from '../assets/icons/execution.svg';
import reportsIcon from '../assets/icons/reports.svg';
import './HowItWorks.css';

const STEPS = [
  { icon: requirementsIcon, title: 'Requirement / Import', body: 'Type a requirement, upload a supported document, or import a Jira issue.' },
  { icon: testgenIcon, title: 'AI Generates Test Cases', body: 'Structured test cases are generated from the requirement.' },
  { icon: bugReportIcon, title: 'Review & Approve', body: 'Your team reviews the generated cases before anything runs.' },
  { icon: executionIcon, title: 'Execute in Real Browser', body: 'An agent runs the approved cases in a live browser session.' },
  { icon: reportsIcon, title: 'AI Report', body: 'Results are compiled into a readable pass/fail report.' },
];

const STAGE_MS = 1100; // time each stage stays active before advancing
const FINAL_HOLD_MS = 1000; // hold on completed state before resetting
const RESET_GAP_MS = 300; // pause on reset before the loop restarts

export default function HowItWorks() {
  const [ref, visible] = useReveal(0.25);
  const [activeIndex, setActiveIndex] = useState(-1);
  const timeoutRef = useRef(0);

  useEffect(() => {
    if (!visible) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setActiveIndex(STEPS.length - 1);
      return undefined;
    }

    const runStage = (i) => {
      setActiveIndex(i);
      if (i < STEPS.length - 1) {
        timeoutRef.current = setTimeout(() => runStage(i + 1), STAGE_MS);
      } else {
        timeoutRef.current = setTimeout(() => {
          setActiveIndex(-1);
          timeoutRef.current = setTimeout(() => runStage(0), RESET_GAP_MS);
        }, STAGE_MS + FINAL_HOLD_MS);
      }
    };

    runStage(0);
    return () => clearTimeout(timeoutRef.current);
  }, [visible]);

  return (
    <section className="section section--bg" id="how-it-works">
      <div className="container">
        <SectionHead>
          <span className="eyebrow">How It Works</span>
          <h2>From requirement to report, in one flow</h2>
          <p>The same pipeline runs on demand or on a schedule — nothing here is a separate manual handoff.</p>
        </SectionHead>

        <div ref={ref} className={`workflow ${visible ? 'is-visible' : ''}`}>
          <div className="workflow__stage">
            <div className="workflow__line">
              <div
                className="workflow__line-fill"
                style={{ width: activeIndex > 0 ? `${(activeIndex / (STEPS.length - 1)) * 100}%` : '0%' }}
              />
            </div>
            {STEPS.map((step, i) => {
              const state = i === activeIndex ? 'is-active' : i < activeIndex ? 'is-done' : 'is-pending';
              return (
                <div
                  className={`workflow__step ${state}`}
                  key={step.title}
                  style={{ '--delay': `${i * 130}ms`, '--z': `${i * 6}px` }}
                >
                  <div className="workflow__node">
                    <img src={step.icon} alt="" />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
