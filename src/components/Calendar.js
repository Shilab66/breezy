import React, { useState } from 'react';
import '../styles/Calendar.css'; // Updated CSS file

const traitsData = {
    1: {
        Cough: { label: 'Intermittent and Worse at Night/Early Morning', points: 2, color: 'darkgreen' },
        ShortnessOfBreath: { label: 'Episodic, Triggered by Specific Stimuli', points: 2, color: 'darkgreen' },
        Wheezing: { label: 'Common, Improved with Inhalers', points: 2, color: 'darkgreen' },
        SputumProduction: { label: 'Less Frequent', points: 2, color: 'darkgreen' },
        SymptomVariation: { label: 'Significant Variation Over Time', points: 2, color: 'darkgreen' }
    },
    2: {
        Cough: { label: 'Persistent and Productive', points: 1, color: 'lightgreen' },
        ShortnessOfBreath: { label: 'Progressive, Related to Activity Levels', points: 1, color: 'lightgreen' },
        Wheezing: { label: 'Less Common or Not Responsive to Inhalers', points: 1, color: 'lightgreen' },
        SputumProduction: { label: 'Regular and Productive', points: 1, color: 'lightgreen' },
        SymptomVariation: { label: 'Less Variation, Progressive Symptoms', points: 1, color: 'lightgreen' }
    },
    3: {}, // No data for day 3
};

const Calendar = ({ setHoveredDay, setPopupInfo }) => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

    const getDayInfo = (day) => {
        return traitsData[day] || {}; // Return info for the day, or empty if no data
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
