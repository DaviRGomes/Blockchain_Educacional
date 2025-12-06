import React, { useState, useMemo, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Quiz from '../components/Quiz' 
import { blockchainQuestions as blockchainQuestionsData } from '../data/quizBlockchain'

const simpleHash = (input: string) => {
    // Gera 32 bytes pseudo-aleatórios (64 hex) a partir do input,
    // garantindo distribuição suficiente para atender dificuldade por tentativa de nonce.
    let seed = 0x811c9dc5
    for (let i = 0; i < input.length; i++) {
        seed ^= input.charCodeAt(i)
        seed = (seed * 0x01000193) >>> 0
    }
    let x = seed >>> 0
    const bytes = new Uint8Array(32)
    for (let i = 0; i < 32; i++) {
        // xorshift32
        x ^= (x << 13) >>> 0
        x ^= (x >>> 17) >>> 0
        x ^= (x << 5) >>> 0
        bytes[i] = x & 0xff
    }
    let hex = ''
    for (let i = 0; i < bytes.length; i++) {
        hex += bytes[i].toString(16).padStart(2, '0')
    }
    return hex
}

// Mock Quiz Component
interface QuizProps {
    title: string;
    questions: any[];
    onFinish: (score: number, total: number) => void;
}
// Mock Onboarding Component
// Removido: componente Quiz “mock” que retornava null
// Removido: componente Onboarding “mock” (mantemos apenas o tipo)

interface OnboardingStep {
    title: string;
    content: JSX.Element;
}
interface OnboardingProps {
    steps: OnboardingStep[];
    onFinish: () => void;
}
const Onboarding: React.FC<OnboardingProps> = ({ steps, onFinish }) => {
    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onFinish();
        }
    };

    return (
        <div style={{ 
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
            background: 'rgba(0, 0, 0, 0.9)', zIndex: 10000, 
            display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
            <div style={{ 
                width: '90%', maxWidth: 600, padding: 30, 
                background: '#0d1117', borderRadius: 12, 
                boxShadow: '0 8px 16px rgba(0,0,0,0.5)' 
            }}>
                <h3 style={{ color: '#58a6ff', marginBottom: 10 }}>{steps[currentStep].title}</h3>
                <div style={{ color: '#eaf1f8', minHeight: 120 }}>
                    {steps[currentStep].content}
                </div>
                <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between' }}>
                    <button 
                        onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} 
                        disabled={currentStep === 0} 
                        className="btn btn-ghost"
                        style={{ padding: '8px 14px' }}
                    >
                        Anterior
                    </button>
                    <span style={{ color: '#a8b3c7' }}>
                        Passo {currentStep + 1} de {steps.length}
                    </span>
                    <button 
                        onClick={nextStep} 
                        className="btn btn-primary"
                        style={{ padding: '8px 14px' }}
                    >
                        {currentStep === steps.length - 1 ? 'Concluir' : 'Próximo'}
                    </button>
                </div>
            </div>
        </div>
    );
};


// Função utilitária para embaralhar array usando algoritmo Fisher-Yates
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

