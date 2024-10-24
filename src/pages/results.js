import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import { auth, db } from '../firebase'; // Import Firebase config
import { useRouter } from 'next/router';
import '../styles/Results.css';

const ResultsPage = () => {
  const [diagnosis, setDiagnosis] = useState('');
  const router = useRouter(); // Hook for navigating

  useEffect(() => {
    const fetchDiagnosis = async () => {
      const user = auth.currentUser;

      if (user) {
        const userId = user.uid;
        const userDocRef = doc(db, 'users', userId);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const result = data.diagnosis || 'Healthy'; // Default to Healthy if no result
          setDiagnosis(result);
        } else {
          console.log('No such document!');
        }
      } else {
        console.log('No authenticated user');
      }
    };

    fetchDiagnosis();
  }, []);

  const handleRedirectToDashboard = () => {
    router.push('/dashboard');
  };

  const handleRedirectToActionPlan = () => {
    router.push('/actionPlan');
  };

  return (
    <div className="slideshow-container">
      <div className="slideshow">
        <h2 className="slideshow-header">Results</h2>
        <div className="slide">
          <div className="content">
            <div className="text">
              <h3>Congratulations!</h3>
              {/* Display the fetched diagnosis */}
              <p>Your results have been calculated. You have been classified as: <strong>{diagnosis}</strong>.</p>
            </div>
          </div>
          <div className="button-container">
            <button 
              type="button" 
              className="signup-btn" 
              onClick={handleRedirectToDashboard}>
              Go to Dashboard
            </button>
            <button 
              type="button" 
              className="login-btn" 
              onClick={handleRedirectToActionPlan}>
              Go to Action Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
