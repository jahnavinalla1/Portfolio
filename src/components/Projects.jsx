import { projects } from '../data';
import { useRef, useState, useEffect } from 'react';
import { getSkillColor } from '../utils';

const PROJECT_IMAGES = [
  { match: 'SCMA', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80' },
  { match: 'CHIRP', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80' },
  { match: 'Medicare', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80' },
  { match: 'Asset Management', url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80' },
  { match: 'Cybersecurity', url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80' },
];

const getProjectImage = (name) => PROJECT_IMAGES.find((p) => name.includes(p.match))?.url;

const PosterCard = ({ project }) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  const image = getProjectImage(project.name);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="glass-card"
      style={{
        flex: '0 0 340px',
        scrollSnapAlign: 'start',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${isHovered ? 1.04 : 1}, ${isHovered ? 1.04 : 1}, 1)`,
        transition: isHovered ? 'none' : 'transform 0.5s ease',
        cursor: 'pointer',
        zIndex: isHovered ? 5 : 1,
      }}
    >
      {/* Poster image with gradient title overlay */}
      <div style={{ position: 'relative', height: '160px', flexShrink: 0 }}>
        <img
          src={image}
          alt={project.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: isHovered ? 'brightness(0.55)' : 'brightness(0.75)',
            transition: 'filter 0.4s ease, transform 0.5s ease',
            transform: isHovered ? 'scale(1.08)' : 'scale(1)',
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, var(--card-bg) 0%, rgba(22,28,38,0.1) 55%, transparent 100%)',
        }} />
        <span style={{
          position: 'absolute',
          top: '0.75rem',
          right: '0.75rem',
          backgroundColor: project.status === 'Completed' ? 'rgba(34, 197, 94, 0.85)' : 'rgba(234, 179, 8, 0.85)',
          color: '#0a0e14',
          padding: '0.2rem 0.65rem',
          borderRadius: '9999px',
          fontSize: '0.7rem',
          fontWeight: 700,
          whiteSpace: 'nowrap',
        }}>
          {project.status === 'Completed' ? '✅ Completed' : '🚀 Building'}
        </span>
        <h3 style={{
          position: 'absolute',
          left: '1.25rem',
          bottom: '0.75rem',
          right: '1rem',
          fontSize: '1.25rem',
          fontWeight: 800,
          color: '#fff',
          textShadow: '0 2px 8px rgba(0,0,0,0.8)',
        }}>
          {project.name}
        </h3>
      </div>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '1.5rem', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem' }}>
          <span>{project.role}</span>
          <span style={{ color: 'var(--muted)', fontWeight: 500 }}>{project.date}</span>
        </div>

        <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', padding: 0, margin: 0, flex: 1 }}>
          {project.bullets?.map((bullet, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', fontSize: '0.88rem', color: 'var(--foreground)', lineHeight: 1.55, opacity: 0.9 }}>
              <span style={{ minWidth: '4px', height: '4px', backgroundColor: 'var(--muted)', borderRadius: '50%', marginTop: '0.55rem', marginRight: '0.65rem' }}></span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

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
        padding: '8rem 0',
        backgroundColor: 'var(--background-secondary)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease'
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 4%' }}>
        <h2 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--foreground)' }}>Featured Projects</h2>
        <p style={{ color: 'var(--muted)', marginBottom: '3rem' }}>Scroll to browse →</p>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '2rem',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          padding: '0.5rem 4% 2rem',
        }}
      >
        {projects.map((project, idx) => (
          <div
            key={idx}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.96)',
              transition: `opacity 0.5s ease ${0.2 + idx * 0.1}s, transform 0.5s ease ${0.2 + idx * 0.1}s`,
              display: 'flex',
            }}
          >
            <PosterCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
