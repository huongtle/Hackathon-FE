import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Welcome from './pages/Welcome';
import Triage from './pages/Triage';
import Dashboard from './pages/Dashboard';
import PersonalInfo from './pages/PersonalInfo';
import ThankYou from './pages/ThankYou';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/triage" element={<Triage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/info" element={<PersonalInfo />} />
          <Route path="/thankyou" element={<ThankYou />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;