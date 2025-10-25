export const blockQuestions = [
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
    question: "Qual é a função do nonce em um bloco?",
    options: [
      { value: "a", text: "Armazenar os dados do bloco" },
      { value: "b", text: "Garantir que o hash do bloco satisfaça a dificuldade de mineração" },
      { value: "c", text: "Registrar o hash do bloco anterior" }
    ],
    correct: "b"
  },
  {
    question: "O que acontece se os dados de um bloco forem alterados sem recalcular o hash?",
    options: [
      { value: "a", text: "O bloco continua válido normalmente" },
      { value: "b", text: "O hash muda e o bloco fica inválido" },
      { value: "c", text: "Nada, o blockchain corrige automaticamente" }
    ],
    correct: "b"
  }
]