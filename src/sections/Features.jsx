import { useEffect, useMemo, useState } from 'react';
import useReveal from '../hooks/useReveal';
import SectionHead from '../components/SectionHead';
import Spotlight from '../components/Spotlight';
import {
  ClipboardIcon, LinkIcon, SparkleIcon, PlayIcon,
  ActivityIcon, BarChartIcon, ClockIcon, UserCheckIcon,
} from '../components/LineIcons';
import './Features.css';

const FEATURES = [
  { title: 'Keep Every Test Organized', body: 'Organize test cases into suites and folders, so your team always knows where every test lives.', Icon: ClipboardIcon },
  { title: 'Keep Requirements Connected', body: 'Requirements stay linked to the tests they drive, so nothing gets lost as your project grows.', Icon: LinkIcon },
  { title: 'Turn Requirements Into Tests', body: 'Turn a requirement, document, or Jira issue into structured test cases, ready to run.', Icon: SparkleIcon },
  { title: 'Run Tests Without the Manual Work', body: 'TestDart runs your tests in a real browser and shows progress as it happens.', Icon: PlayIcon },
  { title: 'Know What Happened During Every Run', body: 'Track run status and results for every test, so your team always knows where things stand.', Icon: ActivityIcon },
  { title: 'Understand Results Faster', body: 'Execution results come back as a clear report, so your team can see what passed and what failed at a glance.', Icon: BarChartIcon },
  { title: 'Always Know What Changed', body: 'See what changed on a requirement, test case, or execution, and when, so nothing happens without a trace.', Icon: ClockIcon },
  { title: 'Work Together With Your Team', body: 'Invite your team, assign roles, and manage access, so everyone works from the same project.', Icon: UserCheckIcon },
];

const DESKTOP_QUERY = '(min-width: 768px)';

export default function Features() {
  const [ref, visible] = useReveal();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);
    setIsDesktop(mql.matches);
    const onChange = (e) => setIsDesktop(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  // Each card holds 1fr; the active one grows to 5fr — a CSS-only expand,
  // columns on desktop and rows on mobile, so the same activeIndex state
  // drives both layouts.
  const gridStyle = useMemo(() => {
    const track = FEATURES.map((_, i) => (i === activeIndex ? '5fr' : '1fr')).join(' ');
    return isDesktop ? { gridTemplateColumns: track } : { gridTemplateRows: track };
  }, [activeIndex, isDesktop]);

  return (
    <section className="section section--bg" id="features">
      <div className="container">
        <SectionHead>
          <span className="eyebrow">WHAT TESTDART HELPS YOU DO</span>
          <h2>Everything your QA team needs to move from requirement to release</h2>
        </SectionHead>

        <ul ref={ref} className={`expand-grid ${visible ? 'is-visible' : ''}`} style={gridStyle}>
          {FEATURES.map((f, i) => (
            <Spotlight
              as="li"
              key={f.title}
              className="expand-card"
              data-active={activeIndex === i}
              style={{ '--delay': `${i * 45}ms` }}
              tabIndex={0}
              onMouseEnter={() => setActiveIndex(i)}
              onFocus={() => setActiveIndex(i)}
              onClick={() => setActiveIndex(i)}
            >
              <span className="expand-card__watermark" aria-hidden="true"><f.Icon /></span>

              <div className="expand-card__collapsed" aria-hidden="true">
                <span className="expand-card__label">{f.title}</span>
              </div>

              <div className="expand-card__body">
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            </Spotlight>
          ))}
        </ul>

        <div className="cta__actions">
          <button type="button" className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </section>
  );
}
