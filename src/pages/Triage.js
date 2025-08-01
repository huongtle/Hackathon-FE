import React from 'react';
import '../css/Triage.css';
import ChatPage from '../components/Chat';

function Triage() {
  return (
    <div className="triage-content">
      <h1>Triage Page</h1>
      <p>This is where triage questions or instructions can go.</p>
      <ChatPage />
    </div>
  );
}

export default Triage;