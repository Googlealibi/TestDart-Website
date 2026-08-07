import { CONTACT_EMAIL } from '../config/links';
import './FinalCta.css';

export default function FinalCta() {
  return (
    <section className="cta" id="get-started">
      <div className="container cta__inner">
        <h2>Start testing smarter</h2>
        <p>Move from requirement to tested, reported software — without the manual handoffs.</p>
        <div className="cta__actions">
          <button type="button" className="btn btn-primary">Get Started</button>
          <a href={`mailto:${CONTACT_EMAIL}?subject=TestDart%20Demo%20Request`} className="btn cta__ghost">Talk to Us</a>
        </div>
      </div>
    </section>
  );
}
