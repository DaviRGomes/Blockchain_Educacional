import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Quiz from './Quiz'
import { hashQuestions, blockQuestions, blockchainQuestions } from '../data/quizData'

type Result = {
  score: number
  total: number
  level: 'Iniciante' | 'Intermediário' | 'Avançado'
}

function FinalQuiz() {
  const navigate = useNavigate()
  const [result, setResult] = useState<Result | null>(null)

  const ready =
    (localStorage.getItem('hashCompleted') === 'true') &&
    (localStorage.getItem('blockCompleted') === 'true') &&
    (localStorage.getItem('blockchainCompleted') === 'true')

  if (!ready) {
    return (
      <div>
        <h2>Quiz Final</h2>
        <p>Você ainda não concluiu todos os módulos.</p>
        <button onClick={() => navigate('/modules')}>Voltar aos módulos</button>
      </div>
    )
  }

  const finalQuestions = [
    ...hashQuestions,
    ...blockQuestions,
    ...blockchainQuestions
  ]

  const initialLevel = localStorage.getItem('initialKnowledgeLevel') || '—'
  const initialScore = Number(localStorage.getItem('initialScore') ?? 0)
  const initialTotal = Number(localStorage.getItem('initialTotal') ?? finalQuestions.length)
  const initialPct = initialTotal > 0 ? Math.round((initialScore / initialTotal) * 100) : 0

  const handleFinish = (score: number, total: number) => {
    const pct = (score / total) * 100
    let level: Result['level'] = 'Iniciante'
    if (pct >= 70) level = 'Avançado'
    else if (pct >= 40) level = 'Intermediário'

    setResult({ score, total, level })
    try {
      localStorage.setItem('finalKnowledgeLevel', level)
      localStorage.setItem('finalScore', String(score))
      localStorage.setItem('finalTotal', String(total))
    } catch {}
  }

  const goToModules = () => navigate('/modules')

  if (!result) {
    return (
      <div>
        <h2>Quiz Final</h2>
        <p>Responda para medir seu aprendizado após os módulos.</p>
        <Quiz title="Avaliação Final" questions={finalQuestions} onFinish={handleFinish} />
      </div>
    )
  }

  const finalPct = Math.round((result.score / result.total) * 100)

  return (
    <div>
      <h2>Resultado do Quiz Final</h2>
      <p>
        Você acertou {result.score} de {result.total} ({finalPct}%).
      </p>
      <p>Nível final: <strong>{result.level}</strong></p>
      <hr />
      <p><strong>Comparação com o Quiz Inicial</strong></p>
      <p>Nível inicial: <strong>{initialLevel}</strong></p>
      <p>Acertos iniciais: {initialScore} de {initialTotal} ({initialPct}%)</p>
      <p>Variação: {finalPct - initialPct}%</p>
      <button onClick={goToModules}>Voltar aos módulos</button>
    </div>
  )
}

export default FinalQuiz