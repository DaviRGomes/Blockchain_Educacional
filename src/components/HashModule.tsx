import React, { useEffect, useRef, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import CryptoJS from 'crypto-js'
import Quiz from '../components/Quiz' // Assumindo que Quiz está em 'components'
// Importações para o Tour Guiado:
import GuidedTooltip, { TooltipPos } from '../components/GuidedTooltip' 
import { HashTourSteps, TourStepContent } from '../data/tourSteps'
// Certifique-se de que este componente Quiz está usando as perguntas corretamente
import { hashQuestions } from '../data/quizHash'
import './styles/onboarding.css' // garante estilos do tooltip
import Onboarding from './Onboarding'

// Função utilitária para embaralhar array usando algoritmo Fisher-Yates
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array] // Não modifica o array original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function HashModule() {
  const [text, setText] = useState('')
  const [hash, setHash] = useState('')
  const [activeTab, setActiveTab] = useState<'teoria' | 'quiz' | 'pratica'>('teoria') 
  const [step, setStep] = useState<number | null>(null) 

  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const hashRef = useRef<HTMLInputElement | null>(null)

  const [tooltipPos, setTooltipPos] = useState<TooltipPos | null>(null)
  const [showModuleOnboarding, setShowModuleOnboarding] = useState(false)
  const navigate = useNavigate()
  
  const computeHash = (txt: string) => CryptoJS.SHA256(txt).toString()
  const timeoutsRef = useRef<number[]>([])
  const pushTimeout = (id: number) => { timeoutsRef.current.push(id) }

  // Teoria paginada usando os mesmos textos do Onboarding
  const [theoryPage, setTheoryPage] = useState(0)
  const hashTeoriaSteps = [
    {
      title: 'O que é uma Função Hash?',
      content: (
        <div>
          <p>
            Uma função hash é um algoritmo que mapeia dados de tamanho arbitrário para um valor de tamanho fixo — o hash. Exemplo comum: SHA-256 gera 256 bits (64 chars em hex).
          </p>
          <p>Propriedades importantes:</p>
          <ul>
            <li><strong>Determinismo</strong>: o mesmo input sempre produz o mesmo hash.</li>
            <li><strong>Unidirecionalidade</strong>: não é viável (na prática) inverter o hash para recuperar o input.</li>
            <li><strong>Efeito Avalanche</strong>: pequenas alterações no input resultam em alterações completamente diferentes no hash.</li>
            <li><strong>Tamanho fixo</strong>: independentemente do tamanho do input, o hash tem tamanho constante.</li>
          </ul>
        </div>
      )
    },
    {
      title: 'Por que Hash é útil na Blockchain?',
      content: (
        <div>
          <p>
            Em uma blockchain, o hash funciona como uma "impressão digital" de blocos e transações. Ele garante integridade: qualquer alteração nos dados altera o hash e quebra a cadeia.
          </p>
          <p>
            Em blocos, normalmente usamos o hash do bloco anterior (previousHash) para ligar blocos. Assim, alterar um bloco exige recalcular todos os blocos subsequentes.
          </p>
        </div>
      )
    },
    {
      title: 'Segurança: colisões e força bruta',
      content: (
        <div>
          <p>
            Uma <em>colisão</em> é quando dois inputs diferentes produzem o mesmo hash. Algoritmos modernos (SHA-256) são projetados para reduzir ao máximo a chance de colisões.
          </p>
          <p>Ataques possíveis:</p>
          <ul>
            <li><strong>Força bruta</strong>: tentar inputs até encontrar um hash alvo.</li>
            <li><strong>Criptoanálise</strong>: explorar propriedades fracas da função — raras em SHA-256.</li>
          </ul>
          <p>
            Por isso, blockchains usam funções fortes (SHA-256) e parâmetros de dificuldade para tornar a prova de trabalho custosa.
          </p>
        </div>
      )
    },
    {
      title: 'Boas práticas',
      content: (
        <div>
          <p>
            Importante: hashes não são criptografia de dados sensíveis (sem salt/pepper). Para armazenamento de senhas, use funções KDF (bcrypt, scrypt, Argon2) com salt.
          </p>
          <p>
            Para integridade e encadeamento, hashes puros (SHA-256) são apropriados e usados amplamente em blockchains.
          </p>
        </div>
      )
    }
  ]
  const theoryPages = hashTeoriaSteps
  const nextTheory = () => setTheoryPage((p) => Math.min(p + 1, theoryPages.length - 1))
  const prevTheory = () => setTheoryPage((p) => Math.max(p - 1, 0))

  // Embaralha hashQuestions apenas uma vez na montagem e seleciona 10 perguntas aleatórias
  const randomTenQuestions = useMemo(() => {
    const shuffled = shuffleArray(hashQuestions)
    return shuffled.slice(0, 10)
  }, [])

  // 1. useEffect para TooltipPos (Lógica de Posicionamento)
  useEffect(() => {
    // console.log('useEffect posicionamento - step:', step, 'activeTab:', activeTab); // Mantido para depuração
    
    const target =
      step === 1 || step === 4 ? textareaRef.current : step === 2 || step === 5 ? buttonRef.current : step === 3 || step === 6 ? hashRef.current : null

    // console.log('Target element:', target); // Mantido para depuração

    if (step === 7) {
      // Usando 'as const' para garantir o tipo literal 'right'
      const pos = { top: 90, left: Math.max(240, window.innerWidth - 360), placement: 'right' as const }; 
      // console.log('Step 7 - definindo posição:', pos); // Mantido para depuração
      setTooltipPos(pos);
      return
    }

    if (!target) {
      // console.log('Nenhum target encontrado, removendo tooltip'); // Mantido para depuração
      setTooltipPos(null)
      return
    }
    const rect = target.getBoundingClientRect()
    const tooltipWidth = 320
    const margin = 12

    let placement: TooltipPos['placement'] = 'top'
    if (step === 1) placement = 'right'
    else if (rect.top < 160) placement = 'right'

    let top = 0
    let left = 0

    if (step === 2) placement = 'left'
    if (placement === 'top') {
      // Usando coordenadas de viewport (sem scrollX/scrollY)
      top = rect.top - 12
      left = rect.left + rect.width / 2
      const minLeft = margin + tooltipWidth / 2
      const maxLeft = window.innerWidth - margin - tooltipWidth / 2
      left = Math.min(Math.max(left, minLeft), maxLeft)
    } else {
      top = rect.top + rect.height / 2
      left = rect.left + rect.width + 12
      const maxLeft = window.innerWidth - margin - tooltipWidth
      left = Math.min(left, maxLeft)
    }

    const finalPos = { top: Math.max(margin, top), left: Math.max(margin, left), placement };
    // console.log('Posição final do tooltip:', finalPos); // Mantido para depuração
    setTooltipPos(finalPos);
  }, [step, activeTab])

  // 2. useEffect para Limpeza e Resize (Lógica correta)
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

  // 3. useEffect para resetar tour ao mudar de aba (Lógica correta)
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

  // 4. Handlers (Lógica de Avanço do Tour)
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
      pushTimeout(id1); pushTimeout(id2)
    } else if (step === 5) {
      const id1 = window.setTimeout(() => setStep(6), 200)
      const id2 = window.setTimeout(() => setStep(7), 3500)
      pushTimeout(id1); pushTimeout(id2)
    }
  }

  // 5. LÓGICA SIMPLIFICADA DE CONTEÚDO: Puxa dos dados
  const renderTooltipContent = (): TourStepContent | null => {
    if (step === null) return null;
    const content = HashTourSteps[step] || null;
    // console.log('renderTooltipContent - step:', step, 'content:', content); // Mantido para depuração
    return content;
  }
  
  const tooltipContent = renderTooltipContent()


  // 6. Navegação para /block (Lógica correta)
  useEffect(() => {
    if (activeTab === 'pratica' && step === 7) {
      // Removido timeout de navegação automática; segue o modelo do onboarding via botão
      // Opcional: marcar conclusão aqui ou apenas no clique do botão (preferível no clique)
    }
    return
  }, [activeTab, step, navigate])

  // 7. Inicia o tutorial somente ao entrar na aba Prática (Lógica correta)
  // 7. Inicia o tutorial somente ao entrar na aba Prática
