import { skills, education, certifications } from '../data';
import { useState, useRef, useEffect } from 'react';
import { getSkillColor } from '../utils';

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
              <div key={idx}>
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
                        style={{ backgroundColor: `${color}22`, color: color }}
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
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--foreground)', marginBottom: '2rem' }}>Education & Certs</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' }}>
            {education.map((edu, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '0.5rem' }}>{edu.school}</h3>
                <p style={{ color: 'var(--foreground)', fontWeight: 500, fontSize: '0.9rem', marginBottom: '0.5rem' }}>{edu.degree}</p>
                <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{edu.date}</p>
                {edu.details && <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginTop: '0.5rem', fontStyle: 'italic' }}>{edu.details}</p>}
              </div>
            ))}
          </div>

          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--foreground)', marginBottom: '1.5rem' }}>Additional Details</h3>
          <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {certifications.map((cert, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.5 }}>
                <span style={{ minWidth: '6px', height: '6px', backgroundColor: 'var(--accent)', borderRadius: '50%', marginTop: '0.4rem', marginRight: '0.75rem' }}></span>
                <span>{cert}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
};

export default Skills;
