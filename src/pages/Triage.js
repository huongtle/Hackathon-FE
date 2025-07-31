import React from 'react';
import '../css/Triage.css';
import ChatBox from '../components/ChatBox';

function Triage() {
  return (
    <div className="triage-content">
      <h1>Triage Page</h1>
      <p>This is where triage questions or instructions can go.</p>
      <ChatBox />
    </div>
  );
}

export default Triage;