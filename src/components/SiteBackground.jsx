import './SiteBackground.css';
import FluidFlowCanvas from './FluidFlowCanvas';

export default function SiteBackground() {
  return (
    <div className="site-bg" aria-hidden="true">
      <FluidFlowCanvas />
    </div>
  );
}
