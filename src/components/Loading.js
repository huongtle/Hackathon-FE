import React from 'react';
import '../css/Loading.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="robot-loader">
        <div className="robot-head">
          <div className="robot-eyes">
            <div className="eye left"></div>
            <div className="eye right"></div>
          </div>
          <div className="robot-mouth"></div>
        </div>
        <div className="robot-body">
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <div className="loading-text">🤖 AI Doctor Loading...</div>
    </div>
  );
};

export default Loading;