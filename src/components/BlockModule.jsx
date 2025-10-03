import React, { useMemo, useState } from 'react'
import CryptoJS from 'crypto-js'
import Quiz from './Quiz'
import { blockQuestions } from '../data/quizData'

function BlockModule() {
  const [activeTab, setActiveTab] = useState(null)
  const [number, setNumber] = useState('1')
  const [nonce, setNonce] = useState('0')
  const [data, setData] = useState('')

  const difficultyMajor = 4
  const difficultyMinor = 15
  let maximumNonce = 8
  let pattern = ''
  for (let x = 0; x < difficultyMajor; x++) {
    pattern += '0'
    maximumNonce *= 16
  }
  pattern += difficultyMinor.toString(16)
  const patternLen = pattern.length
  if (difficultyMinor === 0) { maximumNonce *= 16 }
  else if (difficultyMinor === 1) { maximumNonce *= 8 }
  else if (difficultyMinor <= 3) { maximumNonce *= 4 }
  else if (difficultyMinor <= 7) { maximumNonce *= 2 }

  const getText = (num, no, dt) => `${num}${no}${dt}`
  const calcHash = (txt) => CryptoJS.SHA256(txt).toString()

  const hash = useMemo(() => calcHash(getText(number, nonce, data)), [number, nonce, data])
  const isValid = hash.substr(0, patternLen) <= pattern

  const mine = () => {
    for (let x = 0; x <= maximumNonce; x++) {
      const candidateHash = calcHash(getText(number, String(x), data))
      if (candidateHash.substr(0, patternLen) <= pattern) {
        setNonce(String(x))
        return
      }
    }
  }

  const renderTeoria = () => (
    <div>
      <h3>Teoria - Bloco</h3>
      <ul>
        <li>Número, Nonce, Dados compõem o conteúdo</li>
        <li>Hash = SHA256(conteúdo)</li>
        <li>Mineração ajusta Nonce até atender dificuldade</li>
      </ul>
    </div>
  )

  const renderQuiz = () => (
    <Quiz questions={blockQuestions} title="Quiz - Blocos" />
  )

  const renderPratica = () => (
    <div>
      <h3>Prática - Bloco com SHA256 e Mineração</h3>
      <div>
        <label>
          Número:
          <input type="number" value={number} onChange={(e) => setNumber(e.target.value)} style={{ marginLeft: 8 }} />
        </label>
      </div>
      <div style={{ marginTop: 10 }}>
        <label>
          Nonce:
          <input type="number" value={nonce} onChange={(e) => setNonce(e.target.value)} style={{ marginLeft: 8 }} />
        </label>
      </div>
      <div style={{ marginTop: 10 }}>
        <label>
          Dados:
          <textarea value={data} onChange={(e) => setData(e.target.value)} placeholder="Digite os dados do bloco..." rows="4" cols="50" style={{ display: 'block', marginTop: 8 }} />
        </label>
      </div>

      <div style={{ marginTop: 10 }}>
        <button onClick={mine}>Minerar</button>
      </div>

      <div style={{ marginTop: 16 }}>
        <p>Hash: <code style={{ wordBreak: 'break-all' }}>{hash}</code></p>
        <p>Estado do bloco: {isValid ? '✅ Válido' : '❌ Inválido'}</p>
        <p>Dificuldade alvo: prefixo ≤ <code>{pattern}</code></p>
      </div>
    </div>
  )

  return (
    <div>
      <h2>Módulo 2: Bloco</h2>
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

export default BlockModule