function BlockchainModule() {
  const [activeTab, setActiveTab] = useState<'teoria' | 'quiz' | 'pratica'>('teoria')
  const [showModuleOnboarding, setShowModuleOnboarding] = useState(true)
  const navigate = useNavigate()

  const randomTenQuestions = useMemo(() => {
    const shuffled = shuffleArray(blockchainQuestionsData)
    return shuffled.slice(0, 10)
  }, [])

  const difficulty = '0000'
  const maximumNonce = 200000

  const makeHash = (number: number, previousHash: string, data: string, nonce: number) => {
    const input = `${number}|${previousHash}|${data}|${nonce}`
    // Using the simplified hash function defined above to avoid the CryptoJS error
    return simpleHash(input) 
  }

  const genesisPrevious = ''.padEnd(64, '0')

  const [chain, setChain] = useState<Block[]>(() => {
    const initial: Block[] = []
    for (let i = 0; i < 3; i++) {
      const prev = i === 0 ? genesisPrevious : ''
      initial.push({
        index: i,
        number: i + 1,
        nonce: 0,
        data: `Bloco ${i + 1} de exemplo`,
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
    if (field === 'data') next[i].data = value
    else next[i][field] = Number(value) || 0
    recomputeFrom(i, next)

    // Avança steps do tour prático
    if (i === 0 && field === 'data' && step === 3) setStep(4)
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
        if (i === 0 && (step === 5 || step === 4)) setStep(6)
        return
      }
      nonce++
      attempts++
    }
    next[i].nonce = nonce
    recomputeFrom(i, next)
  }



  // TOUR PRÁTICO
  const [step, setStep] = useState<number | null>(null)
  const timeoutsRef = useRef<number[]>([])
  const pushTimeout = (id: number) => timeoutsRef.current.push(id)

  const firstBlockRef = useRef<HTMLDivElement | null>(null)
  const firstDataRef = useRef<HTMLInputElement | null>(null)
  const firstMineBtnRef = useRef<HTMLButtonElement | null>(null)
  const firstHashRef = useRef<HTMLInputElement | null>(null)
  const [tooltipPos, setTooltipPos] = useState<{ top: number; left: number; placement: 'top'|'right'|'bottom'|'left' } | null>(null)

  useEffect(() => {
    if (activeTab === 'pratica' && step == null) {
      const id = window.setTimeout(() => setStep(1), 80)
      pushTimeout(id)
    }
  }, [activeTab, step])

  useEffect(() => {
    if (step == null) { setTooltipPos(null); return }
    let target: HTMLElement | null = null
    if (step === 1) target = firstBlockRef.current
    else if (step === 3) target = firstDataRef.current
    else if (step === 5) target = firstMineBtnRef.current
    else if (step === 4 || step === 6) target = firstHashRef.current
    else if (step === 7) {
      setTooltipPos({ top: 90, left: Math.max(240, window.innerWidth - 360), placement: 'right' })
      try { localStorage.setItem('blockchainModuleTourCompleted', 'true') } catch {}
      return
    }

    if (!target) { setTooltipPos(null); return }
    const rect = target.getBoundingClientRect()
    const tooltipWidth = 320
    const margin = 12
    let placement: 'top'|'right'|'bottom'|'left' = 'right'
    if (rect.top < 160) placement = 'right'
    if (step === 5) placement = 'left'
    let top = placement === 'top' ? rect.top + window.scrollY - 12 : rect.top + window.scrollY + rect.height / 2
    let left = placement === 'left' ? Math.max(margin, rect.left + window.scrollX - tooltipWidth - 12) : Math.min(window.innerWidth - margin - tooltipWidth, rect.left + window.scrollX + rect.width + 12)
    setTooltipPos({ top: Math.max(margin, top), left: Math.max(margin, left), placement })
  }, [step, chain])

  useEffect(() => {
  // REMOVIDO: avanço automático por tempo
  // useEffect(() => {
  //   const autoSteps = [1, 2, 3, 4, 6, 7];
  //   if (step == null) return;
  //   timeoutsRef.current.forEach(clearTimeout);
  //   timeoutsRef.current = [];
  //   if (autoSteps.includes(step)) {
  //     const timeoutId = window.setTimeout(() => {
  //       setStep(prev => {
  //         if (prev === 7) return prev;
  //         return (prev ?? 0) + 1;
  //       });
  //     }, 4000);
  //     pushTimeout(timeoutId);
  //   }
  }, [step]);


  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((id) => clearTimeout(id))
      timeoutsRef.current = []
    }
  }, [])

  const renderPratica = () => (
    <div>
      <p>Dificuldade: hash deve começar com <code>{difficulty}</code>.</p>
      <div style={{ display: 'grid', gap: 12 }}>
        {chain.map((b, i) => {
          const valid = isValidHash(b.hash)

          const cardStyle = {
            border: '1px solid rgba(255,255,255,0.08)',
            padding: 16,
            borderRadius: 12,
            background: 'rgba(12, 22, 32, 0.6)',
          } as const

          const statusStyle = {
            padding: '4px 8px',
            borderRadius: 6,
            backgroundColor: valid ? '#2e7d32' : '#d32f2f',
            color: '#ffffff',
            fontWeight: 'bold',
          } as const

          const baseInputStyle = {
            width: '100%',
            padding: 10,
            fontSize: 14,
            background: '#0d1117',
            color: '#eaf1f8',
            border: '1px solid #2e7d32',
            borderRadius: 8,
            outline: 'none',
          } as const

          const previousHashStyle = {
            ...baseInputStyle,
            fontFamily: 'monospace',
            background: '#0a0f14',
            color: '#9aa7b3',
            border: '1px solid rgba(255,255,255,0.12)',
            wordBreak: 'break-all',
            whiteSpace: 'normal',
          } as const

          const hashInputStyle = {
            ...baseInputStyle,
            fontFamily: 'monospace',
            border: valid ? '1px solid #2e7d32' : '1px solid #d32f2f',
            background: valid ? '#0d2d23' : '#3d1616',
            color: valid ? '#2e7d32' : '#d32f2f',
            wordBreak: 'break-all',
            whiteSpace: 'normal',
          } as const

          return (
            <div
              key={i}
              ref={i === 0 ? firstBlockRef : undefined}
              style={cardStyle}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <strong style={{ fontSize: 18 }}>Bloco #{b.number}</strong>
                <span style={statusStyle}>
                  {valid ? 'Válido' : 'Inválido'}
                </span>
              </div>

              <div style={{ display: 'grid', gap: 12 }}>
                <div>
                  <label htmlFor={`bc-number-${i}`} style={{ display: 'block', marginBottom: 8 }}>Número:</label>
                  <input
                    id={`bc-number-${i}`}
                    type="number"
                    value={b.number}
                    onChange={(e) => handleFieldChange(i, 'number', e.target.value)}
                    style={baseInputStyle}
                  />
                </div>

                <div>
                  <label htmlFor={`bc-nonce-${i}`} style={{ display: 'block', marginBottom: 8 }}>Nonce:</label>
                  <input
                    id={`bc-nonce-${i}`}
                    type="number"
                    value={b.nonce}
                    onChange={(e) => handleFieldChange(i, 'nonce', e.target.value)}
                    style={baseInputStyle}
                  />
                </div>

                <div>
                  <label htmlFor={`bc-data-${i}`} style={{ display: 'block', marginBottom: 8 }}>Dados:</label>
                  <input
                    id={`bc-data-${i}`}
                    type="text"
                    value={b.data}
                    ref={i === 0 ? firstDataRef : undefined}
                    onFocus={() => { if (i === 0 && step === 1) setStep(3) }}
                    onChange={(e) => handleFieldChange(i, 'data', e.target.value)}
                    style={baseInputStyle}
                  />
                </div>

                <div>
                  <label htmlFor={`bc-phash-${i}`} style={{ display: 'block', marginBottom: 8 }}>Hash Anterior:</label>
                  <input
                    id={`bc-phash-${i}`}
                    type="text"
                    value={b.previousHash}
                    readOnly
                    style={previousHashStyle}
                  />
                </div>

                <div>
                  <label htmlFor={`bc-hash-${i}`} style={{ display: 'block', marginBottom: 8 }}>Hash:</label>
                  <input
                    id={`bc-hash-${i}`}
                    type="text"
                    value={b.hash}
                    ref={i === 0 ? firstHashRef : undefined}
                    readOnly
                    style={hashInputStyle}
                  />
                </div>
              </div>

              <div style={{ marginTop: 16 }}>
                <button
                  ref={i === 0 ? firstMineBtnRef : undefined}
                  onMouseEnter={() => { if (i === 0 && step === 4) setStep(5) }}
                  onClick={() => mineBlock(i)}
                  className="btn btn-primary"
                  style={{ padding: '8px 14px' }}
                >
                  Minerar
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  // Teoria paginada usando os mesmos textos do Onboarding (Blockchain)
  const [theoryPage, setTheoryPage] = useState(0)

  const blockchainOnboardingSteps: OnboardingStep[] = [
    {
      title: 'O que é Blockchain?',
      content: (
        <div>
          <p>Uma blockchain é uma cadeia de blocos interligados que registra transações de forma segura e transparente.</p>
          <p>Cada bloco contém dados, um hash e o hash do bloco anterior. Alterações em um bloco invalidam toda a cadeia subsequente.</p>
        </div>
      )
    },
    {
      title: 'Como os blocos se conectam?',
      content: (
        <div>
          <p>Cada bloco armazena o <strong>hash do bloco anterior</strong>, criando um encadeamento seguro.</p>
          <p>Isso garante integridade e imutabilidade, tornando quase impossível alterar blocos antigos sem recalcular toda a cadeia.</p>
        </div>
      )
    },
    {
      title: 'Segurança da blockchain',
      content: (
        <div>
          <p>A segurança vem de três pilares:</p>
          <ul>
            <li><strong>Hashes:</strong> cada bloco tem seu hash único.</li>
            <li><strong>Proof of Work:</strong> mineração com esforço computacional.</li>
            <li><strong>Distribuição:</strong> replicação em múltiplos nós da rede.</li>
          </ul>
        </div>
      )
    },
    {
      title: 'Mineração e consenso',
      content: (
        <div>
          <p>Para adicionar um bloco, é necessário resolver um problema de mineração (ajustar nonce para hash válido).</p>
          <p>Todos os nós da rede devem concordar sobre a validade do bloco (consenso).</p>
        </div>
      )
    },
    {
      title: 'Exemplo prático',
      content: (
        <div>
          <p>Imagine três blocos: alterar dados no primeiro muda todos os hashes subsequentes, invalidando a cadeia.</p>
          <p>Isso demonstra a segurança e imutabilidade da blockchain.</p>
        </div>
      )
    },
    {
      title: 'Boas práticas',
      content: (
        <div>
          <ul>
            <li>Não armazene dados sensíveis diretamente nos blocos.</li>
            <li>Valide hashes e transações antes de adicionar blocos.</li>
            <li>Use nós confiáveis para manter a integridade da cadeia.</li>
          </ul>
        </div>
      )
    }
  ]

  // renderTeoria (NOVA VERSÃO PAGINADA)
  const renderTeoria = () => {
    const theoryPages = blockchainOnboardingSteps
    const theoryTexts = [
      'Uma blockchain é uma cadeia de blocos interligados que registra transações de forma segura e transparente. Cada bloco contém dados, um hash e o hash do bloco anterior. Alterações em um bloco invalidam toda a cadeia subsequente.',
      'Cada bloco armazena o hash do bloco anterior, criando um encadeamento seguro. Isso garante integridade e imutabilidade, tornando quase impossível alterar blocos antigos sem recalcular toda a cadeia.',
      'A segurança vem de três pilares: Hashes (cada bloco tem seu hash único), Proof of Work (mineração com esforço computacional) e Distribuição (replicação em múltiplos nós da rede).',
      'Para adicionar um bloco, é necessário resolver um problema de mineração (ajustar nonce para hash válido). Todos os nós da rede devem concordar sobre a validade do bloco (consenso).',
      'Imagine três blocos: alterar dados no primeiro muda todos os hashes subsequentes, invalidando a cadeia. Isso demonstra a segurança e imutabilidade da blockchain.',
      'Boas práticas: não armazene dados sensíveis diretamente nos blocos; valide hashes e transações antes de adicionar blocos; use nós confiáveis para manter a integridade da cadeia.'
    ]

    const nextTheory = () => setTheoryPage((p) => Math.min(p + 1, theoryPages.length - 1))
    const prevTheory = () => setTheoryPage((p) => Math.max(p - 1, 0))

    return (
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
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 820 }}>
        <h2 style={{ textAlign: 'center' }}>Módulo 3: Blockchain</h2>
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

        {/* CONTEÚDO DAS ABAS */}
        {activeTab === 'teoria' && (
          <div>
            <h3>Teoria - Blockchain</h3>
            <p>Aprenda sobre os conceitos fundamentais de Blockchain.</p>
            {renderTeoria()}
          </div>
        )}
        {activeTab === 'quiz' && (
          <div>
            <h3>Quiz - Blockchain</h3>
            <Quiz
              questions={randomTenQuestions}
              onFinish={(score: number, total: number) => {
                try {
                  localStorage.setItem('blockchainScore', String(score))
                  localStorage.setItem('blockchainTotal', String(total))
                  localStorage.setItem('blockchainCompleted', 'true')
                } catch {}
              }}
            />
          </div>
        )}
        {activeTab === 'pratica' && (
          <div>
            <h3>Prática - Blockchain</h3>
            {/* Botão "Iniciar Tour Guiado" removido; tour inicia automaticamente */}
            {renderPratica()}

            {tooltipPos && step != null && (
              <div
                style={{
                  position: 'absolute',
                  top: tooltipPos.top,
                  left: tooltipPos.left,
                  width: 320,
                  padding: 16,
                  background: 'rgba(12, 22, 32, 0.92)',
                  color: '#eaf1f8',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 12,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                  zIndex: 9999
                }}
              >
                {step === 1 && <p>Este é o primeiro bloco da blockchain.</p>}
                {step === 3 && <p>Edite os dados para ver como o hash se altera.</p>}
                {step === 4 && <p>O hash ficou inválido, veja a marcação vermelha.</p>}
                {step === 5 && <p>Agora clique em "Minerar" para recalcular o hash corretamente.</p>}
                {step === 6 && <p>O hash agora é válido. ✅</p>}
                {step === 7 && <p>Tour concluído! Você já entende como a blockchain funciona na prática.</p>}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default BlockchainModule