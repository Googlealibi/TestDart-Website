import logoMark from '../assets/logo-mark.svg';
import { CheckIcon } from '../components/LineIcons';
import './PrivacyPolicy.css';

const PRIVACY_EMAIL = 'info@provassure.com';

const TOC = [
  { id: 'information-we-collect', label: 'Information We Collect' },
  { id: 'purpose-of-data-collection', label: 'Purpose of Data Collection' },
  { id: 'legal-basis-for-processing', label: 'Legal Basis for Processing' },
  { id: 'data-sharing-and-disclosure', label: 'Data Sharing and Disclosure' },
  { id: 'data-retention', label: 'Data Retention' },
  { id: 'your-rights', label: 'Your Rights' },
  { id: 'data-security', label: 'Data Security' },
  { id: 'changes-to-this-policy', label: 'Changes to This Policy' },
  { id: 'contact-us', label: 'Contact Us' },
];

function Checklist({ items }) {
  return (
    <ul className="privacy-checklist">
      {items.map((item) => (
        <li key={item}>
          <span className="privacy-checklist__icon"><CheckIcon /></span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function PrivacyPolicy() {
  return (
    <div className="privacy-page">
      <header className="privacy-header">
        <div className="container privacy-header__inner">
          <a href="/" className="privacy-header__brand">
            <img src={logoMark} alt="TestDart" />
            <span>TestDart</span>
          </a>
          <a href="/" className="privacy-header__back">← Back to TestDart</a>
        </div>
      </header>

      <main className="container privacy-layout">
        <nav className="privacy-toc" aria-label="On this page">
          <span className="privacy-toc__heading">On this page</span>
          <ul>
            {TOC.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <details className="privacy-toc-mobile">
          <summary>On this page</summary>
          <ul>
            {TOC.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </details>

        <article className="privacy-content">
          <span className="eyebrow">Privacy Policy</span>
          <h1>How we collect, use, and protect your information</h1>
          <p className="privacy-effective-date">Effective Date: [Insert Effective Date]</p>
          <p className="privacy-intro">
            Provassure Software Technologies Private Limited ("Provassure," "we," "our," or "us")
            is committed to protecting the privacy of individuals who interact with our business
            through digital advertising platforms, including Google Ads. This Privacy Policy
            outlines how we collect, use, and protect personal information submitted via our lead
            forms.
          </p>

          <section id="information-we-collect" className="privacy-section">
            <h2>1. Information We Collect</h2>
            <p>When you submit your information through our lead forms, we may collect the following:</p>
            <Checklist
              items={[
                'Full Name',
                'Email Address',
                'Phone Number',
                'Company Name',
                'Project Requirements or Interests',
                'Any additional information you voluntarily provide',
              ]}
            />
          </section>

          <section id="purpose-of-data-collection" className="privacy-section">
            <h2>2. Purpose of Data Collection</h2>
            <p>We collect and use your personal information solely for the following purposes:</p>
            <Checklist
              items={[
                'To contact you regarding your inquiry',
                'To provide information about our services',
                'To send marketing and promotional communications',
                'To improve our services and customer experience',
                'To follow up on sales or support requests',
              ]}
            />
            <p>We do not use your data for any unrelated purposes or share it with third parties for their own marketing.</p>
          </section>

          <section id="legal-basis-for-processing" className="privacy-section">
            <h2>3. Legal Basis for Processing</h2>
            <p>We process your personal data based on:</p>
            <Checklist
              items={[
                'Your consent when you submit the lead form',
                'Legitimate interest in responding to your inquiry and offering relevant services',
              ]}
            />
          </section>

          <section id="data-sharing-and-disclosure" className="privacy-section">
            <h2>4. Data Sharing and Disclosure</h2>
            <p>
              Your data is accessible only to authorized personnel within Provassure. We do not
              sell, rent, or trade your personal information. We may share your data with trusted
              service providers who assist us in managing communications or CRM systems, under
              strict confidentiality agreements.
            </p>
          </section>

          <section id="data-retention" className="privacy-section">
            <h2>5. Data Retention</h2>
            <p>
              We retain your personal data only as long as necessary to fulfill the purposes
              outlined in this policy or as required by law. You may request deletion of your
              data at any time.
            </p>
          </section>

          <section id="your-rights" className="privacy-section">
            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <Checklist
              items={[
                'Access the personal data we hold about you',
                'Request correction or deletion of your data',
                'Withdraw your consent at any time',
                'Object to or restrict certain types of processing',
              ]}
            />
            <p>
              To exercise these rights, please contact us at{' '}
              <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>.
            </p>
          </section>

          <section id="data-security" className="privacy-section">
            <h2>7. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your data
              from unauthorized access, disclosure, alteration, or destruction.
            </p>
          </section>

          <section id="changes-to-this-policy" className="privacy-section">
            <h2>8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on
              this page with an updated effective date.
            </p>
          </section>

          <section id="contact-us" className="privacy-section">
            <h2>9. Contact Us</h2>
            <p>
              Provassure Software Technologies Private Limited
              <br />
              Email: <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>
            </p>
            <p>
              If you have any questions or concerns about this Privacy Policy or how your data is
              handled, please reach out and we will respond within 1 business day.
            </p>
          </section>

          <a href="/" className="privacy-back-bottom">← Back to TestDart</a>
        </article>
      </main>
    </div>
  );
}
