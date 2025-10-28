export const hashQuestions = [
  // ** FOCO 1: PROPRIEDADES FUNDAMENTAIS (Determinismo, Unidirecionalidade, Tamanho Fixo) (Q1-Q15) **

  {
    question: "Qual propriedade fundamental garante que o mesmo input sempre produz o mesmo hash?",
    options: [
      { value: "a", text: "Efeito Avalanche" },
      { value: "b", text: "Determinismo" },
      { value: "c", text: "Unidirecionalidade" }
    ],
    correct: "b"
  },
  {
    question: "O que significa dizer que uma função hash é 'unidirecional'?",
    options: [
      { value: "a", text: "O hash só pode ser usado uma vez" },
      { value: "b", text: "É praticamente impossível determinar o input original a partir do hash" },
      { value: "c", text: "O hash é transmitido em uma única direção" }
    ],
    correct: "b"
  },
  {
    question: "Qual o tamanho (em bits) de um hash gerado pelo algoritmo SHA-256?",
    options: [
      { value: "a", text: "64 bits" },
      { value: "b", text: "128 bits" },
      { value: "c", text: "256 bits" }
    ],
    correct: "c"
  },
  {
    question: "Independentemente do tamanho do input (texto), qual a característica do output (hash)?",
    options: [
      { value: "a", text: "O output tem tamanho variável" },
      { value: "b", text: "O output tem tamanho constante/fixo" },
      { value: "c", text: "O output é sempre menor que o input" }
    ],
    correct: "b"
  },
  {
    question: "Quantos caracteres em hexadecimal (hex) são gerados por um SHA-256?",
    options: [
      { value: "a", text: "32 caracteres" },
      { value: "b", text: "64 caracteres" },
      { value: "c", text: "128 caracteres" }
    ],
    correct: "b"
  },
  {
    question: "Se a função hash fosse 'reversível', qual propriedade seria violada?",
    options: [
      { value: "a", text: "Tamanho Fixo" },
      { value: "b", text: "Unidirecionalidade" },
      { value: "c", text: "Determinismo" }
    ],
    correct: "b"
  },
  {
    question: "Um Hash é melhor descrito como a _____ do dado.",
    options: [
      { value: "a", text: "Cópia exata" },
      { value: "b", text: "Criptografia reversível" },
      { value: "c", text: "Impressão digital" }
    ],
    correct: "c"
  },
  {
    question: "Se um input for 'HELLO', e gerar o hash X. Se o input for novamente 'HELLO', o hash será:",
    options: [
      { value: "a", text: "Um hash completamente novo (Y)" },
      { value: "b", text: "O mesmo hash (X)" },
      { value: "c", text: "O hash X com uma letra diferente no final" }
    ],
    correct: "b"
  },
  {
    question: "O que é o principal objetivo do hash na segurança da informação?",
    options: [
      { value: "a", text: "Comprimir o tamanho dos arquivos" },
      { value: "b", text: "Garantir a integridade e autenticidade dos dados" },
      { value: "c", text: "Acelerar a transmissão de dados" }
    ],
    correct: "b"
  },
  {
    question: "Qual o tamanho de output de uma função hash SHA-256, independentemente de o input ser 'a' ou um livro inteiro?",
    options: [
      { value: "a", text: "Variável (depende do input)" },
      { value: "b", text: "Sempre 256 bits" },
      { value: "c", text: "Apenas 64 bits" }
    ],
    correct: "b"
  },
  {
    question: "Em criptografia, hashes puros (como SHA-256) não são recomendados para armazenar senhas por não utilizarem:",
    options: [
      { value: "a", text: "Hashing Simétrico" },
      { value: "b", text: "Salt e Pepper" },
      { value: "c", "text": "Chave Pública" }
    ],
    correct: "b"
  },
  {
    question: "Para armazenamento de senhas de forma segura, o que é recomendado usar em vez de SHA-256 puro?",
    options: [
      { value: "a", text: "Funções KDF (Key Derivation Functions) como Argon2 ou bcrypt" },
      { value: "b", text: "O hash com compressão ZIP" },
      { value: "c", "text": "Apenas o timestamp" }
    ],
    correct: "a"
  },
  {
    question: "O que uma função hash KDF (como bcrypt) adiciona ao processo que melhora a segurança contra ataques de dicionário?",
    options: [
      { value: "a", text: "Complexidade de tempo (lentidão intencional)" },
      { value: "b", text: "Deterministicidade" },
      { value: "c", "text": "Tamanho fixo" }
    ],
    correct: "a"
  },
  {
    question: "Qual termo descreve o ataque onde o atacante tenta milhões de inputs diferentes até encontrar um hash alvo?",
    options: [
      { value: "a", text: "Ataque de Colisão" },
      { value: "b", text: "Ataque de Força Bruta" },
      { value: "c", "text": "Criptoanálise" }
    ],
    correct: "b"
  },
  {
    question: "Ataques de Criptoanálise buscam explorar o quê em um algoritmo hash?",
    options: [
      { value: "a", text: "Sua velocidade" },
      { value: "b", text: "Propriedades fracas da função" },
      { value: "c", "text": "Seu tamanho fixo" }
    ],
    correct: "b"
  },

  // ** FOCO 2: EFEITO AVALANCHE E ALTERAÇÃO (Q16-Q30) **

  {
    question: "O que é o 'Efeito Avalanche'?",
    options: [
      { value: "a", text: "O hash muda pouco com pequenas alterações no input" },
      { value: "b", text: "Uma pequena alteração no input resulta em uma alteração drástica (quase completa) no hash de output" },
      { value: "c", text: "O hash se propaga rapidamente na rede" }
    ],
    correct: "b"
  },
  {
    question: "Se você mudar uma única letra em um texto (ex: 'hello' para 'hellz'), o hash SHA-256 resultante será:",
    options: [
      { value: "a", text: "Muito parecido com o original" },
      { value: "b", text: "Completamente diferente do original" },
      { value: "c", text: "Idêntico ao original" }
    ],
    correct: "b"
  },
  {
    question: "Qual o principal propósito do Efeito Avalanche em criptografia?",
    options: [
      { value: "a", text: "Tornar o hash mais fácil de ler" },
      { value: "b", text: "Garantir que não haja 'atalhos' para a mineração" },
      { value: "c", text: "Impedir que qualquer alteração de dados passe despercebida" }
    ],
    correct: "c"
  },
  {
    question: "Em uma blockchain, se alguém tentar alterar uma transação dentro de um bloco, o Efeito Avalanche fará com que o hash do bloco mude. O que a rede fará?",
    options: [
      { value: "a", text: "Aceitar a alteração" },
      { value: "b", text: "Rejeitar o bloco, pois seu hash não será mais válido para a cadeia" },
      { value: "c", "text": "Recalcular o hash do bloco anterior" }
    ],
    correct: "b"
  },
  {
    question: "O Efeito Avalanche é uma demonstração da sensibilidade da função hash a:",
    options: [
      { value: "a", text: "Temperatura" },
      { value: "b", text: "Qualquer mudança no input" },
      { value: "c", "text": "Tamanho do bloco" }
    ],
    correct: "b"
  },
  {
    question: "Se você usar o texto 'Teste' e o hash resultante for 'X', qual hash você terá ao usar o texto ' Teste' (com um espaço no início)?",
    options: [
      { value: "a", text: "O hash será X" },
      { value: "b", text: "O hash será Y, completamente diferente de X" },
      { value: "c", "text": "O hash será X, pois espaços são ignorados" }
    ],
    correct: "b"
  },
  {
    question: "O Efeito Avalanche apoia qual característica de segurança de um blockchain?",
    options: [
      { value: "a", text: "Anonimato" },
      { value: "b", text: "Resistência à adulteração (Tamper Resistance)" },
      { value: "c", "text": "Velocidade" }
    ],
    correct: "b"
  },
  {
    question: "O que significa 'Colisão' em funções hash?",
    options: [
      { value: "a", text: "Atingir o Efeito Avalanche" },
      { value: "b", text: "Dois inputs diferentes que produzem o mesmo hash" },
      { value: "c", "text": "O hash é muito longo" }
    ],
    correct: "b"
  },
  {
    question: "Qual o objetivo de segurança ao usar funções hash que evitam colisões?",
    options: [
      { value: "a", text: "Garantir que cada dado tenha uma impressão digital única" },
      { value: "b", text: "Tornar o algoritmo mais rápido" },
      { value: "c", "text": "Reduzir o tamanho dos blocos" }
    ],
    correct: "a"
  },
  {
    question: "Um ataque de Colisão bem-sucedido permite que um atacante:",
    options: [
      { value: "a", text: "Descubra a chave privada" },
      { value: "b", text: "Crie um dado malicioso com o hash de um dado legítimo" },
      { value: "c", "text": "Altere o timestamp do bloco" }
    ],
    correct: "b"
  },
  {
    question: "A dificuldade de um ataque de Força Bruta é diretamente proporcional a:",
    options: [
      { value: "a", text: "O tamanho do input" },
      { value: "b", text: "O poder computacional e o tempo gasto" },
      { value: "c", "text": "O número do bloco" }
    ],
    correct: "b"
  },
  {
    question: "Qual função criptográfica é amplamente usada em Blockchain para criar hashes de bloco?",
    options: [
      { value: "a", text: "bcrypt" },
      { value: "b", text: "AES" },
      { value: "c", "text": "SHA-256" }
    ],
    correct: "c"
  },
  {
    question: "Por que o Blockchain usa o SHA-256 e não um algoritmo mais antigo como MD5?",
    options: [
      { value: "a", text: "MD5 é muito lento" },
      { value: "b", text: "MD5 não tem tamanho fixo" },
      { value: "c", "text": "MD5 é considerado criptograficamente inseguro (vulnerável a colisões)" }
    ],
    correct: "c"
  },
  {
    question: "Se a dificuldade de mineração for muito baixa, qual ataque se torna mais viável?",
    options: [
      { value: "a", text: "Ataque de DDOS" },
      { value: "b", text: "Ataque de Força Bruta (Minerar um bloco válido é fácil)" },
      { value: "c", "text": "Ataque de Criptoanálise" }
    ],
    correct: "b"
  },
  {
    question: "A regra de que o hash deve ter, por exemplo, '0000' no início está relacionada a qual conceito?",
    options: [
      { value: "a", text: "Unidirecionalidade" },
      { value: "b", text: "Dificuldade de mineração" },
      { value: "c", "text": "Determinismo" }
    ],
    correct: "b"
  },

  // ** FOCO 3: HASH E BLOCKCHAIN (Aplicações) (Q31-Q50) **

  {
    question: "Na Blockchain, o que o 'previousHash' faz?",
    options: [
      { value: "a", text: "Armazena a transação mais antiga" },
      { value: "b", text: "Liga o bloco atual ao bloco anterior, garantindo a ordem" },
      { value: "c", "text": "Define o Nonce" }
    ],
    correct: "b"
  },
  {
    question: "O que acontece se o 'previousHash' do Bloco 5 for alterado por um atacante?",
    options: [
      { value: "a", text: "Apenas o Bloco 5 é invalidado" },
      { value: "b", text: "O Bloco 5 e todos os blocos subsequentes se tornam inválidos" },
      { value: "c", "text": "O bloco é corrigido pelo timestamp" }
    ],
    correct: "b"
  },
  {
    question: "Por que a alteração de um bloco antigo em um blockchain público é custosa?",
    options: [
      { value: "a", text: "Porque os dados são criptografados" },
      { value: "b", text: "Porque exigiria recalcular o bloco alterado E refazer o trabalho (mineração) de todos os blocos seguintes" },
      { value: "c", "text": "Apenas porque os dados são grandes" }
    ],
    correct: "b"
  },
  {
    question: "O hash de um bloco de blockchain (exceto o Gênesis) é derivado de:",
    options: [
      { value: "a", text: "Apenas as transações" },
      { value: "b", text: "O cabeçalho do bloco (incluindo Nonce, Previous Hash e Merkle Root)" },
      { value: "c", "text": "O endereço do minerador" }
    ],
    correct: "b"
  },
  {
    question: "Qual a função do Hash em uma Transação de Blockchain?",
    options: [
      { value: "a", text: "Assinatura digital da transação" },
      { value: "b", text: "Definir o valor da transação" },
      { value: "c", "text": "Garantir a integridade da transação (que ela não foi adulterada)" }
    ],
    correct: "c"
  },
  {
    question: "A propriedade de 'encadeamento' de blocos é garantida por qual mecanismo?",
    options: [
      { value: "a", text: "O Efeito Avalanche" },
      { value: "b", text: "A inclusão do Hash do bloco anterior no bloco atual" },
      { value: "c", "text": "O Nonce" }
    ],
    correct: "b"
  },
  {
    question: "O que o hash de um bloco ajuda a prevenir em uma rede descentralizada?",
    options: [
      { value: "a", text: "Atrasos de rede" },
      { value: "b", text: "Que um nó malicioso altere o histórico de transações despercebido" },
      { value: "c", "text": "Transações muito longas" }
    ],
    correct: "b"
  },
  {
    question: "Um ataque de 'Força Bruta' visa encontrar um input que satisfaça a Dificuldade. Que input está sendo alterado?",
    options: [
      { value: "a", text: "A transação" },
      { value: "b", text: "O Nonce" },
      { value: "c", "text": "O Previous Hash" }
    ],
    correct: "b"
  },
  {
    question: "Em um bloco, qual campo *não* é alterado pelo minerador durante o processo de mineração?",
    options: [
      { value: "a", text: "O Nonce" },
      { value: "b", text: "O Merkle Root (derivado das transações)" },
      { value: "c", "text": "O Timestamp" }
    ],
    correct: "b"
  },
  {
    question: "O que acontece se o hash calculado de um bloco for diferente do hash que a rede espera (devido a uma alteração nos dados)?",
    options: [
      { value: "a", text: "O bloco é aceito com uma taxa de transação menor" },
      { value: "b", text: "O bloco é considerado inválido e rejeitado" },
      { value: "c", "text": "O bloco é apenas sinalizado" }
    ],
    correct: "b"
  },
  {
    question: "Se um input for '256 bits' e gerar um hash SHA-256, o hash terá:",
    options: [
      { value: "a", text: "O dobro do tamanho do input" },
      { value: "b", text: "256 bits" },
      { value: "c", "text": "Tamanho variável" }
    ],
    correct: "b"
  },
  {
    question: "Qual o risco de usar uma função hash fraca (com alta probabilidade de colisão) em um blockchain?",
    options: [
      { value: "a", text: "O blockchain ficará muito lento" },
      { value: "b", text: "Um atacante pode facilmente trocar um dado por outro com o mesmo hash" },
      { value: "c", "text": "O Efeito Avalanche não funcionará" }
    ],
    correct: "b"
  },
  {
    question: "O uso do hash do bloco anterior força que a cadeia seja vista como uma:",
    options: [
      { value: "a", text: "Lista Simples" },
      { value: "b", text: "Estrutura Sequencial e Cronológica" },
      { value: "c", "text": "Estrutura Aleatória" }
    ],
    correct: "b"
  },
  {
    question: "Em resumo, a função Hash em blockchain garante principalmente a _____ dos dados e a _____ da cadeia.",
    options: [
      { value: "a", text: "Velocidade e compressão" },
      { value: "b", text: "Integridade e imutabilidade" },
      { value: "c", "text": "Anonimato e descentralização" }
    ],
    correct: "b"
  },
  {
    question: "Se o tempo de um bloco fosse alterado, qual componente do bloco mudaria?",
    options: [
      { value: "a", text: "O Merkle Root" },
      { value: "b", text: "O Previous Hash" },
      { value: "c", "text": "O Hash do Bloco" }
    ],
    correct: "c"
  },
  {
    question: "O que 'SHA' significa em SHA-256?",
    options: [
      { value: "a", text: "Secure Hash Algorithm" },
      { value: "b", text: "Simple Hash Access" },
      { value: "c", "text": "Standard Hashing Application" }
    ],
    correct: "a"
  },
  {
    question: "Qual o número que é incrementado rapidamente na mineração para tentar atingir o Target?",
    options: [
      { value: "a", text: "Timestamp" },
      { value: "b", text: "Nonce" },
      { value: "c", "text": "Previous Hash" }
    ],
    correct: "b"
  },
  {
    question: "Para o hash ser aceito, a regra 'hash < target' assegura que o minerador:",
    options: [
      { value: "a", text: "Usou a chave privada correta" },
      { value: "b", text: "Realizou uma quantidade substancial de trabalho computacional" },
      { value: "c", "text": "Incluiu muitas transações" }
    ],
    correct: "b"
  },
  {
    question: "O que o Determinismo garante sobre a verificação do bloco por outros nós?",
    options: [
      { value: "a", text: "Que o hash será diferente" },
      { value: "b", text: "Que todos os nós calcularão exatamente o mesmo hash e poderão validá-lo" },
      { value: "c", "text": "Que o hash é sempre par" }
    ],
    correct: "b"
  },
  {
    question: "A dificuldade de mineração é ajustada periodicamente para controlar:",
    options: [
      { value: "a", text: "O tamanho do bloco" },
      { value: "b", text: "O tempo médio necessário para encontrar um novo bloco" },
      { value: "c", "text": "O Efeito Avalanche" }
    ],
    correct: "b"
  }
];