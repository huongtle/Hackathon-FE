import React, { useState, useEffect } from 'react';
import StatCard from '../components/StatCard';
import Charts from '../components/Charts';

function Dashboard() {
  const [language, setLanguage] = useState('en');

  const text = {
    vi: {
      title: 'Bảng điều khiển phân tích',
      subtitle: 'Xem xu hướng sức khỏe và thống kê phân loại.',
      totalUsers: 'Tổng người dùng',
      sales: 'Doanh số',
      visitors: 'Lượt truy cập',
      conversionRate: 'Tỷ lệ chuyển đổi'
    },
    en: {
      title: 'Analytics Dashboard',
      subtitle: 'View health trends and triage statistics.',
      totalUsers: 'Total Users',
      sales: 'Sales',
      visitors: 'Visitors',
      conversionRate: 'Conversion Rate'
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

  return (
    <div className="dashboard-container">
      <h2>{text[language].title}</h2>
      <p>{text[language].subtitle}</p>
      <div className="stat-grid">
        <StatCard title={text[language].totalUsers} value="1,200" />
        <StatCard title={text[language].sales} value="$34,000" />
        <StatCard title={text[language].visitors} value="8,210" />
        <StatCard title={text[language].conversionRate} value="4.5%" />
      </div>
      <Charts />
    </div>
  );
}

export default Dashboard;