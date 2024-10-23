import React from 'react';
import { useRouter } from 'next/router';
import '../styles/Results.css'; // Ensure this file exists and update styles

const ResultsPage = () => {
  const router = useRouter(); // Hook for navigating

  const handleRedirectToDashboard = () => {
    router.push('/dashboard'); // Redirect to dashboard
  };

  const handleRedirectToActionPlan = () => {
    router.push('/actionPlan'); // Redirect to action plan
  };

  return (
    <div className="slideshow-container">
      <div className="slideshow">
        <h2 className="slideshow-header">Results</h2>
        <div className="slide">
          <div className="content">
            <div className="text">
              <h3>Congratulations!</h3>
              <p>Your results have been calculated. You have been classified as Group D.</p>
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
