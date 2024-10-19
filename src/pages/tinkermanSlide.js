import React, { useState } from 'react';
import { useRouter } from 'next/router';
import '../styles/Slideshow.css'; // Ensure this file exists and update styles

const slides = [
  {
    id: 1,
    instruction: 'Step 1: Insert Instruction',
    description: 'More text about what to do in step 1',
  },
  {
    id: 2,
    instruction: 'Step 2: Insert Instruction',
    description: 'More text about what to do in step 2',
  },
  {
    id: 3,
    instruction: 'Step 3: Insert Instruction',
    description: 'More text about what to do in step 3',
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
        <h2 className="slideshow-header">Directions</h2>
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
