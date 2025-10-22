
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