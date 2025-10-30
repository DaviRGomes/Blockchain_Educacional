import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Quiz from './Quiz'
import { introQuestions } from '../data/quizIntro'

// Função utilitária para embaralhar array usando algoritmo Fisher-Yates
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array] // Não modifica o array original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function IntroQuiz() {
  const navigate = useNavigate()

  const handleFinish = (score: number, total: number) => {
    const pct = (score / total) * 100
    let level: 'Iniciante' | 'Intermediário' | 'Avançado' = 'Iniciante'
    if (pct >= 70) level = 'Avançado'
    else if (pct >= 40) level = 'Intermediário'

    try {
      localStorage.setItem('initialKnowledgeLevel', level)
      localStorage.setItem('initialScore', String(score))
      localStorage.setItem('initialTotal', String(total))
    } catch {}

    navigate('/modules')
  }

  // Embaralha introQuestions apenas uma vez na montagem e seleciona 10 perguntas aleatórias
  const randomTenQuestions = useMemo(() => {
    const shuffled = shuffleArray(introQuestions)
    return shuffled.slice(0, 10)
  }, [])

  return (
    <div>
      <h2>Quiz Inicial</h2>
      <p>Teste seus conhecimentos antes de iniciar os estudos.</p>
      <Quiz title="Avaliação de Conhecimento" questions={randomTenQuestions} onFinish={handleFinish} />
    </div>
  )
}

export default IntroQuiz