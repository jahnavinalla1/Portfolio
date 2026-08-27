import { skills, education, certifications } from '../data';
import { useState, useRef, useEffect } from 'react';
import { getSkillColor } from '../utils';
import asuLogo from '../assets/logos/asu-logo.svg';
import bvrLogo from '../assets/logos/bvrit-logo.svg';

const getUniversityLogo = (school) => {
  if (school.includes('Arizona State')) return asuLogo;
  if (school.includes('B V Raju')) return bvrLogo;
  return null;
};

const getDetailIcon = (text) => {
  const t = text.toLowerCase();
  if (t.startsWith('fun fact')) return '🍳';
  if (t.startsWith('superpower')) return '🦸';
  if (t.includes('claude') || t.includes('anthropic')) return '🤖';
  if (t.includes('aws') || t.includes('cloud')) return '☁️';
  if (t.includes('perplexity')) return '🧭';
  if (t.includes('volunteer')) return '🤝';
  if (t.startsWith('interests')) return '⭐';
  return '✨';
};

const Skills = () => {
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
      id="skills" 
      ref={sectionRef}
      style={{ 
        padding: '8rem 4%', 
        backgroundColor: 'var(--background)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '5rem' }}>
        
        {/* Skills Section */}
        <div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--foreground)', marginBottom: '2rem' }}>Technical Skills</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {skills.map((skillGroup, idx) => (
              <div
                key={idx}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
                  transition: `opacity 0.5s ease ${idx * 0.1}s, transform 0.5s ease ${idx * 0.1}s`,
                }}
              >
                <h4 style={{ fontWeight: 600, color: 'var(--foreground)', marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
                  <span style={{ width: '8px', height: '8px', backgroundColor: 'var(--primary)', borderRadius: '50%', marginRight: '10px' }}></span>
                  {skillGroup.category}
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {skillGroup.items.map((skill, i) => {
                    const color = getSkillColor(skill);
                    return (
                      <span
                        key={i}
                        className="pill"
                        style={{
                          backgroundColor: `${color}22`,
                          color: color,
                          opacity: isVisible ? 1 : 0,
                          transform: isVisible ? 'scale(1)' : 'scale(0.7)',
                          transition: `opacity 0.35s ease ${idx * 0.1 + i * 0.02}s, transform 0.35s ease ${idx * 0.1 + i * 0.02}s, background-color 0.2s`,
                        }}
                      >
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Certs */}
        <div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--foreground)', marginBottom: '2rem' }}>Education</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' }}>
            {education.map((edu, idx) => (
              <div
                key={idx}
                className="glass-card"
                style={{
                  padding: '1.5rem',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.5s ease ${idx * 0.15}s, transform 0.5s ease ${idx * 0.15}s, box-shadow 0.3s ease, border-color 0.3s ease`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  {getUniversityLogo(edu.school) && (
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '44px',
                      height: '44px',
                      minWidth: '44px',
                      borderRadius: '0.6rem',
                      backgroundColor: '#fff',
                      padding: '0.4rem',
                    }}>
                      <img
                        src={getUniversityLogo(edu.school)}
                        alt={`${edu.school} logo`}
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                    </span>
                  )}
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--primary)' }}>{edu.school}</h3>
                </div>
                <p style={{ color: 'var(--foreground)', fontWeight: 500, fontSize: '0.9rem', marginBottom: '0.5rem' }}>{edu.degree}</p>
                <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{edu.date}</p>
                {edu.details && <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginTop: '0.5rem', fontStyle: 'italic' }}>{edu.details}</p>}
              </div>
            ))}
          </div>

          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--foreground)', marginBottom: '1.5rem' }}>Additional Details</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            {certifications.map((cert, idx) => {
              const color = getSkillColor(cert);
              return (
                <div
                  key={idx}
                  className="glass-card detail-card"
                  style={{
                    padding: '1.1rem 1.25rem',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    borderLeft: `4px solid ${color}`,
                    backgroundColor: `${color}14`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.5s ease ${idx * 0.08}s, transform 0.3s ease ${isVisible ? '0s' : `${idx * 0.08}s`}, box-shadow 0.3s ease, border-color 0.3s ease`,
                  }}
                >
                  <span className="detail-icon" style={{ fontSize: '1.4rem', lineHeight: 1 }}>{getDetailIcon(cert)}</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--foreground)', lineHeight: 1.5 }}>{cert}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
