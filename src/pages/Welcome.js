import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Welcome.css';

function Welcome() {
  const navigate = useNavigate();

  const handleLanguageSelect = (language) => {
    sessionStorage.setItem('selectedLanguage', language);
    navigate('/info');
  };

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1>Chào mừng bạn đến với MedQ</h1>
        <p>Vui lòng chọn ngôn ngữ</p>
        <h2>Welcome to MedQ</h2>
        <p>Please select the language</p>
        <div className="welcome-actions">
          <button onClick={() => handleLanguageSelect('vi')} className="btn-primary">Tiếng Việt</button>
          <button onClick={() => handleLanguageSelect('en')} className="btn-secondary">English</button>
        </div>
        <h3>Trợ lý AI Doctor giúp bạn tìm hiểu thêm về các triệu chứng đang gặp và gợi ý hướng xử lý để tham khảo.</h3>
        <h4>The AI Doctor assistant helps you learn more about your symptoms and suggests possible courses of action for reference.</h4>
      </div>
    </div>
  );
}

export default Welcome;