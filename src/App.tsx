import React from 'react'
import HashModule from './components/HashModule'
import BlockModule from './components/BlockModule'
import BlockchainModule from './components/BlockchainModule'
import { Routes, Route } from 'react-router-dom'
import ModulesList from './components/ModulesList'

function App() {
  return (
    <div>
      <h1>Blockchain Educacional</h1>
      <Routes>
        <Route path="/" element={<ModulesList />} />
        <Route path="/hash" element={<HashModule />} />
        <Route path="/block" element={<BlockModule />} />
        <Route path="/blockchain" element={<BlockchainModule />} />
      </Routes>
    </div>
  )
}

export default App