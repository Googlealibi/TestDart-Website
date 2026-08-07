import testgenIcon from '../assets/icons/testgen.svg';
import requirementsIcon from '../assets/icons/requirements.svg';
import executionIcon from '../assets/icons/execution.svg';
import reportsIcon from '../assets/icons/reports.svg';
import libraryIcon from '../assets/icons/library.svg';
import './AppShellMock.css';

const NAV = [
  { icon: libraryIcon, label: 'Library' },
  { icon: requirementsIcon, label: 'Requirements' },
  { icon: testgenIcon, label: 'AI Genie' },
  { icon: executionIcon, label: 'Execution', active: true },
  { icon: reportsIcon, label: 'Reports' },
];

export default function AppShellMock({ url = 'app.testdart.io/project/execution', children }) {
  return (
    <div className="chrome-frame app-shell">
      <div className="chrome-frame__bar">
        <span className="chrome-frame__dot" />
        <span className="chrome-frame__dot" />
        <span className="chrome-frame__dot" />
        <span className="chrome-frame__url">{url}</span>
      </div>
      <div className="app-shell__body">
        <aside className="app-shell__sidebar">
          {NAV.map((item) => (
            <div key={item.label} className={`app-shell__navitem ${item.active ? 'is-active' : ''}`}>
              <img src={item.icon} alt="" />
              <span>{item.label}</span>
            </div>
          ))}
        </aside>
        <main className="app-shell__main">{children}</main>
      </div>
    </div>
  );
}
