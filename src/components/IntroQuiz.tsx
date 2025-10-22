import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Quiz from './Quiz'
import { introQuestions } from '../data/quizIntro'

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

  const selectedQuestions = React.useMemo(() => {
    const arr = [...introQuestions]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr.slice(0, 10)
  }, [])

  return (
    <div>
      <h2>Quiz Inicial</h2>
      <p>Teste seus conhecimentos antes de iniciar os estudos.</p>
      <Quiz title="Avaliação de Conhecimento" questions={selectedQuestions} onFinish={handleFinish} />
    </div>
  )
}

export default IntroQuiz