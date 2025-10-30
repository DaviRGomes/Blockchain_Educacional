import React, { useState, useMemo, useEffect } from 'react'
import CryptoJS from 'crypto-js'
import Quiz from './Quiz'
import { blockchainQuestions } from '../data/quizBlockchain'
import { useNavigate } from 'react-router-dom'
import Onboarding from './Onboarding'
import GuidedTooltip from './GuidedTooltip'
import './styles/blockchain-module.css' // ✅ novo CSS separado

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

type Block = {
  index: number
  number: number
  nonce: number
  data: string
  previousHash: string
  hash: string
}

export default function BlockchainModule() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'teoria' | 'quiz' | 'pratica'>('teoria')
  const [showModuleOnboarding, setShowModuleOnboarding] = useState(false)
  const [step, setStep] = useState<number | null>(null)

  const difficulty = '00'
  const maximumNonce = 200000

  const makeHash = (number: number, prev: string, data: string, nonce: number) => {
    const input = `${number}|${prev}|${data}|${nonce}`
    return CryptoJS.SHA256(input).toString()
  }

  const genesisPrevious = ''.padEnd(64, '0')

  const [chain, setChain] = useState<Block[]>(() => {
    const initial: Block[] = []
    for (let i = 0; i < 3; i++) {
      const prev = i === 0 ? genesisPrevious : ''
      const data = i === 0 ? 'Bloco Gênesis' : `Bloco ${i + 1}`
      const hash = makeHash(i + 1, prev, data, 0)
      initial.push({ index: i, number: i + 1, nonce: 0, data, previousHash: prev, hash })
    }
    for (let i = 1; i < initial.length; i++) {
      initial[i].previousHash = initial[i - 1].hash
      initial[i].hash = makeHash(initial[i].number, initial[i].previousHash, initial[i].data, initial[i].nonce)
    }
    return initial
  })

  const isValidHash = (hash: string) => hash.startsWith(difficulty)

  const recomputeFrom = (startIndex: number, newChain?: Block[]) => {
    const updated = [...(newChain ?? chain)]
    for (let i = startIndex; i < updated.length; i++) {
      const prevHash = i === 0 ? genesisPrevious : updated[i - 1].hash
      updated[i].previousHash = prevHash
      updated[i].hash = makeHash(updated[i].number, prevHash, updated[i].data, updated[i].nonce)
    }
    setChain(updated)
  }

  const handleFieldChange = (i: number, field: 'number' | 'nonce' | 'data', value: string) => {
    const next = [...chain]
    if (field === 'data') next[i].data = value
    else next[i][field] = Number(value) || 0
    recomputeFrom(i, next)

    if (step === 2) {
      setTimeout(() => setStep(3), 400)
      setTimeout(() => setStep(4), 2000)
    }
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
        break
      }
      nonce++
      attempts++
    }
    setChain(next)

    if (step === 1) {
      setTimeout(() => setStep(2), 300)
    } else if (step === 4) {
      setTimeout(() => setStep(5), 400)
      setTimeout(() => setStep(6), 2200)
    }
  }

  const randomTenQuestions = useMemo(() => shuffleArray(blockchainQuestions).slice(0, 10), [])

  useEffect(() => {
    if (activeTab === 'pratica' && step == null) {
      setTimeout(() => setStep(1), 400)
    }
  }, [activeTab])

  const tooltipContent = () => {
    switch (step) {
      case 1:
        return { title: 'Início', text: 'Clique em "Minerar" no primeiro bloco para gerar seu hash.' }
      case 2:
        return { title: 'Bloco Minado', text: 'Perfeito! Agora altere os dados do primeiro bloco.' }
      case 3:
        return { title: 'Efeito em Cadeia', text: 'Veja como os blocos seguintes ficaram inválidos.' }
      case 4:
        return { title: 'Corrigindo a Cadeia', text: 'Clique em "Minerar" no bloco 2 para recalcular o hash.' }
      case 5:
        return { title: 'Recalculando', text: 'O bloco foi recalculado e a cadeia está se corrigindo...' }
      case 6:
        return { title: 'Conclusão 🎉', text: 'Você concluiu a prática de Blockchain! Excelente trabalho.' }
      default:
        return null
    }
  }

  const tooltip = tooltipContent()

  return (
    <div className="blockchain-container">
      <div className="blockchain-inner">
        <h2>Módulo 3: Blockchain</h2>

        {/* Tabs */}
        <div className="blockchain-tabs">
          <div className="blockchain-tabs-left">
            {['teoria', 'quiz', 'pratica'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={activeTab === tab ? 'active' : ''}
              >
                {tab[0].toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="blockchain-tabs-right">
            <button onClick={() => navigate('/')}>Voltar ao Início</button>
          </div>
        </div>

        <hr />

        {activeTab === 'teoria' && (
          <div className="blockchain-section">
            <h3>Teoria - Blockchain</h3>
            <p>Uma blockchain conecta blocos via hash, tornando-os imutáveis e verificáveis.</p>
            <button className="open-tutorial-btn" onClick={() => setShowModuleOnboarding(true)}>
              Abrir Tutorial Guiado
            </button>
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="blockchain-section">
            <h3>Quiz - Blockchain</h3>
            <Quiz
              questions={randomTenQuestions}
              onFinish={(score: number, total: number) => {
                localStorage.setItem('blockchainScore', String(score))
                localStorage.setItem('blockchainTotal', String(total))
                localStorage.setItem('blockchainCompleted', 'true')
              }}
            />
          </div>
        )}

        {activeTab === 'pratica' && (
          <div className="blockchain-section">
            <h3>Prática - Encadeamento de Blocos</h3>
            <p>Dificuldade: o hash deve começar com <code>{difficulty}</code>.</p>

            <div className="blockchain-grid">
              {chain.map((b, i) => (
                <div key={i} className={`blockchain-block ${isValidHash(b.hash) ? 'valid' : 'invalid'}`}>
                  <div className="block-header">
                    <strong>Bloco #{b.number}</strong>
                    <span>{isValidHash(b.hash) ? '✅ Válido' : '❌ Inválido'}</span>
                  </div>

                  <label>Número:</label>
                  <input type="number" value={b.number} onChange={(e) => handleFieldChange(i, 'number', e.target.value)} />

                  <label>Nonce:</label>
                  <input type="number" value={b.nonce} onChange={(e) => handleFieldChange(i, 'nonce', e.target.value)} />

                  <label>Dados:</label>
                  <input type="text" value={b.data} onChange={(e) => handleFieldChange(i, 'data', e.target.value)} />

                  <label>Hash Anterior:</label>
                  <input type="text" value={b.previousHash} readOnly className="readonly" />

                  <label>Hash:</label>
                  <input type="text" value={b.hash} readOnly className={`readonly ${isValidHash(b.hash) ? 'hash-valid' : 'hash-invalid'}`} />

                  <button onClick={() => mineBlock(i)}>Minerar este bloco</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tooltip && step && (
          <GuidedTooltip
            content={tooltip}
            pos={{ top: 120, left: 120, placement: 'right' }}
            actionLabel={step === 6 ? 'Ir para o próximo módulo' : undefined}
            onAction={step === 6 ? () => navigate('/conclusao') : undefined}
          />
        )}
      </div>
    </div>
  )
}
