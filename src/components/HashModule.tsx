import React, { useState } from 'react'
import CryptoJS from 'crypto-js'
import Quiz from './Quiz'
import { hashQuestions } from '../data/quizData'

function HashModule() {
  const [activeTab, setActiveTab] = useState<string | null>(null)
  const [text, setText] = useState('')

  const hash = CryptoJS.SHA256(text).toString()

  const renderTeoria = () => (
    <div>
      <h3>Teoria - Hash SHA256</h3>
      <ul>
        <li>SHA256 é uma função hash criptográfica determinística.</li>
        <li>Pequenas mudanças no texto geram hashes completamente diferentes.</li>
        <li>Funções hash não são reversíveis.</li>
      </ul>
    </div>
  )

  const renderQuiz = () => (
    <Quiz
      questions={hashQuestions}
      title="Quiz - Hash"
      onFinish={(score: number, total: number) => {
        try {
          localStorage.setItem('hashCompleted', 'true')
          localStorage.setItem('hashScore', String(score))
          localStorage.setItem('hashTotal', String(total))
        } catch {}
      }}
    />
  )

  const renderPratica = () => (
    <div>
      <h3>Prática - Calcular SHA256</h3>
      <div>
        <label>
          Texto:
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Digite o texto para gerar o hash..."
            rows={4}
            cols={50}
            style={{ display: 'block', marginTop: 8 }}
          />
        </label>
      </div>
      <div style={{ marginTop: 12 }}>
        <p>Hash (SHA256):</p>
        <code style={{ wordBreak: 'break-all' }}>{hash}</code>
      </div>
    </div>
  )

  return (
    <div>
      <h2>Módulo 1: Hash SHA256</h2>

      <div>
        <button onClick={() => setActiveTab('teoria')}>Teoria</button>
        <button onClick={() => setActiveTab('quiz')}>Quiz</button>
        <button onClick={() => setActiveTab('pratica')}>Prática</button>
      </div>

      <hr />

      <div>
        {activeTab === 'teoria' && renderTeoria()}
        {activeTab === 'quiz' && renderQuiz()}
        {activeTab === 'pratica' && renderPratica()}
      </div>
    </div>
  )
}

export default HashModule