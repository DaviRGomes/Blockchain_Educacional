export const blockQuestions = [
  // ** FOCO 1: ESTRUTURA E ENCADEMENTO DE BLOCOS (Q1-Q15) **
  {
    question: "Qual é a unidade fundamental que agrupa transações e metadados, como número, nonce e dados, em uma blockchain?",
    options: [
      { value: "a", text: "O Token" },
      { value: "b", text: "O Contrato Inteligente" },
      { value: "c", text: "O Bloco" },
      { value: "d", text: "O Nó (Node)" }
    ],
    correct: "c"
  },
  {
    question: "O que o 'previousHash' (hash do bloco anterior) garante na estrutura da blockchain?",
    options: [
      { value: "a", text: "Apenas a velocidade de mineração" },
      { value: "b", text: "A imutabilidade e a consistência da ordem cronológica dos blocos" },
      { value: "c", text: "O limite máximo de transações" },
      { value: "d", text: "O valor da moeda" }
    ],
    correct: "b"
  },
  {
    question: "Na mineração, qual é o principal objetivo de ajustar repetidamente o valor do Nonce?",
    options: [
      { value: "a", text: "Mudar os dados internos do bloco" },
      { value: "b", text: "Mudar o hash do bloco para que ele atenda ao requisito da dificuldade (Target)" },
      { value: "c", text: "Recalcular o hash do bloco anterior" },
      { value: "d", text: "Definir o número do bloco" }
    ],
    correct: "b"
  },
  {
    question: "O que acontece com o Hash de um bloco se você alterar apenas uma letra no campo 'Dados'?",
    options: [
      { value: "a", text: "O hash permanecerá o mesmo, pois é resistente a pequenas alterações." },
      { value: "b", text: "O hash muda pouco, apenas alguns caracteres no final." },
      { value: "c", text: "O hash muda completamente, tornando o bloco inválido para a cadeia." },
      { value: "d", text: "Apenas o Nonce é resetado para zero." }
    ],
    correct: "c"
  },
  {
    question: "Qual campo do bloco (na simulação) deve ser recalculado (reminerado) para que o bloco alterado volte a ser válido após uma mudança nos 'Dados'?",
    options: [
      { value: "a", text: "O Previous Hash" },
      { value: "b", text: "O Número do Bloco" },
      { value: "c", text: "O Nonce" },
      { value: "d", text: "O Target (Alvo da Dificuldade)" }
    ],
    correct: "c"
  },
  {
    question: "A mineração é descrita como um processo computacionalmente custoso. O que essa 'custosidade' impede?",
    options: [
      { value: "a", text: "Que o hash seja muito longo" },
      { value: "b", text: "Que o Nonce seja zero" },
      { value: "c", text: "Que um atacante altere o histórico de blocos retroativamente de forma barata e rápida" },
      { value: "d", text: "Que o bloco contenha muitas transações" }
    ],
    correct: "c"
  },
  {
    question: "Por que executar loops de força bruta (mineração) no thread principal do navegador é desaconselhável?",
    options: [
      { value: "a", text: "O navegador não suporta funções hash" },
      { value: "b", text: "Isso pode travar ou congelar a interface do usuário" },
      { value: "c", text: "Apenas ASICs podem minerar" },
      { value: "d", text: "A dificuldade é automaticamente aumentada" }
    ],
    correct: "b"
  },
  {
    question: "Qual solução técnica é sugerida para executar processos custosos (como a mineração simulada) em paralelo?",
    options: [
      { value: "a", text: "WebWorkers" },
      { value: "b", text: "Promises Síncronas" },
      { value: "c", text: "ASICs" },
      { value: "d", text: "Redução do Hash do Bloco" }
    ],
    correct: "a"
  },
  {
    question: "O que a Dificuldade na mineração representa em termos de segurança?",
    options: [
      { value: "a", text: "O valor máximo de Nonce permitido" },
      { value: "b", text: "O grau de poder computacional que deve ser gasto para validar um bloco e adicionar trabalho à cadeia" },
      { value: "c", text: "O número de mineradores ativos" },
      { value: "d", text: "O número de blocos subsequentes que devem ser reminerados" }
    ],
    correct: "b"
  },
  {
    question: "Qual dos seguintes campos é incluído no cálculo do Hash final do bloco?",
    options: [
      { value: "a", text: "A chave privada do minerador" },
      { value: "b", text: "O Número do Bloco" },
      { value: "c", text: "O software de mineração usado" },
      { value: "d", text: "A versão do navegador do usuário" }
    ],
    correct: "b"
  },
  {
    question: "O que a principal consequência de o hash do bloco não satisfazer o requisito de dificuldade?",
    options: [
      { value: "a", text: "O minerador recebe uma recompensa menor" },
      { value: "b", text: "O bloco é considerado inválido e não pode ser propagado para a cadeia principal" },
      { value: "c", text: "O Nonce é automaticamente incrementado" },
      { value: "d", text: "O previousHash é resetado" }
    ],
    correct: "b"
  },
  {
    question: "O que é necessário para que a 'consistência' da cadeia seja recuperada após os dados de um bloco terem sido alterados?",
    options: [
      { value: "a", text: "Apenas reverter a alteração nos dados" },
      { value: "b", text: "Recalcular o hash do bloco alterado e de todos os blocos subsequentes" },
      { value: "c", text: "Apenas mudar o Nonce para zero" },
      { value: "d", text: "Aumentar o número do bloco" }
    ],
    correct: "b"
  },
  {
    question: "Qual a principal diferença entre a simulação de mineração no navegador e a mineração em sistemas reais?",
    options: [
      { value: "a", text: "A simulação não usa a função SHA-256" },
      { value: "b", text: "A mineração real usa hardware especializado e threads/processos dedicados" },
      { value: "c", text: "A mineração real não se preocupa com o Efeito Avalanche" },
      { value: "d", text: "A mineração real não usa o Nonce" }
    ],
    correct: "b"
  },
  {
    question: "Qual é a relação entre o Hash do Bloco e a Propriedade de Determinismo?",
    options: [
      { value: "a", text: "O Determinismo garante que a mineração seja sempre rápida." },
      { value: "b", text: "O Determinismo garante que o hash será o mesmo em qualquer nó, desde que os inputs sejam idênticos." },
      { value: "c", text: "O Determinismo garante que o hash será totalmente diferente se o input mudar." },
      { value: "d", text: "O Determinismo garante que o hash comece com zeros." }
    ],
    correct: "b"
  },
  {
    question: "O que um nó completo (Full Node) faz para verificar se um bloco que recebeu é válido?",
    options: [
      { value: "a", text: "Verifica se o Previous Hash e o Hash do Bloco satisfazem a Dificuldade e a integridade da cadeia" },
      { value: "b", text: "Apenas confia no minerador" },
      { value: "c", text: "Apenas verifica se o Nonce é maior que zero" },
      { value: "d", text: "Pergunta ao banco central" }
    ],
    correct: "a"
  },
  {
    question: "Qual dos seguintes é um metadado incluído no cálculo do Hash do Bloco?",
    options: [
      { value: "a", text: "A chave privada do minerador" },
      { value: "b", text: "O Nonce" },
      { value: "c", text: "O valor do Bitcoin (BTC)" },
      { value: "d", text: "A URL do site do minerador" }
    ],
    correct: "b"
  },
  {
    question: "Se o Bloco #1 tem hash X, e o Bloco #2 tem previousHash X. Se o hash do Bloco #2 for Y, o Bloco #3 terá seu previousHash igual a:",
    options: [
      { value: "a", text: "O hash do Bloco #1 (X)" },
      { value: "b", text: "O hash do Bloco #2 (Y)" },
      { value: "c", text: "Um novo hash (Z)" },
      { value: "d", text: "Zero" }
    ],
    correct: "b"
  },
  {
    question: "O que a necessidade de reminerar blocos subsequentes após uma alteração no passado garante para o sistema?",
    options: [
      { value: "a", text: "Que a rede seja mais rápida" },
      { value: "b", text: "Que a descentralização seja mantida" },
      { value: "c", text: "Um custo computacional proibitivo para reescrever o histórico de transações" },
      { value: "d", text: "Que o Nonce seja sempre um número baixo" }
    ],
    correct: "c"
  },
  {
    question: "Qual hardware é o mais eficiente para o processo de tentativa e erro (força bruta) na mineração de Hash?",
    options: [
      { value: "a", text: "Hard Disk Drives (HDDs)" },
      { value: "b", text: "GPUs (Placas de Vídeo) e ASICs (Hardware Específico)" },
      { value: "c", text: "CPUs de Smartphone" },
      { value: "d", text: "WebWorkers no navegador" }
    ],
    correct: "b"
  },
  {
    question: "O que significa o termo 'inconsistente' na frase: 'Se o Bloco #1 mudar, Bloco #2 fica inconsistente'?",
    options: [
      { value: "a", text: "O número do Bloco #2 é alterado" },
      { value: "b", text: "O previousHash do Bloco #2 não corresponde mais ao novo Hash do Bloco #1" },
      { value: "c", text: "O Nonce do Bloco #2 precisa ser reduzido" },
      { value: "d", text: "Os dados do Bloco #2 mudam automaticamente" }
    ],
    correct: "b"
  },
  {
    question: "O processo de mineração é necessário porque:",
    options: [
      { value: "a", text: "Os dados do bloco precisam ser criptografados para privacidade" },
      { value: "b", text: "É a única forma de encontrar um Nonce que garanta o requisito de Dificuldade" },
      { value: "c", text: "Os mineradores precisam ser lentos" },
      { value: "d", text: "O previousHash é desconhecido" }
    ],
    correct: "b"
  },
  {
    question: "Qual campo é fundamentalmente uma variável de ajuste no processo de mineração?",
    options: [
      { value: "a", text: "O Previous Hash" },
      { value: "b", text: "O Nonce" },
      { value: "c", text: "O Número do Bloco" },
      { value: "d", text: "Os Dados" }
    ],
    correct: "b"
  },
  {
    question: "O que a condição 'hash do bloco $\\le$ dificuldade alvo' representa?",
    options: [
      { value: "a", text: "Apenas um limite de velocidade" },
      { value: "b", text: "O requisito de Proof-of-Work (Prova de Trabalho)" },
      { value: "c", text: "A garantia de que o Nonce será zero" },
      { value: "d", text: "O Efeito Avalanche" }
    ],
    correct: "b"
  },
  {
    question: "Se o hash de um bloco for validado (o Nonce for encontrado), qual o próximo passo lógico na rede?",
    options: [
      { value: "a", text: "O minerador inicia imediatamente a mineração do bloco seguinte" },
      { value: "b", text: "O bloco é propagado para que os outros nós o verifiquem e adicionem à cadeia" },
      { value: "c", text: "O Nonce é resetado para zero por segurança" },
      { value: "d", text: "O previousHash é alterado para o hash mais recente" }
    ],
    correct: "b"
  },
  {
    question: "O Efeito Avalanche tem um papel fundamental na segurança do bloco, garantindo que:",
    options: [
      { value: "a", text: "O Nonce seja sempre um número pequeno" },
      { value: "b", text: "Qualquer adulteração nos dados torne o bloco inválido de forma previsível e drástica" },
      { value: "c", text: "O previousHash seja sempre zero" },
      { value: "d", text: "A mineração seja síncrona" }
    ],
    correct: "b"
  },
  {
    question: "O que o Onboarding define como o que torna os ataques retroativos custosos?",
    options: [
      { value: "a", text: "A dificuldade de encontrar o Nonce" },
      { value: "b", text: "A necessidade de reminerar o bloco alterado e todos os blocos subsequentes na cadeia" },
      { value: "c", text: "A dificuldade de alterar os 'Dados'" },
      { value: "d", text: "O uso de WebWorkers" }
    ],
    correct: "b"
  },
  {
    question: "Se um Nonce válido for encontrado para o Bloco 10, o Nonce desse bloco pode ser usado para o Bloco 11?",
    options: [
      { value: "a", text: "Sim, sempre" },
      { value: "b", text: "Não, porque o Hash do Bloco 11 depende do novo previousHash (o hash do Bloco 10), que é diferente" },
      { value: "c", text: "Sim, mas apenas se a dificuldade for a mesma" },
      { value: "d", text: "Apenas se os dados forem os mesmos" }
    ],
    correct: "b"
  },
  {
    question: "Qual dos seguintes campos é o único que o minerador pode alterar repetidamente sem alterar o conteúdo da transação do bloco?",
    options: [
      { value: "a", text: "O Hash do Bloco (output)" },
      { value: "b", text: "O Nonce (contador de tentativa e erro)" },
      { value: "c", text: "O Número do Bloco" },
      { value: "d", text: "O Previous Hash" }
    ],
    correct: "b"
  },
  {
    question: "O que o minerador deve tentar fazer se o `maximumNonce` for atingido sem encontrar um hash válido?",
    options: [
      { value: "a", text: "A dificuldade é automaticamente reduzida" },
      { value: "b", text: "O minerador deve tentar alterar os Dados do Bloco para gerar um novo Hash de entrada e tentar novamente" },
      { value: "c", text: "O bloco é rejeitado permanentemente" },
      { value: "d", text: "O previousHash é alterado para um bloco mais antigo" }
    ],
    correct: "b"
  },
  {
    question: "O que aconteceria se a dificuldade não fosse ajustada na rede?",
    options: [
      { value: "a", text: "Os blocos seriam sempre de 1MB" },
      { value: "b", text: "O tempo médio de criação de blocos se tornaria imprevisível" },
      { value: "c", text: "O Efeito Avalanche pararia de funcionar" },
      { value: "d", text: "O Nonce seria sempre o mesmo" }
    ],
    correct: "b"
  },
  {
    question: "Qual campo do bloco (na simulação) deve ser recalculado para que o bloco alterado volte a ser válido após uma mudança nos 'Dados'?",
    options: [
      { value: "a", text: "O Previous Hash" },
      { value: "b", text: "O Número do Bloco" },
      { value: "c", text: "O Nonce" },
      { value: "d", text: "O Target (Alvo da Dificuldade)" }
    ],
    correct: "c"
  },
  {
    question: "Qual dos campos é o resultado da aplicação da função hash sobre os outros campos do bloco?",
    options: [
      { value: "a", text: "Nonce" },
      { value: "b", text: "Hash do Bloco" },
      { value: "c", text: "Previous Hash" },
      { value: "d", text: "Número" }
    ],
    correct: "b"
  },
  {
    question: "Qual a analogia usada para descrever a sensibilidade do hash a alterações nos dados?",
    options: [
      { value: "a", text: "Efeito Estufa" },
      { value: "b", text: "Efeito Dominó" },
      { value: "c", text: "Efeito Avalanche" },
      { value: "d", text: "Efeito Doppler" }
    ],
    correct: "c"
  },
  {
    question: "Se um atacante consegue minerar um bloco malicioso no passado, por que a rede principal provavelmente o rejeitará?",
    options: [
      { value: "a", text: "Porque o atacante não usou um ASIC" },
      { value: "b", text: "Porque o atacante teria que reminerar a cadeia principal, que é a mais longa e exigiu mais trabalho" },
      { value: "c", text: "Porque o Previous Hash não é alterável" },
      { value: "d", text: "Porque o Número do Bloco estaria incorreto" }
    ],
    correct: "b"
  },
  {
    question: "O que o Onboarding recomenda para o usuário fazer na prática para observar o Efeito Avalanche?",
    options: [
      { value: "a", text: "Executar a mineração no backend" },
      { value: "b", text: "Alterar o Nonce e o Número do Bloco simultaneamente" },
      { value: "c", text: "Alterar apenas uma palavra nos dados do bloco e comparar os hashes antes e depois" },
      { value: "d", text: "Usar uma GPU para mineração" }
    ],
    correct: "c"
  },
  {
    question: "Se o hash de um bloco for $\\text{0000A1B2...}$ e o Target for $\\text{0000FFFF...}$, o bloco é:",
    options: [
      { value: "a", text: "Inválido, pois o hash deve ser igual ao Target" },
      { value: "b", text: "Válido, pois o hash é menor que o Target" },
      { value: "c", text: "Inválido, pois o hash contém letras (A, B)" },
      { value: "d", text: "Inválido, pois o prefixo de zeros é muito curto" }
    ],
    correct: "b"
  },
  {
    question: "Qual dos seguintes é um metadado não presente no bloco que é fixo e essencial para o cálculo do hash?",
    options: [
      { value: "a", text: "O Hash do Bloco" },
      { value: "b", text: "O Previous Hash" },
      { value: "c", text: "O Merkle Root" },
      { value: "d", text: "O Nonce" }
    ],
    correct: "b"
  },
  {
    question: "Se o Nonce for encontrado e o hash do bloco for válido, o que os outros nós fazem imediatamente?",
    options: [
      { value: "a", text: "Eles reescrevem os dados do bloco" },
      { value: "b", text: "Eles verificam se o bloco cumpre todas as regras do protocolo (validação)" },
      { value: "c", text: "Eles iniciam a mineração do Bloco Gênesis" },
      { value: "d", text: "Eles aumentam a dificuldade" }
    ],
    correct: "b"
  },
  {
    question: "Em sistemas reais, a mineração é feita por hardware especializado e software de backend. Por que isso é importante?",
    options: [
      { value: "a", text: "Para evitar que o Efeito Avalanche funcione" },
      { value: "b", text: "Para garantir que a mineração seja eficiente e não bloqueie a experiência do usuário" },
      { value: "c", text: "Para que o Nonce seja sempre um número ímpar" },
      { value: "d", text: "Para que o Previous Hash seja zero" }
    ],
    correct: "b"
  },
  {
    question: "O que a propriedade de Determinismo garante em relação ao cálculo do hash?",
    options: [
      { value: "a", text: "Que o hash seja imprevisível" },
      { value: "b", text: "Que o mesmo input sempre produza o mesmo output hash" },
      { value: "c", text: "Que o hash tenha tamanho variável" },
      { value: "d", text: "Que o Nonce seja sempre zero" }
    ],
    correct: "b"
  },
  {
    question: "A mineração é uma forma de Proof-of-Work (Prova de Trabalho) porque:",
    options: [
      { value: "a", text: "O minerador prova que tem um Nonce zero" },
      { value: "b", text: "Exige gasto de tempo e poder computacional (trabalho) para encontrar o Nonce válido" },
      { value: "c", text: "O minerador prova que o bloco não foi alterado" },
      { value: "d", text: "É um processo rápido e fácil" }
    ],
    correct: "b"
  },
  {
    question: "Qual dos campos é essencialmente um 'segredo' que o minerador precisa descobrir?",
    options: [
      { value: "a", text: "O Número do Bloco" },
      { value: "b", text: "O Nonce" },
      { value: "c", text: "O Previous Hash" },
      { value: "d", text: "Os Dados" }
    ],
    correct: "b"
  },
  {
    question: "Qual o propósito do campo 'Dados' em um bloco real?",
    options: [
      { value: "a", text: "Armazenar o código do minerador" },
      { value: "b", text: "Armazenar as transações do período" },
      { value: "c", text: "Armazenar a dificuldade atual" },
      { value: "d", text: "Armazenar o Nonce anterior" }
    ],
    correct: "b"
  },
  {
    question: "O que o sucesso na mineração de um bloco significa para a rede?",
    options: [
      { value: "a", text: "O fim da mineração" },
      { value: "b", text: "Que um novo bloco válido pode ser propagado e adicionado à cadeia" },
      { value: "c", text: "Que o Previous Hash é inválido" },
      { value: "d", text: "Apenas um bloco de teste" }
    ],
    correct: "b"
  },
  {
    question: "O que o Onboarding menciona que um Bloco Gênesis tem uma característica específica?",
    options: [
      { value: "a", text: "Ele tem o Nonce zero" },
      { value: "b", text: "Ele não aponta para um Previous Hash válido (é tipicamente zero)" },
      { value: "c", text: "Ele pode ser alterado a qualquer momento" },
      { value: "d", text: "Ele é o único que não usa Nonce" }
    ],
    correct: "b"
  },
  {
    question: "Se o hash de um bloco for $\\text{0000FFFF...}$ e a Dificuldade exigir $\\text{00000FFFF...}$, o bloco é:",
    options: [
      { value: "a", text: "Válido, pois os prefixos são iguais" },
      { value: "b", text: "Inválido, pois o hash não atinge o número mínimo de zeros no prefixo (Hash > Target)" },
      { value: "c", text: "Válido, pois o hash é menor que o Target" },
      { value: "d", text: "Inválido, pois o Nonce não foi alterado" }
    ],
    correct: "b"
  },
  {
    question: "O que acontece se o minerador não conseguir encontrar um Nonce que satisfaça a Dificuldade?",
    options: [
      { value: "a", text: "O bloco é validado automaticamente" },
      { value: "b", text: "O bloco é descartado e o minerador perde a chance de ganhar a recompensa" },
      { value: "c", text: "O Previous Hash é alterado" },
      { value: "d", text: "O Efeito Avalanche é desativado" }
    ],
    correct: "b"
  },
  {
    question: "Se o hash do Bloco X mudar, por que o Bloco Y (o bloco seguinte) se torna inválido?",
    options: [
      { value: "a", text: "O hash do Bloco X mudou, e ele não corresponde mais ao `previousHash` armazenado no Bloco Y" },
      { value: "b", text: "O Nonce do Bloco Y é resetado" },
      { value: "c", text: "O Bloco Y também é alterado" },
      { value: "d", text: "O número do Bloco Y é alterado" }
    ],
    correct: "a"
  },
  {
    question: "O que a necessidade de reminerar blocos subsequentes após uma alteração garante para a blockchain?",
    options: [
      { value: "a", text: "Velocidade" },
      { value: "b", text: "Integridade (A cadeia é auto-validável)" },
      { value: "c", text: "Descentralização" },
      { value: "d", text: "Anonimato" }
    ],
    correct: "b"
  },
  {
    question: "Qual tipo de hardware é mais eficiente para o processo de tentativa e erro na mineração de Hash (conforme mencionado no Onboarding)?",
    options: [
      { value: "a", text: "Hard Disk Drives (HDDs)" },
      { value: "b", text: "GPUs (Placas de Vídeo) e ASICs (Hardware Específico)" },
      { value: "c", text: "CPUs de Smartphone" },
      { value: "d", text: "WebWorkers no navegador" }
    ],
    correct: "b"
  },
  {
    question: "O que a Dificuldade visa compensar para manter o tempo médio de bloco estável?",
    options: [
      { value: "a", text: "A lentidão do Efeito Avalanche" },
      { value: "b", text: "A variação na taxa de adoção da moeda" },
      { value: "c", text: "O aumento ou diminuição do poder computacional total (Hashrate) da rede" },
      { value: "d", text: "O número de transações não confirmadas" }
    ],
    correct: "c"
  },
  {
    question: "O que o uso de SHA-256 garante sobre o hash do bloco?",
    options: [
      { value: "a", text: "Tamanho variável" },
      { value: "b", text: "Tamanho fixo" },
      { value: "c", text: "Que ele seja sempre zero" },
      { value: "d", text: "Que ele seja sempre ímpar" }
    ],
    correct: "b"
  },
  {
    question: "Se a dificuldade na rede aumenta, o que acontece com a exigência para o Hash do Bloco?",
    options: [
      { value: "a", text: "O Hash pode ser maior que o Target" },
      { value: "b", text: "O Hash deve ter um prefixo de zeros mais longo" },
      { value: "c", text: "O Nonce é forçado a ser um número primo" },
      { value: "d", text: "O Previous Hash é reduzido" }
    ],
    correct: "b"
  },
  {
    question: "O Efeito Avalanche é importante para a segurança porque impede:",
    options: [
      { value: "a", text: "Que o Nonce seja zero" },
      { value: "b", text: "Que um atacante faça mudanças sutis nos dados sem alterar o hash significativamente" },
      { value: "c", text: "Que a mineração use ASICs" },
      { value: "d", text: "Que o bloco contenha o Previous Hash" }
    ],
    correct: "b"
  },
  {
    question: "O que o minerador deve fazer para que o bloco alterado (depois de mudar os Dados) volte a ser válido?",
    options: [
      { value: "a", text: "Apenas reverter a alteração nos Dados" },
      { value: "b", text: "Encontrar um novo Nonce que gere um Hash válido para os novos Dados" },
      { value: "c", text: "Mudar o Número do Bloco" },
      { value: "d", text: "Alterar o Previous Hash" }
    ],
    correct: "b"
  },
  {
    question: "Qual tipo de ataque se torna mais viável se o custo de reminerar blocos subsequentes for baixo?",
    options: [
      { value: "a", text: "Ataque de Força Bruta no Nonce" },
      { value: "b", text: "Ataques retroativos de reescrita de histórico" },
      { value: "c", text: "Ataque de Negação de Serviço (DDoS)" },
      { value: "d", text: "Ataque de Colisão no SHA-256" }
    ],
    correct: "b"
  },
  {
    question: "Qual o propósito do campo 'Dados' na simulação do módulo Block?",
    options: [
      { value: "a", text: "Servir como um campo mutável para observar o Efeito Avalanche" },
      { value: "b", text: "Armazenar o código do minerador" },
      { value: "c", text: "Armazenar a chave privada" },
      { value: "d", text: "Definir a dificuldade" }
    ],
    correct: "a"
  },
  {
    question: "O Onboarding sugere o uso de WebWorkers para evitar qual problema na simulação?",
    options: [
      { value: "a", text: "O Efeito Avalanche" },
      { value: "b", text: "O bloqueio do thread principal e o congelamento da interface" },
      { value: "c", text: "A alteração do Previous Hash" },
      { value: "d", text: "A dificuldade zero" }
    ],
    correct: "b"
  },
  {
    question: "A Dificuldade é ajustada para controlar:",
    options: [
      { value: "a", text: "O tamanho do bloco" },
      { value: "b", text: "O tempo médio necessário para encontrar um novo bloco" },
      { value: "c", text: "A quantidade de transações" },
      { value: "d", text: "A cor do Hash" }
    ],
    correct: "b"
  },
  {
    question: "Qual campo do bloco (na simulação) o minerador manipula para tentar alterar o Hash?",
    options: [
      { value: "a", text: "O número do bloco" },
      { value: "b", text: "O Nonce" },
      { value: "c", text: "Os dados das transações" },
      { value: "d", text: "O Previous Hash" }
    ],
    correct: "b"
  },
  {
    question: "Se o hash de um bloco for validado (o Nonce for encontrado), qual o próximo passo lógico na rede?",
    options: [
      { value: "a", text: "O minerador inicia imediatamente a mineração do bloco seguinte" },
      { value: "b", text: "O bloco é propagado para que os outros nós o verifiquem e adicionem à cadeia" },
      { value: "c", text: "O Nonce é resetado para zero por segurança" },
      { value: "d", text: "O previousHash é alterado para o hash mais recente" }
    ],
    correct: "b"
  },
  {
    question: "O Efeito Avalanche tem um papel fundamental na segurança do bloco, garantindo que:",
    options: [
      { value: "a", text: "O Nonce seja sempre um número pequeno" },
      { value: "b", text: "Qualquer adulteração nos dados torne o bloco inválido de forma previsível e drástica" },
      { value: "c", text: "O previousHash seja sempre zero" },
      { value: "d", text: "A mineração seja síncrona" }
    ],
    correct: "b"
  },
  {
    question: "Qual campo é fundamentalmente uma variável de ajuste no processo de mineração?",
    options: [
      { value: "a", text: "O Previous Hash" },
      { value: "b", text: "O Nonce" },
      { value: "c", text: "O Número do Bloco" },
      { value: "d", text: "Os Dados" }
    ],
    correct: "b"
  },
  {
    question: "O que a condição 'hash do bloco $\\le$ dificuldade alvo' representa?",
    options: [
      { value: "a", text: "Apenas um limite de velocidade" },
      { value: "b", text: "O requisito de Proof-of-Work (Prova de Trabalho)" },
      { value: "c", text: "A garantia de que o Nonce será zero" },
      { value: "d", text: "O Efeito Avalanche" }
    ],
    correct: "b"
  },
  {
    question: "Se o hash de um bloco for validado (o Nonce for encontrado), qual o próximo passo lógico na rede?",
    options: [
      { value: "a", text: "O minerador inicia imediatamente a mineração do bloco seguinte" },
      { value: "b", text: "O bloco é propagado para que os outros nós o verifiquem e adicionem à cadeia" },
      { value: "c", text: "O Nonce é resetado para zero por segurança" },
      { value: "d", text: "O previousHash é alterado para o hash mais recente" }
    ],
    correct: "b"
  },
  {
    question: "O Efeito Avalanche tem um papel fundamental na segurança do bloco, garantindo que:",
    options: [
      { value: "a", text: "O Nonce seja sempre um número pequeno" },
      { value: "b", text: "Qualquer adulteração nos dados torne o bloco inválido de forma previsível e drástica" },
      { value: "c", text: "O previousHash seja sempre zero" },
      { value: "d", text: "A mineração seja síncrona" }
    ],
    correct: "b"
  }
];