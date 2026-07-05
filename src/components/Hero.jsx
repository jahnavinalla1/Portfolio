import { profile } from '../data';
import { useState, useEffect } from 'react';

const Typewriter = ({ words }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);
  const [reverse, setReverse] = useState(false);

  // Blinking cursor
  useEffect(() => {
    const timeout2 = setTimeout(() => setBlink((prev) => !prev), 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  // Typing logic
  useEffect(() => {
    if (index === words.length) {
      setIndex(0);
      return;
    }

    if (
      subIndex === words[index].length + 1 && 
      !reverse 
    ) {
      setTimeout(() => setReverse(true), 2000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => prev + 1);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 50 : 100, parseInt(Math.random() * 100)));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <>
      {words[index]?.substring(0, subIndex)}
      <span style={{ opacity: blink ? 1 : 0, transition: 'opacity 0.1s' }}>|</span>
    </>
  );
};

const Hero = () => {
  return (
    <section style={{
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(to bottom, var(--background), var(--background-secondary))'
    }}>
      {/* Background Floating Images */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
        {/* Glowing Orbs */}
        <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(236, 72, 153, 0.2)', filter: 'blur(100px)' }}></div>
        <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'rgba(6, 182, 212, 0.2)', filter: 'blur(120px)' }} className="animate-float-delayed"></div>
        <div style={{ position: 'absolute', top: '40%', left: '40%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(250, 204, 21, 0.2)', filter: 'blur(100px)' }} className="animate-float-doodle"></div>
        
        {/* Tech/Code */}
        <img 
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80" 
          alt="Tech" 
          className="animate-float" 
          style={{ position: 'absolute', top: '10%', left: '5%', width: '180px', height: '180px', objectFit: 'cover', borderRadius: '1rem', opacity: 1, transform: 'rotate(-10deg)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} 
        />
        {/* ASU Campus / University */}
        <img 
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&q=80" 
          alt="Campus" 
          className="animate-float-delayed" 
          style={{ position: 'absolute', top: '20%', right: '8%', width: '220px', height: '150px', objectFit: 'cover', borderRadius: '1rem', opacity: 1, transform: 'rotate(5deg)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} 
        />
        {/* Singer / Carnatic Music */}
        <img 
          src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80" 
          alt="Singer" 
          className="animate-float-doodle" 
          style={{ position: 'absolute', bottom: '10%', left: '15%', width: '160px', height: '160px', objectFit: 'cover', borderRadius: '50%', opacity: 1, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} 
        />
        {/* Athlete / Running */}
        <img 
          src="https://images.unsplash.com/photo-1571008887538-b36bb32f4571?auto=format&fit=crop&w=400&q=80" 
          alt="Athlete" 
          className="animate-float" 
          style={{ position: 'absolute', bottom: '15%', right: '15%', width: '200px', height: '200px', objectFit: 'cover', borderRadius: '1rem', opacity: 1, transform: 'rotate(-5deg)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} 
        />
        {/* AI / Cloud */}
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80" 
          alt="AI Cloud" 
          className="animate-float-delayed" 
          style={{ position: 'absolute', top: '5%', left: '40%', width: '150px', height: '150px', objectFit: 'cover', borderRadius: '1rem', opacity: 1, transform: 'rotate(15deg)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} 
        />
        {/* Workspace */}
        <img 
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80" 
          alt="Workspace" 
          className="animate-float-doodle" 
          style={{ position: 'absolute', top: '50%', left: '2%', width: '140px', height: '140px', objectFit: 'cover', borderRadius: '1rem', opacity: 1, transform: 'rotate(-15deg)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} 
        />
        {/* Data Analytics */}
        <img 
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80" 
          alt="Data" 
          className="animate-float" 
          style={{ position: 'absolute', top: '55%', right: '3%', width: '170px', height: '170px', objectFit: 'cover', borderRadius: '50%', opacity: 1, transform: 'rotate(10deg)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} 
        />
        {/* Books / Learning */}
        <img 
          src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80" 
          alt="Books" 
          className="animate-float-delayed" 
          style={{ position: 'absolute', bottom: '5%', left: '45%', width: '160px', height: '120px', objectFit: 'cover', borderRadius: '1rem', opacity: 1, transform: 'rotate(-8deg)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} 
        />

        <div className="bg-grid-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.2 }}></div>
      </div>

      {/* Content */}
      <div className="glass-card" style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '4rem 2rem', maxWidth: '1000px', backgroundColor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.5)', margin: '0 20px' }}>
        <h1 className="gradient-text" style={{ fontSize: '5.5rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.1 }}>
          {profile.name}
        </h1>
        <p style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '2rem', color: 'var(--primary)', height: '40px' }}>
          <Typewriter words={[profile.role, "AI Platform Architect", "Full-Stack Specialist"]} />
        </p>
        <p style={{ fontSize: '1.4rem', lineHeight: 1.6, color: 'var(--muted)', marginBottom: '3.5rem' }}>
          {profile.summary}
        </p>
        <a href="#experience" className="gradient-button" style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '1.25rem 2.5rem',
          borderRadius: '9999px',
          fontWeight: 700,
          fontSize: '1.2rem',
          transition: 'all 0.3s ease'
        }}>
          Explore My Work
          <span style={{ marginLeft: '10px' }}>→</span>
        </a>
      </div>
    </section>
  );
};

export default Hero;
