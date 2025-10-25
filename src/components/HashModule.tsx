import React, { useEffect, useRef, useState } from 'react'
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
  // Se a aba não for 'pratica', simplesmente ignora
  if (activeTab !== 'pratica') {
    // É crucial que o step seja resetado por outro useEffect (o que você já tem)
    return;
  }
  
  // Agora estamos na aba 'pratica'. Se o tour ainda não começou (step == null), iniciamos.
  if (step === null) {
    console.log('Iniciando tour: activeTab é pratica e step é null'); 
    try {
      const completed = localStorage.getItem('hashCompleted') === 'true';
      if (!completed) {
        // Usamos setTimeout para garantir que o DOM esteja renderizado antes de calcular a posição do tooltip.
        window.requestAnimationFrame(() => setTimeout(() => setStep(1), 50));
      }
    } catch {
      window.requestAnimationFrame(() => setTimeout(() => setStep(1), 50));
    }
  }
  
  }, [activeTab, step]); // Dependências ok.


  // 8. Renderização Principal (Teoria | Quiz | Prática)
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 820 }}>
        <h2 style={{ textAlign: 'center' }}>Módulo 1: Hash</h2>
        {/* Module-specific onboarding (rich theory) */}
        {showModuleOnboarding && (
          <Onboarding
            onFinish={() => {
              try { localStorage.setItem('hashModuleOnboarding', 'true') } catch {}
              setShowModuleOnboarding(false)
              setActiveTab('quiz')
            }}
            steps={[
              {
                title: 'O que é uma Função Hash?',
                content: (
                  <div>
                    <p>
                      Uma função hash é um algoritmo que mapeia dados de tamanho arbitrário para um valor de tamanho fixo — o hash. Exemplo comum: SHA-256 gera 256 bits (64 chars em hex).
                    </p>
                    <p>
                      Propriedades importantes:
                    </p>
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
                    <p>
                      Ataques possíveis:
                    </p>
                    <ul>
                      <li><strong>Força bruta</strong>: tentar inputs até encontrar um hash alvo (cara a cara com a dificuldade de mineração).</li>
                      <li><strong>Criptoanálise</strong>: técnicas teóricas para explorar propriedades fracas de uma função hash — raras em SHA-256.</li>
                    </ul>
                    <p>
                      Por isso, blockchains usam funções fortes (SHA-256) e parâmetros de dificuldade para tornar a prova de trabalho custosa.
                    </p>
                  </div>
                )
              },
              {
                title: 'Representação prática',
                content: (
                  <div>
                    <p>
                      No painel de prática deste módulo você pode digitar texto e gerar o SHA-256. Experimente pequenas mudanças e veja o efeito avalanche.
                    </p>
                    <p>
                      Exemplo curto: "hello" → hash A; "hello!" → hash B totalmente diferente.
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
            ]}
          />
        )}

        {/* BOTOES TEORIA | QUIZ | PRÁTICA */}
        <div style={{ marginBottom: 16 }}>
          <button 
            onClick={() => setActiveTab('teoria')}
            style={activeTab === 'teoria' ? { fontWeight: 'bold', borderBottom: '2px solid black' } : {}}
          >
            Teoria
          </button>
          <button 
            onClick={() => setActiveTab('quiz')}
            style={activeTab === 'quiz' ? { fontWeight: 'bold', borderBottom: '2px solid black' } : {}}
          >
            Quiz
          </button>
          <button 
            onClick={() => setActiveTab('pratica')}
            style={activeTab === 'pratica' ? { fontWeight: 'bold', borderBottom: '2px solid black' } : {}}
          >
            Prática
          </button>
        </div>
        <hr style={{ margin: '0 0 20px 0' }} />

        {/* CONTEÚDO DA ABA TEORIA */}
        {activeTab === 'teoria' && (
          <div>
            
          </div>
        )}

        {/* CONTEÚDO DA ABA QUIZ */}
        {activeTab === 'quiz' && (
          <div>
            <h3>Quiz - Hash</h3>
            <Quiz
              title="Quiz - Hash"
              questions={hashQuestions} 
              onFinish={(score: number, total: number) => {
                try {
                  localStorage.setItem('hashScore', String(score))
                  localStorage.setItem('hashTotal', String(total))
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