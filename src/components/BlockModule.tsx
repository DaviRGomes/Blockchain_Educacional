import React, { useMemo, useState, useRef, useEffect } from 'react'
import CryptoJS from 'crypto-js'
import Quiz from './Quiz'
import { blockQuestions } from '../data/quizData'
import { useNavigate } from 'react-router-dom'

function BlockModule() {
  const [activeTab, setActiveTab] = useState<string>('teoria')
  const [number, setNumber] = useState('1')
  const [nonce, setNonce] = useState('0')
  const [data, setData] = useState('')
  const [step, setStep] = useState<number | null>(null) // guided tour step 1..7

  const numberRef = useRef<HTMLInputElement | null>(null)
  const nonceRef = useRef<HTMLInputElement | null>(null)
  const dataRef = useRef<HTMLTextAreaElement | null>(null)
  const mineRef = useRef<HTMLButtonElement | null>(null)
  const hashRef = useRef<HTMLInputElement | null>(null)

  const [tooltipPos, setTooltipPos] = useState<{ top: number; left: number; placement: 'top' | 'right' | 'bottom' | 'left' } | null>(null)

  const timeoutsRef = useRef<number[]>([])
  const pushTimeout = (id: number) => { timeoutsRef.current.push(id) }

  const navigate = useNavigate()


  // Start the guided tour only when the user navigates to the practice tab
  useEffect(() => {
    if (activeTab === 'pratica' && step == null) {
      try {
        const completed = localStorage.getItem('blockCompleted') === 'true'
        if (!completed) {
          // start the guided tour after next paint so elements mount
          window.requestAnimationFrame(() => setTimeout(() => setStep(1), 50))
        }
      } catch (e) {
        // ignore localStorage errors
        window.requestAnimationFrame(() => setTimeout(() => setStep(1), 50))
      }
    }
  }, [activeTab, step])

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
  if (difficultyMinor === 0) { maximumNonce *= 16 }
  else if (difficultyMinor === 1) { maximumNonce *= 8 }
  else if (difficultyMinor <= 3) { maximumNonce *= 4 }
  else if (difficultyMinor <= 7) { maximumNonce *= 2 }

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

  // guided tour handlers: advance steps based on interactions
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
      // show an intermediate informational step: bloco ficou inválido
      const id0 = window.setTimeout(() => setStep(5), 250)
      // after 3s show the recalcular instruction (step 6)
      const id1 = window.setTimeout(() => setStep(6), 3250)
      pushTimeout(id0); pushTimeout(id1)
    }
  }

  const handleMine = () => {
    // call existing mine logic but also step transitions
    // keep responsiveness: run mine and then step transitions
    if (step === 2 || step === 6) {
      // simulate progress similar to HashModule timing
      const id0 = window.setTimeout(() => {
        mine()
      }, 50)
      pushTimeout(id0)
      if (step === 2) {
        const id1 = window.setTimeout(() => setStep(3), 200)
        const id2 = window.setTimeout(() => setStep(4), 3500)
        pushTimeout(id1); pushTimeout(id2)
      } else {
        // recalculation branch: show result, then avalanche, then final
        const id1 = window.setTimeout(() => setStep(7), 200)
        const id2 = window.setTimeout(() => setStep(8), 3500)
        const id3 = window.setTimeout(() => setStep(9), 5200)
        pushTimeout(id1); pushTimeout(id2); pushTimeout(id3)
      }
    } else {
      // normal mine when not in guided steps
      mine()
    }
  }

  const renderTeoria = () => (
    <div>
      <h3>Teoria - Bloco</h3>
      <p>
        Um bloco é a unidade básica de uma blockchain. Cada bloco contém informações como o número do bloco,
        um campo chamado <strong>nonce</strong> (usado para mineração) e os dados/payload. O hash do bloco é
        obtido aplicando SHA256 sobre o conteúdo do bloco (número + nonce + dados).
      </p>
      <p>
        O hash de um bloco é exatamente a mesma função que vimos no módulo anterior —
        SHA256. A diferença é que, aqui, nós ajustamos o <em>nonce</em> até encontrar um hash que satisfaça uma dificuldade
        (um prefixo alvo). Esse processo é a mineração.
      </p>
      <ul>
        <li>Conteúdo do bloco: Número, Nonce e Dados.</li>
        <li>Hash do bloco: SHA256(conteúdo).</li>
        <li>Mineração: variar o Nonce até que o hash atenda a dificuldade alvo.</li>
      </ul>
    </div>
  )

  const renderQuiz = () => (
    <Quiz
      questions={blockQuestions}
      title="Quiz - Blocos"
      onFinish={(score: number, total: number) => {
        try {
          localStorage.setItem('blockCompleted', 'true')
          localStorage.setItem('blockScore', String(score))
          localStorage.setItem('blockTotal', String(total))
        } catch {}
      }}
    />
  )

  const renderPratica = () => (
    <div>
      <h3>Prática - Bloco com SHA256 e Mineração</h3>
      <div>
        <label>
          Número:
          <input ref={numberRef} type="number" value={number} onChange={(e) => handleNumberChange(e.target.value)} style={{ marginLeft: 8 }} />
        </label>
      </div>
      <div style={{ marginTop: 10 }}>
        <label>
          Nonce:
          <input ref={nonceRef} type="number" value={nonce} onChange={(e) => setNonce(e.target.value)} style={{ marginLeft: 8 }} />
        </label>
      </div>
      <div style={{ marginTop: 10 }}>
        <label>
          Dados:
          <textarea ref={dataRef} value={data} onChange={(e) => handleDataChange(e.target.value)} placeholder="Digite os dados do bloco..." rows={4} cols={50} style={{ display: 'block', marginTop: 8 }} />
        </label>
      </div>

      <div style={{ marginTop: 10 }}>
        <button ref={mineRef} onClick={handleMine}>Minerar</button>
      </div>

      <div style={{ marginTop: 16 }}>
        <p>Hash: <input ref={hashRef} readOnly value={hash} style={{ width: '100%', padding: 10, fontFamily: 'monospace' }} /></p>
        <p>Estado do bloco: {isValid ? '✅ Válido' : '❌ Inválido'}</p>
        <p>Dificuldade alvo: prefixo ≤ <code>{pattern}</code></p>
      </div>
    </div>
  )

  // Tooltip content for guided tour
  const renderTooltipContent = () => {
    switch (step) {
      case 1:
        return { title: 'Vamos Começar', text: 'Insira um número de bloco no campo "Número" para começar.' }
      case 2:
        return { title: 'Minerar', text: 'Clique em "Minerar" para tentar encontrar um nonce que gere um hash que atenda à dificuldade.' }
      case 3:
        return { title: 'Hash Encontrado', text: 'Ótimo — o hash resultante foi gerado. Observe o valor abaixo.' }
      case 4:
        return { title: 'Teste a Segurança', text: 'Agora, altere levemente os dados do bloco (por exemplo, adicione uma palavra) para ver o efeito no hash.' }
      case 5:
        return { title: 'Bloco Inválido', text: 'Ao alterar os dados, este bloco agora não corresponde mais ao hash anterior — ele ficou inválido. Vamos recalcular.' }
      case 6:
        return { title: 'Recalcular', text: 'Clique em "Minerar" novamente para obter o novo hash após a pequena mudança.' }
      case 7:
        return { title: 'Hash Encontrado (recalc)', text: 'O novo hash foi gerado após a mineração. Observe o valor abaixo.' }
      case 8:
        return { title: 'Viu só?', text: 'Veja como o hash mudou totalmente — isso demonstra o efeito avalanche aplicado ao bloco.' }
      case 9:
        return { title: 'Módulo Finalizado', text: 'Você concluiu a prática deste módulo. Parabéns — siga para o próximo módulo quando estiver pronto.' }
      default:
        return null
    }
  }

  const tooltip = renderTooltipContent()

  // tooltip positioning logic similar to HashModule
  useEffect(() => {
    // final step (9) is shown in a corner and not attached to an element
    if (step === 9) {
      setTooltipPos({ top: 90, left: Math.max(240, window.innerWidth - 360), placement: 'right' })
      return
    }

    const target =
      step === 1 ? numberRef.current : step === 2 || step === 6 ? mineRef.current : step === 3 || step === 6 || step === 7 || step === 8 ? hashRef.current : step === 4 || step === 5 ? dataRef.current : null

    if (!target) { setTooltipPos(null); return }

    const rect = target.getBoundingClientRect()
    const tooltipWidth = 320
    const margin = 12
    let placement: 'top' | 'right' | 'bottom' | 'left' = 'top'
    // prefer showing to the right for the first step so it doesn't cover the input
    if (step === 1) placement = 'right'
    else if (rect.top < 160) placement = 'right'
  // for the mining action steps (initial mine and recalcular), prefer left so it doesn't cover the button
  if (step === 2 || step === 6) placement = 'left'

    let top = 0
    let left = 0
    if (placement === 'top') {
      top = rect.top + window.scrollY - 12
      left = rect.left + window.scrollX + rect.width / 2
      const minLeft = margin + tooltipWidth / 2
      const maxLeft = window.innerWidth - margin - tooltipWidth / 2
      left = Math.min(Math.max(left, minLeft), maxLeft)
    } else {
      top = rect.top + window.scrollY + rect.height / 2
      if (placement === 'left') {
        // place the tooltip to the left of the element so it doesn't cover the button
        left = rect.left + window.scrollX - tooltipWidth - 12
        const minLeft = margin
        left = Math.max(left, minLeft)
      } else {
        // right placement (default)
        left = rect.left + window.scrollX + rect.width + 12
        const maxLeft = window.innerWidth - margin - tooltipWidth
        left = Math.min(left, maxLeft)
      }
    }

    setTooltipPos({ top: Math.max(margin, top), left: Math.max(margin, left), placement })
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

  // navigate to blockchain when practice finishes (after final step)
  useEffect(() => {
    if (step === 9) {
      try { localStorage.setItem('blockCompleted', 'true') } catch (e) {}
      const id = window.setTimeout(() => navigate('/blockchain'), 1200)
      pushTimeout(id)
      return () => clearTimeout(id)
    }
  }, [step, navigate])

  return (
    <div style={{ position: 'relative' }}>
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

      {/* render guided tooltip like HashModule */}
      {tooltipPos && tooltip && (
        <div
          className={`guided-tooltip placement-${tooltipPos.placement}`}
          style={{ position: 'absolute', top: tooltipPos.top + 'px', left: tooltipPos.left + 'px', transform: tooltipPos.placement === 'top' ? 'translate(-50%, -110%)' : 'translate(0, -50%)', pointerEvents: 'none' }}
        >
          <div className="guided-tooltip-card">
            <h4>{tooltip.title}</h4>
            <p style={{ whiteSpace: 'pre-wrap' }}>{tooltip.text}</p>
          </div>
          <div className="guided-tooltip-arrow" />
        </div>
      )}
    </div>
  )
}

export default BlockModule