import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './styles/modules-list.css'

function ModulesList() {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const highlight = params.get('highlight')
  const [activeHighlight, setActiveHighlight] = useState<string | null>(null)
  const hashRef = useRef<HTMLDivElement | null>(null)

  const canTakeFinal =
    localStorage.getItem('hashCompleted') === 'true' &&
    localStorage.getItem('blockCompleted') === 'true' &&
    localStorage.getItem('blockchainCompleted') === 'true'

  useEffect(() => {
    if (highlight === 'hash') {
      setTimeout(() => {
        setActiveHighlight('hash')
        hashRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        setTimeout(() => setActiveHighlight(null), 4500)
      }, 250)
    }
  }, [highlight])

  return (
    <div className="modules-page">
      <h1 className="page-title">Construtor de Blocos</h1>
      <p className="subtitle">Escolha um módulo para começar sua jornada</p>

      <div className="modules-grid">
        <div className="module-card intro">
          <h2>Quiz Inicial</h2>
          <p>Teste seus conhecimentos antes de iniciar os estudos.</p>
          <Link className="btn" to="/intro-quiz">Fazer Quiz Inicial</Link>
        </div>

        <div
          ref={hashRef}
          className={`module-card ${activeHighlight === 'hash' ? 'highlight' : ''}`}
        >
          <h2>Módulo 1: Criptografia & Hash</h2>
          <p>Explore o SHA-256 e o funcionamento das funções de hash.</p>
          <Link className="btn" to="/hash">Abrir</Link>
        </div>

        <div className="module-card">
          <h2>Módulo 2: Bloco</h2>
          <p>Aprenda como um bloco é construído e minerado.</p>
          <Link className="btn" to="/block">Abrir</Link>
        </div>

        <div className="module-card">
          <h2>Módulo 3: Blockchain</h2>
          <p>Veja como os blocos são encadeados em uma blockchain.</p>
          <Link className="btn" to="/blockchain">Abrir</Link>
        </div>

        <div className="module-card final">
          <h2>Quiz Final</h2>
          <p>Disponível após concluir todos os módulos.</p>
          {canTakeFinal ? (
            <Link className="btn" to="/final-quiz">Fazer Quiz Final</Link>
          ) : (
            <span className="locked">Conclua os módulos para liberar</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ModulesList
