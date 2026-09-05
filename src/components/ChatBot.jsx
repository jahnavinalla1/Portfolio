import { useState, useRef, useEffect } from 'react';
import { profile } from '../data';
import { STARTER_QUESTIONS, answerQuestion } from '../chatKnowledge';

const GREETING = {
  role: 'assistant',
  content: `Hi! I'm here to answer questions about ${profile.name.split(' ')[0]}'s background, experience, and projects. What would you like to know?`,
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isLoading]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  // Lets other components (e.g. the Hero section's "Ask Me Anything" button)
  // open the chat without prop-drilling or a shared state provider.
  useEffect(() => {
    const openHandler = () => setIsOpen(true);
    window.addEventListener('open-chat', openHandler);
    return () => window.removeEventListener('open-chat', openHandler);
  }, []);

  const sendMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    setMessages((prev) => [...prev, { role: 'user', content: trimmed }]);
    setInput('');
    setIsLoading(true);

    // Small artificial delay so the reply doesn't feel instant/robotic, even
    // though it's just a local lookup with no network call involved.
    const delay = 300 + Math.random() * 300;
    setTimeout(() => {
      const reply = answerQuestion(trimmed);
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
      setIsLoading(false);
    }, delay);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {!isOpen && (
        <button
          className="chat-fab"
          onClick={() => setIsOpen(true)}
          aria-label={`Open chat about ${profile.name}`}
        >
          <span className="dot dot--live" style={{ background: 'var(--signal)' }} />
          Ask about me
        </button>
      )}

      {isOpen && (
        <div className="chat" role="dialog" aria-label={`Chat about ${profile.name}`}>
          <div className="chat__bar">
            <span className="panel__title">
              <span className="dot dot--live" />
              Résumé assistant
            </span>
            <button className="chat__close" onClick={() => setIsOpen(false)} aria-label="Close chat">
              ✕
            </button>
          </div>

          <div className="chat__log" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={`msg msg--${m.role === 'user' ? 'u' : 'a'}`}>
                {m.content}
              </div>
            ))}

            {isLoading && (
              <div className="msg msg--a">
                <span className="typing"><span /><span /><span /></span>
              </div>
            )}
          </div>

          {messages.length === 1 && !isLoading && (
            <div className="chat__starters">
              {STARTER_QUESTIONS.map((q) => (
                <button key={q} className="starter" onClick={() => sendMessage(q)}>
                  {q}
                </button>
              ))}
            </div>
          )}

          <form className="chat__form" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              className="chat__input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              maxLength={1000}
              disabled={isLoading}
              aria-label="Your question"
            />
            <button type="submit" className="chat__send" disabled={isLoading || !input.trim()}>
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;
