import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './styles/onboarding.css'

function ModulesList() {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const highlight = params.get('highlight')
  const [activeHighlight, setActiveHighlight] = useState<string | null>(null)
  const hashRef = useRef<HTMLDivElement | null>(null)

  const canTakeFinal =
    (localStorage.getItem('hashCompleted') === 'true') &&
    (localStorage.getItem('blockCompleted') === 'true') &&
    (localStorage.getItem('blockchainCompleted') === 'true')

  useEffect(() => {
    if (highlight === 'hash') {
      setTimeout(() => {
        setActiveHighlight('hash')
        if (hashRef.current) {
          hashRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
        // remove highlight after some seconds
        setTimeout(() => setActiveHighlight(null), 4500)
      }, 250)
    }
  }, [highlight])

  return (
    <div>
      <h2>Módulos</h2>

      <div className="module-card" style={{ border: '1px solid #ccc', padding: 16, marginBottom: 16 }}>
        <h3>Quiz Inicial</h3>
        <p>Teste seus conhecimentos antes de iniciar os estudos.</p>
        <Link to="/intro-quiz">Fazer Quiz Inicial</Link>
      </div>

      <div style={{ display: 'grid', gap: 16 }}>
        <div ref={hashRef} className={`module-card ${activeHighlight === 'hash' ? 'highlight' : ''}`} style={{ border: '1px solid #ccc', padding: 16 }}>
          <h3>Módulo 1: Hash</h3>
          <p>Explora SHA256 e propriedades de função hash.</p>
          <Link to="/hash">Abrir</Link>
        </div>
        <div className="module-card" style={{ border: '1px solid #ccc', padding: 16 }}>
          <h3>Módulo 2: Bloco</h3>
          <p>Como um bloco é montado, hash e mineração.</p>
          <Link to="/block">Abrir</Link>
        </div>
        <div className="module-card" style={{ border: '1px solid #ccc', padding: 16 }}>
          <h3>Módulo 3: Blockchain</h3>
          <p>Blocos encadeados, previous hash e mineração em cadeia.</p>
          <Link to="/blockchain">Abrir</Link>
        </div>
        <div className="module-card" style={{ border: '1px solid #ccc', padding: 16 }}>
          <h3>Quiz Final</h3>
          <p>Disponível após concluir os quizzes dos 3 módulos.</p>
          {canTakeFinal ? (
            <Link to="/final-quiz">Fazer Quiz Final</Link>
          ) : (
            <span style={{ color: '#888' }}>Conclua todos os módulos para liberar</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ModulesList