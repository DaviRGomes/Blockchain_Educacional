import React from 'react'
import HashModule from './components/HashModule'
import BlockModule from './components/BlockModule'
import BlockchainModule from './components/BlockchainModule'
import { Routes, Route } from 'react-router-dom'
import ModulesList from './components/ModulesList'
import IntroQuiz from './components/IntroQuiz'
import FinalQuiz from './components/FinalQuiz'

function App() {
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
    </div>
  )
}

export default App