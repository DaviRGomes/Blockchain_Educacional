import React, { useState } from 'react'
import CryptoJS from 'crypto-js'
import Quiz from './Quiz'
import { hashQuestions } from '../data/quizData'

function HashModule() {
    const [activeTab, setActiveTab] = useState(null)
    return (
      <div>
        <h2>Módulo 1: Hash SHA256</h2>
        
        <div>
          <button onClick={() => setActiveTab('teoria')}>Teoria</button>
          <button onClick={() => setActiveTab('quiz')}>Quiz</button>
          <button onClick={() => setActiveTab('pratica')}>Prática</button>
        </div>
        
        <hr />
        
        <div>
          {activeTab === 'teoria' && renderTeoria()}
          {activeTab === 'quiz' && renderQuiz()}
          {activeTab === 'pratica' && renderPratica()}
        </div>
      </div>
    )
}

export default HashModule