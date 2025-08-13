import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/ThankYou.css';

function ThankYou() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');

  const text = {
    vi: {
      title: 'Cảm ơn bạn!',
      message1: 'Cảm ơn bạn đã sử dụng MedQ - Trợ lý AI Doctor',
      message2: 'Chúng tôi hy vọng đã có thể giúp đỡ bạn hôm nay.',
      backHome: 'Về trang chủ',
      newSession: 'Bắt đầu phiên mới',
      sessionSummary: 'Tóm tắt phiên',
      riskLevel: 'Mức độ rủi ro',
      advice: 'Lời khuyên',
      reason: 'Lý do',
      high: 'Cao',
      medium: 'Trung bình',
      low: 'Thấp'
    },
    en: {
      title: 'Thank You!',
      message1: 'Thank you for using MedQ - AI Doctor Assistant',
      message2: 'We hope we were able to help you today.',
      backHome: 'Back to Home',
      newSession: 'Start new session',
      sessionSummary: 'Session Summary',
      riskLevel: 'Risk Level',
      advice: 'Advice',
      reason: 'Reason',
      high: 'High',
      medium: 'Medium',
      low: 'Low'
    }
  };

  useEffect(() => {
    const savedLanguage = sessionStorage.getItem('selectedLanguage') || 'en';
    setLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      const newLanguage = sessionStorage.getItem('selectedLanguage') || 'en';
      setLanguage(newLanguage);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  const getSessionSummary = (lang) => {
    const chatHistory = JSON.parse(sessionStorage.getItem('chatHistory') || '[]');
    const userMessages = chatHistory.filter(msg => msg.sender === 'user');
    
    // Mock data - in real app this would come from AI analysis
    const riskLevels = ['High', 'Medium', 'Low'];
    const risk = riskLevels[Math.floor(Math.random() * riskLevels.length)];
    
    return {
      risk: risk,
      advice: lang === 'vi' ? 'Nên gặp bác sĩ trong vòng 24h' : 'Should see a doctor within 24 hours',
      reason: lang === 'vi' ? 'Các triệu chứng có thể liên quan đến tình trạng nghiêm trọng' : 'Symptoms may be related to a serious condition'
    };
  };

  const summary = getSessionSummary(language);

  return (
    <div className="thankyou-container">
      <div className="thankyou-content">
        <h1>{text[language].title}</h1>
        <p>{text[language].message1}</p>
        <p>{text[language].message2}</p>
        
        <div className="session-summary">
          <div className="summary-header">
            <h3>{text[language].sessionSummary}</h3>
            <span className={`risk-badge ${summary.risk.toLowerCase()}`}>{text[language][summary.risk.toLowerCase()]}</span>
          </div>
          <div className="summary-item">
            <span>{text[language].advice}:</span>
            <span>{summary.advice}</span>
          </div>
          <div className="summary-item">
            <span>{text[language].reason}:</span>
            <span>{summary.reason}</span>
          </div>
        </div>
        <div className="button-group">
          <button onClick={() => navigate('/')} className="home-btn">
            {text[language].backHome}
          </button>
          <button onClick={() => {
            sessionStorage.removeItem('chatHistory');
            navigate('/triage');
          }} className="session-btn">
            {text[language].newSession}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;