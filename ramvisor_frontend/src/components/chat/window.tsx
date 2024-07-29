"use client";

import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faTimes, faPanda, faPaperPlane, faPaperclip } from '@fortawesome/free-solid-svg-icons';

interface Message {
  text: string;
  sender: 'user' | 'agent';
}

const ChatWindow: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, sender: 'user' }]);
      setInputMessage('');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('File uploaded:', file);
      // Handle file upload logic here
    }
  };

  const buttonStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '16px',
    right: '16px',
    width: '52px',
    height: '52px',
    borderRadius: '50%',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    boxShadow: '12px 15px 20px 0 rgba(46, 61, 73, 0.15)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const chatboxStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '84px',
    right: '16px',
    width: '300px',
    height: '400px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '5px 5px 25px 0 rgba(46, 61, 73, 0.2)',
    display: 'flex',
    flexDirection: 'column',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    padding: '12px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
    alignItems: 'center',
  };

  const mainStyle: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
  };

  const footerStyle: React.CSSProperties = {
    display: 'flex',
    padding: '12px',
    borderTop: '1px solid #ddd',
    alignItems: 'center',
  };

  const inputStyle: React.CSSProperties = {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '14px',
    lineHeight: '20px',
    color: '#888',
  };

  const iconButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    padding: '4px',
  };

  return (
    <>
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)} 
          style={buttonStyle}
          type="button"
          aria-label="Open chat with Panda AI"
        >
          <FontAwesomeIcon icon={faComment} size="2x" />
        </button>
      )}
      {isOpen && (
        <div style={chatboxStyle}>
          <div style={headerStyle}>
            <div style={{ flex: 1, marginRight: '8px' }}>
              <FontAwesomeIcon icon={faPanda} size="lg" />
            </div>
            <div style={{ flex: 4 }}>
              <h1 style={{ margin: 0, fontSize: '16px' }}>Panda AI</h1>
              <div style={{ fontSize: '12px' }}>AI Assistant</div>
            </div>
            <div style={{ flex: 1, textAlign: 'right' }}>
              <button 
                onClick={() => setIsOpen(false)} 
                style={iconButtonStyle}
                type="button"
                aria-label="Close chat"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
          <div style={mainStyle}>
            {messages.length === 0 ? (
              <div style={{ color: '#888', textAlign: 'center' }}>
                Hello! I'm Panda AI, your friendly AI assistant.<br />How can I help you today?
              </div>
            ) : (
              messages.map((msg, index) => (
                <div key={index} style={{ 
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', 
                  marginBottom: '8px', 
                  maxWidth: '80%' 
                }}>
                  <span style={{ 
                    backgroundColor: msg.sender === 'user' ? '#4CAF50' : '#f1f0f0', 
                    color: msg.sender === 'user' ? '#fff' : '#000', 
                    padding: '8px 12px', 
                    borderRadius: '16px', 
                    display: 'inline-block', 
                    wordWrap: 'break-word',
                    fontSize: '14px',
                  }}>
                    {msg.text}
                  </span>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
          <div style={footerStyle}>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileUpload}
              aria-label="Upload file"
            />
            <button 
              onClick={() => fileInputRef.current?.click()} 
              style={{...iconButtonStyle, color: '#888'}}
              type="button"
              aria-label="Attach file"
            >
              <FontAwesomeIcon icon={faPaperclip} />
            </button>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message here..."
              style={inputStyle}
              aria-label="Message input"
            />
            <button 
              onClick={handleSend} 
              style={{...iconButtonStyle, color: '#888'}}
              type="button"
              aria-label="Send message"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWindow;