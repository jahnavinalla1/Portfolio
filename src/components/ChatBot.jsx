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
      {/* Launcher button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? 'Close chat' : `Open chat about ${profile.name}`}
        className={isOpen ? '' : 'chat-launcher'}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          zIndex: 200,
          background: 'linear-gradient(135deg, var(--primary), var(--accent))',
          color: '#fff',
          fontSize: '1.6rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(167, 139, 250,0.4)',
          transition: 'transform 0.2s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-label={`Chat about ${profile.name}`}
          className="glass-card"
          style={{
            position: 'fixed',
            bottom: '96px',
            right: '24px',
            width: 'min(380px, calc(100vw - 32px))',
            height: 'min(560px, calc(100vh - 140px))',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 200,
            backgroundColor: 'var(--background)',
            overflow: 'hidden',
            padding: 0,
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '1rem 1.25rem',
              background: 'linear-gradient(135deg, var(--primary), var(--accent))',
              color: '#fff',
            }}
          >
            <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>Ask about {profile.name}</div>
            <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>
              Instant answers, straight from her resume
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  padding: '0.6rem 0.9rem',
                  borderRadius: '1rem',
                  borderBottomRightRadius: m.role === 'user' ? '0.25rem' : '1rem',
                  borderBottomLeftRadius: m.role === 'assistant' ? '0.25rem' : '1rem',
                  backgroundColor: m.role === 'user' ? 'var(--primary)' : 'var(--background-secondary)',
                  color: m.role === 'user' ? '#fff' : 'var(--foreground)',
                  fontSize: '0.92rem',
                  lineHeight: 1.5,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {m.content}
              </div>
            ))}

            {isLoading && (
              <div
                style={{
                  alignSelf: 'flex-start',
                  padding: '0.6rem 0.9rem',
                  borderRadius: '1rem',
                  backgroundColor: 'var(--background-secondary)',
                  color: 'var(--muted)',
                  fontSize: '0.92rem',
                }}
              >
                Thinking…
              </div>
            )}

            {messages.length === 1 && !isLoading && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                {STARTER_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    style={{
                      textAlign: 'left',
                      padding: '0.55rem 0.85rem',
                      borderRadius: '0.75rem',
                      border: '1px solid var(--border)',
                      backgroundColor: 'transparent',
                      color: 'var(--primary)',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              gap: '0.5rem',
              padding: '0.75rem',
              borderTop: '1px solid var(--border)',
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              maxLength={1000}
              disabled={isLoading}
              style={{
                flex: 1,
                padding: '0.6rem 0.9rem',
                borderRadius: '9999px',
                border: '1px solid var(--border)',
                fontSize: '0.9rem',
                outline: 'none',
                backgroundColor: 'var(--background)',
                color: 'var(--foreground)',
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                border: 'none',
                cursor: isLoading || !input.trim() ? 'default' : 'pointer',
                backgroundColor: 'var(--primary)',
                color: '#fff',
                opacity: isLoading || !input.trim() ? 0.5 : 1,
                fontSize: '1.1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              →
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;
