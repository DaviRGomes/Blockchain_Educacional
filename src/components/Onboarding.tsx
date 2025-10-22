import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/onboarding.css'

type Step = {
  title: string
  content: React.ReactNode
}

type Props = {
  onFinish?: () => void
}

function Onboarding({ onFinish }: Props) {
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)

  const steps: Step[] = [
    {
      title: 'Bem-vindo',
      content: (
        <div>
          <p>
            Bem-vindo(a) à <strong>Blockchain Educacional</strong>! Criamos esta plataforma para transformar a maneira como você aprende sobre essa tecnologia, trocando a teoria complexa pela prática visual e interativa.
          </p>
          <p>
            Sua jornada será dividida em três módulos: Hash, Bloco e Blockchain.
          </p>
          <p>
            O método é simples: primeiro, uma explicação clara do conceito e, logo depois, uma prática guiada para você testar, interagir e ver tudo funcionando com seus próprios olhos.
          </p>
        </div>
      )
    },
    {
      title: 'Módulo 1: A Impressão Digital',
      content: (
        <div>
          <p>Ok, que bom que você decidiu seguir!</p>
          <p>
            Nosso primeiro módulo é o Hash. A melhor forma de pensar nele é como a impressão digital de qualquer dado digital.
          </p>
          <p>
            Na blockchain, ele é o super-herói da segurança! Cada bloco usa o hash para criar um "lacre" único e inviolável. Se alguém tentar mudar qualquer coisinha lá dentro (mesmo uma vírgula), a impressão digital muda completamente.
          </p>
          <p>
            É isso que torna a cadeia tão segura e à prova de adulterações.
          </p>
          <p>
            Agora que você conhece o poder do Hash, que tal praticarmos?
          </p>
        </div>
      )
    }
  ]

  const goNext = () => {
    if (index < steps.length - 1) {
      setIndex(index + 1)
    } else {
      finish()
    }
  }

  const finish = () => {
    try {
      localStorage.setItem('onboardingCompleted', 'true')
    } catch {}
    // hide the onboarding in the parent then navigate to hash
    try { onFinish && onFinish() } catch {}
    navigate('/')
  }

  const step = steps[index]

  return (
    <div className="onboarding-overlay">
      <div className="onboarding-modal" role="dialog" aria-modal="true" aria-labelledby="onboarding-title">
        <div className="onboarding-header">
          <h2 id="onboarding-title">{step.title}</h2>
          <div className="onboarding-dots" aria-hidden>
            {steps.map((_, i) => (
              <span key={i} className={`dot ${i === index ? 'active' : ''}`} />
            ))}
          </div>
        </div>

        <div className="onboarding-content">{step.content}</div>

        <div className="onboarding-footer">
          <div>
            {index > 0 && <button className="btn btn-ghost" onClick={() => setIndex(index - 1)} style={{ marginRight: 8 }}>Voltar</button>}
            <button className="btn btn-primary" onClick={goNext}>{index === steps.length - 1 ? 'Vamos?' : 'Vamos lá?'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Onboarding
