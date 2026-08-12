import { useState } from 'react';
import SectionHead from '../components/SectionHead';
import './FAQ.css';

const ITEMS = [
  {
    q: 'What is testdart?',
    a: 'testdart is an AI-assisted QA platform that helps teams create, manage, execute, and review software tests from their project requirements. It brings key testing activities into one connected workspace, reducing the manual effort involved in preparing and running tests.',
  },
  {
    q: 'Who is testdart designed for?',
    a: 'testdart is designed for QA teams, software development teams, and organizations that want to make their testing process more efficient and easier to manage. It can be useful for teams handling frequent releases, changing requirements, and large volumes of test cases.',
  },
  {
    q: 'How does testdart create test cases?',
    a: "You can provide project requirements, user stories, Jira issues, or relevant documents. testdart analyzes that information and generates structured test cases, ready to run on their own in autonomous mode, or for your team to review and select first in copilot mode.",
  },
  {
    q: 'Can my team review test cases before they run?',
    a: "That depends on the mode. In copilot mode, your team reviews the generated test cases and chooses which ones move forward before execution. In autonomous mode, testdart generates and runs tests on its own, with results available to review afterward.",
  },
  {
    q: 'Can testdart execute tests automatically?',
    a: "Yes. testdart executes test cases through a real browser and gives your team visibility into the execution process and results, cutting down on repetitive manual execution.",
  },
  {
    q: 'Do I need to write automation code?',
    a: "No. testdart is built to remove the automation code your team would otherwise write by hand, turning requirements and test scenarios directly into executable browser-based tests.",
  },
  {
    q: 'What kind of results and reports does testdart provide?',
    a: "After execution, testdart provides test results and reporting that help your team understand what was tested, what passed or failed, and where attention may be needed.",
  },
  {
    q: 'Can testdart fit into our existing development and QA workflow?',
    a: "Yes. testdart is built around how modern teams already manage requirements and testing. It works with inputs like Jira issues and project documents, bringing test creation, execution, and reporting into one connected workflow, with review built in whenever you choose copilot mode.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="section section--bg" id="faq">
      <div className="container">
        <SectionHead className="section-head--center">
          <span className="eyebrow">FAQ</span>
          <h2>Frequently asked questions</h2>
          <p>Answers to the questions teams ask when evaluating testdart.</p>
        </SectionHead>

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
