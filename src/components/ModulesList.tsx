import React from 'react'
import { Link } from 'react-router-dom'

function ModulesList() {
  return (
    <div>
      <h2>Módulos</h2>
      <div style={{ display: 'grid', gap: 16 }}>
        <div style={{ border: '1px solid #ccc', padding: 16 }}>
          <h3>Módulo 1: Hash</h3>
          <p>Explora SHA256 e propriedades de função hash.</p>
          <Link to="/hash">Abrir</Link>
        </div>
        <div style={{ border: '1px solid #ccc', padding: 16 }}>
          <h3>Módulo 2: Bloco</h3>
          <p>Como um bloco é montado, hash e mineração.</p>
          <Link to="/block">Abrir</Link>
        </div>
        <div style={{ border: '1px solid #ccc', padding: 16 }}>
          <h3>Módulo 3: Blockchain</h3>
          <p>Blocos encadeados, previous hash e mineração em cadeia.</p>
          <Link to="/blockchain">Abrir</Link>
        </div>
      </div>
    </div>
  )
}

export default ModulesList