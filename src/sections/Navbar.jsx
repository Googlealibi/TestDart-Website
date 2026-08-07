import { useEffect, useState } from 'react';
import logoMark from '../assets/logo-mark.svg';
import './Navbar.css';

const LINKS = [
  { label: 'Product', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'AI Testing', href: '#ai-generation' },
  { label: 'Demo', href: '#demo' },
  { label: 'Pricing', href: '#pricing' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <a href="#top" className="navbar__brand">
          <img src={logoMark} alt="TestDart" className="navbar__mark" />
          <span>TestDart</span>
        </a>

        <nav className="navbar__links">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>

        <div className="navbar__cta">
          <button type="button" className="navbar__login">Log In</button>
          <button type="button" className="btn btn-primary">Get Started</button>
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
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
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
