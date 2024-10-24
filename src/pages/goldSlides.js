import React, { useState } from 'react';
import { useRouter } from 'next/router';
import '../styles/Slideshow.css'; // Ensure this file exists and update styles

const slides = [
  {
    id: 1,
    instruction: "COPD Detected",
    description: "Based on the Tinker Man analysis and cough sound, COPD has been detected."
  },
  {
    id: 2,
    instruction: "Introduction to the GOLD Group Assessment",
    description: "You will now be asked to take this COPD prognosis questionnaire known as the GOLD Group Assessment. This questionnaire differentiates the severity of COPD patients based on their number of hospital visits, number of exacerbations, and severity of symptoms."
  },
  {
    id: 3,
    instruction: "Understanding the GOLD Groups",
    description: (
      <>
        Our GOLD groups assessment will separate you into 4 GOLD groups ranging from A-D, where each group category represents the level of concern with A being the least severe and D being the most severe group. If you would like to learn more about how the GOLD Group Assessment works and what it represents, please visit the
        <a href="https://goldcopd.org/wp-content/uploads/2024/02/POCKET-GUIDE-GOLD-2024-ver-1.2-11Jan2024_WMV.pdf" target="_blank" rel="noopener noreferrer"> 2024 GOLD Pocket Guide.</a>.
      </>
    )
  }
];

function TinkermanSlide() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter(); // Hook for navigating

  const nextSlide = () => {
    if (currentSlide === slides.length - 1) {
      router.push('/gold'); // Redirect to the questionnaire page
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
              <p>{typeof slides[currentSlide].description === 'string' 
                  ? slides[currentSlide].description 
                  : slides[currentSlide].description}</p>
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
