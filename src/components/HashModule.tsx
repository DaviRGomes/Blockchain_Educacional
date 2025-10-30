import React, { useEffect, useRef, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import CryptoJS from 'crypto-js'
import Quiz from '../components/Quiz'
import GuidedTooltip, { TooltipPos } from '../components/GuidedTooltip'
import { HashTourSteps, TourStepContent } from '../data/tourSteps'
import { hashQuestions } from '../data/quizHash'
import Onboarding from './Onboarding'
import './styles/hashModule.css' // tema futurista azul

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function HashModule() {
  const [text, setText] = useState('')
  const [hash, setHash] = useState('')
  const [activeTab, setActiveTab] = useState<'teoria' | 'quiz' | 'pratica'>('teoria')
  const [step, setStep] = useState<number | null>(null)
  const [showModuleOnboarding, setShowModuleOnboarding] = useState(false)

  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const hashRef = useRef<HTMLInputElement | null>(null)
  const [tooltipPos, setTooltipPos] = useState<TooltipPos | null>(null)
  const navigate = useNavigate()
  const timeoutsRef = useRef<number[]>([])

  const computeHash = (txt: string) => CryptoJS.SHA256(txt).toString()

  const pushTimeout = (id: number) => { timeoutsRef.current.push(id) }

  const randomTenQuestions = useMemo(() => {
    const shuffled = shuffleArray(hashQuestions)
    return shuffled.slice(0, 10)
  }, [])

  // Posicionamento dos tooltips
  useEffect(() => {
    const target =
      step === 1 || step === 4
        ? textareaRef.current
        : step === 2 || step === 5
        ? buttonRef.current
        : step === 3 || step === 6
        ? hashRef.current
        : null

    if (step === 7) {
      setTooltipPos({ top: 90, left: Math.max(240, window.innerWidth - 360), placement: 'right' })
      return
    }

    if (!target) {
      setTooltipPos(null)
      return
    }

    const rect = target.getBoundingClientRect()
    const tooltipWidth = 320
    const margin = 12
    let placement: TooltipPos['placement'] = 'top'
    if (step === 1) placement = 'right'

    let top = rect.top - 12
    let left = rect.left + rect.width / 2
    const minLeft = margin + tooltipWidth / 2
    const maxLeft = window.innerWidth - margin - tooltipWidth / 2
    left = Math.min(Math.max(left, minLeft), maxLeft)

    setTooltipPos({ top, left, placement })
  }, [step, activeTab])

  // Resize e cleanup
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

  useEffect(() => {
    if (activeTab !== 'pratica' && step != null) {
      timeoutsRef.current.forEach((id) => clearTimeout(id))
      setStep(null)
      setTooltipPos(null)
    }
  }, [activeTab])

  useEffect(() => {
    setShowModuleOnboarding(true)
  }, [])

  const handleTextChange = (v: string) => {
    const prev = text
    setText(v)
    if (step === 1 && v.trim().length > 0) {
      const id = window.setTimeout(() => setStep(2), 250)
      pushTimeout(id)
    }
    if (step === 4 && v !== prev) {
      const id = window.setTimeout(() => setStep(5), 250)
      pushTimeout(id)
    }
  }

  const handleEncrypt = () => {
    const h = computeHash(text)
    setHash(h)
    if (step === 2) {
      const id1 = window.setTimeout(() => setStep(3), 200)
      const id2 = window.setTimeout(() => setStep(4), 3500)
      pushTimeout(id1)
      pushTimeout(id2)
    } else if (step === 5) {
      const id1 = window.setTimeout(() => setStep(6), 200)
      const id2 = window.setTimeout(() => setStep(7), 3500)
      pushTimeout(id1)
      pushTimeout(id2)
    }
  }

  const tooltipContent = step ? HashTourSteps[step] : null

  useEffect(() => {
    if (activeTab === 'pratica' && step === 7) return
  }, [activeTab, step, navigate])

  useEffect(() => {
    if (activeTab !== 'pratica') return
    if (step === null) {
      window.requestAnimationFrame(() => setTimeout(() => setStep(1), 50))
    }
  }, [activeTab, step])

  return (
    <div className="hash-container">
      <div className="hash-card">
        <h2 className="hash-title">🔐 Módulo 1: Hash</h2>

        {showModuleOnboarding && (
          <Onboarding
            onFinish={() => {
              try { localStorage.setItem('hashModuleOnboarding', 'true') } catch {}
              setShowModuleOnboarding(false)
              setActiveTab('quiz')
            }}
            steps={[
              { title: 'O que é uma Função Hash?', content: <p>Uma função hash é um algoritmo que transforma dados em uma impressão digital única.</p> },
              { title: 'Por que Hash é útil na Blockchain?', content: <p>O hash garante integridade e encadeamento entre blocos, impedindo fraudes.</p> },
              { title: 'Segurança e Força Bruta', content: <p>Hashes modernos (SHA-256) são resistentes a colisões e ataques de força bruta.</p> },
            ]}
          />
        )}

        <div className="tabs">
          <button className={activeTab === 'teoria' ? 'active' : ''} onClick={() => setActiveTab('teoria')}>Teoria</button>
          <button className={activeTab === 'quiz' ? 'active' : ''} onClick={() => setActiveTab('quiz')}>Quiz</button>
          <button className={activeTab === 'pratica' ? 'active' : ''} onClick={() => setActiveTab('pratica')}>Prática</button>
          <button className="back-btn" onClick={() => { localStorage.setItem('skipWelcome', 'true'); navigate('/') }}>← Voltar</button>
        </div>

        <hr className="divider" />

        {activeTab === 'teoria' && (
          <div>
            <h3>Teoria - Hash</h3>
            <p>Explore os conceitos de função hash e seu papel na segurança digital.</p>
            <button className="action-btn" onClick={() => setShowModuleOnboarding(true)}>Abrir Tutorial</button>
          </div>
        )}

        {activeTab === 'quiz' && (
          <div>
            <h3>Quiz - Hash</h3>
            <Quiz
              questions={randomTenQuestions}
              onFinish={(score, total) => {
                try {
                  localStorage.setItem('hashScore', String(score))
                  localStorage.setItem('hashTotal', String(total))
                  localStorage.setItem('hashCompleted', 'true')
                } catch {}
              }}
            />
          </div>
        )}

        {activeTab === 'pratica' && (
          <>
            <h3>Prática - Hash</h3>
            <div className="practice-area">
              <label>Texto:</label>
              <textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder="Digite o texto para gerar o hash..."
              />
              <button ref={buttonRef} onClick={handleEncrypt}>Gerar Hash</button>
              <label>Hash (SHA256):</label>
              <input ref={hashRef} readOnly value={hash} />
            </div>

            {tooltipPos && tooltipContent && (
              <GuidedTooltip
                content={tooltipContent}
                pos={tooltipPos}
                actionLabel={step === 7 ? 'Próximo módulo →' : undefined}
                onAction={step === 7 ? () => {
                  try { localStorage.setItem('hashCompleted', 'true') } catch {}
                  navigate('/block')
                } : undefined}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default HashModule
