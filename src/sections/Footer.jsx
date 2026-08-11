import { CONTACT_EMAIL } from '../config/links';
import './Footer.css';

const PLACEHOLDER_EMAIL = 'info@provassure.com';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" id="company">
      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="footer__brand-row">
            <img src="/logo-mark.png" alt="testdart" />
            <span>testdart</span>
          </div>
          <p>From requirements to tested software, all in one workflow.</p>
        </div>

        <div className="footer__col">
          <h4>Explore</h4>
          <a href="#ai-generation">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#demo">Demo</a>
          <a href="#faq">FAQ</a>
        </div>

        <div className="footer__col">
          <h4>Company</h4>
          <a href={`mailto:${CONTACT_EMAIL}`}>Contact</a>
          <button type="button">Log In</button>
          <button type="button">Get Started</button>
        </div>

        <div className="footer__col">
          <h4>Legal</h4>
          <a href="/privacy-policy">Privacy Policy</a>
        </div>

        <div className="footer__col footer__col--contact">
          <h4>Contact</h4>
          <div className="footer__contact-item">
            <span className="footer__contact-label">Email</span>
            <a href={`mailto:${PLACEHOLDER_EMAIL}`}>{PLACEHOLDER_EMAIL}</a>
          </div>
          <div className="footer__contact-item">
            <span className="footer__contact-label">Phone</span>
            <span>[Contact number to be added]</span>
          </div>
          <div className="footer__contact-item">
            <span className="footer__contact-label">Address</span>
            <span>[Company address to be added]</span>
          </div>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>© {year} TestDart. All rights reserved.</span>
      </div>
    </footer>
  );
}
