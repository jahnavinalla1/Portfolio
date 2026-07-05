import { projects } from '../data';
import { useRef, useState, useEffect } from 'react';
import { getSkillColor } from '../utils';

const TiltCard = ({ project }) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top;  // y position within the element

    setMousePos({ x, y });

    // Calculate rotation
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg tilt
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="glass-card" 
      style={{ 
        padding: '2.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
        transition: isHovered ? 'none' : 'transform 0.5s ease',
        cursor: 'pointer'
      }}
    >
      {/* Spotlight Effect */}
      <div 
        style={{
          position: 'absolute',
          top: mousePos.y,
          left: mousePos.x,
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 80%)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          zIndex: 0
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
        
        {/* Top Header Section */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--foreground)' }}>{project.name}</h3>
            {/* Status Badge */}
            <span style={{ 
              backgroundColor: 'rgba(234, 179, 8, 0.15)', // yellow transparent
              color: '#ca8a04', // yellow text
              padding: '0.25rem 0.75rem', 
              borderRadius: '9999px', 
              fontSize: '0.8rem', 
              fontWeight: 700,
              whiteSpace: 'nowrap'
            }}>
              🚀 Building
            </span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--primary)', fontWeight: 600, fontSize: '0.95rem' }}>
            <span>{project.role}</span>
            <span style={{ color: 'var(--muted)', fontWeight: 500 }}>{project.date}</span>
          </div>
        </div>

        {/* Bullets */}
        <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0, margin: 0, flex: 1 }}>
          {project.bullets?.map((bullet, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', fontSize: '0.95rem', color: 'var(--foreground)', lineHeight: 1.6, opacity: 0.9 }}>
              <span style={{ minWidth: '4px', height: '4px', backgroundColor: 'var(--muted)', borderRadius: '50%', marginTop: '0.6rem', marginRight: '0.75rem' }}></span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
        
        {/* Tech Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
          {project.tech?.map((tech, i) => {
            const color = getSkillColor(tech);
            return (
              <span key={i} className="pill" style={{ backgroundColor: `${color}22`, color: color }}>
                {tech}
              </span>
            );
          })}
        </div>
        
        {project.github && (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href={project.github} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '1rem' }}>View Code →</a>
          </div>
        )}
      </div>
    </div>
  );
};

const Projects = () => {
  // Simple reveal animation hook
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
      id="projects" 
      ref={sectionRef}
      style={{ 
        padding: '8rem 4%', 
        backgroundColor: 'var(--background-secondary)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '5rem', color: 'var(--foreground)' }}>Featured Projects</h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2.5rem'
        }}>
          {projects.map((project, idx) => (
            <TiltCard key={idx} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
