import React, { useState, useEffect } from 'react';
// import './App.css';
import { QUESTIONS } from './questions';

interface AnswerState {
  [key: number]: boolean;
}

const QuestionnaireApp: React.FC = () => {
  const [responses, setResponses] = useState<AnswerState>({});
  const [currentScore, setCurrentScore] = useState<number | null>(null);
  const [averageScore, setAverageScore] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Load previous scores from localStorage when the app mounts
  useEffect(() => {
    loadScores();
  }, []);

  // Load previous scores from localStorage
  const loadScores = () => {
    const previousScores = JSON.parse(localStorage.getItem('scores') || '[]');
    if (previousScores.length > 0) {
      const avgScore = previousScores.reduce((a: number, b: number) => a + b, 0) / previousScores.length;
      setAverageScore(avgScore);
    }
  };

  // Save the current score to localStorage
  const saveScore = (score: number) => {
    const previousScores = JSON.parse(localStorage.getItem('scores') || '[]');
    const newScores = [...previousScores, score];
    localStorage.setItem('scores', JSON.stringify(newScores));
  };

  // Calculate the score based on yes answers
  const calculateScore = () => {
    const yesResponses = Object.values(responses).filter((response) => response).length;
    const totalQuestions = Object.keys(QUESTIONS).length;
    const score = (yesResponses / totalQuestions) * 100;
    setCurrentScore(score);
    saveScore(score);
    const newScores = JSON.parse(localStorage.getItem('scores') || '[]');
    const avgScore = newScores.reduce((a: number, b: number) => a + b, 0) / newScores.length;
    setAverageScore(avgScore);
    setIsSubmitted(true);
  };

  // Handle yes/no answer selection
  const handleResponse = (questionId: number, answer: boolean) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: answer,
    }));
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Questions for Coding</h1>
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {Object.entries(QUESTIONS).map(([id, question]) => (
          <li key={id} style={{ margin: '15px 0', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#fff' }}>
            <p style={{ margin: '0 0 10px', color: '#555' }}>{question}</p>
            <button 
              onClick={() => handleResponse(Number(id), true)} 
              style={{ marginRight: '10px', padding: '10px 15px', backgroundColor: responses[Number(id)] === true ? '#4caf50' : '#e7e7e7', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }} 
              disabled={isSubmitted}
            >
              Yes
            </button>
            <button 
              onClick={() => handleResponse(Number(id), false)} 
              style={{ padding: '10px 15px', backgroundColor: responses[Number(id)] === false ? '#f44336' : '#e7e7e7', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }} 
              disabled={isSubmitted}
            >
              No
            </button>
          </li>
        ))}
      </ul>
      <button 
        onClick={calculateScore} 
        style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#2196F3', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }} 
        disabled={isSubmitted}
      >
        Submit
      </button>
      {currentScore !== null && <p style={{ fontSize: '18px', color: '#333', marginTop: '20px' }}>Your Score: {currentScore.toFixed(2)}%</p>}
      {averageScore !== null && <p style={{ fontSize: '16px', color: '#555' }}>Average Score for All Runs: {averageScore.toFixed(2)}%</p>}
      <p style={{ fontSize: '16px', color: 'red' }}> Developed by Nisarg Dongare ;-)</p>
    </div>
  );
};

export default QuestionnaireApp;
