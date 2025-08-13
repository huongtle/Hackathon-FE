import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Loading from './Loading';
import '../css/Chat.css';

const ChatPage = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);

  const text = {
    vi: {
      welcome: 'Xin chào! Tôi có thể giúp gì cho bạn hôm nay?',
      placeholder: 'Gửi tin nhắn...',
      voiceTitle: 'Nhập bằng giọng nói',
      clearHistory: 'Xóa lịch sử',
      exit: 'Thoát'
    },
    en: {
      welcome: 'Hello! How can I help you today?',
      placeholder: 'Send a message...',
      voiceTitle: 'Voice input',
      clearHistory: 'Clear History',
      exit: 'Exit'
    }
  };

  useEffect(() => {
    const savedLanguage = sessionStorage.getItem('selectedLanguage') || 'en';
    setLanguage(savedLanguage);
    
    const savedMessages = JSON.parse(sessionStorage.getItem('chatHistory') || '[]');
    if (savedMessages.length === 0) {
      setMessages([{ sender: 'bot', text: text[savedLanguage].welcome }]);
    } else {
      setMessages(savedMessages);
    }
    
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = language === 'vi' ? 'vi-VN' : 'en-US';
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => (prev ? prev + ' ' : '') + transcript);
        setIsListening(false);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
    }
  }, [language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    sessionStorage.setItem('chatHistory', JSON.stringify(messages));
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input };
    const botReply = { 
      sender: 'bot', 
      text: language === 'vi' ? `Bạn đã nói: "${input}"` : `You said: "${input}"` 
    };
    setMessages(prev => [...prev, userMessage, botReply]);
    setInput('');
  };

  const clearHistory = () => {
    const welcomeMsg = { sender: 'bot', text: text[language].welcome };
    setMessages([welcomeMsg]);
    sessionStorage.removeItem('chatHistory');
  };

  const handleExit = () => {
    navigate('/thankyou');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoiceClick = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      try {
        recognitionRef.current.start();
      } catch (error) {
        setIsListening(false);
      }
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="chat-container">
      <div className="robot-decoration robot-top-left">🤖</div>
      <div className="robot-decoration robot-top-right">👩⚕️</div>
      <div className="robot-decoration robot-bottom-left">👨⚕️</div>
      <div className="robot-decoration robot-bottom-right">🤖</div>
      <div className="chat-page">
        <Navbar />
      <div className="chat-header">
        <button onClick={clearHistory} className="clear-btn">
          {text[language].clearHistory}
        </button>
        <button onClick={handleExit} className="exit-btn">
          {text[language].exit}
        </button>
      </div>

      <div className="chat-history">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.sender}`}>
            <div className="bubble">{msg.text}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <textarea
          rows="1"
          placeholder={text[language].placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className={`voice-button ${isListening ? 'listening' : ''}`}
          onClick={handleVoiceClick}
          title={text[language].voiceTitle}
        >
          🎤
        </button>
        <button onClick={handleSend}>➤</button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;