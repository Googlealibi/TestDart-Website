import { useEffect, useRef } from 'react';
import dartboardImg from '../assets/tech_dartboard_transparent.png';
import './HeroDartboard.css';

// Four rings orbit the board, one per stage of the TestDart pipeline.
// Each carries its own benefit label and spins at its own depth/speed,
// so moving the cursor reads as tilting a real layered object rather
// than a flat picture.
const RINGS = [
  { id: 'requirement', label: 'Requirements', word: 'Plan', radius: 84, speed: 22, dir: 1 },
  { id: 'generate', label: 'Test Generation', word: 'Generate', radius: 128, speed: 30, dir: -1 },
  { id: 'execute', label: 'Browser Execution', word: 'Execute', radius: 172, speed: 38, dir: 1 },
  { id: 'report', label: 'Reporting', word: 'Ship', radius: 216, speed: 46, dir: -1 },
];

export default function HeroDartboard() {
  const stageRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const handleMove = (e) => {
      const rect = stage.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      stage.style.setProperty('--ry', `${px * 10}deg`);
      stage.style.setProperty('--rx', `${py * -10}deg`);
    };

    const handleLeave = () => {
      stage.style.setProperty('--rx', '0deg');
      stage.style.setProperty('--ry', '0deg');
    };

    stage.addEventListener('mousemove', handleMove);
    stage.addEventListener('mouseleave', handleLeave);
    return () => {
      stage.removeEventListener('mousemove', handleMove);
      stage.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <div className="dart-stage" ref={stageRef}>
      <div className="dart-stage__glow" />

      <div className="dart-board">
        <img className="dart-board__img" src={dartboardImg} alt="TestDart platform target" />

        {RINGS.map((ring) => (
          <div
            key={ring.id}
            className={`dart-ring ${ring.dir === -1 ? 'dart-ring--rev' : ''}`}
            style={{
              '--ring-radius': `${ring.radius}px`,
              '--ring-speed': `${ring.speed}s`,
            }}
          >
            <span className="dart-ring__label" title={ring.label}>{ring.word}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
