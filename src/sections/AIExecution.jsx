import AppShellMock from '../components/AppShellMock';
import useReveal from '../hooks/useReveal';
import { BrowserIcon, ActivityIcon, UserCheckIcon, ClockIcon } from '../components/LineIcons';
import chromeIcon from '../assets/icons/chrome.svg';
import firefoxIcon from '../assets/icons/firefox.svg';
import edgeIcon from '../assets/icons/edge.svg';
import './AIExecution.css';

const STEPS = [
  { label: 'Navigate to /login', state: 'done' },
  { label: 'Enter invalid credentials', state: 'done' },
  { label: 'Submit form and capture response', state: 'active' },
  { label: 'Assert error message is visible', state: 'pending' },
];

const LIST_ITEMS = [
  { Icon: BrowserIcon, text: 'Runs in a real browser, not a simulated environment' },
  { Icon: ActivityIcon, text: 'Live progress while a run is in flight' },
  { Icon: UserCheckIcon, text: 'Human approval points built into the workflow' },
  { Icon: ClockIcon, text: 'On-demand or scheduled runs' },
];

export default function AIExecution() {
  const [ref, visible] = useReveal();
  return (
    <section className="section section--bg" id="ai-execution">
      <div className="container">
        <div className="aiexec">
          <div ref={ref} className={`aiexec__visual reveal ${visible ? 'is-visible' : ''}`}>
            <AppShellMock url="app.testdart.io/project/automation-run">
              <div className="run-mock">
                <div className="run-mock__head">
                  <span>Running: Login &amp; Auth Suite</span>
                  <span className="run-mock__browsers">
                    <img src={chromeIcon} alt="" /><img src={firefoxIcon} alt="" /><img src={edgeIcon} alt="" />
                  </span>
                </div>
                <div className="run-mock__bar"><div className="run-mock__bar-fill" /></div>
                <div className="run-mock__steps">
                  {STEPS.map((s) => (
                    <div className={`run-mock__step is-${s.state}`} key={s.label}>
                      <span className="run-mock__dot" />
                      {s.label}
                    </div>
                  ))}
                </div>
                
              </div>
            </AppShellMock>
          </div>

          <div className={`aiexec__copy reveal ${visible ? 'is-visible' : ''}`}>
            <span className="eyebrow">AI Browser Execution</span>
            <h2>An agent runs your approved test cases in a real browser</h2>
            <p>
              Once test cases are approved, TestDart's automation agent drives an actual browser
              session and carries them out step by step, with progress visible as the run happens.
            </p>
            <ul className="aiexec__list">
              {LIST_ITEMS.map(({ Icon, text }) => (
                <li key={text}>
                  <span className="aiexec__list-icon"><Icon /></span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
