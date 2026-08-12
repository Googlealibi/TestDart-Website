import { CONTACT_EMAIL } from '../config/links';
import SectionHead from '../components/SectionHead';
import { HeadsetIcon, CheckIcon } from '../components/LineIcons';
import './Pricing.css';

const ENTERPRISE_FEATURES = [
  'Unlimited team members and organizations',
  'Reduced cost per seat as your team scales',
  'Priority support with a dedicated contact',
  'Advanced audit history and access controls',
  'Guided onboarding for your QA workflow',
  'Early access to new AI testing capabilities',
];

export default function Pricing() {
  return (
    <section className="section section--surface" id="pricing">
      <div className="container">
        <SectionHead className="section-head--center">
          <span className="eyebrow">Pricing</span>
          <h2>Plans designed for your testing workflow</h2>
          <p>Choose the setup that fits your team's testing needs. Talk to us to learn about testdart plans and availability.</p>
        </SectionHead>

        <div className="pricing-grid pricing-grid--single">
          <div className="pricing-enterprise card">
            <h3>Enterprise</h3>
            <p className="pricing-enterprise__subtitle">Built for QA organizations running testing at scale.</p>
            <span className="pricing-enterprise__badge">Full platform access</span>

            <p className="pricing-enterprise__statement">
              Volume-based pricing that lowers your cost per seat as your team grows.
            </p>

            <div className="pricing-enterprise__inquire">
              <HeadsetIcon />
              Inquire for pricing
            </div>

            <a
              href={`mailto:${CONTACT_EMAIL}?subject=TestDart%20Enterprise`}
              className="btn btn-primary pricing-enterprise__cta"
            >
              Contact Sales
            </a>

            <div className="pricing-enterprise__divider" />

            <h4>What's included:</h4>
            <ul className="pricing-enterprise__list">
              {ENTERPRISE_FEATURES.map((text) => (
                <li key={text}>
                  <CheckIcon />
                  {text}
                </li>
              ))}
            </ul>

            <a
              href={`mailto:${CONTACT_EMAIL}?subject=TestDart%20Plan%20Comparison`}
              className="pricing-enterprise__compare"
            >
              Talk to us for a detailed comparison
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
