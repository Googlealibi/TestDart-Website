import logoMark from '../assets/logo-mark.svg';
import { CONTACT_EMAIL } from '../config/links';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" id="company">
      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="footer__brand-row">
            <img src={logoMark} alt="TestDart" />
            <span>TestDart</span>
          </div>
          <p>Requirements to test reports, with AI assistance.</p>
        </div>

        <div className="footer__col">
          <h4>Product</h4>
          <a href="#features">Product</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#ai-generation">AI Testing</a>
          <a href="#demo">Demo</a>
          <a href="#pricing">Pricing</a>
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
          <a href="#">Privacy Policy</a>
          <a href="#">Terms &amp; Conditions</a>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>{year} © TestDart. All rights reserved.</span>
      </div>
    </footer>
  );
}
