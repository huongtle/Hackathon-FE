import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import ChatMessage from './ChatMessage';
import '../css/ChatBox.css';

const ChatBox = () => {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSend = () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    const botReply = { sender: 'bot', text: `You asked: "${input}"` };

    setChatHistory([...chatHistory, botReply, userMessage]);
    setInput('');
  };

  return (
    <div className="chatbox-container">
      <div className="chat-history">
        {chatHistory.map((msg, idx) => (
          <ChatMessage key={idx} sender={msg.sender} text={msg.text} />
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your question..."
        />
        <button onClick={handleSend} aria-label="Send search">
          <FaSearch color="white" size={14} /> Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;