import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore'; // Correct Firebase methods for fetching data
import { auth, db } from '../firebase'; // Import Firebase config
import '../styles/Slideshow.css'; // Ensure this file exists and update styles

function TinkermanSlide({ userId }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch diagnosis from Firebase and update slides accordingly
  useEffect(() => {
    const fetchDiagnosis = async () => {
      const user = auth.currentUser;

      if (user) {
        const userId = user.uid;
        const userDocRef = doc(db, 'users', userId);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const diagnosisSlides = generateSlidesForDiagnosis(data.diagnosis);

          // Update slides state and set loading to false
          setSlides(diagnosisSlides);
          setLoading(false);
        } else {
          console.log('No such document!');
        }
      } else {
        console.log('No authenticated user');
        setLoading(false);
      }
    };

    fetchDiagnosis();
  }, [userId]);

  // Function to generate slides based on the diagnosis
  const generateSlidesForDiagnosis = (diagnosis) => {
    switch (diagnosis) {
      case 'Asthma':
        return [
          { id: 1, instruction: 'COPD & Asthma', description: 'The study “Patient Education and Self-management in Chronic Obstructive Pulmonary Disease: A Review” published in the Journal of Cardiopulmonary Rehabilitation and Prevention highlights how specific educational and self-management strategies can significantly improve COPD management. Effective patient education plays a vital role, including comprehensive programs that enhance understanding of COPD and its effects on lung function. For example, patients who receive detailed education about the progression of COPD and the differences between COPD and asthma are better equipped to manage their condition. Instruction on proper medication use, such as inhaler technique, has been shown to increase adherence by 20%, thereby improving symptom control. Additionally, education on recognizing early signs of exacerbations—such as increased breathlessness or changes in mucus color—enables patients to take timely action.' },
          { id: 2, instruction: 'Self Managements Strategies', description: 'Self-management strategies, particularly personalized action plans, are also crucial. These plans provide tailored guidelines for symptom monitoring and medication adjustments. For instance, patients with personalized plans that detail when to escalate medication or seek medical help have experienced a 20-30% reduction in hospitalizations and a 15% decrease in emergency visits. Tools such as symptom diaries or digital apps for tracking health status further support patients in managing their condition effectively. Studies have shown that patients using such tracking tools have reduced emergency visits by 15%, underscoring the benefit of continuous self-monitoring.' },
          { id: 3, instruction: 'Behavioral Strategies', description: 'Behavioral and feedback mechanisms enhance these strategies by offering regular follow-ups and constructive feedback. Regular follow-ups, whether through in-person appointments or telehealth, help patients stay engaged with their treatment plans, resulting in a 10-20% improvement in quality-of-life scores. Feedback on self-management practices, such as symptom tracking and medication adherence, provides patients with actionable insights and reinforces positive behavior changes. For instance, patients who receive regular feedback on their symptom logs tend to have better control over their condition and fewer exacerbations.' },
          { id: 4, instruction: 'Takeaways', description: 'Overall, the integration of comprehensive patient education with tailored self-management strategies and ongoing support empowers COPD patients to actively participate in their care, leading to improved disease management, fewer hospitalizations, and a better quality of life (ScienceDirect, 2024).' },
        ];
      case 'Asthma-COPD Overlap Syndrome (ACOS)':
        return [
          { id: 1, instruction: 'Asthma-COPD Overlap Syndrome (ACOS): Overview', description: 'Asthma-chronic obstructive pulmonary disease (COPD) overlap (ACO) is a term used to describe patients who have symptoms of both asthma and COPD. It\'s not a single disease, but rather a way to categorize patients with a mix of symptoms so that doctors can create a treatment plan. The “Pathogenesis, clinical features of asthma COPD overlap, and therapeutic modalities” highlights treatment options for ACOS. These treatments include different pharmaceuticals and therapeutics.' },
          { id: 2, instruction: 'Medication Strategies', description: 'One common option for quick relief is a B2 Agonist, which is a type of Short-Acting Beta Agonist (SABA) that will provide quick relief for ACOS conditions. Get in touch with your physician/pulmonologist to ask more about specific medications. One common example is albuterol, which is used to treat breathing problems. Another type of medication is a Long-Acting Beta Agonist (LABA), which provides relief for longer. An example of this is formoterol, but you should also get in touch with your physician/pulmonologist to ask more about specific medications.' },
          { id: 3, instruction: 'Behavioral Strategies', description: 'For patients with ACOS, it is recommended to follow asthma therapeutic measures. If you are a smoker, make sure to stop all smoking. Make sure to get an inhaler and be sure to use the proper technique when using your inhaler. An effective measure is to use an Inhaled Corticosteroid (ICS), which is a type of medicine commonly used to treat asthma or other pulmonary conditions. Also consider a combination of an ICS and a LABA for possibly better results. Get in touch with your physician/pulmonologist to ask about specific medications.' },
          { id: 4, instruction: 'Takeaways', description: 'In summary, for immediate relief, Short-Acting Beta Agonists (SABAs) like albuterol are commonly prescribed. For sustained relief, Long-Acting Beta Agonists (LABAs) such as formoterol are effective. Adherence to asthma therapeutic measures, including the use of Inhaled Corticosteroids (ICS) or a combination of ICS and LABA, is crucial. Smoking cessation and proper inhaler technique are also emphasized. Always consult with a physician or pulmonologist to determine the most suitable medications for individual needs. (American Journal of Physiology 22)' },
        ];
      case 'Healthy':
        return [
          { id: 1, instruction: 'Healthy Overview', description: 'We have concluded that you do not have an obstructive cough, therefore, you likely don’t have a pulmonary disease. However, there is still a concern of risk factors leading to a pulmonary disease.' },
          { id: 2, instruction: 'Behavioral Factors', description: 'There are multiple risk factors that could lead you to developing a pulmonary disease. The main risk factor is smoking. If you are a smoker, consider stopping, as this could lead to a pulmonary disease such as COPD, asthma, or Asthma-COPD Overlap Syndrome (ACOS). Especially consider stopping if you are experiencing symptoms of the early stages of a pulmonary disease, such as shortness of breath, or a cough that is producing mucus. Another risk factor is exposure to second-hand smoke, which can have the same effect.' },
          { id: 3, instruction: 'Genetic Factors', description: 'There are also genetic risk factors. The main genetic risk factor for pulmonary diseases is an alpha-1 antitrypsin deficiency. Alpha-1 antitrypsin (AAT) is a protein made in the liver to protect and keep the lungs healthy. With an AAT deficiency, a person’s lungs are more susceptible to damage from smoking, pollution, or dust from the environment, potentially leading to a pulmonary disease (Wiley 18). Another genetic risk factor for pulmonary diseases is elevated levels of plasma fibrinogen. Plasma fibrinogen is a glycoprotein produced in the liver that helps with blood clotting. Elevated levels of plasma fibrinogen can lead to inflammation of the lungs, which increases the risk of a pulmonary disease (NIH 21).' },
          { id: 4, instruction: 'Final Steps', description: 'If you are worried about your risk of developing a pulmonary disease, you can reach out to a pulmonologist, or even your physician.' }
        ];
      case 'Group A':
        return [
          { id: 1, instruction: 'Group A: Overview', description: 'Being in COPD Group A means you are in the COPD group with the least severity. You have mild symptoms and likely have zero, or possibly one, exacerbation(s) per year. You also do not require hospitalization.' },
          { id: 2, instruction: 'Precautions', description: 'Firstly, you should make sure to cease all smoking, look into getting flu and pneumococcal vaccines if you don’t have them already, and try to get regular exercise. Doing these things will help prevent your COPD from getting worse and will improve your overall health.' },
          { id: 3, instruction: 'Short-Acting Beta Agonist (SABA)', description: 'It is recommended that you look into using a Short-Acting Beta Agonist (SABA) that will provide quick relief for COPD conditions. One common example is albuterol, which is used to treat breathing problems. Get in touch with your physician/pulmonologist to ask more about specific medications. Also look into a Short-Acting Muscarinic Antagonist (SAMA) that will help improve lung function and symptoms of COPD. An example of this is Ipratropium, but you should get in touch with your physician/pulmonologist to ask more about specific medications.' },
          { id: 4, instruction: 'Long-Acting Muscarinic Agonists (LAMAs) / Long-Acting Muscarinic Agonists (LAMA)', description: 'If these don’t work well enough for you, you can also look into Long-Acting Beta Agonists (LABAs) and Long-Acting Muscarinic Agonists (LAMA). These are similar medications that will provide more sustained relief. Get in touch with your physician/pulmonologist to ask more about specific medications.' },
          { id: 5, instruction: 'Takeaways', description: 'In summary, to prevent your COPD from worsening and improve your overall health, it is crucial to quit smoking, get flu and pneumococcal vaccines, and engage in regular exercise. For quick relief of COPD symptoms, using a Short-Acting Beta Agonist (SABA), such as albuterol, or a Short-Acting Muscarinic Antagonist (SAMA), like ipratropium, is recommended. If these are insufficient, you may consider Long-Acting Beta Agonists (LABAs) or Long-Acting Muscarinic Antagonists (LAMAs) for more sustained relief. Consult your physician or pulmonologist to determine the best medications for you. While pulmonary rehabilitation programs can be beneficial, they are generally not necessary for individuals in Group A. (NLM 16)' }
        ];
      case 'Group B':
        return [
          { id: 1, instruction: 'Group B: Overview', description: 'Being in COPD Group B means you likely have symptoms such as coughing, wheezing, and shortness of breath and likely have zero, or possibly one, exacerbation(s) per year. You also do not require hospitalization.' },
          { id: 2, instruction: 'Precautions', description: 'Firstly, you should make sure to cease all smoking, look into getting flu and pneumococcal vaccines if you don’t have them already, and try to get regular exercise. Doing these things will help prevent your COPD from getting worse and will improve your overall health. You can also join a pulmonary rehabilitation program, where you will learn exercises and breathing techniques that can improve your condition and prevent your COPD from worsening.' },
          { id: 3, instruction: 'Short-Acting Beta Agonist (SABA)', description: 'It is recommended that you look into using a Short-Acting Beta Agonist (SABA) that will provide quick relief for COPD conditions. Get in touch with your physician/pulmonologist to ask more about specific medications. One common example is albuterol, which is used to treat breathing problems. Also look into a Short-Acting Muscarinic Antagonist (SAMA) that will help improve lung function and symptoms of COPD. An example of this is Ipratropium, but you should get in touch with your physician/pulmonologist to ask more about specific medications.' },
          { id: 4, instruction: 'Long-Acting Beta Agonists (LABAs)/Long-Acting Muscarinic Agonists (LAMA) ', description: 'For this group, medications that are even more effective, and that you should look into, include Long-Acting Beta Agonists (LABAs) and Long-Acting Muscarinic Agonists (LAMA). These are similar medications that will provide more sustained relief. Get in touch with your physician/pulmonologist to ask more about specific medications.' },
          { id: 5, instruction: 'Inhaled Corticosteroid (ICS)', description: 'One more alternative you can look into is an Inhaled Corticosteroid (ICS), which is a type of medicine commonly used to treat COPD or other pulmonary conditions. However, this is not recommended for Group B, and you should only consider these if you have already tried the options listed above and they did not work.' },
          { id: 6, instruction: 'Takeaways', description: 'In summary, to prevent your COPD from worsening and improve your overall health, it is crucial to quit smoking, get flu and pneumococcal vaccines, and engage in regular exercise. You can also benefit from a pulmonary rehabilitation program to learn exercises and breathing techniques. For quick relief of symptoms, consider using a Short-Acting Beta Agonist (SABA) like albuterol or a Short-Acting Muscarinic Antagonist (SAMA) like ipratropium. If these are insufficient, Long-Acting Beta Agonists (LABAs) and Long-Acting Muscarinic Antagonists (LAMAs) can provide more sustained relief. Consult your physician or pulmonologist for the best medication options. While Inhaled Corticosteroids (ICS) can be considered, they are typically not recommended for Group A unless other treatments have been ineffective. (NLM 16)' },
        ];
        case 'Group C':
          return [
            { id: 1, instruction: 'Group C: Overview', description: 'Being in COPD Group C means you likely have symptoms such as coughing, wheezing, shortness of breath, and your airflow is likely severely limited. You also likely have 2 or more exacerbations per year and may require hospitalization.' },
            { id: 2, instruction: 'Precautions', description: 'Firstly, you should make sure to cease all smoking, look into getting flu and pneumococcal vaccines if you don’t have them already. Doing these things will help prevent your COPD from getting worse and will improve your overall health. You should also consider joining a pulmonary rehabilitation program if you haven’t already, where you will learn exercises and breathing techniques that can improve your condition and prevent your COPD from worsening.' },
            { id: 3, instruction: 'Long-Acting Beta Agonists (LABAs) / Long-Acting Muscarinic Agonists (LAMA)', description: 'For this group, medications that are even more effective, and that you should look into, include Long-Acting Beta Agonists (LABAs) and Long-Acting Muscarinic Agonists (LAMA). These are similar medications that will provide more sustained relief. Get in touch with your physician/pulmonologist to ask more about specific medications.' },
            { id: 4, instruction: 'Combined Treatments', description: 'Also look into a combination of a Long-Acting Beta Agonist (LABA) with an Inhaled Corticosteroid (ICS). This is an effective treatment for COPD that many patients in this group use. An example of a LABA is formoterol, which is used to provide sustained relief for COPD. An example of an ICS is ciclesonide, which is used to treat COPD. Get in touch with your physician/pulmonologist to ask more about specific medications. You can also consider using a combination of a LABA and a LAMA, which can also be effective, but is not as common. One final consideration for medication is a triple therapy, which is a combination of a LABA, a LAMA, and an ICS. However, this is not commonly recommended, and should only be tried after trying the options listed above.' },
            { id: 5, instruction: 'Takeaways', description: 'In summary, to prevent your COPD from worsening and improve your overall health, cease smoking, and get flu and pneumococcal vaccines. Joining a pulmonary rehabilitation program can also be beneficial, providing exercises and breathing techniques. For sustained relief, consider using a Long-Acting Muscarinic Antagonist (LAMA) like umeclidinium. Additionally, a combination of a Long-Acting Beta Agonist (LABA) with an Inhaled Corticosteroid (ICS), such as formoterol and ciclesonide, is effective. Consult your physician or pulmonologist about these medications. You can also consider a combination of a LABA and a LAMA, or as a final option, triple therapy with a LABA, LAMA, and ICS, but these should be considered after other treatments.  (NLM 16)' },
          ];
          case 'Group D':
            return [
              { id: 1, instruction: 'Group D: Overview', description: 'Being in COPD Group D means you are in the most severe COPD group. You likely have symptoms such as coughing, wheezing, shortness of breath, your airflow is likely severely limited, and you find it extremely hard to breathe. You also likely have 2 or more exacerbations per year and likely require hospitalization.' },
              { id: 2, instruction: 'Precautions', description: 'Firstly, you should make sure to cease all smoking, look into getting flu and pneumococcal vaccines if you don’t have them already. Doing these things will help prevent your COPD from getting worse and will improve your overall health. You should also consider joining a pulmonary rehabilitation program if you haven’t already, where you will learn exercises and breathing techniques that can improve your condition and prevent your COPD from worsening. Some patients at this stage may even need oxygen therapy if they have chronic respiratory failure, and possibly surgical options at the most extreme stages.' },
              { id: 3, instruction: 'Medication Treatments', description: 'It is recommended that you look into using a Long-Acting Muscarinic Agonists (LAMA) that will provide sustained relief for COPD conditions. One example of this is Umeclidinium, which is used to treat COPD. Get in touch with your physician/pulmonologist to ask more about specific medications. Also look into a combination of a Long-Acting Beta Agonist (LABA) with an Inhaled Corticosteroid (ICS). This is an effective treatment for COPD that many patients in this group use. An example of a LABA is formoterol, which is used to provide sustained relief for COPD. An example of an ICS is ciclesonide, which is used to treat COPD. Get in touch with your physician/pulmonologist to ask more about specific medications. ' },
              { id: 4, instruction: 'PDE4 Inhibitors', description: 'If the above medications aren’t effective enough, the next step would be to use a combination of a LABA, a LAMA, an ICS, and PDE4 inhibitors. PDE4 inhibitors are medications used to reduce inflammation in pulmonary conditions like COPD. It works by increasing the levels of cyclic adenosine monophosphate (cAMP), which in turn reduces inflammation.' },
              { id: 5, instruction: 'Takeaways', description: 'In summary, to prevent your COPD from worsening, cease smoking, and get flu and pneumococcal vaccines. Joining a pulmonary rehabilitation program is highly recommended for learning exercises and breathing techniques. At this stage, some patients may need oxygen therapy or consider surgical options. For sustained relief, consider using a Long-Acting Muscarinic Antagonist (LAMA) like umeclidinium, and discuss with your physician about combining a Long-Acting Beta Agonist (LABA) like formoterol with an Inhaled Corticosteroid (ICS) like ciclesonide. If these treatments are insufficient, a combination therapy including LABA, LAMA, ICS, and PDE4 inhibitors, which reduce inflammation, may be necessary. Always consult your physician or pulmonologist for the best medication options. (NLM 16)' },
            ];
      default:
        return [
          { id: 1, instruction: 'Unknown Diagnosis', description: 'No specific diagnosis found, please consult your physician.' },
        ];
    }
  };

  const nextSlide = () => {
    if (currentSlide === slides.length - 1) {
      router.push('/dashboard'); // Redirect to the questionnaire or dashboard page
    } else {
      setCurrentSlide((prevSlide) => prevSlide + 1);
    }
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  if (loading) {
    return <div>Loading slides...</div>;
  }

  // Check if slides array is populated and currentSlide is within bounds
  if (slides.length === 0 || !slides[currentSlide]) {
    return <div>No slides available.</div>;
  }

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
