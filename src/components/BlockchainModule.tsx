import React, { useState } from 'react'
import CryptoJS from 'crypto-js'
import Quiz from './Quiz'
import { blockchainQuestions } from '../data/quizData'

type Block = {
  index: number
  number: number
  nonce: number
  data: string
  previousHash: string
  hash: string
}

function BlockchainModule() {
  const [activeTab, setActiveTab] = useState<string | null>(null)

  const difficulty = '0000'
  const maximumNonce = 200000

  const makeHash = (number: number, previousHash: string, data: string, nonce: number) => {
    const input = `${number}|${previousHash}|${data}|${nonce}`
    return CryptoJS.SHA256(input).toString()
  }

  const genesisPrevious = ''.padEnd(64, '0')

  const [chain, setChain] = useState<Block[]>(() => {
    const initial: Block[] = []
    for (let i = 0; i < 5; i++) {
      const prev = i === 0 ? genesisPrevious : ''
      initial.push({
        index: i,
        number: i + 1,
        nonce: 0,
        data: i === 0 ? 'Genesis Block' : `Bloco ${i + 1} de exemplo`,
        previousHash: prev,
        hash: ''
      })
    }
    for (let i = 0; i < initial.length; i++) {
      const prevHash = i === 0 ? genesisPrevious : initial[i - 1].hash
      initial[i].previousHash = prevHash
      initial[i].hash = makeHash(initial[i].number, prevHash, initial[i].data, initial[i].nonce)
    }
    return initial
  })

  const isValidHash = (hash: string) => hash.startsWith(difficulty)

  const recomputeFrom = (startIndex: number, nextChain?: Block[]) => {
    const updated = [...(nextChain ?? chain)]
    for (let i = startIndex; i < updated.length; i++) {
      const prevHash = i === 0 ? genesisPrevious : updated[i - 1].hash
      updated[i].previousHash = prevHash
      updated[i].hash = makeHash(updated[i].number, prevHash, updated[i].data, updated[i].nonce)
    }
    setChain(updated)
  }

  const handleFieldChange = (i: number, field: 'number' | 'nonce' | 'data', value: string) => {
    const next = [...chain]
    if (field === 'data') {
      next[i].data = value
    } else {
      next[i][field] = Number(value) || 0
    }
    recomputeFrom(i, next)
  }

  const mineBlock = (i: number) => {
    const next = [...chain]
    let nonce = next[i].nonce
    let attempts = 0
    while (attempts < maximumNonce) {
      const prevHash = i === 0 ? genesisPrevious : next[i - 1].hash
      const hash = makeHash(next[i].number, prevHash, next[i].data, nonce)
      if (isValidHash(hash)) {
        next[i].nonce = nonce
        next[i].hash = hash
        recomputeFrom(i + 1, next)
        return
      }
      nonce++
      attempts++
    }
    next[i].nonce = nonce
    recomputeFrom(i, next)
  }

  const renderTeoria = () => (
    <div>
      <h3>Teoria</h3>
      <p>
        Uma blockchain é uma cadeia de blocos onde cada bloco contém seu próprio hash
        e o hash do bloco anterior (<code>previousHash</code>). Qualquer alteração em um bloco
        muda seu hash, invalidando os blocos seguintes. A “mineração” ajusta o nonce
        para encontrar um hash que satisfaça o critério de dificuldade (por exemplo, iniciar
        com <code>{difficulty}</code>).
      </p>
    </div>
  )

  const renderQuiz = () => (
    <Quiz
      title="Quiz: Blockchain"
      questions={blockchainQuestions}
      onFinish={(score: number, total: number) => {
        try {
          localStorage.setItem('blockchainCompleted', 'true')
          localStorage.setItem('blockchainScore', String(score))
          localStorage.setItem('blockchainTotal', String(total))
        } catch {}
      }}
    />
  )

  const renderPratica = () => (
    <div>
      <h3>Prática</h3>
      <p>Dificuldade: hash deve começar com <code>{difficulty}</code>.</p>
      <div style={{ display: 'grid', gap: 12 }}>
        {chain.map((b, i) => (
          <div key={i} style={{ border: '1px solid #ccc', padding: 12 }}>
            <strong>Bloco #{b.number}</strong> {isValidHash(b.hash) ? '✅' : '❌'}
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 8, marginTop: 8 }}>
              <label>Número</label>
              <input type="number" value={b.number} onChange={(e) => handleFieldChange(i, 'number', e.target.value)} />
              <label>Nonce</label>
              <input type="number" value={b.nonce} onChange={(e) => handleFieldChange(i, 'nonce', e.target.value)} />
              <label>Dados</label>
              <input type="text" value={b.data} onChange={(e) => handleFieldChange(i, 'data', e.target.value)} />
              <label>Previous</label>
              <input type="text" value={b.previousHash} readOnly />
              <label>Hash</label>
              <input type="text" value={b.hash} readOnly style={{ color: isValidHash(b.hash) ? 'green' : 'red' }} />
            </div>
            <div style={{ marginTop: 8 }}>
              <button onClick={() => mineBlock(i)}>Minerar este bloco</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div>
      <h2>Módulo 3: Blockchain</h2>
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

export default BlockchainModule