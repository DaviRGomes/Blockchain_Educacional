import React, { useMemo, useState, useRef, useEffect } from 'react'
import CryptoJS from 'crypto-js'
import Quiz from './Quiz'
import { blockQuestions } from '../data/quizBlock'
import { useNavigate } from 'react-router-dom'
import Onboarding from './Onboarding'
import GuidedTooltip from './GuidedTooltip'

// Função utilitária para embaralhar array usando algoritmo Fisher-Yates
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array] // Não modifica o array original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function BlockModule() {
  const [activeTab, setActiveTab] = useState<'teoria' | 'quiz' | 'pratica'>('teoria')
  const [showModuleOnboarding, setShowModuleOnboarding] = useState(false)
  const [number, setNumber] = useState('1')
  const [nonce, setNonce] = useState('0')
  const [data, setData] = useState('')
  const [step, setStep] = useState<number | null>(null) // guided tour step 1..7

  // Teoria paginada usando os mesmos textos do Onboarding (Bloco)
  const [theoryPage, setTheoryPage] = useState(0)
  const blockTheorySteps = [
    {
      title: 'O que é um Bloco?',
      content: (
        <div>
          <p>
            Um bloco é a unidade que agrupa transações e metadados: número, nonce, dados e o hash (resultado da função hash sobre esses campos).
          </p>
          <p>
            Cada bloco aponta para o hash do bloco anterior (previousHash). Esse link cria uma cadeia onde o histórico fica encadeado e fácil de verificar.
          </p>
          <p>
            Exemplo simplificado: Bloco #2 contém previousHash = hash(Bloco #1). Se Bloco #1 mudar, Bloco #2 fica inconsistente.
          </p>
        </div>
      )
    },
    {
      title: 'Nonce e Mineração',
      content: (
        <div>
          <p>
            O <strong>nonce</strong> é um valor que ajustamos para mudar o hash do bloco. Mineração é o processo de tentar nonces até encontrar um hash que satisfaça a dificuldade.
          </p>
          <p>
            Em sistemas reais, a dificuldade é ajustada para controlar o tempo médio de criação de blocos; aqui usamos um critério simples para demonstração.
          </p>
        </div>
      )
    },
    {
      title: 'Efeito Avalanche e Integridade',
      content: (
        <div>
          <p>
            Alterar qualquer campo (dados, nonce ou número) muda o hash completamente (efeito avalanche). Por isso, alterar um bloco invalida os seguintes — a cadeia perde consistência.
          </p>
          <p>
            Para recuperar a consistência após uma alteração é necessário reminerar o bloco alterado e todos os subsequentes, o que torna ataques retroativos custosos.
          </p>
        </div>
      )
    },
    {
      title: 'Limitações e Performance',
      content: (
        <div>
          <p>
            A mineração é computacionalmente custosa. Neste módulo usamos uma simulação síncrona para demonstração; em sistemas reais, isso é feito por nós dedicados, pools e hardware especializado (ASICs/GPU).
          </p>
          <p>
            Observação técnica: executar loops de força bruta no thread principal do navegador pode travar a interface; por isso, para provar conceitos maiores, use WebWorkers ou execute mineração em backend controlado.
          </p>
        </div>
      )
    },
    {
      title: 'Prática Recomendada',
      content: (
        <div>
          <p>
            Experimente alterar os dados do bloco e clicar em "Minerar" para ver como o nonce e o hash mudam. Observe a validade do bloco e como isso afeta os blocos seguintes.
          </p>
          <p>
            Dica: altere apenas uma palavra e compare os hashes antes/depois — será visível a mudança completa (efeito avalanche).
          </p>
        </div>
      )
    }
  ]
  const theoryPages = blockTheorySteps
  const nextTheory = () => setTheoryPage((p) => Math.min(p + 1, theoryPages.length - 1))
  const prevTheory = () => setTheoryPage((p) => Math.max(p - 1, 0))
  const numberRef = useRef<HTMLInputElement | null>(null)
  const nonceRef = useRef<HTMLInputElement | null>(null)
  const dataRef = useRef<HTMLTextAreaElement | null>(null)
  const mineRef = useRef<HTMLButtonElement | null>(null)
  const hashRef = useRef<HTMLInputElement | null>(null)

  const [tooltipPos, setTooltipPos] = useState<{ top: number; left: number; placement: 'top' | 'right' | 'bottom' | 'left' } | null>(null)

  const timeoutsRef = useRef<number[]>([])
  const pushTimeout = (id: number) => { timeoutsRef.current.push(id) }

  const navigate = useNavigate()

  // Embaralha blockQuestions apenas uma vez na montagem e seleciona 10 perguntas aleatórias
  const randomTenQuestions = useMemo(() => {
    const shuffled = shuffleArray(blockQuestions)
    return shuffled.slice(0, 10)
  }, [])

  // Start the guided tour only when the user navigates to the practice tab
  useEffect(() => {
    if (activeTab === 'pratica' && step == null) {
      // start the guided tour after next paint so elements mount
      window.requestAnimationFrame(() => setTimeout(() => setStep(1), 50))
    }
  }, [activeTab, step])

  // show module-specific onboarding when the component mounts if not already completed
  useEffect(() => {
    try {
      const completed = localStorage.getItem('blockModuleOnboarding') === 'true'
  // always show onboarding when entering module
  setShowModuleOnboarding(true)
    } catch {
  setShowModuleOnboarding(true)
    }
  }, [])

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
    <div
      style={{
        marginTop: 12,
        border: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(12, 22, 32, 0.6)',
        borderRadius: 12,
        padding: 16,
      }}
    >
      <h4 style={{ marginBottom: 6 }}>{theoryPages[theoryPage].title}</h4>
      {theoryPages[theoryPage].content}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
        <button
          onClick={prevTheory}
          disabled={theoryPage === 0}
          className="btn btn-ghost"
          style={{ padding: '8px 14px' }}
        >
          Anterior
        </button>

        <span style={{ color: '#a8b3c7' }}>
          Página {theoryPage + 1} de {theoryPages.length}
        </span>

        {theoryPage < theoryPages.length - 1 ? (
          <button
            onClick={nextTheory}
            className="btn btn-primary"
            style={{ padding: '8px 14px' }}
          >
            Próximo
          </button>
        ) : (
          <button
            onClick={() => setActiveTab('quiz')}
            className="btn btn-primary"
            style={{ padding: '8px 14px' }}
          >
            Concluir Teoria
          </button>
        )}
      </div>
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
    <>
      <h3>Prática - Bloco com SHA256 e Mineração</h3>
      <div style={{ display: 'grid', gap: 12 }}>
        <div>
          <label htmlFor="block-number" style={{ display: 'block', marginBottom: 8 }}>Número:</label>
          <input 
            id="block-number"
            ref={numberRef} 
            type="number" 
            value={number} 
            onChange={(e) => handleNumberChange(e.target.value)} 
            style={{ width: '100%', padding: 10, fontSize: 14 }}
          />
        </div>
        
        <div>
          <label htmlFor="block-nonce" style={{ display: 'block', marginBottom: 8 }}>Nonce:</label>
          <input 
            id="block-nonce"
            ref={nonceRef} 
            type="number" 
            value={nonce} 
            onChange={(e) => setNonce(e.target.value)} 
            style={{ width: '100%', padding: 10, fontSize: 14 }}
          />
        </div>
        
        <div>
          <label htmlFor="block-data" style={{ display: 'block', marginBottom: 8 }}>Dados:</label>
          <textarea 
            id="block-data"
            ref={dataRef} 
            value={data} 
            onChange={(e) => handleDataChange(e.target.value)} 
            placeholder="Digite os dados do bloco..." 
            rows={4} 
            style={{ width: '100%', padding: 10, fontSize: 14 }}
          />
        </div>

        <div>
          <button 
            ref={mineRef} 
            onClick={handleMine} 
            className="btn btn-primary"
            style={{ padding: '8px 14px' }}
          >
            Minerar
          </button>
        </div>

        <div>
          <label htmlFor="block-hash" style={{ display: 'block', marginBottom: 8 }}>Hash (SHA256):</label>
          <input 
            id="block-hash"
            ref={hashRef} 
            readOnly 
            value={hash} 
            style={{ width: '100%', padding: 10, fontFamily: 'monospace' }} 
          />
        </div>
        
        <div>
          <p style={{ marginTop: 8 }}>Estado do bloco: {isValid ? '✅ Válido' : '❌ Inválido'}</p>
          <p>Dificuldade alvo: prefixo ≤ <code>{pattern}</code></p>
        </div>
      </div>
    </>
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
      // Removido timeout de navegação automática; segue o modelo do onboarding via botão
      // Opcional: marcar conclusão aqui ou apenas no clique do botão (preferível no clique)
    }
  }, [step, navigate])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 820 }}>
        <h2 style={{ textAlign: 'center' }}>Módulo 2: Blocos</h2>
        {/* BOTOES TEORIA | QUIZ | PRÁTICA */}
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
          <div className="tabs">
            <button
              onClick={() => setActiveTab('teoria')}
              className={`tab-btn ${activeTab === 'teoria' ? 'active' : ''}`}
            >
              Teoria
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
            >
              Quiz
            </button>
            <button
              onClick={() => setActiveTab('pratica')}
              className={`tab-btn ${activeTab === 'pratica' ? 'active' : ''}`}
            >
              Prática
            </button>
          </div>
          <div>
            <button 
              onClick={() => {
                localStorage.setItem('skipWelcome', 'true');
                navigate('/');
              }}
              className="btn btn-ghost"
              style={{ padding: '8px 14px' }}
            >
              Voltar ao Início
            </button>
          </div>
        </div>
        <hr style={{ margin: '0 0 20px 0' }} />

        {/* CONTEÚDO DA ABA TEORIA */}
        {activeTab === 'teoria' && (
          <div>
            <h3>Teoria - Blocos</h3>
            <p>Aprenda sobre os conceitos fundamentais de Blocos na Blockchain.</p>

            {/* Botão "Abrir Tutorial Guiado" removido */}
            {renderTeoria()}
          </div>
        )}

        {/* CONTEÚDO DA ABA QUIZ */}
        {activeTab === 'quiz' &&(
          <div>
            <h3>Quiz - Blocos</h3>
            <Quiz
              questions={randomTenQuestions}
              onFinish={(score: number, total: number) => {
                try {
                  localStorage.setItem('blockScore', String(score))
                  localStorage.setItem('blockTotal', String(total))
                  localStorage.setItem('blockCompleted', 'true')
                } catch {}
              }}
            />
          </div>
        )}

        {/* CONTEÚDO DA ABA PRÁTICA */}
        {activeTab === 'pratica' && renderPratica()}

        {/* render guided tooltip via GuidedTooltip component */}
        {tooltipPos && tooltip && (
          <GuidedTooltip
            content={tooltip}
            pos={tooltipPos}
            actionLabel={step === 9 ? 'Ir para o próximo módulo' : undefined}
            onAction={step === 9 ? () => {
              try { localStorage.setItem('blockCompleted', 'true') } catch {}
              navigate('/blockchain')
            } : undefined}
          />
        )}
      </div>
    </div>
  )
}

export default BlockModule