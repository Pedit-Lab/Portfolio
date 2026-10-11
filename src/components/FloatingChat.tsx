import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2, Bot, ArrowUpRight } from 'lucide-react';
import { sendChatMessage, type ChatMessage, type ChatAction } from '../services/chatService';
import botSleep from '../assets/bot-sleep.png';
import botAwake from '../assets/bot-awake.png';
import bot1 from '../assets/bot1.png';
import bot2 from '../assets/bot2.png';
import './FloatingChat.css';

const formatMessage = (text: string) => {
  if (!text) return { __html: '' };
  const html = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^- (.*)$/gm, '• $1')
    .replace(/\n/g, '<br />');
  return { __html: html };
};

export const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: 'Hi ✌️ I am pedit. How can I help you today?',
      actions: [
        { label: '🚀 Explore Services', type: 'scroll', target: 'services' },
        { label: '📞 Contact Us', type: 'scroll', target: 'contact' }
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [blinkOpen, setBlinkOpen] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlinkOpen(false);
      setTimeout(() => setBlinkOpen(true), 200);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const headerAvatar = blinkOpen ? bot2 : bot1;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleActionClick = (act: ChatAction) => {
    if (act.type === 'navigate') {
      if (window.location.pathname === act.target) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.location.href = act.target;
      }
    } else if (act.type === 'scroll') {
      if (window.location.pathname !== '/') {
        window.location.href = `/#${act.target}`;
      } else {
        const el = document.getElementById(act.target);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.href = `/#${act.target}`;
        }
      }
    } else if (act.type === 'quote') {
      if (window.location.pathname !== '/') {
        window.location.href = '/#contact';
      } else {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSendPrompt = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', text: textToSend };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setMessage('');
    setLoading(true);

    const result = await sendChatMessage(updatedMessages);
    setMessages([
      ...updatedMessages,
      { role: 'model', text: result.reply, actions: result.actions }
    ]);
    setLoading(false);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendPrompt(message);
  };

  return (
    <div className="floating-chat-container">

      {isOpen && (
        <div className="floating-chat-window">

          {/* Header */}
          <div className="floating-chat-header">
            <div className="header-left">
              <div className="header-avatar">
                <img src={headerAvatar} alt="pedit" />
              </div>
              <div>
                <h3 className="header-title">pedit Assistant</h3>
                <div className="header-status">
                  <div className="status-dot"></div>
                  <span className="status-text">Online</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="close-btn"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="floating-chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message-row ${msg.role}`}>
                {msg.role === 'model' && (
                  <div className="msg-avatar">
                    <Bot size={16} />
                  </div>
                )}
                <div className="message-content-wrapper">
                  <div 
                    className={`message-bubble ${msg.role}`} 
                    dangerouslySetInnerHTML={formatMessage(msg.text)} 
                  />

                  {/* Web Assistant Action Buttons */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="message-actions">
                      {msg.actions.map((act, aIdx) => (
                        <button
                          key={aIdx}
                          type="button"
                          className="chat-action-btn"
                          onClick={() => handleActionClick(act)}
                        >
                          <span>{act.label}</span>
                          <ArrowUpRight size={13} />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="message-row model">
                <div className="msg-avatar">
                  <Bot size={16} />
                </div>
                <div className="loading-bubble">
                  <Loader2 size={14} className="spinner" />
                  <span>pedit is typing…</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="floating-chat-input-area">
            <form onSubmit={handleSend} className="chat-form">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about services, projects, or contact us…"
                className="chat-input"
                autoComplete="off"
              />
              <button
                type="submit"
                className="chat-send-btn"
                disabled={loading || !message.trim()}
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </form>
          </div>

        </div>
      )}

      {/* Robot FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`robot-fab ${isOpen ? 'open' : ''}`}
        aria-label="Toggle pedit chat assistant"
      >
        {isOpen ? (
          <div className="fab-close">
            <X size={26} />
          </div>
        ) : (
          <div className="robot-container">
            <img
              src={isHovered ? botAwake : botSleep}
              alt="pedit Chat Bot"
              className="robot-img"
            />
            <div className="chat-badge">
              <span>ASK</span>
              <span>ME</span>
            </div>
          </div>
        )}
      </button>

    </div>
  );
};