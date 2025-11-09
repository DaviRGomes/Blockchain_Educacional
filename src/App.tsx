import React from 'react'
import HashModule from './components/HashModule'
import BlockModule from './components/BlockModule'
import BlockchainModule from './components/BlockchainModule'
import { Routes, Route } from 'react-router-dom'
import ModulesList from './components/ModulesList'
import IntroQuiz from './components/IntroQuiz'
import FinalQuiz from './components/FinalQuiz'
import Onboarding from './components/Onboarding'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function App() {
  const [showOnboarding, setShowOnboarding] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Sempre mostra no carregamento inicial
    setShowOnboarding(true)
  }, [])
  return (
    <div className="app-container">
      <div className="content-container">
        <h1 style={{ color: 'var(--text-white)', textAlign: 'center' }}>
          Blockchain Educacional
        </h1>
        {/* Rotas principais – mantém ModulesList como página inicial */}
        <Routes>
          <Route path="/" element={<ModulesList />} />
          <Route path="/modules" element={<ModulesList />} />
          <Route path="/intro-quiz" element={<IntroQuiz />} />
          <Route path="/hash" element={<HashModule />} />
          <Route path="/block" element={<BlockModule />} />
          <Route path="/blockchain" element={<BlockchainModule />} />
          <Route path="/final-quiz" element={<FinalQuiz />} />
        </Routes>
        {showOnboarding && (
          <Onboarding
            onFinish={() => {
              setShowOnboarding(false)
              navigate('/')
            }}
          />
        )}
      </div>
    </div>
  )
}

export default App