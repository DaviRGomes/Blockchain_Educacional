import React, { useState } from 'react'
import CryptoJS from 'crypto-js'
import Quiz from './Quiz'
import { hashQuestions } from '../data/quizData'

function HashModule() {
  const [activeTab, setActiveTab] = useState('teoria')
  const [inputData, setInputData] = useState('')

  // Função SHA256 real usando crypto-js
  const sha256Hash = (str) => {
    if (!str) return ''
    return CryptoJS.SHA256(str).toString()
  }

  const renderTeoria = () => (
    <div>
      <h3>Teoria - Funções Hash</h3>
      <p>Uma função hash pega qualquer texto e gera um código único.</p>
      <p>Características:</p>
      <ul>
        <li>Mesmo input = mesmo output</li>
        <li>Mudança pequena = output totalmente diferente</li>
        <li>Impossível reverter</li>
        <li>Tamanho fixo do output (SHA256 = 64 caracteres)</li>
      </ul>
      <p>No blockchain, o hash identifica cada bloco de forma única.</p>
    </div>
  )

  const renderQuiz = () => (
    <Quiz 
      questions={hashQuestions} 
      title="Quiz - Funções Hash" 
    />
  )

  const renderPratica = () => (
    <div>
      <h3>Prática - SHA256 Hash</h3>
      <p>Digite um texto e veja o hash SHA256 real:</p>
      <textarea 
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        placeholder="Digite algo aqui..."
        rows="4"
        cols="50"
      />
      <br /><br />
      <p>Hash SHA256: <code style={{wordBreak: 'break-all'}}>{sha256Hash(inputData)}</code></p>
      <br />
      <p>Teste:</p>
      <ul>
        <li>Digite "hello" e veja o hash</li>
        <li>Mude para "Hello" e veja a diferença</li>
        <li>Digite "hello world" vs "hello world!"</li>
        <li>Note que o hash sempre tem 64 caracteres</li>
      </ul>
    </div>
  )

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