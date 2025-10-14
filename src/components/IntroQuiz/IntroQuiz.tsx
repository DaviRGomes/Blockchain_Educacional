import React from 'react';
import { useNavigate } from 'react-router-dom';
import Quiz from '../Quiz';
import { hashQuestions, blockQuestions, blockchainQuestions } from '../../data/quizData';
import styles from './IntroQuiz.module.css';

function IntroQuiz() {
  const navigate = useNavigate();

  const introQuestions = [
    ...hashQuestions,
    ...blockQuestions,
    ...blockchainQuestions,
  ];

  const handleFinish = (score: number, total: number) => {
    const pct = (score / total) * 100;
    let level: 'Iniciante' | 'Intermediário' | 'Avançado' = 'Iniciante';
    if (pct >= 70) level = 'Avançado';
    else if (pct >= 40) level = 'Intermediário';

    try {
      localStorage.setItem('initialKnowledgeLevel', level);
      localStorage.setItem('initialScore', String(score));
      localStorage.setItem('initialTotal', String(total));
    } catch {}

    navigate('/modules');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Quiz Inicial</h2>
      <p className={styles.subtitle}>
        Responda o quiz e siga para os estudos. O resultado será usado depois para comparação.
      </p>
      <div className={styles.quizBox}>
        <Quiz
          title="Avaliação de Conhecimento"
          questions={introQuestions}
          onFinish={handleFinish}
        />
      </div>
    </div>
  );
}

export default IntroQuiz;
