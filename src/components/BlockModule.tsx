import React, { useMemo, useState, useRef, useEffect } from 'react'
import CryptoJS from 'crypto-js'
import Quiz from './Quiz'
import { blockQuestions } from '../data/quizBlock'
import { useNavigate } from 'react-router-dom'
import Onboarding from './Onboarding'
import GuidedTooltip from './GuidedTooltip'
import './styles/block-module.css'

// Função utilitária para embaralhar array usando algoritmo Fisher-Yates
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function BlockModule() {
  const [activeTab, setActiveTab] = useState<'teoria' | 'quiz' | 'pratica'>('teoria')
  const [showModuleOnboarding, setShowModuleOnboarding] = useState(false)
  const [number, setNumber] = useState('1')
  const [nonce, setNonce] = useState('0')
  const [data, setData] = useState('')
  const [step, setStep] = useState<number | null>(null)

  const numberRef = useRef<HTMLInputElement | null>(null)
  const nonceRef = useRef<HTMLInputElement | null>(null)
  const dataRef = useRef<HTMLTextAreaElement | null>(null)
  const mineRef = useRef<HTMLButtonElement | null>(null)
  const hashRef = useRef<HTMLInputElement | null>(null)

  const [tooltipPos, setTooltipPos] = useState<{ top: number; left: number; placement: 'top' | 'right' | 'bottom' | 'left' } | null>(null)
  const timeoutsRef = useRef<number[]>([])
  const pushTimeout = (id: number) => { timeoutsRef.current.push(id) }

  const navigate = useNavigate()

  // Embaralha blockQuestions apenas uma vez
  const randomTenQuestions = useMemo(() => {
    const shuffled = shuffleArray(blockQuestions)
    return shuffled.slice(0, 10)
  }, [])

  useEffect(() => {
    if (activeTab === 'pratica' && step == null) {
      window.requestAnimationFrame(() => setTimeout(() => setStep(1), 50))
    }
  }, [activeTab, step])

  // Mostra o onboarding ao entrar no módulo
  useEffect(() => {
    setShowModuleOnboarding(true)
  }, [])

  // Lógica de mineração
  const difficultyMajor: number = 4
  const difficultyMinor: number = 15
  let maximumNonce = 8
  let pattern = ''
  for (let x = 0; x < difficultyMajor; x++) {
    pattern += '0'
    maximumNonce *= 16
  }
  pattern += difficultyMinor.toString(16)
  const patternLen = pattern.length
  if (difficultyMinor === 0) maximumNonce *= 16
  else if (difficultyMinor === 1) maximumNonce *= 8
  else if (difficultyMinor <= 3) maximumNonce *= 4
  else if (difficultyMinor <= 7) maximumNonce *= 2

  const getText = (num: string, no: string, dt: string) => `${num}${no}${dt}`
  const calcHash = (txt: string) => CryptoJS.SHA256(txt).toString()

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

  // handlers
  const handleNumberChange = (v: string) => {
    const prev = number
    setNumber(v)
    if (step === 1 && v.trim().length > 0 && v !== prev) {
      const id = window.setTimeout(() => setStep(2), 250)
      pushTimeout(id)
    }
  }

  const handleDataChange = (v: string) => {
    const prev = data
    setData(v)
    if (step === 4 && v !== prev) {
      const id0 = window.setTimeout(() => setStep(5), 250)
      const id1 = window.setTimeout(() => setStep(6), 3250)
      pushTimeout(id0); pushTimeout(id1)
    }
  }

  const handleMine = () => {
    if (step === 2 || step === 6) {
      const id0 = window.setTimeout(() => mine(), 50)
      pushTimeout(id0)
      if (step === 2) {
        const id1 = window.setTimeout(() => setStep(3), 200)
        const id2 = window.setTimeout(() => setStep(4), 3500)
        pushTimeout(id1); pushTimeout(id2)
      } else {
        const id1 = window.setTimeout(() => setStep(7), 200)
        const id2 = window.setTimeout(() => setStep(8), 3500)
        const id3 = window.setTimeout(() => setStep(9), 5200)
        pushTimeout(id1); pushTimeout(id2); pushTimeout(id3)
      }
    } else mine()
  }

  const renderPratica = () => (
    <>
      <h3>Prática - Bloco com SHA256 e Mineração</h3>
      <div className="block-practice">
        <div className="block-field">
          <label>Número:</label>
          <input
            ref={numberRef}
            type="number"
            value={number}
            onChange={(e) => handleNumberChange(e.target.value)}
          />
        </div>

        <div className="block-field">
          <label>Nonce:</label>
          <input
            ref={nonceRef}
            type="number"
            value={nonce}
            onChange={(e) => setNonce(e.target.value)}
          />
        </div>

        <div className="block-field">
          <label>Dados:</label>
          <textarea
            ref={dataRef}
            value={data}
            onChange={(e) => handleDataChange(e.target.value)}
            placeholder="Digite os dados do bloco..."
            rows={4}
          />
        </div>

        <button ref={mineRef} onClick={handleMine}>
          Minerar
        </button>

        <div className="block-field">
          <label>Hash (SHA256):</label>
          <input ref={hashRef} readOnly value={hash} style={{ fontFamily: 'monospace' }} />
        </div>

        <div className="block-status">
          <p>Estado do bloco: {isValid ? '✅ Válido' : '❌ Inválido'}</p>
          <p>Dificuldade alvo: prefixo ≤ <code>{pattern}</code></p>
        </div>
      </div>
    </>
  )

  // tooltip guided tour
  const renderTooltipContent = () => {
    switch (step) {
      case 1: return { title: 'Vamos Começar', text: 'Insira um número de bloco para começar.' }
      case 2: return { title: 'Minerar', text: 'Clique em "Minerar" para encontrar um nonce válido.' }
      case 3: return { title: 'Hash Encontrado', text: 'Observe o hash gerado abaixo.' }
      case 4: return { title: 'Teste a Segurança', text: 'Altere os dados e veja como o hash muda.' }
      case 5: return { title: 'Bloco Inválido', text: 'Após a alteração, o bloco ficou inválido.' }
      case 6: return { title: 'Recalcular', text: 'Clique em "Minerar" novamente para recalcular.' }
      case 7: return { title: 'Novo Hash', text: 'O novo hash foi gerado com sucesso.' }
      case 8: return { title: 'Efeito Avalanche', text: 'Veja como o hash muda completamente.' }
      case 9: return { title: 'Módulo Concluído', text: 'Parabéns! Você finalizou o módulo.' }
      default: return null
    }
  }

  const tooltip = renderTooltipContent()

  useEffect(() => {
    if (step === 9) {
      setTooltipPos({ top: 90, left: Math.max(240, window.innerWidth - 360), placement: 'right' })
      return
    }

    const target =
      step === 1 ? numberRef.current
      : step === 2 || step === 6 ? mineRef.current
      : step === 3 || step === 7 || step === 8 ? hashRef.current
      : step === 4 || step === 5 ? dataRef.current
      : null

    if (!target) { setTooltipPos(null); return }

    const rect = target.getBoundingClientRect()
    const tooltipWidth = 320
    const margin = 12
    let placement: 'top' | 'right' | 'bottom' | 'left' = 'top'
    if (step === 1) placement = 'right'
    else if (rect.top < 160) placement = 'right'
    if (step === 2 || step === 6) placement = 'left'

    let top = 0
    let left = 0
    if (placement === 'top') {
      top = rect.top + window.scrollY - 12
      left = rect.left + rect.width / 2
    } else if (placement === 'left') {
      top = rect.top + window.scrollY + rect.height / 2
      left = rect.left - tooltipWidth - 12
    } else {
      top = rect.top + window.scrollY + rect.height / 2
      left = rect.left + rect.width + 12
    }

    setTooltipPos({ top, left, placement })
  }, [step])

  useEffect(() => {
    const onResize = () => setStep((s) => s)
    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onResize)
      timeoutsRef.current.forEach((id) => clearTimeout(id))
    }
  }, [])

  return (
    <div className="block-module-container">
      <div className="block-module-inner">
        <h2>Módulo 2: Blocos</h2>

        {showModuleOnboarding && (
          <Onboarding
            onFinish={() => {
              localStorage.setItem('blockModuleOnboarding', 'true')
              setShowModuleOnboarding(false)
              setActiveTab('quiz')
            }}
            steps={[
              {
                title: 'O que é um Bloco?',
                content: (
                  <div>
                    <p>Um bloco agrupa transações, número, nonce e hash. Cada bloco aponta para o hash do anterior.</p>
                    <p>Esse encadeamento garante a integridade da cadeia.</p>
                  </div>
                ),
              },
              {
                title: 'Nonce e Mineração',
                content: (
                  <div>
                    <p>O nonce é ajustado até que o hash satisfaça a dificuldade desejada — esse processo é a mineração.</p>
                  </div>
                ),
              },
              {
                title: 'Efeito Avalanche',
                content: (
                  <div>
                    <p>Alterar qualquer campo muda totalmente o hash, invalidando o bloco. Isso demonstra o efeito avalanche.</p>
                  </div>
                ),
              },
              {
                title: 'Prática Recomendada',
                content: (
                  <div>
                    <p>Experimente alterar os dados e minerar novamente para ver a mudança completa do hash.</p>
                  </div>
                ),
              },
            ]}
          />
        )}

        <div className="block-tabs">
          <div className="block-tabs-left">
            <button
              className={activeTab === 'teoria' ? 'active' : ''}
              onClick={() => setActiveTab('teoria')}
            >
              Teoria
            </button>
            <button
              className={activeTab === 'quiz' ? 'active' : ''}
              onClick={() => setActiveTab('quiz')}
            >
              Quiz
            </button>
            <button
              className={activeTab === 'pratica' ? 'active' : ''}
              onClick={() => setActiveTab('pratica')}
            >
              Prática
            </button>
          </div>
          <div className="block-tabs-right">
            <button
              onClick={() => {
                localStorage.setItem('skipWelcome', 'true')
                navigate('/')
              }}
            >
              Voltar ao Início
            </button>
          </div>
        </div>

        <hr />

        {activeTab === 'teoria' && (
          <div>
            <h3>Teoria - Blocos</h3>
            <p>Aprenda sobre os conceitos fundamentais de Blocos na Blockchain.</p>
            <button className="open-tutorial-btn" onClick={() => setShowModuleOnboarding(true)}>
              Abrir Tutorial Guiado
            </button>
          </div>
        )}

        {activeTab === 'quiz' && (
          <Quiz
            questions={randomTenQuestions}
            title="Quiz - Blocos"
            onFinish={(score: number, total: number) => {
              localStorage.setItem('blockScore', String(score))
              localStorage.setItem('blockTotal', String(total))
              localStorage.setItem('blockCompleted', 'true')
            }}
          />
        )}

        {activeTab === 'pratica' && renderPratica()}

        {tooltipPos && tooltip && (
          <GuidedTooltip
            content={tooltip}
            pos={tooltipPos}
            actionLabel={step === 9 ? 'Ir para o próximo módulo' : undefined}
            onAction={step === 9 ? () => navigate('/blockchain') : undefined}
          />
        )}
      </div>
    </div>
  )
}

export default BlockModule
