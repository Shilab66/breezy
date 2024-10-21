import React, { useState } from 'react';
import { doc, collection, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase.js';
import { useRouter } from 'next/router';
import "../styles/Tinkerman.css"; // Importing the CSS for consistent styling


const CoughSound = {
    NORMAL: 'Normal',
    COPD: 'COPD',
  };
  
  const Symptoms = {
    NONE: { value: 0, label: 'None' },
    MILD: { value: 1, label: 'Mild' },
    SEVERE: { value: 2, label: 'Coughing, wheezing, and shortness of breath' },
    VERY_SEVERE: { value: 3, label: 'Air flow severely limited' },
    EXTREME: { value: 4, label: 'Extremely hard to breathe' },
  };
  
  const COPDGroup = {
    NO_COPD: 'No COPD',
    GROUP_A: 'Group A',
    GROUP_B: 'Group B',
    GROUP_C: 'Group C',
    GROUP_D: 'Group D',
    UNCATEGORIZED: 'Uncategorized',
  };
  

  function determineCOPDGroup(coughSound, symptoms, CATScore, exacerbations, hospitalVisits) {
    if (coughSound === CoughSound.NORMAL) {
      return COPDGroup.NO_COPD;
    } else if (CATScore + symptoms.value <= 11 && exacerbations <= 1 && hospitalVisits === 0) {
      return COPDGroup.GROUP_A;
    } else if (CATScore + symptoms.value >= 12 && exacerbations <= 1 && hospitalVisits === 0) {
      return COPDGroup.GROUP_B;
    } else if (CATScore + symptoms.value <= 11 && exacerbations >= 2 && hospitalVisits >= 0) {
      return COPDGroup.GROUP_C;
    } else if (CATScore + symptoms.value <= 11 && exacerbations >= 1 && hospitalVisits >= 1) {
      return COPDGroup.GROUP_C;
    } else if (CATScore + symptoms.value >= 12 && exacerbations >= 1 && hospitalVisits >= 1) {
      return COPDGroup.GROUP_D;
    } else if (CATScore + symptoms.value >= 12 && exacerbations >= 2 && hospitalVisits >= 0) {
      return COPDGroup.GROUP_D;
    }
    return COPDGroup.UNCATEGORIZED;
  }
  
  

const storeCOPDResult = async (result, group) => {
  const user = auth.currentUser;

  if (user) {
    try {
      const userId = user.uid;
      const userDocRef = doc(db, 'users', userId);
      const date = new Date();
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      const copdResultsRef = collection(userDocRef, 'copdResults');
      const copdResultRef = doc(copdResultsRef, formattedDate);

      await setDoc(copdResultRef, {
        result,           
        group,            
        date: formattedDate, 
      });

    } catch (error) {
      console.error('Error writing to Firestore:', error);
    }
  } else {
    console.error('No authenticated user found');
  }
};

const COPDQuestionnaire = () => {
  const [coughSound, setCoughSound] = useState(CoughSound.NORMAL);
  const [symptoms, setSymptoms] = useState(Symptoms.NONE);
  const [questionScores, setQuestionScores] = useState(Array(8).fill(0));
  const [exacerbations, setExacerbations] = useState(0);
  const [hospitalVisits, setHospitalVisits] = useState(0);
  const [result, setResult] = useState('');

  const router = useRouter();
  const CATScore = questionScores.reduce((a, b) => a + b, 0);

  const handleQuestionChange = (index, value) => {
    const newScores = [...questionScores];
    newScores[index] = parseInt(value, 10);
    setQuestionScores(newScores);
  };

  const handleExacerbationsChange = (e) => {
    setExacerbations(Math.max(0, parseInt(e.target.value, 10) || 0));
  };

  const handleHospitalVisitsChange = (e) => {
    setHospitalVisits(Math.max(0, parseInt(e.target.value, 10) || 0));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const copdData = {
      cough: questionScores[0],  
      phlegm: questionScores[1],  
      chestTightness: questionScores[2],
      breathlessness: questionScores[3],
      activityLimitations: questionScores[4],
      confidenceLeavingHome: questionScores[5],
      sleepQuality: questionScores[6],
      energyLevel: questionScores[7],
      exacerbations,  
      hospitalVisits,  
    };

    console.log("log test")

    const group = determineCOPDGroup(coughSound, symptoms, CATScore, exacerbations, hospitalVisits);

    setResult(`The patient falls into: ${group}`);
    await storeCOPDResult(copdData, group);

    console.log("done await")

    router.push('/results');
  };

  return (
    <div className="questionnaire-container">
      <h2>COPD Health Questionnaire</h2>
      <form className="questionnaire-form" onSubmit={handleSubmit}>
        <div>
          <label>Cough Sound:</label>
          <select value={coughSound} onChange={(e) => setCoughSound(e.target.value)} className="styled-select">
            {Object.values(CoughSound).map((sound) => (
              <option key={sound} value={sound}>{sound}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Symptoms:</label>
          <select
            value={symptoms.label}
            onChange={(e) => setSymptoms(Object.values(Symptoms).find(symptom => symptom.label === e.target.value))}
            className="styled-select"
          >
            {Object.values(Symptoms).map((symptom) => (
              <option key={symptom.value} value={symptom.label}>
                {symptom.label}
              </option>
            ))}
          </select>
        </div>

        {[
          "I never cough / I cough all the time",
          "I have no phlegm in my chest / My chest is full of phlegm",
          "My chest does not feel tight / My chest feels very tight",
          "Not breathless walking up a hill / Very breathless walking up a hill",
          "Not limited in activities / Very limited in activities",
          "Confident leaving home / Not confident leaving home",
          "Sleep soundly / Don't sleep soundly",
          "Lots of energy / No energy at all"
        ].map((question, index) => (
          <div key={index}>
            <label>{question}:</label>
            <select
              value={questionScores[index]}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
              className="styled-select"
            >
              {[0, 1, 2, 3, 4, 5].map((score) => (
                <option key={score} value={score}>{score}</option>
              ))}
            </select>
          </div>
        ))}

        <div>
          <label>Number of Exacerbations:</label>
          <input
            type="number"
            value={exacerbations}
            onChange={handleExacerbationsChange}
            min="0"
            className="styled-input"
          />
        </div>

        <div>
          <label>Number of Hospital Visits:</label>
          <input
            type="number"
            value={hospitalVisits}
            onChange={handleHospitalVisitsChange}
            min="0"
            className="styled-input"
          />
        </div>

        <button className="submit-button" type="submit">Submit</button>
      </form>

      {result && <div className="result-container">{result}</div>}
    </div>
  );
};

export default COPDQuestionnaire;
