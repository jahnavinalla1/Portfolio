import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Approach from './components/Approach';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import About from './components/About';
import Contact from './components/Contact';
import ChatBot from './components/ChatBot';
import { profile } from './data';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Approach />
        <Experience />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>

      <footer className="footer">
        <div className="wrap nav__inner">
          <span className="mono">© {new Date().getFullYear()} {profile.name}</span>
          <span className="mono">Built with React &amp; Vite</span>
        </div>
      </footer>

      <ChatBot />
    </>
  );
}

export default App;
