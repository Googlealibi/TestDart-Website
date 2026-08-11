import { useEffect, useState } from 'react';
import './Navbar.css';

const LINKS = [
  { label: 'Features', href: '#ai-generation' },
  { label: 'Pricing', href: '#pricing' },
  // Not wired to a page section yet — wire it up once Contact is implemented.
  { label: 'Contact', href: '#contact', pending: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = (e, link) => {
    if (link.pending) e.preventDefault();
    setMenuOpen(false);
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <a href="#top" className="navbar__brand">
          <img src="/logo-mark.png" alt="testdart" />
          <span>testdart</span>
        </a>

        <div className="navbar__right">
          <nav className="navbar__links">
            {LINKS.map((link) => (
              <a key={link.label} href={link.href} onClick={(e) => handleLinkClick(e, link)}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="navbar__cta">
            <button type="button" className="navbar__login">Log In</button>
            <button type="button" className="btn btn-primary">Get Started</button>
          </div>
        </div>

        <button
          className="navbar__toggle"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

      {menuOpen && (
        <div className="navbar__mobile">
          {LINKS.map((link) => (
            <a key={link.label} href={link.href} onClick={(e) => handleLinkClick(e, link)}>
              {link.label}
            </a>
          ))}
          <button type="button" className="btn btn-secondary" onClick={() => setMenuOpen(false)}>Log In</button>
          <button type="button" className="btn btn-primary" onClick={() => setMenuOpen(false)}>Get Started</button>
        </div>
      )}
    </header>
  );
}
