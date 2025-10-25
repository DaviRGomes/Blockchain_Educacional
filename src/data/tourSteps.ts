export interface TourStepContent {
  title: string;
  text: string;
}

export const HashTourSteps: { [key: number]: TourStepContent } = {
  1: {
    title: 'Vamos Começar',
    text: 'Como dissemos, o Hash é a "impressão digital" de qualquer dado.\n\nPara começar, digite seu nome (ou qualquer palavra) neste campo de texto.'
  },
  2: { 
    title: 'Gerar o Hash', 
    text: 'Ótimo. Agora, clique no botão "Criptografar" para gerar a impressão digital única do seu nome.' 
  },
  3: { 
    title: 'Aqui Está!', 
    text: 'Pronto! Este é o Hash (a impressão digital) do seu nome. Observe bem este código.\n\nAgora, vamos testar o "Efeito Avalanche"...' 
  },
  4: { 
    title: 'Teste a Segurança', 
    text: 'Volte ao campo de texto e adicione apenas uma letra no final do seu nome (por exemplo, "Phyllipes").\n\nApenas uma pequena mudança.' 
  },
  5: { 
    title: 'Recalcular', 
    text: 'Clique em "Criptografar" novamente para gerar a nova impressão digital.' 
  },
  6: { 
    title: 'Viu só?', 
    text: 'Repare! Você mudou uma única letra, mas o hash mudou completamente!\n\nEste é o Efeito Avalanche.' 
  },
  7: { 
    title: 'Prática Concluída!', 
    text: 'Isso também prova que o processo é irreversível: você pode criar um hash a partir de um texto, mas não pode descobrir o texto original a partir do hash. Parabéns!' 
  }
};

export const BlockTourSteps = { /* ... */ };