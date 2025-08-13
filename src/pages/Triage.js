import React, { useEffect, useState } from 'react';
import '../css/Triage.css';
import ChatPage from '../components/Chat';
import { SeverityService } from '../services/severity.service';

function Triage() {
  const [symptoms, setSymptoms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
  //   async function fetchSymptoms() {
  //     setLoading(true);
  //     const response = await SeverityService.getSymptoms();
  //     if (response.success) {
  //       setSymptoms(response.data);
  //       setHasError(false);
  //     } else {
  //       setHasError(true);
  //     }
  //     setLoading(false);
  //   }

  //   fetchSymptoms();
 }, []);

  // if (loading) return <p>Loading symptoms...</p>;
  // if (hasError) return <p>Error fetching symptoms.</p>;

  return (
    <div className="triage-content">
      <ChatPage />
    </div>
  );
}

export default Triage;