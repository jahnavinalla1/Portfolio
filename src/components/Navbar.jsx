import { useState, useEffect } from 'react';
import { profile } from '../data';

const SECTIONS = [
  { href: '#approach', label: 'Approach' },
  { href: '#work', label: 'Work' },
  { href: '#builds', label: 'Builds' },
  { href: '#stack', label: 'Stack' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The mobile sheet overlays the page, so close it once a link is taken.
  useEffect(() => {
    if (!isOpen) return;
    const close = () => setIsOpen(false);
    window.addEventListener('resize', close);
    return () => window.removeEventListener('resize', close);
  }, [isOpen]);

  return (
    <nav className={`nav${isScrolled || isOpen ? ' nav--scrolled' : ''}`}>
      <div className="wrap nav__inner">
        <a href="#top" className="nav__brand">{profile.name}</a>

        <div className={`nav__links${isOpen ? ' nav__links--open' : ''}`}>
          {SECTIONS.map((s) => (
            <a key={s.href} href={s.href} className="nav__link" onClick={() => setIsOpen(false)}>
              {s.label}
            </a>
          ))}
        </div>

        <div className="nav__ext">
          <a href="/resume.pdf" download="Jahnavi_Nalla_Resume.pdf" className="nav__extlink">Résumé ↓</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="nav__extlink">LinkedIn ↗</a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="nav__extlink">GitHub ↗</a>
        </div>

        <button
          className="nav__toggle"
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          {isOpen ? 'Close' : 'Menu'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
