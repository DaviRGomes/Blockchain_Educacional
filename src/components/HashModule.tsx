import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CryptoJS from 'crypto-js'

type TooltipPos = { top: number; left: number; placement: 'top' | 'right' | 'bottom' | 'left' }

function HashModule() {
  const [text, setText] = useState('')
  const [hash, setHash] = useState('')
  const [step, setStep] = useState(1) // tutorial step 1..7

  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const hashRef = useRef<HTMLInputElement | null>(null)

  const [tooltipPos, setTooltipPos] = useState<TooltipPos | null>(null)

  const computeHash = (txt: string) => CryptoJS.SHA256(txt).toString()
  // timeouts management
  const timeoutsRef = useRef<number[]>([])
  const pushTimeout = (id: number) => { timeoutsRef.current.push(id) }

  // update tooltip position when step changes
  useEffect(() => {
    const target =
      step === 1 || step === 4 ? textareaRef.current : step === 2 || step === 5 ? buttonRef.current : step === 3 || step === 6 ? hashRef.current : null

    if (step === 7) {
      // corner (bottom-right-ish)
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

  // Prefer showing above target, but force right placement for step 1
  let placement: TooltipPos['placement'] = 'top'
  if (step === 1) placement = 'right'
  else if (rect.top < 160) placement = 'right'

    let top = 0
    let left = 0

    if (step === 2) placement = 'left'
    if (placement === 'top') {
      top = rect.top + window.scrollY - 12
      left = rect.left + window.scrollX + rect.width / 2
      // clamp horizontally so tooltip doesn't overflow
      const minLeft = margin + tooltipWidth / 2
      const maxLeft = window.innerWidth - margin - tooltipWidth / 2
      left = Math.min(Math.max(left, minLeft), maxLeft)
    } else {
      // right placement: vertically centered next to element
      top = rect.top + window.scrollY + rect.height / 2
      left = rect.left + window.scrollX + rect.width + 12
      // ensure it doesn't overflow right edge
      const maxLeft = window.innerWidth - margin - tooltipWidth
      left = Math.min(left, maxLeft)
    }

    setTooltipPos({ top: Math.max(margin, top), left: Math.max(margin, left), placement })
  }, [step])

  useEffect(() => {
    const onResize = () => setStep((s) => s) // trigger reposition
    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onResize)
      // clear pending timeouts
      timeoutsRef.current.forEach((id) => clearTimeout(id))
    }
  }, [])

  // handlers
  const handleTextChange = (v: string) => {
    const prev = text
    setText(v)
    if (step === 1 && v.trim().length > 0) {
      // advance to step 2 when user types
      const id = window.setTimeout(() => setStep(2), 250)
      pushTimeout(id)
    }
    if (step === 4 && v !== prev) {
      // user changed text for avalanche test -> step 5
      const id = window.setTimeout(() => setStep(5), 250)
      pushTimeout(id)
    }
  }

  const handleEncrypt = () => {
    const h = computeHash(text)
    setHash(h)
    if (step === 2) {
      const id1 = window.setTimeout(() => setStep(3), 200)
      const id2 = window.setTimeout(() => setStep(4), 3500) // keep step 3 visible longer
      pushTimeout(id1); pushTimeout(id2)
    } else if (step === 5) {
      const id1 = window.setTimeout(() => setStep(6), 200)
      const id2 = window.setTimeout(() => setStep(7), 3500)
      pushTimeout(id1); pushTimeout(id2)
    }
  }

  const renderTooltipContent = () => {
    switch (step) {
      case 1:
        return {
          title: 'Vamos Começar',
          text: 'Como dissemos, o Hash é a "impressão digital" de qualquer dado.\n\nPara começar, digite seu nome (ou qualquer palavra) neste campo de texto.'
        }
      case 2:
        return { title: 'Gerar o Hash', text: 'Ótimo. Agora, clique no botão "Criptografar" para gerar a impressão digital única do seu nome.' }
      case 3:
        return { title: 'Aqui Está!', text: 'Pronto! Este é o Hash (a impressão digital) do seu nome. Observe bem este código.\n\nAgora, vamos testar o "Efeito Avalanche"...' }
      case 4:
        return { title: 'Teste a Segurança', text: 'Volte ao campo de texto e adicione apenas uma letra no final do seu nome (por exemplo, "Phyllipes").\n\nApenas uma pequena mudança.' }
      case 5:
        return { title: 'Recalcular', text: 'Clique em "Criptografar" novamente para gerar a nova impressão digital.' }
      case 6:
        return { title: 'Viu só?', text: 'Repare! Você mudou uma única letra, mas o hash mudou completamente!\n\nEste é o Efeito Avalanche.' }
      case 7:
        return { title: 'Prática Concluída!', text: 'Isso também prova que o processo é irreversível: você pode criar um hash a partir de um texto, mas não pode descobrir o texto original a partir do hash. Parabéns!' }
      default:
        return null
    }
  }

  const tooltip = renderTooltipContent()

  // navigation: when tutorial completes (step 7), mark completion and navigate to /block
  const navigate = useNavigate()
  useEffect(() => {
    if (step === 7) {
      try {
        localStorage.setItem('hashCompleted', 'true')
      } catch (e) {
        // ignore localStorage errors
      }
      const id = window.setTimeout(() => {
        navigate('/block')
      }, 3000)
      pushTimeout(id)
      return () => clearTimeout(id)
    }
    return
  }, [step, navigate])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 820 }}>
        <h2 style={{ textAlign: 'center' }}>Módulo 1: Hash (Prática)</h2>

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

        {tooltipPos && tooltip && (
          <div
            className={`guided-tooltip placement-${tooltipPos.placement}`}
            style={{ position: 'absolute', top: tooltipPos.top + 'px', left: tooltipPos.left + 'px', transform: tooltipPos.placement === 'top' ? 'translate(-50%, -110%)' : 'translate(0, -50%)' }}
          >
            <div className="guided-tooltip-card">
              <h4>{tooltip.title}</h4>
              <p style={{ whiteSpace: 'pre-wrap' }}>{tooltip.text}</p>
            </div>
            <div className="guided-tooltip-arrow" />
          </div>
        )}
      </div>
    </div>
  )
}

export default HashModule