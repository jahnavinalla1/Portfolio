import { useState, useRef, useEffect } from 'react';
import { experience } from '../data';
import { getSkillColor } from '../utils';

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      style={{ 
        padding: '8rem 4%', 
        backgroundColor: 'var(--background)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease'
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '4rem', color: 'var(--foreground)', letterSpacing: '-0.02em' }}>
          Work Experience
        </h2>
        
        <div style={{ 
          position: 'relative',
          paddingLeft: '2rem'
        }}>
          {/* Vertical connecting line */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '2px',
            backgroundColor: 'var(--border)',
            opacity: 0.5
          }} />

          {experience.map((item, idx) => (
            <div
              key={idx}
              style={{
                position: 'relative',
                marginBottom: idx === experience.length - 1 ? '0' : '4rem',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
                transition: `opacity 0.6s ease ${idx * 0.15}s, transform 0.6s ease ${idx * 0.15}s`,
              }}
            >
              {/* Horizontal line connector */}
              <div style={{
                position: 'absolute',
                left: '-2rem',
                top: '2rem',
                width: '2rem',
                height: '2px',
                backgroundColor: 'var(--border)',
                opacity: 0.5
              }} />

              <div 
                className="glass-card"
                style={{ 
                  padding: '2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  backgroundColor: 'var(--card-bg)', // Use CSS variable
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '0.25rem' }}>
                      {item.role}
                    </h3>
                    <p style={{ color: 'var(--muted)', fontSize: '1rem' }}>
                      {item.company}
                    </p>
                  </div>
                  <div style={{ color: 'var(--accent)', fontSize: '0.9rem', fontWeight: '500', opacity: 0.8 }}>
                    {item.date}
                  </div>
                </div>

                <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem', padding: 0 }}>
                  {item.bullets.map((bullet, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', fontSize: '0.95rem', color: 'var(--foreground)', lineHeight: 1.6, opacity: 0.9 }}>
                      <span style={{ minWidth: '4px', height: '4px', backgroundColor: 'var(--muted)', borderRadius: '50%', marginTop: '0.6rem', marginRight: '1rem' }}></span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                  {(item.tech || []).map(skill => {
                    const color = getSkillColor(skill);
                    return (
                      <span key={skill} className="pill" style={{ backgroundColor: `${color}22`, color: color }}>
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