useEffect(() => {
  // Se a aba não for 'pratica', ignora
  if (activeTab !== 'pratica') return

  // Ao entrar em prática, sempre inicia o tour se ainda não começou
  if (step === null) {
    window.requestAnimationFrame(() => setTimeout(() => setStep(1), 50))
  }

}, [activeTab, step])


  // 8. Renderização Principal (Teoria | Quiz | Prática)
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 820 }}>
        <h2 style={{ textAlign: 'center' }}>Módulo 1: Hash</h2>
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
            <h3>Teoria - Hash</h3>
            <p>Aprenda sobre os conceitos fundamentais de Hash.</p>
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
                  className="btn btn-ghost"
                  onClick={prevTheory}
                  disabled={theoryPage === 0}
                  style={{ padding: '8px 14px' }}
                >
                  Anterior
                </button>

                <span style={{ color: '#a8b3c7' }}>
                  Página {theoryPage + 1} de {theoryPages.length}
                </span>

                {theoryPage < theoryPages.length - 1 ? (
                  <button
                    className="btn btn-primary"
                    onClick={nextTheory}
                    style={{ padding: '8px 14px' }}
                  >
                    Próximo
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => setActiveTab('quiz')}
                    style={{ padding: '8px 14px' }}
                  >
                    Concluir Teoria
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* CONTEÚDO DA ABA QUIZ */}
        {activeTab === 'quiz' && (
          <div>
            <h3>Quiz - Hash</h3>
            <Quiz
              questions={randomTenQuestions}
              onFinish={(score: number, total: number) => {
                try {
                  localStorage.setItem('hashScore', String(score))
                  localStorage.setItem('hashTotal', String(total))
                  localStorage.setItem('hashCompleted', 'true')
                } catch {}
              }}
            />
          </div>
        )}

        {/* CONTEÚDO DA ABA PRÁTICA */}
        {activeTab === 'pratica' && (
          <>
            <h3>Prática - Hash</h3>
            <div style={{ display: 'grid', gap: 12 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 8 }}>Texto:</label>
                <textarea
                  ref={textareaRef}
                  value={text}
                  onChange={(e) => handleTextChange(e.target.value)}
                  placeholder="Digite o texto para gerar o hash..."
                  rows={4}
                  style={{ width: '100%', padding: 10, fontSize: 14 }}
                />
              </div>

              <div>
                <button ref={buttonRef} onClick={handleEncrypt} style={{ padding: '10px 14px', borderRadius: 8 }}>
                  Criptografar
                </button>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: 8 }}>Hash (SHA256):</label>
                <input ref={hashRef} readOnly value={hash} style={{ width: '100%', padding: 10, fontFamily: 'monospace' }} />
              </div>
            </div>
            
            {tooltipPos && tooltipContent && (
                <GuidedTooltip
                  content={tooltipContent}
                  pos={tooltipPos}
                  // Exibe CTA apenas no passo final do tour
                  actionLabel={step === 7 ? 'Ir para o próximo módulo' : undefined}
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
