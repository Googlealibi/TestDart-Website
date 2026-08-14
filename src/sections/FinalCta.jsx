import { CONTACT_EMAIL } from '../config/links';
import './FinalCta.css';

export default function FinalCta() {
  return (
    <section className="cta" id="get-started">
      <div className="container cta__inner">
        <h2>Start testing smarter</h2>
        <p>See how much time your team gets back once testing isn't the bottleneck.</p>
        <div className="cta__actions">
          <button type="button" className="btn btn-primary">CTA</button>
          <a href={`mailto:${CONTACT_EMAIL}?subject=TestDart%20Demo%20Request`} className="btn cta__ghost">Talk to Us</a>
        </div>
      </div>
    </section>
  );
}
