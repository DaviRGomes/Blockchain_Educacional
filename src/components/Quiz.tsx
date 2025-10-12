import React, { useState } from 'react'

function Quiz({ questions, title, onFinish }: any) {
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    setAnswers({
      ...answers,
      [questionIndex]: answer
    })
  }

  const checkAnswers = () => {
    setShowResults(true)
  }

  const resetQuiz = () => {
    setAnswers({})
    setShowResults(false)
  }

  const correctCount = Object.values(answers).filter((answer, index) => answer === questions[index]?.correct).length

  return (
    <div>
      <h3>{title}</h3>
      
      {questions.map((question: any, index: number) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <p><strong>{index + 1}. {question.question}</strong></p>
          
          {question.options.map((option: any, optionIndex: number) => (
            <div key={optionIndex}>
              <label>
                <input 
                  type="radio" 
                  name={`q${index}`}
                  value={option.value}
                  onChange={() => handleAnswerChange(index, option.value)}
                  disabled={showResults}
                />
                {option.text}
              </label>
            </div>
          ))}
          
          {showResults && (
            <div style={{ marginTop: '10px', padding: '10px', backgroundColor: answers[index] === question.correct ? '#d4edda' : '#f8d7da' }}>
              {answers[index] === question.correct ? '✅ Correto!' : `❌ Errado. Resposta correta: ${question.options.find((opt: any) => opt.value === question.correct)?.text}`}
            </div>
          )}
        </div>
      ))}
      
      <div>
        {!showResults ? (
          <button onClick={checkAnswers}>Verificar Respostas</button>
        ) : (
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={resetQuiz}>Tentar Novamente</button>
            {typeof onFinish === 'function' && (
              <button onClick={() => onFinish(correctCount, questions.length)}>Concluir</button>
            )}
          </div>
        )}
      </div>
      
      {showResults && (
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e9ecef' }}>
          <strong>Resultado: {Object.values(answers).filter((answer, index) => answer === questions[index]?.correct).length} de {questions.length} corretas</strong>
        </div>
      )}
    </div>
  )
}

export default Quiz