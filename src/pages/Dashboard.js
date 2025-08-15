import React, { useState, useEffect } from 'react';
import StatCard from '../components/StatCard';
import Charts from '../components/Charts';
import '../css/Dashboard.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [apiData, setApiData] = useState(null);
  const [chartData, setChartData] = useState({
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Users per Week',
        data: [120, 150, 180, 140],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1
      }
    ]
  });
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/api/person-info/by-month?month=${selectedMonth}&year=${selectedYear}`);
      const data = await response.json();
      console.log('API Response:', data);
      setApiData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setApiData([]);
    }
    setLoading(false);
  };

  // ComponentDidMount equivalent
  useEffect(() => {
    fetchData();
  }, []);

  // ComponentDidUpdate equivalent - when month/year changes
  useEffect(() => {
    if (selectedMonth && selectedYear) {
      fetchData();
    }
  }, [selectedMonth, selectedYear]);

  // Update chart data when apiData changes
  useEffect(() => {
    if (apiData && Array.isArray(apiData) && apiData.length > 0) {
      // Group data by weeks
      const weeklyData = [0, 0, 0, 0];
      apiData.forEach(item => {
        const date = new Date(item.created_datetime);
        const day = date.getDate();
        const weekIndex = Math.min(Math.floor((day - 1) / 7), 3);
        weeklyData[weekIndex] += item.count;
      });
      
      setChartData({
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          {
            label: 'Users per Week',
            data: weeklyData,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.1
          }
        ]
      });
    } else {
      // Fallback data for 4 weeks
      setChartData({
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          {
            label: 'Users per Week',
            data: [85, 95, 110, 75],
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.1
          }
        ]
      });
    }
    console.log(apiData);
    
  }, [apiData]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Monthly Visitors - ${selectedMonth}/${selectedYear}`,
      },
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Analytics Dashboard</h2>
      <p>View health trends and triage statistics.</p>
      
      <div className="chart-controls">
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(parseInt(e.target.value))}>
          {Array.from({length: 12}, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
        <select value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))}>
          {Array.from({length: 5}, (_, i) => (
            <option key={2023 + i} value={2023 + i}>
              {2023 + i}
            </option>
          ))}
        </select>
      </div>

      <div className="chart-container">
        {loading ? (
          <p>Loading...</p>
        ) : chartData ? (
          <Line data={chartData} options={chartOptions} />
        ) : (
          <p>No data available</p>
        )}
      </div>

      <div className="stat-grid">
        <StatCard title="Total Users" value="1,200" />
        <StatCard title="Sales" value="$34,000" />
        <StatCard title="Visitors" value="8,210" />
        <StatCard title="Conversion Rate" value="4.5%" />
      </div>
      <Charts />
    </div>
  );
}

export default Dashboard;