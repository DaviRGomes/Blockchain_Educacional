import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ModulesList.module.css';

function ModulesList() {
  const canTakeFinal =
    localStorage.getItem('hashCompleted') === 'true' &&
    localStorage.getItem('blockCompleted') === 'true' &&
    localStorage.getItem('blockchainCompleted') === 'true';

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Módulos</h2>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h3>Módulo 1: Hash</h3>
          <p>Explora SHA256 e propriedades de função hash.</p>
          <Link to="/hash" className={styles.link}>Abrir</Link>
        </div>
        <div className={styles.card}>
          <h3>Módulo 2: Bloco</h3>
          <p>Como um bloco é montado, hash e mineração.</p>
          <Link to="/block" className={styles.link}>Abrir</Link>
        </div>
        <div className={styles.card}>
          <h3>Módulo 3: Blockchain</h3>
          <p>Blocos encadeados, previous hash e mineração em cadeia.</p>
          <Link to="/blockchain" className={styles.link}>Abrir</Link>
        </div>
        <div className={styles.card}>
          <h3>Quiz Final</h3>
          <p>Disponível após concluir os quizzes dos 3 módulos.</p>
          {canTakeFinal ? (
            <Link to="/final-quiz" className={styles.link}>Fazer Quiz Final</Link>
          ) : (
            <span className={styles.locked}>Conclua todos os módulos para liberar</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ModulesList;
