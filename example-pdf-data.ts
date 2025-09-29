/**
 * EXEMPLO COMPLETO DE CONFIGURAÇÃO PDFDATA
 *
 * Este arquivo demonstra todas as opções disponíveis para personalizar
 * a geração de PDFs educacionais no sistema ABP - Aprendendo Português.
 *
 * Use este exemplo como referência para criar seus próprios materiais
 * educacionais personalizados.
 */

import type { PdfData } from "./src/features/pdf/pdf.templates";

// ============================================================================
// EXEMPLO 1: CONFIGURAÇÃO COMPLETA COM TODOS OS JOGOS HABILITADOS
// ============================================================================

export const fullExamplePdfData: PdfData = {
  // Configurações básicas
  locale: "pt", // ou "en", "es", "fr", "de"
  coverTitle: "Material Educacional Completo - Português para Iniciantes",
  intro:
    "Este material contém uma coleção completa de atividades lúdicas organizadas por nível de dificuldade. Ideal para uso em sala de aula ou estudo domiciliar.",
  coverInstructions: "Instruções de Montagem e Uso",
  introInstructions:
    "Siga as instruções abaixo para montar e utilizar cada jogo educacional.",

  // Seções de conteúdo organizadas por nível
  sections: [
    {
      title: "Atividades para Iniciantes",
      content:
        "Jogos focados na alfabetização e reconhecimento de palavras básicas. Ideais para crianças de 6-8 anos ou adultos em processo de alfabetização.",
      contentPt:
        "Jogos focados na alfabetização e reconhecimento de palavras básicas.", // Versão em português para outros idiomas
      games: [
        {
          title: "Jogo da Memória - Animais",
          summary: "Associe imagens de animais com seus nomes escritos.",
          instructions: [
            "Recorte todos os cartões da página de memória",
            "Embaralhe e coloque virados para baixo",
            "Cada jogador vira 2 cartões por vez",
            "Encontre pares de imagem + palavra",
            "Quem fizer mais pares vence!",
          ],
        },
        {
          title: "Bingo de Letras",
          summary:
            "Reconheça e marque letras do alfabeto em cartelas personalizadas.",
          instructions: [
            "Cada jogador recebe uma cartela diferente",
            "O professor sorteia letras de um saco",
            "Marque a letra sorteada se estiver na sua cartela",
            "Primeiro a completar uma linha grita 'BINGO!'",
          ],
        },
      ],
      gamesPt: [
        // Versão em português dos jogos (para quando locale !== "pt")
        {
          title: "Jogo da Memória - Animais",
          summary: "Associe imagens de animais com seus nomes escritos.",
          instructions: ["Instruções em português..."],
        },
      ],
      images: {
        images: [
          {
            src: "/imagens/exemplo-memoria.jpg",
            caption: "Exemplo de cartões do jogo da memória",
            width: 400,
            height: 300,
          },
        ],
        moldes: [
          {
            src: "/imagens/moldes/maleta-parte1.jpg",
            width: 420,
          },
        ],
      },
    },
    {
      title: "Atividades Intermediárias",
      content:
        "Jogos para expansão de vocabulário e formação de frases simples. Adequados para estudantes com conhecimento básico.",
      games: [
        {
          title: "Dominó de Sílabas",
          summary: "Forme palavras conectando sílabas em peças de dominó.",
          instructions: [
            "Distribua 7 peças para cada jogador",
            "O primeiro jogador coloca qualquer peça na mesa",
            "Próximos jogadores devem conectar sílabas que formem palavras",
            "Quem ficar sem peças primeiro vence",
          ],
        },
      ],
    },
    {
      title: "Atividades Avançadas",
      content:
        "Jogos de raciocínio, debate e construção narrativa. Para estudantes com vocabulário intermediário.",
      games: [
        {
          title: "Debate Temático",
          summary:
            "Desenvolva argumentação através de debates estruturados sobre temas do cotidiano.",
          instructions: [
            "Divida a turma em dois grupos",
            "Sorteie um cartão de debate",
            "Cada grupo tem 5 minutos para preparar argumentos",
            "Debate de 10 minutos com moderador",
            "Plateia vota no grupo mais convincente",
          ],
        },
      ],
    },
  ],

  // Instruções de montagem para cada jogo
  instructions: [
    {
      title: "Como Montar o Jogo da Memória",
      content: "Instruções detalhadas para preparar o material físico.",
      instructions: [
        "Imprima a página de cartões em papel cartão ou cole em papelão",
        "Recorte cuidadosamente cada cartão seguindo as linhas",
        "Para maior durabilidade, plastifique os cartões",
        "Guarde em envelope ou caixa identificada",
      ],
    },
    {
      title: "Como Montar a Maleta Organizadora",
      content: "Crie uma maleta para guardar todos os jogos organizadamente.",
      instructions: [
        "Imprima todas as partes da maleta em papel cartão",
        "Recorte seguindo as linhas pontilhadas",
        "Dobre nas linhas indicadas",
        "Cole as abas usando cola bastão",
        "Decore como desejar",
      ],
    },
  ],

  // ========================================================================
  // CONFIGURAÇÃO DETALHADA DE CADA JOGO
  // ========================================================================

  // 1. BINGO DE LETRAS
  bingo: {
    enabled: true,
    rows: 3, // Linhas da cartela (3, 4 ou 5)
    cols: 3, // Colunas da cartela (3, 4 ou 5)
    cards: 6, // Número de cartelas diferentes a gerar
    letters: undefined, // Usa letras padrão do sistema
  },

  // 2. CARTÕES DE DEBATE
  cardsDebate: {
    enabled: true,
    cards: [
      {
        title: "Escola e Aprendizagem",
        color: "#4A90E2", // Cor de fundo do cartão
        colorText: "#000000", // Cor do texto
        phrases: [
          "É melhor estudar de manhã do que à tarde",
          "Livros são mais interessantes que vídeos",
          "Lição de casa deveria ser opcional",
          "É melhor estudar em grupo que sozinho",
          "Computador é melhor que caderno para estudar",
        ],
      },
      {
        title: "Família e Casa",
        color: "#50C878",
        colorText: "#FFFFFF",
        phrases: [
          "Crianças devem ajudar nas tarefas domésticas",
          "É melhor ter irmãos que ser filho único",
          "Animais de estimação ensinam responsabilidade",
          "Jantar em família é importante",
          "Crianças devem ter mesada",
        ],
      },
      {
        title: "Tecnologia e Diversão",
        color: "#FF6B6B",
        colorText: "#FFFFFF",
        phrases: [
          "Videogames são educativos",
          "Crianças usam muito tempo no celular",
          "Brincar ao ar livre é melhor que dentro de casa",
          "Desenhos animados ensinam valores",
          "Internet é segura para crianças",
        ],
      },
    ],
  },

  // 3. DOMINÓ DE PALAVRAS
  domino: {
    enabled: true,
    syllables: [
      "ca",
      "sa",
      "ma",
      "pa",
      "ta",
      "la",
      "ra",
      "na",
      "co",
      "so",
      "mo",
      "po",
      "to",
      "lo",
      "ro",
      "no",
      "cu",
      "su",
      "mu",
      "pu",
      "tu",
      "lu",
      "ru",
      "nu",
      "ce",
      "se",
      "me",
      "pe",
      "te",
      "le",
      "re",
      "ne",
      "ci",
      "si",
      "mi",
      "pi",
      "ti",
      "li",
      "ri",
      "ni",
    ],
  },

  // 4. CARTÕES DE PALAVRAS POR CATEGORIA
  wordCards: {
    enabled: true,
    categories: [
      {
        title: "Substantivos",
        color: "#1E90FF", // Azul
        colorText: "#FFFFFF",
        words: [
          "casa",
          "carro",
          "livro",
          "mesa",
          "cadeira",
          "porta",
          "janela",
          "escola",
          "professor",
          "aluno",
          "lápis",
          "papel",
          "borracha",
          "família",
          "mãe",
          "pai",
          "irmão",
          "irmã",
          "avô",
          "avó",
          "cachorro",
          "gato",
          "pássaro",
          "peixe",
          "flor",
          "árvore",
        ],
      },
      {
        title: "Verbos",
        color: "#32CD32", // Verde
        colorText: "#000000",
        words: [
          "correr",
          "pular",
          "andar",
          "falar",
          "ouvir",
          "ver",
          "comer",
          "beber",
          "dormir",
          "acordar",
          "estudar",
          "brincar",
          "trabalhar",
          "ler",
          "escrever",
          "desenhar",
          "cantar",
          "dançar",
          "nadar",
          "voar",
          "dirigir",
          "cozinhar",
          "limpar",
          "ajudar",
          "amar",
        ],
      },
      {
        title: "Adjetivos",
        color: "#FFD700", // Amarelo
        colorText: "#000000",
        words: [
          "grande",
          "pequeno",
          "alto",
          "baixo",
          "gordo",
          "magro",
          "bonito",
          "feio",
          "novo",
          "velho",
          "limpo",
          "sujo",
          "quente",
          "frio",
          "doce",
          "salgado",
          "feliz",
          "triste",
          "rápido",
          "devagar",
          "forte",
          "fraco",
          "inteligente",
          "burro",
        ],
      },
    ],
  },

  // 5. CAÇA-PALAVRAS TEMÁTICO
  wordSearch: {
    enabled: true,
    themes: [
      {
        words: ["GATO", "CACHORRO", "PÁSSARO", "PEIXE", "COELHO", "HAMSTER"],
        grid: [
          ["G", "A", "T", "O", "X", "P", "Q"],
          ["C", "X", "Y", "Z", "A", "E", "R"],
          ["A", "B", "C", "D", "S", "I", "S"],
          ["C", "H", "O", "R", "R", "O", "X"],
          ["H", "A", "M", "S", "T", "E", "R"],
          ["O", "P", "Q", "R", "S", "T", "U"],
          ["R", "C", "O", "E", "L", "H", "O"],
        ],
      },
      {
        words: ["MAÇÃ", "BANANA", "LARANJA", "UVA", "PÊRA", "MANGA"],
        grid: [
          ["M", "A", "Ç", "Ã", "X", "Y", "Z"],
          ["B", "A", "N", "A", "N", "A", "Q"],
          ["L", "A", "R", "A", "N", "J", "A"],
          ["U", "V", "A", "X", "P", "Ê", "R"],
          ["M", "A", "N", "G", "A", "R", "A"],
          ["Q", "W", "E", "R", "T", "Y", "U"],
          ["P", "O", "I", "U", "Y", "T", "R"],
        ],
      },
    ],
  },

  // 6. JOGO DE CONTINUAÇÃO DE HISTÓRIA
  storyGame: {
    enabled: true,
    prompts: [
      "Era uma vez uma criança que encontrou uma chave misteriosa...",
      "Em uma manhã ensolarada, João descobriu que podia falar com animais...",
      "A professora Maria trouxe uma caixa mágica para a sala de aula...",
      "Durante as férias, Ana encontrou um mapa do tesouro no sótão...",
      "O gato Mimi começou a agir de forma estranha depois da chuva...",
      "Na biblioteca da escola, Pedro encontrou um livro que brilhava...",
      "A vovó Rosa contou sobre um jardim secreto atrás da casa...",
      "No parque, as crianças viram algo incrível voando no céu...",
      "O cachorro Rex começou a cavar um buraco no quintal e encontrou...",
      "Durante a tempestade, a família ouviu ruídos estranhos no porão...",
      "A nova aluna da turma tinha um segredo muito especial...",
      "No zoológico, os animais começaram a se comportar de forma diferente...",
      "O relógio da torre da cidade parou exatamente à meia-noite...",
      "A receita da bisavó tinha um ingrediente muito especial...",
      "No primeiro dia de aula, a mochila de Carlos estava fazendo ruídos...",
      "A árvore do quintal começou a dar frutos de cores diferentes...",
    ],
  },

  // 7. CAÇA AO OBJETO
  objectHunt: {
    enabled: true,
    objects: [
      // Objetos da cozinha
      "colher",
      "garfo",
      "faca",
      "prato",
      "copo",
      "panela",
      "geladeira",

      // Objetos da sala
      "sofá",
      "televisão",
      "controle",
      "almofada",
      "tapete",
      "quadro",

      // Objetos do quarto
      "cama",
      "travesseiro",
      "cobertor",
      "guarda-roupa",
      "espelho",

      // Objetos da escola
      "lápis",
      "caneta",
      "borracha",
      "régua",
      "caderno",
      "livro",
      "mochila",

      // Objetos do banheiro
      "escova",
      "pasta",
      "toalha",
      "sabonete",
      "shampoo",

      // Objetos diversos
      "chave",
      "óculos",
      "relógio",
      "celular",
      "sapato",
      "camisa",
      "calça",
      "bola",
      "boneca",
      "carrinho",
      "quebra-cabeça",
      "lego",

      // Objetos da natureza (para atividades ao ar livre)
      "folha",
      "pedra",
      "galho",
      "flor",
      "terra",
      "areia",
    ],
  },

  // 8. JOGO DA MEMÓRIA
  memoryGame: {
    enabled: true,
    pairs: [
      { word: "casa", image: "/imagens/memoria/casa.jpg" },
      { word: "carro", image: "/imagens/memoria/carro.jpg" },
      { word: "árvore", image: "/imagens/memoria/arvore.jpg" },
      { word: "sol", image: "/imagens/memoria/sol.jpg" },
      { word: "lua", image: "/imagens/memoria/lua.jpg" },
      { word: "estrela", image: "/imagens/memoria/estrela.jpg" },
      { word: "flor", image: "/imagens/memoria/flor.jpg" },
      { word: "borboleta", image: "/imagens/memoria/borboleta.jpg" },
      { word: "pássaro", image: "/imagens/memoria/passaro.jpg" },
      { word: "peixe", image: "/imagens/memoria/peixe.jpg" },
      { word: "gato", image: "/imagens/memoria/gato.jpg" },
      { word: "cachorro", image: "/imagens/memoria/cachorro.jpg" },
    ],
  },

  // 9. JOGO DA FORCA
  hangman: {
    enabled: true,
    // O jogo da forca usa um template visual padrão
    // As palavras são escolhidas pelo professor durante o jogo
  },
};

