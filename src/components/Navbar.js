import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

function Navbar() {
  const [language, setLanguage] = useState('en');

  const text = {
    vi: {
      logo: 'MedQ - Trợ lý AI Doctor'
    },
    en: {
      logo: 'MedQ - AI Doctor Assistant'
    }
  };

  useEffect(() => {
    const savedLanguage = sessionStorage.getItem('selectedLanguage') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    sessionStorage.setItem('selectedLanguage', lang);
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
  };

  return (
    <nav className="navbar">
      <div className="logo">{text[language].logo}</div>
      <div className="nav-right">
        <div className="nav-links">WebMedi Team</div>
        <div className="language-toggle">
          <button 
            className={language === 'vi' ? 'active' : ''}
            onClick={() => handleLanguageChange('vi')}
          >
            VI
          </button>
          <span>|</span>
          <button 
            className={language === 'en' ? 'active' : ''}
            onClick={() => handleLanguageChange('en')}
          >
            EN
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;