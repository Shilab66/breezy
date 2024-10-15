import React from 'react';
import '../styles/Testimonials.css';

const Testimonials = () => {
  return (
    <section className="testimonials">
      <h2>What Experts Are Saying</h2>
      <div className="quotes">
        <div className="quote-card">
          <p>"This app revolutionizes COPD diagnosis. A game-changer!"</p>
          <h4>- Dr. A. Smith, Pulmonologist</h4>
        </div>
        <div className="quote-card">
          <p>"Highly accurate and easy to use, I recommend it to all my patients."</p>
          <h4>- Dr. B. Johnson, Respiratory Specialist</h4>
        </div>
        <div className="quote-card">
          <p>"An essential tool for managing chronic respiratory conditions."</p>
          <h4>- Dr. C. Lee, Healthcare Innovator</h4>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
