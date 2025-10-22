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


function HashModule() {
  const [text, setText] = useState('')
  const [hash, setHash] = useState('')
  const [activeTab, setActiveTab] = useState<'teoria' | 'quiz' | 'pratica'>('teoria') 
  const [step, setStep] = useState<number | null>(null) 

  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const hashRef = useRef<HTMLInputElement | null>(null)

  const [tooltipPos, setTooltipPos] = useState<TooltipPos | null>(null)
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
            <h3>Teoria - Hash</h3>
            <p>
              Funções hash (ex: SHA256) geram uma “impressão digital” de dados. São determinísticas, de sentido único
              e apresentam o efeito avalanche: pequenas mudanças no input causam grandes mudanças no output.
            </p>
            <ul>
              <li>Determinismo: mesmo input → mesmo hash.</li>
              <li>Unidirecionalidade: não é possível recuperar o input a partir do hash.</li>
              <li>Efeito avalanche: pequenas mudanças causam hashes totalmente diferentes.</li>
            </ul>
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