import React from 'react';
import '../styles/Features.css';

const Features = () => {
  return (
    <section className="features">
      <h2>Features</h2>
      <div className="feature-cards">
        <div className="card">Personalized Reports</div>
        <div className="card">Symptom Tracking</div>
        <div className="card">Expert Support</div>
      </div>
    </section>
  );
};

export default Features;
