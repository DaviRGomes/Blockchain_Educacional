export const blockchainQuestions = [
  // ** FOCO 1: ENCADEMENTO E IMUTABILIDADE (Q1-Q15) **

  {
    question: "O que liga um bloco ao anterior em uma blockchain?",
    options: [
      { value: "a", text: "O número do bloco anterior" },
      { value: "b", text: "O hash do bloco anterior (previousHash)" },
      { value: "c", text: "A quantidade de transações" },
      { value: "d", text: "O Nonce" }
    ],
    correct: "b"
  },
  {
    question: "Alterar um bloco no meio da cadeia causa:",
    options: [
      { value: "a", text: "Nenhum efeito nos seguintes" },
      { value: "b", text: "Invalidar os hashes dos blocos seguintes (quebra o encadeamento)" },
      { value: "c", text: "Apenas muda o previousHash do primeiro bloco" },
      { value: "d", text: "Aumenta automaticamente o Nonce" }
    ],
    correct: "b"
  },
  {
    question: "A imutabilidade da Blockchain é garantida principalmente por qual princípio técnico?",
    options: [
      { value: "a", text: "O uso de uma linguagem de programação segura" },
      { value: "b", text: "O encadeamento criptográfico de blocos via hashes" },
      { value: "c", text: "O fato de ser um livro-razão público" },
      { value: "d", text: "A dificuldade de encontrar um Nonce" }
    ],
    correct: "b"
  },
  {
    question: "Se o Bloco 10 tem hash X, qual campo do Bloco 11 deve ser igual a X?",
    options: [
      { value: "a", text: "O Hash do Bloco 11" },
      { value: "b", text: "O Nonce do Bloco 11" },
      { value: "c", text: "O previousHash do Bloco 11" },
      { value: "d", text: "O número do Bloco 11" }
    ],
    correct: "c"
  },
  {
    question: "Qual o custo principal para um atacante que tenta alterar um bloco antigo?",
    options: [
      { value: "a", text: "Perder a recompensa do bloco atual" },
      { value: "b", text: "A necessidade de recalcular o hash desse bloco e reminerar *todos* os blocos subsequentes" },
      { value: "c", text: "Apenas recalcular o Nonce do bloco alterado" },
      { value: "d", text: "Alterar a dificuldade da rede" }
    ],
    correct: "b"
  },
  {
    question: "O que acontece com o estado de um bloco após uma alteração em seus dados?",
    options: [
      { value: "a", text: "Ele permanece válido se o Nonce for mantido" },
      { value: "b", text: "Ele se torna 'Inválido' porque o hash não corresponde mais aos dados" },
      { value: "c", text: "Ele é automaticamente corrigido" },
      { value: "d", text: "A dificuldade é reduzida" }
    ],
    correct: "b"
  },
  {
    question: "Qual o papel do 'Exemplo prático' na compreensão da Blockchain?",
    options: [
      { value: "a", text: "Mostrar que o Nonce é zero" },
      { value: "b", text: "Demonstrar a segurança e imutabilidade da cadeia após uma alteração nos dados" },
      { value: "c", text: "Apenas mostrar o cálculo do hash" },
      { value: "d", text: "Provar a velocidade da mineração" }
    ],
    correct: "b"
  },
  {
    question: "O que o 'Hash' de cada bloco representa?",
    options: [
      { value: "a", text: "A assinatura do minerador" },
      { value: "b", text: "A prova de que a transação é legítima" },
      { value: "c", text: "Uma 'impressão digital' única e criptográfica do conteúdo do bloco" },
      { value: "d", text: "A chave pública do criador do bloco" }
    ],
    correct: "c"
  },
  {
    question: "O Bloco Gênesis (o primeiro bloco) tem seu previousHash definido como:",
    options: [
      { value: "a", text: "O Hash do bloco anterior (um valor real)" },
      { value: "b", text: "Um valor preenchido com zeros (não possui bloco anterior)" },
      { value: "c", text: "O Nonce do bloco" },
      { value: "d", text: "O valor da dificuldade" }
    ],
    correct: "b"
  },
  {
    question: "O que é uma Blockchain?",
    options: [
      { value: "a", text: "Um tipo de Contrato Inteligente" },
      { value: "b", text: "Um livro-razão centralizado" },
      { value: "c", text: "Uma cadeia de blocos interligados que registra transações de forma segura" },
      { value: "d", text: "Apenas um algoritmo de hash" }
    ],
    correct: "c"
  },
  {
    question: "Por que não se deve armazenar dados sensíveis diretamente nos blocos (Boas Práticas)?",
    options: [
      { value: "a", text: "Porque os dados podem ser alterados" },
      { value: "b", text: "Porque a blockchain é um registro transparente e público" },
      { value: "c", "text": "Porque o hash ficaria muito longo" },
      { value: "d", "text": "Porque o Nonce seria zero" }
    ],
    correct: "b"
  },
  {
    question: "Para o Bloco 12 ser válido, seu previousHash deve ser:",
    options: [
      { value: "a", text: "O hash do Bloco 13" },
      { value: "b", text: "O hash do Bloco 11" },
      { value: "c", "text": "O Nonce do Bloco 12" },
      { value: "d", "text": "A dificuldade" }
    ],
    correct: "b"
  },
  {
    question: "Se a função `recomputeFrom(i)` for chamada, quais blocos subsequentes são afetados?",
    options: [
      { value: "a", text: "Apenas o bloco 'i'" },
      { value: "b", text: "O bloco 'i' e todos os blocos após ele na cadeia" },
      { value: "c", "text": "Apenas o bloco Gênesis" },
      { value: "d", "text": "Apenas o Nonce de todos os blocos" }
    ],
    correct: "b"
  },
  {
    question: "O que garante a 'integridade' do registro na blockchain?",
    options: [
      { value: "a", text: "Apenas a distribuição em múltiplos nós" },
      { value: "b", text: "O hash de cada bloco que torna qualquer alteração detectável" },
      { value: "c", "text": "A alta velocidade de mineração" },
      { value: "d", "text": "O uso de números pares no Nonce" }
    ],
    correct: "b"
  },
  {
    question: "O que é 'data' em um bloco, na prática?",
    options: [
      { value: "a", text: "O Nonce e o Previous Hash" },
      { value: "b", text: "O número do bloco" },
      { value: "c", "text": "As transações que estão sendo validadas" },
      { value: "d", "text": "O código da função hash" }
    ],
    correct: "c"
  },

  // ** FOCO 2: MINERAÇÃO E PROOF OF WORK (Q16-Q35) **

  {
    question: "Para validar um bloco, a mineração busca um nonce tal que:",
    options: [
      { value: "a", text: "O hash seja igual ao previousHash" },
      { value: "b", text: "O hash seja menor ou igual ao padrão de dificuldade (ex: começar com '0000')" },
      { value: "c", "text": "O número do bloco seja par" },
      { value: "d", "text": "O Nonce seja zero" }
    ],
    correct: "b"
  },
  {
    question: "O que é o 'Proof of Work' (Prova de Trabalho)?",
    options: [
      { value: "a", text: "A verificação do previousHash" },
      { value: "b", text: "O esforço computacional exigido para encontrar um hash válido (mineração)" },
      { value: "c", "text": "A distribuição de cópias da cadeia" },
      { value: "d", "text": "A assinatura de transações" }
    ],
    correct: "b"
  },
  {
    question: "Qual valor é ajustado repetidamente no processo de mineração para encontrar um hash válido?",
    options: [
      { value: "a", text: "O previousHash" },
      { value: "b", text: "O número do bloco" },
      { value: "c", "text": "O Nonce" },
      { value: "d", "text": "Os dados" }
    ],
    correct: "c"
  },
  {
    question: "Qual o valor máximo de tentativas (nonce) na simulação?",
    options: [
      { value: "a", text: "O Nonce do bloco anterior" },
      { value: "b", text: "200.000 (maximumNonce)" },
      { value: "c", "text": "O valor da dificuldade" },
      { value: "d", "text": "100" }
    ],
    correct: "b"
  },
  {
    question: "Qual a função do `difficulty` ('0000' na simulação)?",
    options: [
      { value: "a", text: "Ser o previousHash do Bloco Gênesis" },
      { value: "b", text: "Definir o critério que o hash do bloco precisa cumprir para ser válido" },
      { value: "c", "text": "Limitar o tamanho dos dados" },
      { value: "d", "text": "Apenas um marcador de texto" }
    ],
    correct: "b"
  },
  {
    question: "Se o hash de um bloco não começar com '0000' (na simulação), ele será:",
    options: [
      { value: "a", text: "Válido" },
      { value: "b", text: "Inválido" },
      { value: "c", "text": "Validado automaticamente" },
      { value: "d", "text": "Aceito se o Nonce for maior que 100" }
    ],
    correct: "b"
  },
  {
    question: "Se a mineração falhar após o `maximumNonce` ser atingido, o que deve ser feito para continuar a busca por um hash válido?",
    options: [
      { value: "a", text: "Apenas tentar o mesmo Nonce novamente" },
      { value: "b", text: "Alterar os dados do bloco para gerar um novo input de Hash e tentar novos Nonces" },
      { value: "c", "text": "Alterar o Previous Hash" },
      { value: "d", "text": "Mudar o número do bloco" }
    ],
    correct: "b"
  },
  {
    question: "O que o sucesso na mineração de um bloco significa?",
    options: [
      { value: "a", text: "Que a dificuldade será reduzida" },
      { value: "b", text: "Que o Nonce é igual a 1" },
      { value: "c", "text": "Que a Prova de Trabalho foi realizada e o bloco é válido para ser adicionado" },
      { value: "d", "text": "Que o Previous Hash é inválido" }
    ],
    correct: "c"
  },
  {
    question: "Qual o custo de tentar uma alteração no passado e não reminerar os blocos seguintes?",
    options: [
      { value: "a", text: "O bloco alterado é aceito, mas os seguintes são rejeitados" },
      { value: "b", text: "A cadeia fica inconsistente, e a rede rejeita a versão adulterada" },
      { value: "c", "text": "O Nonce de todos os blocos é perdido" },
      { value: "d", "text": "Apenas o bloco alterado é rejeitado" }
    ],
    correct: "b"
  },
  {
    question: "Qual dos seguintes é um input para a função `makeHash`?",
    options: [
      { value: "a", text: "Apenas o Hash do Bloco" },
      { value: "b", text: "O número do bloco, previousHash, dados e nonce" },
      { value: "c", "text": "Apenas o Nonce e a dificuldade" },
      { value: "d", "text": "O endereço IP do minerador" }
    ],
    correct: "b"
  },
  {
    question: "Se o hash do Bloco 5 for alterado, qual bloco tem o `previousHash` que se torna incorreto?",
    options: [
      { value: "a", text: "Bloco 4" },
      { value: "b", text: "Bloco 5" },
      { value: "c", "text": "Bloco 6" },
      { value: "d", "text": "Bloco Gênesis" }
    ],
    correct: "c"
  },
  {
    question: "O que o Nonce representa no cálculo do Hash?",
    options: [
      { value: "a", text: "Uma constante" },
      { value: "b", text: "Um valor variável usado para buscar o Hash alvo" },
      { value: "c", "text": "O valor da dificuldade" },
      { value: "d", "text": "A data e hora" }
    ],
    correct: "b"
  },
  {
    question: "Por que o Bloco Gênesis não precisa ter seu previousHash validado?",
    options: [
      { value: "a", text: "Porque ele não tem Nonce" },
      { value: "b", text: "Porque ele é o ponto de partida e não tem um predecessor" },
      { value: "c", "text": "Porque sua dificuldade é zero" },
      { value: "d", "text": "Porque ele é o único que pode ser alterado" }
    ],
    correct: "b"
  },
  {
    question: "O que o processo de mineração adiciona ao bloco, que comprova o esforço computacional?",
    options: [
      { value: "a", text: "O Hash do Bloco anterior" },
      { value: "b", text: "Um Nonce válido" },
      { value: "c", "text": "O número do bloco" },
      { value: "d", "text": "Os dados originais" }
    ],
    correct: "b"
  },
  {
    question: "O que a segurança da Blockchain torna quase impossível (conforme o Onboarding)?",
    options: [
      { value: "a", text: "Validar hashes" },
      { value: "b", text: "Alterar blocos antigos sem recalcular toda a cadeia" },
      { value: "c", "text": "Usar Nonce zero" },
      { value: "d", "text": "Visualizar a cadeia" }
    ],
    correct: "b"
  },
  {
    question: "Qual campo o minerador deve 'chutar' para encontrar um Hash que comece com '0000'?",
    options: [
      { value: "a", text: "O previousHash" },
      { value: "b", text: "O Nonce" },
      { value: "c", "text": "O número do bloco" },
      { value: "d", "text": "A dificuldade" }
    ],
    correct: "b"
  },
  {
    question: "Se a dificuldade fosse '00000', o que a mineração exigiria?",
    options: [
      { value: "a", text: "Um hash menor ou igual a '0000'" },
      { value: "b", text: "Um hash com pelo menos 5 zeros no prefixo" },
      { value: "c", "text": "Um Nonce zero" },
      { value: "d", "text": "Apenas um hash qualquer" }
    ],
    correct: "b"
  },
  {
    question: "O que o minerador ganha ao encontrar um Nonce válido?",
    options: [
      { value: "a", text: "Apenas a satisfação" },
      { value: "b", text: "O direito de adicionar o bloco à cadeia e receber a recompensa" },
      { value: "c", "text": "Um novo Nonce" },
      { value: "d", "text": "A dificuldade é reduzida para ele" }
    ],
    correct: "b"
  },
  {
    question: "Por que a mineração deve ser realizada novamente após a alteração dos dados?",
    options: [
      { value: "a", text: "Para mudar o número do bloco" },
      { value: "b", text: "Porque o hash do bloco (quebrou) e o Nonce anterior não é mais válido para o novo hash" },
      { value: "c", "text": "Para mudar o previousHash" },
      { value: "d", "text": "Para aumentar o máximo de Nonce" }
    ],
    correct: "b"
  },
  {
    question: "O que o Bloco 1 (na simulação) usa como `previousHash`?",
    options: [
      { value: "a", text: "O Hash do Bloco Gênesis" },
      { value: "b", text: "Um hash com zeros (pois é o primeiro do array)" },
      { value: "c", "text": "Seu próprio Nonce" },
      { value: "d", "text": "A dificuldade" }
    ],
    correct: "b"
  },

  // ** FOCO 3: CONSENSO E PILARES DE SEGURANÇA (Q36-Q50) **

  {
    question: "Qual dos seguintes *não* é um pilar da segurança da blockchain, conforme o Onboarding?",
    options: [
      { value: "a", text: "Hashes" },
      { value: "b", text: "Distribuição (Replicação em múltiplos nós)" },
      { value: "c", "text": "Proof of Work" },
      { value: "d", "text": "Controle Centralizado de Dados" }
    ],
    correct: "d"
  },
  {
    question: "O que significa o pilar 'Distribuição' na segurança da blockchain?",
    options: [
      { value: "a", text: "Apenas a velocidade de mineração" },
      { value: "b", text: "A replicação da cadeia em múltiplos nós da rede" },
      { value: "c", "text": "O Nonce deve ser distribuído" },
      { value: "d", "text": "O controle centralizado de dados" }
    ],
    correct: "b"
  },
  {
    question: "O que os nós da rede fazem para garantir o 'consenso'?",
    options: [
      { value: "a", text: "Eles competem para ver quem é o mais rápido" },
      { value: "b", text: "Eles concordam sobre a validade do bloco antes de adicioná-lo à cadeia" },
      { value: "c", "text": "Eles reescrevem o histórico" },
      { value: "d", "text": "Eles ignoram a dificuldade" }
    ],
    correct: "b"
  },
  {
    question: "Se a rede estiver operando corretamente, a maioria dos nós terá:",
    options: [
      { value: "a", text: "Cópias diferentes da cadeia" },
      { value: "b", text: "A mesma cópia válida e mais longa da cadeia" },
      { value: "c", "text": "Nenhum bloco" },
      { value: "d", "text": "Um previousHash diferente" }
    ],
    correct: "b"
  },
  {
    question: "O Onboarding sugere qual ação para aumentar a segurança da cadeia (Boas Práticas)?",
    options: [
      { value: "a", text: "Apenas minerar blocos" },
      { value: "b", text: "Validar hashes e transações antes de adicionar blocos" },
      { value: "c", "text": "Ignorar o Nonce" },
      { value: "d", "text": "Remover o previousHash" }
    ],
    correct: "b"
  },
  {
    question: "O que é 'Proof of Work' (PoW) no contexto do Módulo 3?",
    options: [
      { value: "a", text: "A prova de que a rede é descentralizada" },
      { value: "b", text: "O mecanismo que usa o Nonce para provar o esforço computacional e proteger a cadeia" },
      { value: "c", "text": "A assinatura de transações" },
      { value: "d", "text": "O Efeito Avalanche" }
    ],
    correct: "b"
  },
  {
    question: "Se um bloco é considerado inválido, ele:",
    options: [
      { value: "a", text: "É adicionado à cadeia de qualquer maneira" },
      { value: "b", text: "É rejeitado pela rede e não entra na cadeia principal" },
      { value: "c", "text": "Tem seu Nonce resetado para zero" },
      { value: "d", "text": "Altera o previousHash" }
    ],
    correct: "b"
  },
  {
    question: "O que o Onboarding alerta para não fazer com dados sensíveis?",
    options: [
      { value: "a", text: "Usar o Nonce para protegê-los" },
      { value: "b", text: "Armazená-los diretamente nos blocos (por serem transparentes)" },
      { value: "c", "text": "Usar a dificuldade zero" },
      { value: "d", "text": "Alterar o previousHash" }
    ],
    correct: "b"
  },
  {
    question: "O consenso na Blockchain é necessário porque:",
    options: [
      { value: "a", text: "A rede é centralizada" },
      { value: "b", text: "Não há autoridade central, e os nós devem concordar sobre a verdade do ledger" },
      { value: "c", "text": "O Nonce é imprevisível" },
      { value: "d", "text": "O previousHash é mutável" }
    ],
    correct: "b"
  },
  {
    question: "O que é o 'previousHash' em um bloco, na prática?",
    options: [
      { value: "a", text: "O Nonce anterior" },
      { value: "b", text: "O valor da dificuldade" },
      { value: "c", "text": "O hash do bloco anterior" },
      { value: "d", "text": "Os dados do bloco" }
    ],
    correct: "c"
  },
  {
    question: "Se o Bloco 3 for alterado, qual é o próximo passo obrigatório de um atacante para revalidar a cadeia?",
    options: [
      { value: "a", text: "Recalcular o Bloco 3, 4 e 5" },
      { value: "b", text: "Recalcular apenas o Bloco 3" },
      { value: "c", "text": "Recalcular apenas o Bloco Gênesis" },
      { value: "d", "text": "Alterar apenas o Nonce do Bloco 3" }
    ],
    correct: "a"
  },
  {
    question: "O que o Onboarding define como o que torna quase impossível alterar blocos antigos?",
    options: [
      { value: "a", text: "A alta velocidade de mineração" },
      { value: "b", text: "A necessidade de recalcular todos os hashes subsequentes devido ao encadeamento" },
      { value: "c", "text": "A dificuldade zero" },
      { value: "d", "text": "O tamanho do bloco" }
    ],
    correct: "b"
  },
  {
    question: "Qual o resultado de um Nonce válido ser encontrado?",
    options: [
      { value: "a", text: "O hash do bloco anterior é alterado" },
      { value: "b", text: "O bloco é validado e pode ser propagado para o consenso" },
      { value: "c", "text": "O Nonce é resetado para zero" },
      { value: "d", "text": "O número do bloco é alterado" }
    ],
    correct: "b"
  },
  {
    question: "Qual dos seguintes é um input para a função `makeHash` (além do Nonce)?",
    options: [
      { value: "a", text: "Apenas a dificuldade" },
      { value: "b", text: "O previousHash" },
      { value: "c", "text": "Apenas o previousHash e o Nonce" },
      { value: "d", "text": "O endereço IP do minerador" }
    ],
    correct: "b"
  },
  {
    question: "O que a segurança da Blockchain garante sobre o registro de transações?",
    options: [
      { value: "a", text: "Que ele seja centralizado" },
      { value: "b", text: "Que ele seja apenas visualizado por um nó" },
      { value: "c", "text": "Que ele seja seguro e transparente" },
      { value: "d", "text": "Que o Nonce seja zero" }
    ],
    correct: "c"
  }
];