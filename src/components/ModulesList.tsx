import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles/onboarding.css';
import { useNavigate } from 'react-router-dom';
import './styles/modulesList.css'; // Onde os novos estilos serão aplicados
import fogueteIcon from './icons/foguete.png';
import cadeadoIcon from './icons/cadeado.png';
import cuboIcon from './icons/cubo.png';
import eloIcon from './icons/elo-de-corrente.png';

// FUNÇÃO ÚNICA DO COMPONENTE ModulesList
function ModulesList() {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const highlight = params.get('highlight');

    // Lógica do Highlight (Mantida da primeira versão)
    const [activeHighlight, setActiveHighlight] = useState<string | null>(null);
    const hashRef = useRef<HTMLDivElement | null>(null);

    // Lógica do Quiz Final (Mantida da segunda versão, mas verificada)
    const [canTakeFinal, setCanTakeFinal] = useState(false);

    useEffect(() => {
        // Lógica de Highlight (Mantida)
        if (highlight === 'hash') {
            setTimeout(() => {
                setActiveHighlight('hash');
                if (hashRef.current) {
                    hashRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                setTimeout(() => setActiveHighlight(null), 4500);
            }, 250);
        }

        // Lógica de CanTakeFinal (Mantida)
        const ready =
            localStorage.getItem('hashCompleted') === 'true' &&
            localStorage.getItem('blockCompleted') === 'true' &&
            localStorage.getItem('blockchainCompleted') === 'true';
        setCanTakeFinal(!!ready);
    }, [highlight]); // 'highlight' adicionado como dependência

    return (
        <div className="modules-flow"> {/* Classe para o fluxo e layout geral */}
            <h2 className="page-title">Módulos</h2>

            {/* Quiz Inicial (Card de larg. total) - NOVO DESIGN */}
            <section className="card card-start module-card">
                <div className="card-header">
                    <img src={fogueteIcon} alt="Quiz Inicial" className="card-icon" />
                    <h3 className="card-title">Quiz Inicial</h3>
                    <span className="badge badge-start">PONTO DE PARTIDA</span>
                </div>
                <p className="card-desc">
                    Teste seu conhecimento **ATUAL** e veja onde você pode começar a jornada!
                </p>
                <div className="card-actions">
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate('/intro-quiz')}
                    >
                        FAZER QUIZ INICIAL
                    </button>
                </div>
            </section>

            {/* Conectores do topo até os módulos (Requer CSS para serem visíveis) */}
            <div className="flow-connectors to-modules" aria-hidden="true">
                <span className="tap left" />
                <span className="tap center" />
                <span className="tap right" />
            </div>

            {/* Trinca de módulos em grid - NOVO DESIGN */}
            <div className="modules-grid-flow">
                {/* Módulo 1: Hash */}
                <section
                    ref={hashRef}
                    className={`card module-card ${activeHighlight === 'hash' ? 'highlight' : ''}`}
                >
                    <div className="card-header">
                        <img src={cadeadoIcon} alt="Módulo 1: Hash" className="card-icon" />
                        <h3 className="card-title">Módulo 1: Hash</h3>
                    </div>
                    <p className="card-desc">
                        Aprenda como funções hash geram identificadores únicos e resistentes a alterações.
                    </p>
                    <div className="card-actions">
                        <button className="btn btn-primary" onClick={() => navigate('/hash')}>
                            INICIAR MÓDULO
                        </button>
                    </div>
                </section>

                {/* Módulo 2: Bloco */}
                <section className="card module-card">
                    <div className="card-header">
                        <img src={cuboIcon} alt="Módulo 2: Bloco" className="card-icon" />
                        <h3 className="card-title">Módulo 2: Bloco</h3>
                    </div>
                    <p className="card-desc">
                        Descubra como um bloco é montado, inclui transações, hash e mineração.
                    </p>
                    <div className="card-actions">
                        <button className="btn btn-primary" onClick={() => navigate('/block')}>
                            INICIAR MÓDULO
                        </button>
                    </div>
                </section>

                {/* Módulo 3: Blockchain */}
                <section className="card module-card">
                    <div className="card-header">
                        <img src={eloIcon} alt="Módulo 3: Blockchain" className="card-icon" />
                        <h3 className="card-title">Módulo 3: Blockchain</h3>
                    </div>
                    <p className="card-desc">
                        Encadeie blocos com previous hash e veja a rede em ação.
                    </p>
                    <div className="card-actions">
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate('/blockchain')}
                        >
                            INICIAR MÓDULO
                        </button>
                    </div>
                </section>
            </div>

            {/* Conectores dos módulos até o final (Requer CSS) */}
            <div className="flow-connectors to-final" aria-hidden="true">
                <span className="tap left" />
                <span className="tap center" />
                <span className="tap right" />
            </div>

            {/* Quiz Final (Card de larg. total) - NOVO DESIGN */}
            <section className={`card card-final module-card ${canTakeFinal ? '' : 'disabled'}`}>
                <div className="card-header">
                    <h3 className="card-title">Quiz Final</h3>
                </div>
                <p className="card-desc">
                    Disponível após concluir os quizzes dos 3 módulos. Meça sua evolução!
                </p>
                <div className="card-actions">
                    <button
                        className={`btn ${canTakeFinal ? 'btn-primary' : 'btn-ghost disabled-btn'}`}
                        onClick={() => canTakeFinal && navigate('/final-quiz')}
                        disabled={!canTakeFinal}
                    >
                        FAZER QUIZ FINAL
                    </button>
                </div>
            </section>
        </div>
    );
}

export default ModulesList;