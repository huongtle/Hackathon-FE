import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const Charts = () => {
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Visitors',
      data: [1200, 1900, 3000, 2500, 3200, 4000],
      fill: false,
      borderColor: 'blue',
      tension: 0.3
    }]
  };

  const barData = {
    labels: ['Product A', 'Product B', 'Product C'],
    datasets: [{
      label: 'Sales ($)',
      data: [12000, 19000, 30000],
      backgroundColor: ['#4caf50', '#2196f3', '#ff9800']
    }]
  };

  return (
    <div className="charts-container">
      <div className="chart-box">
        <h2>Monthly Visitors</h2>
        <Line data={lineData} />
      </div>
      <div className="chart-box">
        <h2>Product Sales</h2>
        <Bar data={barData} />
      </div>
    </div>
  );
};

export default Charts;