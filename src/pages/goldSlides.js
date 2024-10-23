import React, { useState } from 'react';
import { useRouter } from 'next/router';
import '../styles/Slideshow.css'; // Ensure this file exists and update styles

const slides = [
  {
    id: 1,
    instruction: 'COPD: Medication',
    description: 'Proper management of prescribed medications is also critical. Adhering to your medication regimen, including the use of inhalers and other treatments, helps control symptoms and prevent exacerbations. Regular consultations with your healthcare provider are important to ensure that your medications are effective and to make any necessary adjustments.',
  },
  {
    id: 2,
    instruction: 'Asthma: Managment Strategies',
    description: 'Self-management strategies, particularly personalized action plans, are also crucial. These plans provide tailored guidelines for symptom monitoring and medication adjustments. For instance, patients with personalized plans that detail when to escalate medication or seek medical help have experienced a 20-30% reduction in hospitalizations and a 15% decrease in emergency visits. Tools such as symptom diaries or digital apps for tracking health status further support patients in managing their condition effectively. Studies have shown that patients using such tracking tools have reduced emergency visits by 15%, underscoring the benefit of continuous self-monitoring.',
  },
  {
    id: 3,
    instruction: 'ACOS: Short-Acting Beta Agonist (SABA)',
    description: 'One common option for quick relief is a B2 Agonist, which is a type of Short-Acting Beta Agonist (SABA) that will provide quick relief for ACOS conditions. Get in touch with your physician/pulmonologist to ask more about specific medications. One common example is albuterol, which is used to treat breathing problems. Another type of medication is a Long-Acting Beta Agonist (LABA), which provides relief for longer. An example of this is formoterol, but you should also get in touch with your physician/pulmonologist to ask more about specific medications.',
  },
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
