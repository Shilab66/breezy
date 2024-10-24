import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Use Next.js router
import Calendar from '../components/Calendar';
import { doc, getDoc } from 'firebase/firestore'; // Import Firebase methods
import { auth, db } from '../firebase'; // Import Firebase config
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [hoveredDay, setHoveredDay] = useState(null);
  const [popupInfo, setPopupInfo] = useState(null);
  const [userGroup, setUserGroup] = useState(''); // State to hold user's group
  const router = useRouter(); // Hook for navigation in Next.js

  // Function to fetch user's group from Firebase
  useEffect(() => {
    const fetchUserGroup = async () => {
      const user = auth.currentUser;

      if (user) {
        const userId = user.uid;
        const userDocRef = doc(db, 'users', userId);

        try {
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserGroup(data.diagnosis || ''); // Set the group or fallback to 'Unknown Group'
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error("Error fetching document:", error);
        }
      }
    };

    fetchUserGroup();
  }, []);

  // Function to handle button click
  const handleNewUploadClick = () => {
    router.push('/audio'); // Navigate to the audio page
  };

  const handleNewGoldGroup = () => {
    router.push('/gold'); // Navigate to the Gold Group page
  };

  const handleAction = () => {
    router.push('/actionPlan'); // Navigate to the Action Plan page
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
          <h2>Welcome Back</h2>
          <h3>{userGroup}</h3> {/* Display the user's group dynamically */}
          
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
          onClick={handleNewUploadClick}
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
