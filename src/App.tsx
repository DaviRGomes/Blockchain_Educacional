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

function App() {
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    try {
      const done = localStorage.getItem('onboardingCompleted') === 'true'
      setShowOnboarding(!done)
    } catch {
      setShowOnboarding(true)
    }
  }, [])
  return (
    <div>
      <h1>Blockchain Educacional</h1>
      <Routes>
        <Route path="/" element={<IntroQuiz />} />
        <Route path="/modules" element={<ModulesList />} />
        <Route path="/hash" element={<HashModule />} />
        <Route path="/block" element={<BlockModule />} />
        <Route path="/blockchain" element={<BlockchainModule />} />
        <Route path="/final-quiz" element={<FinalQuiz />} />
      </Routes>

  {showOnboarding && <Onboarding onFinish={() => setShowOnboarding(false)} />}
    </div>
  )
}

export default App