import { CONTACT_EMAIL } from '../config/links';
import './Pricing.css';

export default function Pricing() {
  return (
    <section className="section section--surface" id="pricing">
      <div className="container">
        <div className="section-head section-head--center">
          <span className="eyebrow">Pricing</span>
          <h2>Plans designed for your testing workflow</h2>
          <p>Choose the setup that fits your team's testing needs. Talk to us to learn about TestDart plans and availability.</p>
        </div>

        <div className="pricing-panel card tilt-card">
          <div className="pricing-panel__icon">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M9.5 3H4a1 1 0 0 0-1 1v5.5a1 1 0 0 0 .3.7l8 8a1 1 0 0 0 1.4 0l6-6a1 1 0 0 0 0-1.4l-8-8a1 1 0 0 0-.7-.3Z" stroke="white" strokeWidth="1.4" strokeLinejoin="round" />
              <circle cx="7" cy="7" r="1.1" fill="white" />
            </svg>
          </div>
          <h3>Custom to your team</h3>
          <a href={`mailto:${CONTACT_EMAIL}?subject=TestDart%20Pricing`} className="btn btn-primary">Talk to us</a>
        </div>
      </div>
    </section>
  );
}
