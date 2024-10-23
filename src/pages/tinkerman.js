import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router'; // Import the router
import { auth, db } from '../firebase.js';
import "../styles/Tinkerman.css";

const storeTinkerManResult = async (result) => {
  const user = auth.currentUser;

  if (user) {
    const userId = user.uid;
    const userDocRef = doc(db, 'users', userId);

    await setDoc(userDocRef, {
      tinkerManResult: result,
      lastUpdated: new Date().toISOString(),
    }, { merge: true });
  } else {
    console.log('No authenticated user found');
  }
};

const HealthQuestionnaire = () => {
  const [ageOnset, setAgeOnset] = useState(0);
  const [smokingHistory, setSmokingHistory] = useState(0);
  const [familyHistory, setFamilyHistory] = useState(0);
  const [cough, setCough] = useState(0);
  const [shortnessBreath, setShortnessBreath] = useState(0);
  const [wheezing, setWheezing] = useState(0);
  const [sputumProduction, setSputumProduction] = useState(0);
  const [symptomVariation, setSymptomVariation] = useState(0);
  const [result, setResult] = useState('');

  const router = useRouter(); // Initialize the router

  const handleSubmit = async (e) => {
    e.preventDefault();

    const totalScore =
      ageOnset + smokingHistory + familyHistory + cough + shortnessBreath + wheezing + sputumProduction + symptomVariation;

    let diagnosis = 'Healthy';
    if (totalScore >= 10) diagnosis = 'Asthma-COPD Overlap Syndrome (ACOS)';
    else if (totalScore >= 4) diagnosis = 'COPD';

    await storeTinkerManResult(diagnosis);

    // Redirect to the next page (e.g., '/results' or a different route)
    router.push('/goldSlides');  // Replace '/results' with your actual route
  };

  return (
    <div className="questionnaire-container">
      <h2>Tinkerman Questionaire</h2>
      <form className="questionnaire-form" onSubmit={handleSubmit}>
        
        {/* Age of Onset */}
        <div>
          <label>Age of Onset:</label>
          <select value={ageOnset} onChange={(e) => setAgeOnset(parseInt(e.target.value))}>
            <option value={0}>Neither</option>
            <option value={1}>Middle Age or Older</option>
            <option value={2}>Childhood or Young Adult</option>
          </select>
        </div>

        {/* Smoking History */}
        <div>
          <label>Smoking History:</label>
          <select value={smokingHistory} onChange={(e) => setSmokingHistory(parseInt(e.target.value))}>
            <option value={0}>No Significant Smoking History</option>
            <option value={1}>Significant Smoking History</option>
          </select>
        </div>

        {/* Family History */}
        <div>
          <label>Family History:</label>
          <select value={familyHistory} onChange={(e) => setFamilyHistory(parseInt(e.target.value))}>
            <option value={0}>No </option>
            <option value={2}>Yes </option>
          </select>
        </div>

        {/* Cough */}
        <div>
          <label>Cough:</label>
          <select value={cough} onChange={(e) => setCough(parseInt(e.target.value))}>
            <option value={0}>None or Rarely</option>
            <option value={1}>Persistent and Productive </option>
            <option value={2}>Intermittent and Worse at Night/Early Morning </option>
          </select>
        </div>

        {/* Shortness of Breath */}
        <div>
          <label>Shortness of Breath:</label>
          <select value={shortnessBreath} onChange={(e) => setShortnessBreath(parseInt(e.target.value))}>
            <option value={0}>None or Mild</option>
            <option value={1}>Progressive, Related to Activity Levels</option>
            <option value={2}>Episodic, Triggered by Specific Stimuli</option>
          </select>
        </div>

        {/* Wheezing */}
        <div>
          <label>Wheezing:</label>
          <select value={wheezing} onChange={(e) => setWheezing(parseInt(e.target.value))}>
            <option value={0}>None or Rarely</option>
            <option value={1}>Less Common or Not Responsive to Inhalers</option>
            <option value={2}>Common, Improved with Inhalers</option>
          </select>
        </div>

        {/* Sputum Production */}
        <div>
          <label>Sputum Production:</label>
          <select value={sputumProduction} onChange={(e) => setSputumProduction(parseInt(e.target.value))}>
            <option value={0}>None or Rarely </option>
            <option value={1}>Regular and Productive</option>
            <option value={2}>Less Frequent</option>
          </select>
        </div>

        {/* Symptom Variation */}
        <div>
          <label>Symptom Variation:</label>
          <select value={symptomVariation} onChange={(e) => setSymptomVariation(parseInt(e.target.value))}>
            <option value={0}>Stable or No Symptoms</option>
            <option value={1}>Less Variation, Progressive Symptoms</option>
            <option value={2}>Significant Variation Over Time </option>
          </select>
        </div>

        <button className="submit-button" type="submit">Submit</button>
      </form>
      {result && <div className="result-container">{result}</div>}
    </div>
  );
};

export default HealthQuestionnaire;
