import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Quiz from './Quiz'
import { hashQuestions, blockQuestions, blockchainQuestions } from '../data/quizData'

type Result = {
  score: number
  total: number
  level: 'Iniciante' | 'Intermediário' | 'Avançado'
}

function IntroQuiz() {
  const navigate = useNavigate()

  const introQuestions = [
    ...hashQuestions,
    ...blockQuestions,
    ...blockchainQuestions
  ]

  const handleFinish = (score: number, total: number) => {
    const pct = (score / total) * 100
    let level: Result['level'] = 'Iniciante'
    if (pct >= 70) level = 'Avançado'
    else if (pct >= 40) level = 'Intermediário'

    try {
      localStorage.setItem('initialKnowledgeLevel', level)
      localStorage.setItem('initialScore', String(score))
      localStorage.setItem('initialTotal', String(total))
    } catch {}

    navigate('/modules')
  }

  return (
    <div>
      <h2>Quiz Inicial</h2>
      <p>Responda o quiz e siga para os estudos. O resultado será usado depois para comparação.</p>
      <Quiz title="Avaliação de Conhecimento" questions={introQuestions} onFinish={handleFinish} />
    </div>
  )
}

export default IntroQuiz