// ============================================================================
// EXEMPLO 2: CONFIGURAÇÃO MINIMALISTA (APENAS ALGUNS JOGOS)
// ============================================================================

export const minimalExamplePdfData: PdfData = {
  locale: "en",
  coverTitle: "Basic Portuguese Learning Games",
  intro: "A simple collection of games for Portuguese language learning.",
  coverInstructions: "Assembly Instructions",
  introInstructions: "Follow these simple steps to prepare your games.",

  sections: [
    {
      title: "Beginner Activities",
      content: "Simple games for first contact with Portuguese.",
      games: [
        {
          title: "Memory Game",
          summary: "Match words with pictures.",
          instructions: ["Cut the cards", "Mix them up", "Find pairs"],
        },
      ],
    },
  ],

  instructions: [
    {
      title: "Memory Game Setup",
      instructions: ["Print", "Cut", "Play"],
    },
  ],

  // Apenas 3 jogos habilitados
  bingo: { enabled: true, rows: 3, cols: 3, cards: 2 },
  memoryGame: {
    enabled: true,
    pairs: [
      { word: "casa", image: "/imagens/casa.jpg" },
      { word: "gato", image: "/imagens/gato.jpg" },
    ],
  },
  wordCards: {
    enabled: true,
    categories: [
      {
        title: "Basic Words",
        color: "#4CAF50",
        colorText: "#FFF",
        words: ["casa", "gato", "sol", "lua"],
      },
    ],
  },

  // Outros jogos desabilitados
  cardsDebate: { enabled: false, cards: [] },
  domino: { enabled: false, syllables: [] },
  wordSearch: { enabled: false, themes: [] },
  storyGame: { enabled: false, prompts: [] },
  objectHunt: { enabled: false, objects: [] },
  hangman: { enabled: false },
};

