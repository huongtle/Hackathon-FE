import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Results.css';

function Results() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const selectedLanguage = sessionStorage.getItem('selectedLanguage') || 'en';
    setLanguage(selectedLanguage);
    
    getResultData();
  }, []);

  const text = {
    vi: {
      title: 'Kết quả phân loại',
      possibleConditions: 'Tình trạng có thể:',
      source: 'Nguồn:',
      sourceLink: 'Liên kết nguồn:',
      severityLevel: 'Mức độ nghiêm trọng:',
      recommendedAction: 'Hành động được khuyến nghị:',
      severity: 'Nặng',
      action: 'Đến bệnh viện ngay lập tức',
      noData: 'Thông tin của bạn chưa đủ để phân tích, vui lòng thử lại',
      complete: 'hoàn thành',
      disclaimer: '⚠️ Đây không phải lời khuyên y tế chuyên nghiệp. Luôn tham khảo ý kiến bác sĩ để chẩn đoán và điều trị đúng cách.'
    },
    en: {
      title: 'Diagnosis Results',
      possibleConditions: 'Possible Conditions:',
      source: 'Source:',
      sourceLink: 'Source Link:',
      severityLevel: 'Severity Level:',
      recommendedAction: 'Recommended Action:',
      severity: 'Severe',
      action: 'Go to hospital immediately',
      noData: 'Your information is not sufficient for analysis, please try again',
      complete: 'Complete',
      disclaimer: '⚠️ This is not a substitute for professional medical advice. Always consult healthcare providers for proper diagnosis and treatment.'
    }
  };

  const getResultData = () => {
    const savedResults = sessionStorage.getItem('results');
    if (savedResults && savedResults !== '[object Object]') {
      try {
        const analyzeResult = JSON.parse(savedResults);
        return {
          possibleConditions: analyzeResult.result || 'N/A',
          source: analyzeResult.source || 'N/A',
          sourceLink: analyzeResult.sourceLink || 'N/A',
          severityLevel: analyzeResult.risk || 'N/A',
          recommendedAction: analyzeResult.advice || 'N/A'
        };
      } catch (error) {
        console.error('Error parsing results:', error);
      }
    }
    return null;
  };

  const getSeverityClass = (severity) => {
    const level = severity?.toLowerCase();
    if (level === 'critical' || level === 'urgent' || level === 'high' || level === 'severe' || level === 'nặng') return 'severity-high';
    if (level === 'moderate' || level === 'medium' || level === 'vừa') return 'severity-medium';
    if (level === 'mild' || level === 'low' || level === 'nhẹ') return 'severity-low';
    return 'severity-default';
  };

  const handleComplete = () => {
    sessionStorage.removeItem('chatHistory');
    navigate('/triage');
  };

  const resultData = getResultData();

  if (!resultData) {
    return (
      <div className="results-container">
        <div className="results-content">
          <div className="results-header">
            <h2>{text[language].title}</h2>
            <button onClick={handleComplete} className="complete-btn">
              {text[language].complete}
            </button>
          </div>
          <div className="results-card">
            <div className="no-data-message">
              {text[language].noData}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="results-container">
      <div className="results-content">

        <div className="results-card">
          <div className="result-item">
            <span className="result-label">{text[language].possibleConditions}</span>
            <span className="result-value">{resultData.possibleConditions}</span>
          </div>
          <div className="result-item">
            <span className="result-label">{text[language].source}</span>
            <span className="result-value">{resultData.source}</span>
          </div>
          <div className="result-item">
            <span className="result-label">{text[language].sourceLink}</span>
            <span className="result-value links">
              {resultData.sourceLink.split(', ').map((link, index) => (
                <a key={index} href={link} target="_blank" rel="noopener noreferrer">
                  {link}
                </a>
              ))}
            </span>
          </div>
          <div className="result-item">
            <span className="result-label">{text[language].severityLevel}</span>
            <span className={`result-value ${getSeverityClass(resultData.severityLevel)}`}>{resultData.severityLevel}</span>
          </div>
          <div className="result-item">
            <span className="result-label">{text[language].recommendedAction}</span>
            <span className={`result-value action-${getSeverityClass(resultData.severityLevel).replace('severity-', '')}`}>{resultData.recommendedAction}</span>
          </div>
          <div className="disclaimer-section">
            <span className="disclaimer-text">{text[language].disclaimer}</span>
          </div>
        </div>
        <div className="results-header">
          <button onClick={handleComplete} className="complete-btn">
            {text[language].complete}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Results;