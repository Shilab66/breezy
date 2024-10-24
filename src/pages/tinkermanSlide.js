import React, { useState } from 'react';
import { useRouter } from 'next/router';
import '../styles/Slideshow.css'; // Ensure this file exists and update styles

const slides = [
  {
    id: 1,
    instruction: 'Obstruction Detected',
    description: 'An obstruction was detected based on the analysis. Please proceed to learn more.',
  },
  {
    id: 2,
    instruction: 'Diagnosis Questionnaire',
    description: 'In the next page, you will be asked to take a diagnosis questionnaire that will ask about your patient history and symptom characteristics. Based on each question, you will be asked to select choices through drop-down menu options.',
  },
  {
    id: 3,
    instruction: 'Cough and Questionnaire Results',
    description: 'Through the cough sound and diagnosis questionnaire it will be determined whether you are healthy, have COPD, or other obstructive-asthma related diseases. For further information on the diagnosis questionnaire used and how it works, please visit this study: https://research.rug.nl/en/publications/symptom-based-questionnaire-for-differentiating-copd-and-asthma',
  },
];

function TinkermanSlide() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter(); // Hook for navigating

  const nextSlide = () => {
    if (currentSlide === slides.length - 1) {
      router.push('/tinkerman'); // Redirect to the questionnaire page
    } else {
      setCurrentSlide((prevSlide) => prevSlide + 1);
    }
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  return (
    <div className="slideshow-container">
      <div className="slideshow">
        <h2 className="slideshow-header">Tinkerman + Cough Sound Results</h2>
        <div key={slides[currentSlide].id} className="slide">
          <div className="content">
            <div className="text">
              <h3>{slides[currentSlide].instruction}</h3>
              <p>{slides[currentSlide].description}</p>
            </div>
          </div>
          <div className="controls">
            <button onClick={prevSlide} className="button">&lt;</button>
            <button onClick={nextSlide} className="button">&gt;</button>
          </div>
          <div className="dots">
            {slides.map((_, index) => (
              <span
                key={index}
                className={index === currentSlide ? 'dot active-dot' : 'dot'}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TinkermanSlide;