// ============================================================================
// EXEMPLO 3: CONFIGURAÇÃO PARA NÍVEL AVANÇADO
// ============================================================================

export const advancedExamplePdfData: PdfData = {
  locale: "pt",
  coverTitle: "Português Avançado - Jogos de Raciocínio e Debate",
  intro:
    "Material para estudantes com vocabulário intermediário que desejam aprimorar argumentação e criatividade.",
  coverInstructions: "Instruções para Atividades Avançadas",
  introInstructions:
    "Estas atividades requerem maior participação do professor como mediador.",

  sections: [
    {
      title: "Desenvolvimento da Argumentação",
      content:
        "Atividades focadas em debate, discussão e construção de argumentos lógicos.",
      games: [
        {
          title: "Debate Estruturado",
          summary:
            "Desenvolva habilidades de argumentação através de debates temáticos.",
          instructions: [
            "Forme dois grupos de 3-4 pessoas",
            "Sorteie um tema polêmico apropriado para a idade",
            "Dê 10 minutos para cada grupo preparar argumentos",
            "Debate de 15 minutos com moderador",
            "Plateia vota nos melhores argumentos",
          ],
        },
      ],
    },
  ],

  instructions: [
    {
      title: "Como Conduzir um Debate",
      instructions: [
        "Estabeleça regras claras de respeito",
        "Limite o tempo de fala de cada participante",
        "Incentive o uso de exemplos concretos",
        "Faça perguntas que aprofundem a reflexão",
      ],
    },
  ],

  // Foco em jogos que desenvolvem raciocínio
  cardsDebate: {
    enabled: true,
    cards: [
      {
        title: "Ética e Valores",
        color: "#9C27B0",
        colorText: "#FFFFFF",
        phrases: [
          "É certo mentir para proteger os sentimentos de alguém?",
          "Devemos sempre obedecer às regras, mesmo quando discordamos?",
          "É melhor ser honesto e magoar alguém ou mentir para protegê-lo?",
          "As crianças devem ter os mesmos direitos que os adultos?",
          "É justo que algumas pessoas tenham mais dinheiro que outras?",
        ],
      },
    ],
  },

  storyGame: {
    enabled: true,
    prompts: [
      "Se você pudesse mudar uma lei do seu país, qual seria e por quê?",
      "Imagine que você é prefeito da sua cidade por um dia...",
      "Se os animais pudessem falar, o que eles diriam aos humanos?",
      "Como seria o mundo se não existisse dinheiro?",
      "Se você pudesse viajar no tempo, que época visitaria?",
    ],
  },

  wordSearch: {
    enabled: true,
    themes: [
      {
        words: ["JUSTIÇA", "LIBERDADE", "IGUALDADE", "RESPEITO", "HONESTIDADE"],
        grid: [
          ["J", "U", "S", "T", "I", "Ç", "A"],
          ["L", "I", "B", "E", "R", "D", "A"],
          ["I", "G", "U", "A", "L", "D", "D"],
          ["R", "E", "S", "P", "E", "I", "T"],
          ["H", "O", "N", "E", "S", "T", "O"],
        ],
      },
    ],
  },

  // Jogos mais simples desabilitados para focar no nível avançado
  bingo: { enabled: false, rows: 3, cols: 3, cards: 0 },
  domino: { enabled: false, syllables: [] },
  wordCards: { enabled: false, categories: [] },
  memoryGame: { enabled: false, pairs: [] },
  objectHunt: { enabled: false, objects: [] },
  hangman: { enabled: false },
};

// ============================================================================
// COMO USAR ESTES EXEMPLOS
// ============================================================================

/*
Para usar qualquer um destes exemplos em seu código:

1. Importe o exemplo desejado:
   import { fullExamplePdfData } from './example-pdf-data';

2. Use na função de geração de PDF:
   const blob = await generatePdf(fullExamplePdfData);
   downloadBlob("meu-material-educacional.pdf", blob);

3. Ou customize conforme necessário:
   const myCustomData = {
     ...fullExamplePdfData,
     locale: "en",
     coverTitle: "My Custom Educational Material"
   };

4. Para desabilitar jogos específicos:
   const customData = {
     ...fullExamplePdfData,
     bingo: { enabled: false, rows: 3, cols: 3, cards: 0 },
     hangman: { enabled: false }
   };
*/

export default {
  fullExamplePdfData,
  minimalExamplePdfData,
  advancedExamplePdfData,
};
