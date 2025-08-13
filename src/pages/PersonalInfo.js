import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/PersonalInfo.css';

function PersonalInfo() {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [language, setLanguage] = useState('en');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const selectedLanguage = sessionStorage.getItem('selectedLanguage') || 'en';
    setLanguage(selectedLanguage);

    const handleLanguageChange = (event) => {
      const newLanguage = sessionStorage.getItem('selectedLanguage') || 'en';
      setLanguage(newLanguage);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  const handleNext = () => {
    const newErrors = {};
    if (!gender) newErrors.gender = true;
    if (!age) newErrors.age = true;
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      sessionStorage.setItem('userGender', gender);
      sessionStorage.setItem('userAge', age);
      navigate('/triage');
    }
  };

  const handleExit = () => {
    navigate('/');
  };

  const text = {
    vi: {
      title: 'Thông tin cá nhân',
      gender: 'Giới tính:',
      age: 'Tuổi:',
      male: 'Nam',
      female: 'Nữ',
      other: 'Khác',
      next: 'Tiếp theo',
      exit: 'Thoát',
      genderRequired: 'Vui lòng chọn giới tính',
      ageRequired: 'Vui lòng nhập tuổi'
    },
    en: {
      title: 'Personal Information',
      gender: 'Gender:',
      age: 'Age:',
      male: 'Male',
      female: 'Female',
      other: 'Other',
      next: 'Next',
      exit: 'Exit',
      genderRequired: 'Please select gender',
      ageRequired: 'Please enter age'
    }
  };

  return (
    <div className="personal-info-container">
      <div className="personal-info-content">
        <h2>{text[language].title}</h2>
        <form>
          <div className="form-group">
            <label>{text[language].gender} <span className="required">*</span></label>
            <select 
              value={gender} 
              onChange={(e) => setGender(e.target.value)} 
              className={errors.gender ? 'error' : ''}
              required
            >
              <option value=""></option>
              <option value="male">{text[language].male}</option>
              <option value="female">{text[language].female}</option>
              <option value="other">{text[language].other}</option>
            </select>
            {errors.gender && <span className="error-message">{text[language].genderRequired}</span>}
          </div>
          <div className="form-group">
            <label>{text[language].age} <span className="required">*</span></label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              min="1"
              max="120"
              className={errors.age ? 'error' : ''}
              required
            />
            {errors.age && <span className="error-message">{text[language].ageRequired}</span>}
          </div>
          <div className="button-group">
            <button type="button" onClick={handleNext} className="btn-next">{text[language].next}</button>
            <button type="button" onClick={handleExit} className="btn-exit">{text[language].exit}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PersonalInfo;