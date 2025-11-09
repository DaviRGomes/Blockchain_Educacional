import React, { useState } from 'react'

function Quiz({ questions, title, onFinish }: any) {
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [current, setCurrent] = useState(0)

  const total = questions.length
  const hasAnswerForCurrent = answers[current] != null

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: answer }))
    // Avança automaticamente para a próxima pergunta, se houver
    if (questionIndex === current && questionIndex < total - 1) {
      setTimeout(() => setCurrent(c => Math.min(total - 1, c + 1)), 80)
    }
  }

  const checkAnswers = () => {
    setShowResults(true)
    if (typeof onFinish === 'function') {
      const score = Object.values(answers).filter((answer, idx) => answer === questions[idx]?.correct).length
      onFinish(score, total)
    }
  }

  const resetQuiz = () => {
    setAnswers({})
    setShowResults(false)
    setCurrent(0)
  }

  const correctCount = Object.values(answers).filter((answer, index) => answer === questions[index]?.correct).length

  const q = questions[current]

  return (
    <div className="module-card quiz-card">
      <h3 style={{ color: 'var(--text-white)' }}>{title}</h3>

      {/* Progresso */}
      <div className="quiz-progress">
        <div className="quiz-progress-bar" style={{ width: `${((current + 1) / total) * 100}%` }} />
        <div className="quiz-progress-text">Pergunta {current + 1} de {total}</div>
      </div>

      {/* Pergunta atual */}
      <div style={{ marginBottom: 16 }}>
        <p style={{ color: 'var(--text-white)', fontWeight: 700 }}>
          {current + 1}. {q?.question}
        </p>

        <div className="option-list">
          {q?.options?.map((option: any, optionIndex: number) => {
            const selected = answers[current] === option.value
            return (
              <label
                key={optionIndex}
                className={`quiz-option ${selected ? 'selected' : ''}`}
              >
                <input
                  type="radio"
                  name={`q${current}`}
                  value={option.value}
                  onChange={() => handleAnswerChange(current, option.value)}
                  disabled={showResults}
                />
                <span>{option.text}</span>
              </label>
            )
          })}
        </div>

        {showResults && (
          <div
            style={{
              marginTop: 10,
              padding: 10,
              backgroundColor:
                answers[current] === q?.correct ? 'rgba(50,205,50,0.12)' : 'rgba(255,77,77,0.12)',
              borderRadius: 8,
              color: 'var(--text-white)'
            }}
          >
            {answers[current] === q?.correct
              ? '✅ Correto!'
              : `❌ Errado. Resposta correta: ${q?.options?.find((opt: any) => opt.value === q?.correct)?.text}`}
          </div>
        )}
      </div>

      {/* Navegação */}
      <div className="nav-row">
        <button
          onClick={() => setCurrent(c => Math.max(0, c - 1))}
          className="btn btn-ghost"
          disabled={current === 0}
        >
          Anterior
        </button>

        {current < total - 1 ? (
          <button
            onClick={() => setCurrent(c => Math.min(total - 1, c + 1))}
            className="btn btn-primary"
            disabled={!hasAnswerForCurrent}
          >
            Próxima
          </button>
        ) : (
          <button
            onClick={checkAnswers}
            className="btn btn-primary"
            disabled={!hasAnswerForCurrent}
          >
            Concluir
          </button>
        )}
      </div>

      {/* Resultado agregado */}
      {showResults && (
        <div className="quiz-summary">
          <strong>Resultado: {correctCount} de {total} corretas</strong>
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <button onClick={resetQuiz} className="btn btn-ghost">Tentar Novamente</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Quiz