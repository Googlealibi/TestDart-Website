import { useState } from 'react';
import './FAQ.css';

const ITEMS = [
  {
    q: 'What is TestDart?',
    a: 'TestDart is a QA test-management platform for managing requirements, test cases, executions, and reports, with AI-assisted test generation and browser-based automated execution.',
  },
  {
    q: 'How does TestDart generate test cases?',
    a: 'Provide a requirement as free text, an imported Jira issue, or a supported document. TestDart generates structured test cases you review and approve before anything runs.',
  },
  {
    q: 'Can TestDart execute tests automatically?',
    a: "Once test cases are approved, TestDart's automation agent drives a real browser session and carries them out step by step, with progress visible as the run happens.",
  },
  {
    q: 'Can I review test cases before they are executed?',
    a: 'Yes. Generated test cases go through a review and approval step, and nothing runs until your team approves it.',
  },
  {
    q: 'Can TestDart work with Jira?',
    a: 'Yes. Connect your Jira account and import an issue directly into TestDart as a requirement.',
  },
  {
    q: 'Does TestDart support manual testing?',
    a: 'Yes. Test suites, folders, and test cases can be managed and executed manually, with status tracking, bulk updates, and comments alongside the AI-assisted workflow.',
  },
  {
    q: 'Can TestDart generate execution reports?',
    a: 'Yes. Execution results are compiled into an AI-written report with a pass/fail verdict, so your team can review outcomes without assembling the report by hand.',
  },
  {
    q: 'Who is TestDart designed for?',
    a: 'TestDart is built for QA and software teams that want a connected workflow from requirements through test execution and reporting, instead of separate disconnected tools.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="section section--bg" id="faq">
      <div className="container">
        <div className="section-head section-head--center">
          <span className="eyebrow">FAQ</span>
          <h2>Frequently asked questions</h2>
          <p>Answers to the questions teams ask when evaluating TestDart.</p>
        </div>

        <div className="faq-list">
          {ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <div className={`faq-item ${isOpen ? 'is-open' : ''}`} key={item.q}>
                <h3 className="faq-item__heading">
                  <button
                    type="button"
                    id={buttonId}
                    className="faq-item__trigger"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                  >
                    <span>{item.q}</span>
                    <span className="faq-item__icon" aria-hidden="true">
                      <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                        <path d="M2.5 5.2L7 9.5l4.5-4.3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>
                </h3>
                <div
                  className="faq-item__panel"
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!isOpen}
                >
                  <p className="faq-item__panel-inner">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
