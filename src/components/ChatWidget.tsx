import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend } from 'react-icons/fi';
import './ChatWidget.css';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm Git's AI assistant. Ask me anything about Faqih's skills or projects!", sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user message
    const newUserMsg = { id: messages.length + 1, text: inputText, sender: 'user' };
    setMessages([...messages, newUserMsg]);
    setInputText('');

    // Simulate bot response
    setTimeout(() => {
      const botMsg = { 
        id: messages.length + 2, 
        text: "Thanks for your message! This is a demo chat interaction.", 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div className="chat-widget-container">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
          >
            <div className="chat-header">
              <div className="chat-title">
                <div className="chat-avatar-sm">
                  <FiMessageSquare />
                </div>
                <span>Git's Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="close-btn">
                <FiX />
              </button>
            </div>
            
            <div className="chat-messages">
              {messages.map((msg) => (
                <div key={msg.id} className={`message ${msg.sender}`}>
                  {msg.sender === 'bot' && (
                    <div className="message-avatar">
                      <FiMessageSquare size={12} />
                    </div>
                  )}
                  <div className="message-bubble">
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSend} className="chat-input-area">
              <input 
                type="text" 
                placeholder="Ask me something..." 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button type="submit">
                <FiSend />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button 
          className="chat-toggle-btn"
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiMessageSquare size={24} />
        </motion.button>
      )}
    </div>
  );
};

export default ChatWidget;
