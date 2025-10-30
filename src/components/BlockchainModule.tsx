import React, { useState, useMemo } from 'react'
import CryptoJS from 'crypto-js'
import Quiz from './Quiz'
import { blockchainQuestions } from '../data/quizBlockchain'
import Onboarding from './Onboarding'
import { useNavigate } from 'react-router-dom'

// Função utilitária para embaralhar array usando algoritmo Fisher-Yates
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array] // Não modifica o array original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

type Block = {
  index: number
  number: number
  nonce: number
  data: string
  previousHash: string
  hash: string
}

function BlockchainModule() {
  const [activeTab, setActiveTab] = useState<'teoria' | 'quiz' | 'pratica'>('teoria')
  const [showModuleOnboarding, setShowModuleOnboarding] = useState(true)
  const navigate = useNavigate()

  // Embaralha blockchainQuestions apenas uma vez na montagem e seleciona 10 perguntas aleatórias
  const randomTenQuestions = useMemo(() => {
    const shuffled = shuffleArray(blockchainQuestions)
    return shuffled.slice(0, 10)
  }, [])

  const difficulty = '0000'
  const maximumNonce = 200000

  const makeHash = (number: number, previousHash: string, data: string, nonce: number) => {
    const input = `${number}|${previousHash}|${data}|${nonce}`
    return CryptoJS.SHA256(input).toString()
  }

  const genesisPrevious = ''.padEnd(64, '0')

  const [chain, setChain] = useState<Block[]>(() => {
    const initial: Block[] = []
    for (let i = 0; i < 5; i++) {
      const prev = i === 0 ? genesisPrevious : ''
      initial.push({
        index: i,
        number: i + 1,
        nonce: 0,
        data: i === 0 ? 'Genesis Block' : `Bloco ${i + 1} de exemplo`,
        previousHash: prev,
        hash: ''
      })
    }
    for (let i = 0; i < initial.length; i++) {
      const prevHash = i === 0 ? genesisPrevious : initial[i - 1].hash
      initial[i].previousHash = prevHash
      initial[i].hash = makeHash(initial[i].number, prevHash, initial[i].data, initial[i].nonce)
    }
    return initial
  })

  const isValidHash = (hash: string) => hash.startsWith(difficulty)

  const recomputeFrom = (startIndex: number, nextChain?: Block[]) => {
    const updated = [...(nextChain ?? chain)]
    for (let i = startIndex; i < updated.length; i++) {
      const prevHash = i === 0 ? genesisPrevious : updated[i - 1].hash
      updated[i].previousHash = prevHash
      updated[i].hash = makeHash(updated[i].number, prevHash, updated[i].data, updated[i].nonce)
    }
    setChain(updated)
  }

  const handleFieldChange = (i: number, field: 'number' | 'nonce' | 'data', value: string) => {
    const next = [...chain]
    if (field === 'data') {
      next[i].data = value
    } else {
      next[i][field] = Number(value) || 0
    }
    recomputeFrom(i, next)
  }

  const mineBlock = (i: number) => {
    const next = [...chain]
    let nonce = next[i].nonce
    let attempts = 0
    while (attempts < maximumNonce) {
      const prevHash = i === 0 ? genesisPrevious : next[i - 1].hash
      const hash = makeHash(next[i].number, prevHash, next[i].data, nonce)
      if (isValidHash(hash)) {
        next[i].nonce = nonce
        next[i].hash = hash
        recomputeFrom(i + 1, next)
        return
      }
      nonce++
      attempts++
    }
    next[i].nonce = nonce
    recomputeFrom(i, next)
  }

  const renderTeoria = () => (
    <div>
      <h3>Teoria</h3>
      <p>
        Uma blockchain é uma cadeia de blocos onde cada bloco contém seu próprio hash
        e o hash do bloco anterior (<code>previousHash</code>). Qualquer alteração em um bloco
        muda seu hash, invalidando os blocos seguintes. A “mineração” ajusta o nonce
        para encontrar um hash que satisfaça o critério de dificuldade (por exemplo, iniciar
        com <code>{difficulty}</code>).
      </p>
    </div>
  )

  const renderQuiz = () => (
    <Quiz
      title="Quiz: Blockchain"
      questions={randomTenQuestions}
      onFinish={(score: number, total: number) => {
        try {
          localStorage.setItem('blockchainCompleted', 'true')
          localStorage.setItem('blockchainScore', String(score))
          localStorage.setItem('blockchainTotal', String(total))
        } catch {}
      }}
    />
  )

  const renderPratica = () => (
    <div>
      <p>Dificuldade: hash deve começar com <code>{difficulty}</code>.</p>
      <div style={{ display: 'grid', gap: 16 }}>
        {chain.map((b, i) => (
          <div key={i} style={{ 
            border: '1px solid #ccc', 
            padding: 16, 
            borderRadius: 8,
            backgroundColor: '#f9f9f9'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: 12 
            }}>
              <strong style={{ fontSize: 18 }}>Bloco #{b.number}</strong> 
              <span style={{ 
                padding: '4px 8px', 
                borderRadius: 4, 
                backgroundColor: isValidHash(b.hash) ? '#e6f7e6' : '#ffebeb',
                color: isValidHash(b.hash) ? '#2e7d32' : '#d32f2f',
                fontWeight: 'bold'
              }}>
                {isValidHash(b.hash) ? '✅ Válido' : '❌ Inválido'}
              </span>
            </div>
            
            <div style={{ display: 'grid', gap: 12 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 8 }}>Número:</label>
                <input 
                  type="number" 
                  value={b.number} 
                  onChange={(e) => handleFieldChange(i, 'number', e.target.value)} 
                  style={{ width: '100%', padding: 10, fontSize: 14 }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: 8 }}>Nonce:</label>
                <input 
                  type="number" 
                  value={b.nonce} 
                  onChange={(e) => handleFieldChange(i, 'nonce', e.target.value)} 
                  style={{ width: '100%', padding: 10, fontSize: 14 }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: 8 }}>Dados:</label>
                <input 
                  type="text" 
                  value={b.data} 
                  onChange={(e) => handleFieldChange(i, 'data', e.target.value)} 
                  style={{ width: '100%', padding: 10, fontSize: 14 }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: 8 }}>Hash Anterior:</label>
                <input 
                  type="text" 
                  value={b.previousHash} 
                  readOnly 
                  style={{ width: '100%', padding: 10, fontSize: 14, fontFamily: 'monospace' }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: 8 }}>Hash:</label>
                <input 
                  type="text" 
                  value={b.hash} 
                  readOnly 
                  style={{ 
                    width: '100%', 
                    padding: 10, 
                    fontFamily: 'monospace',
                    color: isValidHash(b.hash) ? '#2e7d32' : '#d32f2f'
                  }} 
                />
              </div>
            </div>
            
            <div style={{ marginTop: 16 }}>
              <button 
                onClick={() => mineBlock(i)} 
                style={{ 
                  padding: '10px 14px', 
                  borderRadius: 8,
                  backgroundColor: '#1E43B4',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 14
                }}
              >
                Minerar este bloco
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const blockchainOnboardingSteps = [
    {
      title: 'O que é Blockchain?',
      content: (
        <div>
          <p>Uma blockchain é uma cadeia de blocos interligados que registra transações de forma segura e transparente.</p>
          <p>Cada bloco contém dados, um hash e o hash do bloco anterior. Alterações em um bloco invalidam toda a cadeia subsequente.</p>
        </div>
      )
    },
    {
      title: 'Como os blocos se conectam?',
      content: (
        <div>
          <p>Cada bloco armazena o <strong>hash do bloco anterior</strong>, criando um encadeamento seguro.</p>
          <p>Isso garante integridade e imutabilidade, tornando quase impossível alterar blocos antigos sem recalcular toda a cadeia.</p>
        </div>
      )
    },
    {
      title: 'Segurança da blockchain',
      content: (
        <div>
          <p>A segurança vem de três pilares:</p>
          <ul>
            <li><strong>Hashes:</strong> cada bloco tem seu hash único.</li>
            <li><strong>Proof of Work:</strong> mineração com esforço computacional.</li>
            <li><strong>Distribuição:</strong> replicação em múltiplos nós da rede.</li>
          </ul>
        </div>
      )
    },
    {
      title: 'Mineração e consenso',
      content: (
        <div>
          <p>Para adicionar um bloco, é necessário resolver um problema de mineração (ajustar nonce para hash válido).</p>
          <p>Todos os nós da rede devem concordar sobre a validade do bloco (consenso).</p>
        </div>
      )
    },
    {
      title: 'Exemplo prático',
      content: (
        <div>
          <p>Imagine três blocos: alterar dados no primeiro muda todos os hashes subsequentes, invalidando a cadeia.</p>
          <p>Isso demonstra a segurança e imutabilidade da blockchain.</p>
        </div>
      )
    },
    {
      title: 'Boas práticas',
      content: (
        <div>
          <ul>
            <li>Não armazene dados sensíveis diretamente nos blocos.</li>
            <li>Valide hashes e transações antes de adicionar blocos.</li>
            <li>Use nós confiáveis para manter a integridade da cadeia.</li>
          </ul>
        </div>
      )
    }
  ]

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 820 }}>
        <h2 style={{ textAlign: 'center' }}>Módulo 3: Blockchain</h2>
        
        {showModuleOnboarding && (
          <Onboarding
            steps={blockchainOnboardingSteps}
            onFinish={() => {
              try { localStorage.setItem('blockchainModuleOnboarding', 'true') } catch {}
              setShowModuleOnboarding(false)
              setActiveTab('quiz')
            }}
          />
        )}

        {/* BOTOES TEORIA | QUIZ | PRÁTICA */}
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <button 
              onClick={() => setActiveTab('teoria')}
              style={activeTab === 'teoria' ? { fontWeight: 'bold', borderBottom: '2px solid black' } : {}}
            >
              Teoria
            </button>
            <button 
              onClick={() => setActiveTab('quiz')}
              style={activeTab === 'quiz' ? { fontWeight: 'bold', borderBottom: '2px solid black' } : {}}
            >
              Quiz
            </button>
            <button 
              onClick={() => setActiveTab('pratica')}
              style={activeTab === 'pratica' ? { fontWeight: 'bold', borderBottom: '2px solid black' } : {}}
            >
              Prática
            </button>
          </div>
          <div>
            <button 
              onClick={() => {
                localStorage.setItem('skipWelcome', 'true');
                navigate('/');
              }}
              style={{ 
                padding: '5px 10px', 
                backgroundColor: '#1E43B4', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Voltar ao Início
            </button>
          </div>
        </div>
        <hr style={{ margin: '0 0 20px 0' }} />

        {/* CONTEÚDO DAS ABAS */}
        {activeTab === 'teoria' && (
          <div>
            <h3>Teoria - Blockchain</h3>
            <p>Aprenda sobre os conceitos fundamentais de Blockchain.</p>
            
            <button 
              onClick={() => setShowModuleOnboarding(true)}
              style={{ 
                padding: '10px 16px', 
                backgroundColor: '#1E43B4', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer',
                marginTop: '15px',
                fontSize: '16px'
              }}
            >
              Abrir Tutorial Guiado
            </button>
            
            {renderTeoria()}
          </div>
        )}
        {activeTab === 'quiz' && (
          <div>
            <h3>Quiz - Blockchain</h3>
            {renderQuiz()}
          </div>
        )}
        {activeTab === 'pratica' && (
          <div>
            <h3>Prática - Blockchain</h3>
            {renderPratica()}
          </div>
        )}
      </div>
    </div>
  )
}

export default BlockchainModule
