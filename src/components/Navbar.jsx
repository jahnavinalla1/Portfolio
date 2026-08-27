import { useState, useEffect, useRef } from 'react';
import { profile } from '../data';

const linkedinHandle = profile.linkedin.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const contactRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (contactRef.current && !contactRef.current.contains(e.target)) {
        setIsContactOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      padding: '1.5rem 4%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 50,
      transition: 'all 0.3s ease',
      backgroundColor: isScrolled ? 'var(--nav-bg)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(12px)' : 'none',
      borderBottom: isScrolled ? '1px solid var(--border)' : '1px solid transparent'
    }}>
      <div>
        <a href="/" style={{
          fontSize: '1.75rem',
          fontWeight: '800',
          color: 'var(--primary)',
          paddingBottom: '0.25rem',
          borderBottom: '3px solid var(--primary)',
          letterSpacing: '-0.02em'
        }}>
          {profile.name}
        </a>
      </div>
      <div className="nav-links" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
        <a href="#experience" className="nav-link" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--foreground)' }}>Experience</a>
        <a href="#projects" className="nav-link" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--foreground)' }}>Projects</a>
        <a href="#about" className="nav-link" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--foreground)' }}>About</a>
        <a href="/resume.pdf" download="Jahnavi_Nalla_Resume.pdf" className="nav-link" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--foreground)' }}>Resume</a>
        <a href={profile.github} target="_blank" rel="noreferrer" className="nav-link" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--foreground)' }}>GitHub</a>

        <div ref={contactRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setIsContactOpen((v) => !v)}
            className="nav-link"
            style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              color: 'var(--foreground)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontFamily: 'inherit',
            }}
          >
            Contact
            <span style={{ fontSize: '0.7rem', transform: isContactOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s ease' }}>▾</span>
          </button>

          {isContactOpen && (
            <div
              className="glass-card"
              style={{
                position: 'absolute',
                top: 'calc(100% + 1rem)',
                right: 0,
                width: '280px',
                padding: '0.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
                zIndex: 60,
              }}
            >
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsContactOpen(false)}
                style={{ display: 'flex', flexDirection: 'column', padding: '0.65rem 0.75rem', borderRadius: '0.6rem', color: 'var(--foreground)' }}
                className="contact-option"
              >
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em' }}>LinkedIn</span>
                <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>{linkedinHandle}</span>
              </a>
              <a
                href={`tel:${profile.phone.replace(/[^\d+]/g, '')}`}
                onClick={() => setIsContactOpen(false)}
                style={{ display: 'flex', flexDirection: 'column', padding: '0.65rem 0.75rem', borderRadius: '0.6rem', color: 'var(--foreground)' }}
                className="contact-option"
              >
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em' }}>Phone</span>
                <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>{profile.phone}</span>
              </a>
              <a
                href={`mailto:${profile.email}`}
                onClick={() => setIsContactOpen(false)}
                style={{ display: 'flex', flexDirection: 'column', padding: '0.65rem 0.75rem', borderRadius: '0.6rem', color: 'var(--foreground)' }}
                className="contact-option"
              >
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em' }}>Email</span>
                <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>{profile.email}</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
