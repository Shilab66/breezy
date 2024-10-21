import React, { useState } from 'react';
import { useRouter } from 'next/router'; // Use Next.js router
import Calendar from '../components/Calendar';
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [hoveredDay, setHoveredDay] = useState(null);
  const [popupInfo, setPopupInfo] = useState(null);
  const router = useRouter(); // Hook for navigation in Next.js

  // Function to handle button click
  const handleNewUploadClick = () => {
    router.push('/tinkermanSlide'); // Navigate to the slideshow page
  };

  // Function to handle button click
  const handleNewGoldGroup = () => {
    router.push('/gold'); // Navigate to the slideshow page
  };

  // Function to handle button click
  const handleAction = () => {
    router.push('/actionPlan'); // Navigate to the slideshow page
  };

  return (
    <div className="dashboard-container">
      {/* Calendar section with rounded box background */}
      <div className="calendar-group-container">
        <div className="calendar-container-with-bg">
          <Calendar 
            setHoveredDay={setHoveredDay} 
            setPopupInfo={setPopupInfo} 
          />
        </div>
        {/* Group title next to the calendar */}
        <div className="group-title">
          <h2>Welcome Back (name)</h2>
          <h3>Group A</h3>
          
          {/* Pop-up info positioned below the title */}
          {hoveredDay && popupInfo && (
            <div className="popup">
              <h4>Day {hoveredDay} Info</h4>
              {Object.keys(popupInfo).length > 0 ? (
                <p dangerouslySetInnerHTML={{ __html: popupInfo.replace(/\n/g, '<br />') }} />
              ) : (
                <p>No data available for this day</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Three buttons at the bottom */}
      <div className="buttons-container">
        <button 
          className="bottom-button" 
          onClick={handleNewUploadClick} // Handle click to navigate to slideshow
        >
          New Cough Upload + Diagnosis Questionnaire
        </button>
        <button 
          className="bottom-button"
          onClick={handleNewGoldGroup}
        >Gold Group Assessment</button>
        <button 
        className="bottom-button"
        onClick={handleAction}
        >Action Plan</button>
      </div>
    </div>
  );
};

export default Dashboard;
