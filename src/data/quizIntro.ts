export const introQuestions = [
  // ** PARTE 1: HASH E CRIPTOGRAFIA (Questões 1 a 10) **

  {
    question: "Qual é o nome da propriedade que garante que o mesmo input sempre gerará o mesmo hash?",
    options: [
      { value: "a", text: "Colisão" },
      { value: "b", text: "Determinismo" },
      { value: "c", text: "Assimetria" }
    ],
    correct: "b"
  },
  {
    question: "Se eu mudar uma letra no texto, o hash:",
    options: [
      { value: "a", text: "Muda pouco" },
      { value: "b", text: "Muda completamente (Efeito Avalanche)" },
      { value: "c", text: "Não muda" }
    ],
    correct: "b"
  },
  {
    question: "É possível descobrir o texto original a partir do hash?",
    options: [
      { value: "a", text: "Sim, sempre" },
      { value: "b", text: "Não, é um processo unidirecional" },
      { value: "c", text: "Às vezes, com um 'salt'" }
    ],
    correct: "b"
  },
  {
    question: "Qual é a principal característica de uma função hash?",
    options: [
      { value: "a", text: "É reversível" },
      { value: "b", text: "Produz output de tamanho variável" },
      { value: "c", text: "É determinística (mesmo input = mesmo output)" }
    ],
    correct: "c"
  },
  {
    question: "O que é uma 'colisão' em funções hash?",
    options: [
      { value: "a", text: "Quando um hash é muito longo" },
      { value: "b", text: "Quando dois inputs diferentes geram o mesmo hash" },
      { value: "c", "text": "Quando a função hash falha" }
    ],
    correct: "b"
  },
  {
    question: "O que é 'unidirecionalidade' em funções hash?",
    options: [
      { value: "a", text: "A facilidade de calcular o hash, mas a dificuldade de reverter" },
      { value: "b", text: "O hash só pode ser calculado em uma direção" },
      { value: "c", "text": "O hash é transmitido em uma única direção" }
    ],
    correct: "a"
  },
  {
    question: "Para que o hash é usado em um bloco de blockchain?",
    options: [
      { value: "a", text: "Apenas para economizar espaço de armazenamento" },
      { value: "b", text: "Para ser uma 'impressão digital' única e garantir a integridade" },
      { value: "c", "text": "Para cifrar os dados das transações" }
    ],
    correct: "b"
  },
  {
    question: "O que significa o 'tamanho fixo' de um hash (ex: SHA-256)?",
    options: [
      { value: "a", text: "O tamanho do input deve ser fixo" },
      { value: "b", text: "O tamanho do output (o hash) é sempre o mesmo, independente do input" },
      { value: "c", "text": "O número de vezes que o hash foi alterado" }
    ],
    correct: "b"
  },
  {
    question: "Em uma assinatura digital, qual chave é usada para *assinar* (criptografar) a mensagem?",
    options: [
      { value: "a", text: "Chave Pública" },
      { value: "b", text: "Chave Privada" },
      { value: "c", "text": "Chave Simétrica" }
    ],
    correct: "b"
  },
  {
    question: "Em uma assinatura digital, qual chave é usada para *verificar* (descriptografar) a mensagem?",
    options: [
      { value: "a", text: "Chave Privada" },
      { value: "b", text: "Chave Pública" },
      { value: "c", "text": "Chave Simétrica" }
    ],
    correct: "b"
  },

  // ** PARTE 2: BLOCO E CADEIA (Questões 11 a 20) **

  {
    question: "O que é um bloco no blockchain?",
    options: [
      { value: "a", text: "Um arquivo de texto" },
      { value: "b", text: "Um conjunto de transações agrupadas" },
      { value: "c", text: "Um tipo de moeda" }
    ],
    correct: "b"
  },
  {
    question: "O que liga um bloco ao anterior em uma blockchain?",
    options: [
      { value: "a", text: "O número do bloco anterior" },
      { value: "b", text: "O hash do bloco anterior (previous hash)" },
      { value: "c", text: "A quantidade de transações" }
    ],
    correct: "b"
  },
  {
    question: "Qual componente de um bloco é crucial para o processo de mineração?",
    options: [
      { value: "a", text: "O 'previous hash'" },
      { value: "b", text: "O 'Nonce' (Número de uso único)" },
      { value: "c", "text": "O 'Merkle Root'" }
    ],
    correct: "b"
  },
  {
    question: "O que é a 'Merkle Tree' (ou Árvore Hash) em um bloco?",
    options: [
      { value: "a", text: "Uma representação gráfica dos blocos" },
      { value: "b", text: "Uma estrutura que resume todas as transações do bloco em um único 'root hash'" },
      { value: "c", "text": "O endereço do minerador que resolveu o bloco" }
    ],
    correct: "b"
  },
  {
    question: "Qual bloco é considerado o primeiro em uma blockchain?",
    options: [
      { value: "a", text: "O Bloco Zero" },
      { value: "b", text: "O Bloco Gênesis" },
      { value: "c", "text": "O Bloco Inicial" }
    ],
    correct: "b"
  },
  {
    question: "Se o 'Nonce' de um bloco for alterado, o que acontece com o hash do bloco?",
    options: [
      { value: "a", text: "O hash se mantém o mesmo" },
      { value: "b", text: "O hash muda completamente" },
      { value: "c", "text": "Apenas o previous hash é afetado" }
    ],
    correct: "b"
  },
  {
    question: "Por que a alteração de um bloco no meio da cadeia é extremamente difícil?",
    options: [
      { value: "a", text: "Porque os dados são criptografados" },
      { value: "b", text: "Porque exigiria recalcular o bloco alterado e todos os blocos seguintes (e remineração)" },
      { value: "c", "text": "Porque o bloco é muito grande" }
    ],
    correct: "b"
  },
  {
    question: "Qual dos dados *não* é tipicamente incluído no cabeçalho (header) de um bloco?",
    options: [
      { value: "a", text: "O carimbo de tempo (Timestamp)" },
      { value: "b", text: "O hash do bloco anterior" },
      { value: "c", "text": "O nome completo do minerador" }
    ],
    correct: "c"
  },
  {
    question: "O que acontece com um bloco se o hash gerado *não* atender ao requisito de dificuldade?",
    options: [
      { value: "a", text: "O bloco é aceito, mas com uma taxa menor" },
      { value: "b", text: "O minerador deve tentar um novo 'Nonce' até o hash ser válido" },
      { value: "c", "text": "O bloco é descartado e o minerador é banido" }
    ],
    correct: "b"
  },
  {
    question: "O que a 'Prova de Trabalho' (Proof-of-Work - PoW) exige dos mineradores?",
    options: [
      { value: "a", text: "Provar que têm saldo suficiente" },
      { value: "b", text: "Gastar tempo e energia para encontrar o 'Nonce' correto" },
      { value: "c", "text": "Assinar o bloco com uma chave pública" }
    ],
    correct: "b"
  },

  // ** PARTE 3: BLOCKCHAIN E DESCENTRALIZAÇÃO (Questões 21 a 30) **

  {
    question: "Qual é a principal inovação da tecnologia Blockchain?",
    options: [
      { value: "a", text: "Ser totalmente anônima" },
      { value: "b", text: "A criação de um livro-razão (ledger) digital, distribuído e imutável" },
      { value: "c", "text": "A velocidade nas transações" }
    ],
    correct: "b"
  },
  {
    question: "O que significa a propriedade de 'imutabilidade' em um blockchain?",
    options: [
      { value: "a", text: "Que todos os blocos têm o mesmo tamanho" },
      { value: "b", text: "Que, uma vez adicionado à cadeia, um bloco não pode ser alterado retroativamente" },
      { value: "c", "text": "Que a cadeia de blocos nunca pode crescer" }
    ],
    correct: "b"
  },
  {
    question: "Em um blockchain público, como é feita a validação das transações?",
    options: [
      { value: "a", text: "Por um banco central" },
      { value: "b", text: "Por uma rede de computadores (nós/mineradores)" },
      { value: "c", "text": "Por uma autoridade governamental" }
    ],
    correct: "b"
  },
  {
    question: "O que é 'descentralização' no contexto de blockchain?",
    options: [
      { value: "a", text: "O fato de não haver um ponto central de controle ou falha" },
      { value: "b", text: "A capacidade de fazer transações de forma rápida" },
      { value: "c", "text": "A mudança constante de algoritmos" }
    ],
    correct: "a"
  },
  {
    question: "Qual é o termo para a cópia completa do histórico de transações de um blockchain mantida por um participante?",
    options: [
      { value: "a", text: "Gênesis" },
      { value: "b", text: "Ledger (Livro-Razão) Distribuído" },
      { value: "c", "text": "Arquivo ZIP" }
    ],
    correct: "b"
  },
  {
    question: "Qual é o principal desafio resolvido pela tecnologia Blockchain?",
    options: [
      { value: "a", text: "Garantir o anonimato total" },
      { value: "b", text: "O problema do 'gasto duplo' (double-spending) sem a necessidade de um intermediário" },
      { value: "c", "text": "Aumentar o valor das moedas digitais" }
    ],
    correct: "b"
  },
  {
    question: "Em uma rede descentralizada, o que acontece se um único nó (computador) sair da rede?",
    options: [
      { value: "a", text: "Toda a rede para de funcionar" },
      { value: "b", text: "A rede continua funcionando, pois é tolerante a falhas (Distribuída)" },
      { value: "c", "text": "O bloco mais recente é invalidado" }
    ],
    correct: "b"
  },
  {
    question: "Qual é o objetivo final de um minerador que participa de uma rede Proof-of-Work?",
    options: [
      { value: "a", text: "Simplesmente verificar uma transação" },
      { value: "b", text: "Encontrar o 'Nonce' que gera o hash válido para adicionar o bloco e ganhar a recompensa" },
      { value: "c", "text": "Tentar criar uma colisão de hash" }
    ],
    correct: "b"
  },
  {
    question: "O que define a 'dificuldade' de mineração em uma blockchain PoW?",
    options: [
      { value: "a", text: "A quantidade de transações no bloco" },
      { value: "b", text: "A quantidade de zeros iniciais que o hash do bloco precisa ter" },
      { value: "c", "text": "O valor total das moedas envolvidas nas transações" }
    ],
    correct: "b"
  },
  {
    question: "O que é um 'Nó' (Node) em uma rede blockchain?",
    options: [
      { value: "a", text: "Apenas o computador do criador do blockchain" },
      { value: "b", text: "Qualquer computador conectado que armazena, valida e propaga dados da blockchain" },
      { value: "c", "text": "Um tipo de carteira de hardware" }
    ],
    correct: "b"
  },

  // ** PARTE 4: TRANSAÇÕES E CONCEITOS BÁSICOS (Questões 31 a 40) **

  {
    question: "O que é o 'endereço' de um usuário em um blockchain?",
    options: [
      { value: "a", text: "O nome completo do usuário" },
      { value: "b", text: "O hash da chave privada" },
      { value: "c", "text": "Uma derivação da chave pública (usado para receber fundos)" }
    ],
    correct: "c"
  },
  {
    question: "Qual chave *nunca* deve ser compartilhada com ninguém?",
    options: [
      { value: "a", text: "A Chave Pública" },
      { value: "b", text: "A Chave Privada" },
      { value: "c", "text": "O Endereço de Recebimento" }
    ],
    correct: "b"
  },
  {
    question: "O que é necessário para iniciar uma transação em um blockchain?",
    options: [
      { value: "a", text: "Uma conta bancária tradicional" },
      { value: "b", text: "Assinar a transação com a chave privada" },
      { value: "c", "text": "Permissão do minerador" }
    ],
    correct: "b"
  },
  {
    question: "O que é uma 'Taxa de Transação' (Fee)?",
    options: [
      { value: "a", text: "Um imposto obrigatório do governo" },
      { value: "b", text: "Uma recompensa paga ao minerador para incluir a transação no bloco" },
      { value: "c", "text": "O custo da internet" }
    ],
    correct: "b"
  },
  {
    question: "Qual o nome da estrutura de dados que contém transações não confirmadas e aguarda inclusão em um bloco?",
    options: [
      { value: "a", text: "O Bloco Gênesis" },
      { value: "b", text: "O Mempool (Memory Pool)" },
      { value: "c", "text": "O Ledger" }
    ],
    correct: "b"
  },
  {
    question: "Em uma transação típica de Bitcoin, o que é um 'UTXO'?",
    options: [
      { value: "a", text: "Uma transação já gasta" },
      { value: "b", text: "Uma saída de transação não gasta (Unspent Transaction Output)" },
      { value: "c", "text": "Um tipo de criptomoeda" }
    ],
    correct: "b"
  },
  {
    question: "O que significa 'Consenso' em uma rede blockchain?",
    options: [
      { value: "a", text: "O acordo entre o comprador e o vendedor" },
      { value: "b", text: "O mecanismo que garante que a maioria dos nós concorde com a validade do bloco e do histórico" },
      { value: "c", "text": "A velocidade de processamento do bloco" }
    ],
    correct: "b"
  },
  {
    question: "Qual a função do 'Timestamp' (Carimbo de Tempo) em um bloco?",
    options: [
      { value: "a", text: "Provar que o bloco existia em um determinado momento" },
      { value: "b", text: "Definir a dificuldade do bloco" },
      { value: "c", "text": "Criptografar as transações" }
    ],
    correct: "a"
  },
  {
    question: "O que é 'Fork' (Garfo) no contexto de blockchain?",
    options: [
      { value: "a", text: "Uma ferramenta de mineração" },
      { value: "b", text: "Uma divisão na cadeia de blocos, resultando em duas versões separadas da história" },
      { value: "c", "text": "Uma carteira de hardware" }
    ],
    correct: "b"
  },
  {
    question: "Qual é o nome dado à recompensa que um minerador recebe por validar um novo bloco?",
    options: [
      { value: "a", text: "Bônus de rede" },
      { value: "b", text: "Recompensa de Bloco (Block Reward) + Taxas de Transação" },
      { value: "c", "text": "Subsídio estatal" }
    ],
    correct: "b"
  },

  // ** PARTE 5: CONCEITOS AVANÇADOS INICIAIS (Questões 41 a 50) **

  {
    question: "Em um blockchain, o que é um 'Smart Contract' (Contrato Inteligente)?",
    options: [
      { value: "a", text: "Um contrato legal em papel" },
      { value: "b", text: "Um código auto-executável, com os termos do acordo escritos diretamente em linhas de código" },
      { value: "c", "text": "Uma transação muito grande" }
    ],
    correct: "b"
  },
  {
    question: "Qual plataforma é amplamente conhecida por popularizar o conceito de Smart Contracts?",
    options: [
      { value: "a", text: "Bitcoin" },
      { value: "b", text: "Litecoin" },
      { value: "c", "text": "Ethereum" }
    ],
    correct: "c"
  },
  {
    question: "O que o termo 'Permissionless' (Sem Permissão) significa em um blockchain público?",
    options: [
      { value: "a", text: "Não há taxas de transação" },
      { value: "b", text: "Qualquer pessoa pode participar da rede, ler, enviar transações e validar blocos" },
      { value: "c", "text": "O minerador não precisa de permissão para criar um bloco" }
    ],
    correct: "b"
  },
  {
    question: "Qual é a principal diferença entre um 'Blockchain Público' e um 'Blockchain Privado'?",
    options: [
      { value: "a", text: "Apenas a moeda utilizada" },
      { value: "b", text: "O público é aberto a todos; o privado requer permissão para participar" },
      { value: "c", "text": "O público não usa hash" }
    ],
    correct: "b"
  },
  {
    question: "O que é 'Halving' (Redução pela Metade) no Bitcoin?",
    options: [
      { value: "a", text: "Quando o preço do Bitcoin cai pela metade" },
      { value: "b", text: "A redução programada da recompensa de bloco para mineradores em 50%" },
      { value: "c", "text": "A divisão de um bloco em dois" }
    ],
    correct: "b"
  },
  {
    question: "Qual é o principal risco em um sistema onde a 'Chave Privada' é perdida?",
    options: [
      { value: "a", text: "O usuário só pode visualizar o saldo" },
      { value: "b", text: "O usuário perde permanentemente o acesso aos seus fundos" },
      { value: "c", "text": "O bloco mais recente é invalidado" }
    ],
    correct: "b"
  },
  {
    question: "Qual o principal benefício da tecnologia Blockchain para a segurança de dados?",
    options: [
      { value: "a", text: "O uso de criptografia forte e a validação distribuída que garantem a integridade" },
      { value: "b", text: "O anonimato total dos usuários" },
      { value: "c", "text": "A eliminação de todas as taxas" }
    ],
    correct: "a"
  },
  {
    question: "O que é 'Finalidade' (Finality) em um blockchain?",
    options: [
      { value: "a", text: "O bloco final da cadeia" },
      { value: "b", text: "O ponto no qual uma transação é irreversível e garantida como permanente no ledger" },
      { value: "c", "text": "O fim do processo de mineração" }
    ],
    correct: "b"
  },
  {
    question: "Qual é a definição mais simples de 'Web3'?",
    options: [
      { value: "a", text: "A internet controlada por grandes corporações" },
      { value: "b", text: "Uma nova iteração da web, baseada em tecnologias descentralizadas como blockchain e smart contracts" },
      { value: "c", "text": "A internet 5G" }
    ],
    correct: "b"
  },
  {
    question: "Em uma blockchain, o que significa 'Escalabilidade'?",
    options: [
      { value: "a", text: "O tamanho físico do bloco" },
      { value: "b", text: "A capacidade da rede de processar um número crescente de transações por segundo (TPS)" },
      { value: "c", "text": "A dificuldade de mineração" }
    ],
    correct: "b"
  }
];
