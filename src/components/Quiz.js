import React, { useState } from 'react';
import './quiz.css';

const Quiz = ({ questions }) => {
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [feedback, setFeedback] = useState({});

  const handleOptionChange = (event, index) => {
    const { value } = event.target;
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [index]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let newScore = 0;
    const newFeedback = {};

    questions.forEach((q, index) => {
      const selectedOption = selectedOptions[index];
      if (selectedOption === q.answer) {
        newScore += 1;
        newFeedback[index] = 'correcta';
      } else {
        newFeedback[index] = 'incorrecta';
      }
    });

    setScore(newScore);
    setFeedback(newFeedback);
    setAnswered(true);
  };

  return (
    <div>
      <h2>Test de conocimientos</h2>
      {!answered ? (
        <form onSubmit={handleSubmit}>
          {questions && questions.map((q, index) => (
            <div key={index}>
              <h3><b>Pregunta {index + 1}</b></h3>
              <h4 className='option'>{q.question}</h4>
              {q.options.map((option) => (
                <div key={option}>
                  <input
                    type="radio"
                    id={`question-${index}-${option}`}
                    name={`question-${index}`}
                  
                    value={option}
                    onChange={(event) => handleOptionChange(event, index)}
                    required
                  />
                  <label htmlFor={`question-${index}-${option}`}>{option}</label>
                </div>
              ))}
            </div>
          ))}
          <button type="submit" className='quiz-button mt-4'>Corregir</button>
        </form>
      ) : (
        <div>
          <p>Tu puntuación es: {score}/{questions.length}</p>
          {questions.map((q, index) => (
            <div key={index}>
              <h3><b>Pregunta {index + 1}</b></h3>
              <h4>{q.question}</h4>
              <p>Tu respuesta: {selectedOptions[index]}</p>
              <p className='correct'>
                Esta respuesta es: {feedback[index]}
              </p>
              {feedback[index]}
              {feedback[index] === 'incorrecta' && (
                
                <p className='incorrect'>La respuesta correcta es: {q.answer}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Quiz;
