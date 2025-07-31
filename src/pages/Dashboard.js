import React from 'react';
import StatCard from '../components/StatCard';
import Charts from '../components/Charts';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h2>Analytics Dashboard</h2>
      <p>View health trends and triage statistics.</p>
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