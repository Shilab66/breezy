import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase'; // Assuming firebase is initialized here
import { collection, doc, onSnapshot } from 'firebase/firestore';
import '../styles/Calendar.css'; // Updated CSS file

const Calendar = ({ setHoveredDay, setPopupInfo }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [copdResults, setCopdResults] = useState({}); // Store results for each day

  useEffect(() => {
    const user = auth.currentUser;
    
    if (user) {
      const userId = user.uid;
      const userDocRef = doc(db, 'users', userId);
      const copdResultsRef = collection(userDocRef, 'copdResults');
      
      const unsubscribe = onSnapshot(copdResultsRef, (snapshot) => {
        const results = {};
        snapshot.forEach((doc) => {
          const data1 = doc.data();
          const date = doc.id; // Date is used as the document ID
          results[date] = data1.result; // Store result for each date
        });
        setCopdResults(results); // Update the state with results
      });

      // Clean up the listener when component unmounts
      return () => unsubscribe();
    }
  }, []);

  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

  const getDayInfo = (day) => {
    var popupDisplay = "";
    const formattedDate = `${selectedYear}-${(selectedMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    const results = copdResults[formattedDate];


    if(results != undefined){
      popupDisplay += "Activity limitations : " + results["activityLimitations"] + "\nBreathlessness : " + results["breathlessness"] + "\nChest Tightness : " + results["chestTightness"] + "\nConfidence Leaving Home : " + results["confidenceLeavingHome"] + "\nCough : " + results["cough"] + "\nEnergy Level : " + results["energyLevel"] + "\nExacerbations : " + results["exacerbations"] + "\nHospital Visits : " + results["hospitalVisits"] + "\nPhlegm : " + results["phlegm"] + "\nSleep Quality : " + results["sleepQuality"];
    }

    console.log(popupDisplay);
    return popupDisplay || {}; // Return the data for the day or an empty object
  };

  const renderDays = () => {
    const daysArray = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const dayInfo = getDayInfo(day);

      daysArray.push(
        <div
          key={day}
          className="calendar-day"
          onMouseEnter={() => {
            setHoveredDay(day);
            setPopupInfo(dayInfo); // Set info for the day
          }}
          onMouseLeave={() => {
            setHoveredDay(null);
            setPopupInfo(null); // Clear pop-up info
          }}
        >
          {day}
        </div>
      );
    }
    return daysArray;
  };

  return (
    <div>
      {/* Month & Year Selector */}
      <div className="selectors">
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(parseInt(e.target.value))}>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
          ))}
        </select>

        <select value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))}>
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i} value={2020 + i}>{2020 + i}</option>
          ))}
        </select>
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid">
        {renderDays()}
      </div>
    </div>
  );
};

export default Calendar;
