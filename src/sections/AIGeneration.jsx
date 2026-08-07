import useReveal from '../hooks/useReveal';
import { DocumentIcon, ImportIcon, EditIcon } from '../components/LineIcons';
import './AIGeneration.css';

const CASES = [
  { id: 'TC-041', title: 'Reject login with invalid password', priority: 'Pass' },
  { id: 'TC-042', title: 'Lock account after 5 failed attempts', priority: 'Fail' },
  { id: 'TC-043', title: 'Allow login with valid credentials', priority: 'Pass' },
  { id: 'TC-044', title: 'Show inline error for empty fields', priority: 'Fail' },
];

const LIST_ITEMS = [
  { Icon: DocumentIcon, text: 'Free text or a supported requirement document as input' },
  { Icon: ImportIcon, text: 'Jira issues imported directly as requirements' },
  { Icon: EditIcon, text: 'Generated cases are editable before approval' },
];

export default function AIGeneration() {
  const [ref, visible] = useReveal();
  return (
    <section className="section section--surface" id="ai-generation">
      <div className="container">
        <div className="aigen">
          <div className="aigen__copy">
            <span className="eyebrow">AI Test Generation</span>
            <h2>A requirement in. Structured test cases out.</h2>
            <p>
              Provide a requirement as free text, a supported document, or an imported Jira
              issue. TestDart generates structured test cases you review and approve before
              anything runs — you stay in control of what moves on to execution.
            </p>
            <ul className="aigen__list">
              {LIST_ITEMS.map(({ Icon, text }) => (
                <li key={text}>
                  <span className="aigen__list-icon"><Icon /></span>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <div ref={ref} className={`aigen__visual reveal ${visible ? 'is-visible' : ''}`}>
            <div className="aigen__panel">
              <span className="aigen__label">Requirement</span>
              <div className="aigen__req">
                Users must not be able to log in after 5 consecutive failed password attempts.
                The account should lock and show a clear error message.
              </div>
            </div>

            <div className="aigen__arrow">
              <span>AI</span>
            </div>

            <div className="aigen__panel aigen__panel--result">
              <span className="aigen__label">Generated Test Cases</span>
              <div className="aigen__cases">
                {CASES.map((c) => (
                  <div className="aigen__case" key={c.id}>
                    <span className="aigen__case-id">{c.id}</span>
                    <span className="aigen__case-title">{c.title}</span>
                    <span className={`aigen__case-priority p-${c.priority.toLowerCase()}`}>{c.priority}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
