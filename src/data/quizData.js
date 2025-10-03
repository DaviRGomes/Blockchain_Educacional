// Perguntas do módulo Hash
export const hashQuestions = [
  {
    question: "Se eu mudar uma letra no texto, o hash:",
    options: [
      { value: "a", text: "Muda pouco" },
      { value: "b", text: "Muda completamente" },
      { value: "c", text: "Não muda" }
    ],
    correct: "b"
  },
  {
    question: "É possível descobrir o texto original a partir do hash?",
    options: [
      { value: "a", text: "Sim, sempre" },
      { value: "b", text: "Não, é impossível" },
      { value: "c", text: "Às vezes" }
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
  }
]

// Aqui você pode adicionar perguntas de outros módulos
export const blockQuestions = [
  {
    question: "O que é um bloco no blockchain?",
    options: [
      { value: "a", text: "Um arquivo de texto" },
      { value: "b", text: "Um conjunto de transações agrupadas" },
      { value: "c", text: "Um tipo de moeda" }
    ],
    correct: "b"
  }
  // ... mais perguntas
]

export const blockchainQuestions = [
  {
    question: "O que liga um bloco ao anterior em uma blockchain?",
    options: [
      { value: "a", text: "O número do bloco anterior" },
      { value: "b", text: "O hash do bloco anterior (previous)" },
      { value: "c", text: "A quantidade de transações" }
    ],
    correct: "b"
  },
  {
    question: "Alterar um bloco no meio da cadeia causa:",
    options: [
      { value: "a", text: "Nenhum efeito nos seguintes" },
      { value: "b", text: "Invalidar os hashes dos blocos seguintes" },
      { value: "c", text: "Apenas muda o previous do primeiro bloco" }
    ],
    correct: "b"
  },
  {
    question: "Para validar um bloco, a mineração busca um nonce tal que:",
    options: [
      { value: "a", text: "O hash seja igual ao previous" },
      { value: "b", text: "O hash seja menor ou igual ao padrão de dificuldade" },
      { value: "c", text: "O número do bloco seja par" }
    ],
    correct: "b"
  }
]