import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import ChatBot from './components/ChatBot';
import { profile } from './data';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <ChatBot />

      <footer style={{ padding: '40px', textAlign: 'center', borderTop: '1px solid var(--border)', backgroundColor: 'var(--background)' }}>
        <p style={{ color: 'var(--muted)' }}>© 2026 Jahnavi Nalla. Built with React & Vite.</p>
        <p style={{ color: 'var(--muted)', marginTop: '10px' }}>Email: {profile.email} | Phone: {profile.phone}</p>
      </footer>
    </div>
  );
}

export default App;
