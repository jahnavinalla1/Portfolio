import { useState, useEffect } from 'react';
import { profile } from '../data';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
      backgroundColor: isScrolled ? 'rgba(255,255,255,0.9)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(12px)' : 'none',
      borderBottom: isScrolled ? '1px solid rgba(0,0,0,0.05)' : '1px solid transparent'
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
        <a href="#experience" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--foreground)' }}>Experience</a>
        <a href="#projects" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--foreground)' }}>Projects</a>
        <a href="#about" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--foreground)' }}>About</a>
        <a href="/resume.pdf" download="Jahnavi_Nalla_Resume.pdf" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--foreground)' }}>Resume</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--foreground)' }}>Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
