import React, { useState } from 'react';
import Calendar from '../components/Calendar';
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [hoveredDay, setHoveredDay] = useState(null);
  const [popupInfo, setPopupInfo] = useState(null);

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
                Object.entries(popupInfo).map(([trait, data]) => (
                  <div key={trait}>
                    <p><strong>{trait}:</strong> {data.label} (Points: {data.points})</p>
                  </div>
                ))
              ) : (
                <p>No data available for this day</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Three buttons at the bottom */}
      <div className="buttons-container">
        <button className="bottom-button">New Cough Upload + Diagnosis Questionnaire</button>
        <button className="bottom-button">Gold Group Assessment</button>
        <button className="bottom-button">Action Plan</button>
      </div>
    </div>
  );
};

export default Dashboard;
