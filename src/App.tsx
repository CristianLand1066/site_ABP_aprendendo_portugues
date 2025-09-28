import { useState } from "react";
import "./App.css";
import Layout from "./components/Layout";
import { useTranslation } from "react-i18next";
import { generatePdf, downloadBlob } from "./features/pdf/pdf.service";
import type { PdfGame, PdfDebateCategory } from "./features/pdf/pdf.templates";

function App() {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abs = (p: string) => new URL(p, window.location.origin).href;

  async function fetchAsDataUrl(url: string): Promise<string> {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Falha ao buscar imagem: ${url}`);
    const blob = await res.blob();
    return await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  }

  function generateWordSearch(
    allWords: string[],
    gridSize = 10,
    minWords = 3,
    maxWords = 6
  ) {
    const count = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
    const words = shuffleArray(allWords).slice(0, count);
  
    const grid: string[][] = Array.from({ length: gridSize }, () =>
      Array(gridSize).fill("")
    );
  
    for (const word of words) {
      placeWordInGrid(grid, word.toUpperCase());
    }
  
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        if (!grid[r][c]) {
          grid[r][c] = alphabet[Math.floor(Math.random() * alphabet.length)];
        }
      }
    }
  
    return { words, grid };
  }
  
  function placeWordInGrid(grid: string[][], word: string) {
    const size = grid.length;
    let placed = false;
    let tries = 0;
  
    while (!placed && tries < 100) {
      tries++;
      const horizontal = Math.random() > 0.5;
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);
  
      if (horizontal) {
        if (col + word.length > size) continue;
        if (word.split("").every((ch, i) => !grid[row][col + i] || grid[row][col + i] === ch)) {
          word.split("").forEach((ch, i) => (grid[row][col + i] = ch));
          placed = true;
        }
      } else {
        if (row + word.length > size) continue;
        if (word.split("").every((ch, i) => !grid[row + i][col] || grid[row + i][col] === ch)) {
          word.split("").forEach((ch, i) => (grid[row + i][col] = ch));
          placed = true;
        }
      }
    }
  }
  
  function shuffleArray<T>(arr: T[]): T[] {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function generateStoryPrompts(): string[] {
    const allPrompts = [
      "Um animal que descobre um objeto mágico.",
      "Um grupo de amigos que encontra um mapa misterioso.",
      "Uma criança que sonha em viajar para o espaço.",
      "Uma cidade que guarda um segredo escondido.",
      "Um robô que aprende a sentir emoções.",
      "Um viajante que acorda em um mundo desconhecido.",
      "Um dragão que perdeu suas chamas.",
      "Um pirata que busca um tesouro diferente.",
      "Uma floresta onde as árvores falam.",
      "Uma escola de magia em pleno deserto.",
      "Uma princesa que deseja ser cavaleira.",
      "Um cientista que cria um portal acidentalmente.",
      "Um gato que sabe ler livros.",
      "Um castelo que muda de lugar toda noite.",
      "Um menino que encontra um par de asas.",
      "Um livro que escreve a própria história.",
      "Uma chave que abre qualquer porta.",
      "Um espelho que mostra futuros possíveis.",
      "Uma cidade feita inteiramente de doces.",
      "Uma criança que conversa com as estrelas.",
      "Um peixe que quer voar pelo céu.",
      "Uma mochila que guarda mundos inteiros.",
      "Um herói que tem medo da própria sombra.",
      "Um brinquedo que ganha vida de madrugada.",
      "Uma bicicleta que viaja no tempo.",
      "Um mago que esqueceu seus feitiços.",
      "Um reino onde os sonhos viram realidade.",
      "Uma ponte que só aparece sob a lua cheia.",
      "Um cachorro que guia exploradores perdidos.",
      "Uma criança que encontra uma cápsula do tempo.",
      "Um gigante que só quer um amigo.",
      "Uma ilha que muda de forma a cada maré.",
      "Um pintor que cria mundos com seus quadros.",
      "Uma estrela cadente que se torna humana.",
      "Uma árvore que concede desejos secretos.",
      "Um lago que mostra memórias esquecidas.",
      "Uma criança que entende a linguagem dos pássaros.",
      "Um guarda-chuva que voa como balão.",
      "Uma porta escondida atrás de uma estante.",
      "Um robô que sonha em ser poeta.",
      "Um planeta onde todos falam em música.",
      "Uma biblioteca que só abre à meia-noite.",
      "Um detetive que investiga sonhos roubados.",
      "Uma fada que perdeu suas asas.",
      "Um relógio que controla o tempo.",
      "Um reino de gelo eterno que guarda calor secreto.",
      "Uma criança que encontra uma carta misteriosa.",
      "Um vulcão que guarda um coração adormecido.",
      "Uma cor que nunca foi vista antes.",
      "Um amigo imaginário que ganha corpo real.",
      "Uma casa que se move sozinha.",
      "Uma criança que conversa com fantasmas bondosos.",
      "Um dragão que se esconde em forma de gato.",
      "Um circo que aparece apenas uma vez por século.",
      "Um viajante que encontra portas invisíveis.",
      "Uma caixa de música que muda o mundo.",
      "Uma sombra que vive sua própria vida.",
      "Um explorador que descobre um céu subterrâneo.",
      "Um rio que corre para cima.",
      "Uma criança que aprende magia com os ventos.",
      "Um navio fantasma que busca sua tripulação.",
      "Uma montanha que guarda segredos milenares.",
      "Um espelho que troca identidades.",
      "Um anel que sussurra histórias antigas.",
      "Uma criança que encontra uma fada presa em uma garrafa.",
      "Um dragão que coleciona memórias.",
      "Um jardim que floresce apenas com risadas.",
      "Uma estrada que leva a diferentes épocas.",
      "Um castelo invisível que só aparece para corajosos.",
      "Um mago que guarda enigmas em garrafas.",
      "Uma cidade escondida nas nuvens.",
      "Uma canção que abre portais.",
      "Uma criança que encontra botas mágicas.",
      "Um boneco de neve que nunca derrete.",
      "Uma porta que leva ao fundo do mar.",
      "Uma pedra que fala com quem a segura.",
      "Um meteoro que traz um novo amigo.",
      "Um teatro onde as peças viram realidade.",
      "Um cavalo que corre entre mundos.",
      "Uma criança que encontra uma pena mágica.",
      "Um fantasma que adora brincar.",
      "Um cristal que guarda sonhos.",
      "Uma criança que acorda em outro corpo.",
      "Uma escada que nunca termina.",
      "Um dragão guardião de livros.",
      "Uma criança que encontra um relógio quebrado que fala.",
      "Uma caixa que realiza apenas um desejo.",
      "Um planeta onde tudo é feito de cristal.",
      "Uma cidade onde nunca anoitece.",
      "Um amigo secreto que vive em cartas.",
      "Uma criança que descobre ser descendente de heróis."
    ];
    
  
    // Sorteia 2 a 3 frases diferentes
    const shuffled = shuffleArray(allPrompts);
    const count = 16; // 2 ou 3
    return shuffled.slice(0, count);
  }
  
  const ALL_OBJECTS = [
  "Bola", "Cadeira", "Colher", "Livro", "Lápis",
  "Mesa", "Copo", "Sapato", "Chave", "Janela",
  "Relógio", "Telefone", "Caderno", "Tesoura",
  "Gaveta", "Bolso", "Mochila", "Bolso", "Mochila",
  "Bolso", "Mochila", "Bolso", "Mochila", "Bolso",
  "Bolso", "Mochila", "Bolso", "Mochila", "Bolso",
  "Bolso", "Mochila", "Bolso", "Mochila", "Bolso",
  "Bolso", "Mochila", "Bolso", "Mochila", "Bolso",
  "Bolso", "Mochila", "Bolso", "Mochila", "Bolso",
  "Bolso", "Mochila", "Bolso", "Mochila", "Bolso",
  "Bolso", "Mochila", "Bolso", "Mochila", "Bolso",
  "Bolso", "Mochila", "Bolso", "Mochila", "Bolso",
  "Bolso", "Mochila", "Bolso", "Mochila", "Bolso",
];

  function generateObjects(
    allObjects: string[],
  ): string[] {
    const shuffled = shuffleArray(allObjects);
    const count = 36;
    return shuffled.slice(0, count);
  }  

  const ALL_PAIRS = [
    { word: "Bola", image: "/imagens/moldes/parte_0_0.jpg" },
    { word: "Cadeira", image: "/imagens/moldes/parte_0_1.jpg" },
    { word: "Livro", image: "/imagens/moldes/parte_0_2.jpg" },
    { word: "Lápis", image: "/imagens/moldes/parte_1_0.jpg" },
    { word: "Peixe", image: "/imagens/moldes/parte_1_1.jpg" },
    { word: "Gato", image: "/imagens/moldes/parte_1_2.jpg" },
    { word: "Bola", image: "/imagens/moldes/parte_2_0.jpg" },
    { word: "Cadeira", image: "/imagens/moldes/parte_2_1.jpg" },
    { word: "Livro", image: "/imagens/moldes/parte_2_2.jpg" },
    { word: "Lápis", image: "/imagens/moldes/parte_2_3.jpg" },
    { word: "Peixe", image: "/imagens/moldes/parte_2_4.jpg" },
    { word: "Gato", image: "/imagens/moldes/parte_2_5.jpg" },
  ];
  
  
  function generateMemoryPairs(
    allPairs: { word: string; image?: string }[],
  ) {
    const shuffled = shuffleArray(allPairs);
    const count = 12;
    return shuffled.slice(0, count);
  }  

  async function handleGeneratePdf() {
    setLoading(true);
    setError(null);
    try {
      const selectedPairs = generateMemoryPairs(ALL_PAIRS);

      // agora resolve só quando necessário
      const memoryPairs = await Promise.all(
        selectedPairs.map(async (p) => ({
          word: p.word,
          image: p.image ? await fetchAsDataUrl(abs(p.image)) : undefined,
        }))
      );
      // Prepare games with an image on the first game of each section
      const beginnerGames = t("pdf.sections.beginner_games", {
        returnObjects: true,
      }) as unknown as PdfGame[];
      const intermediateGames = t("pdf.sections.intermediate_games", {
        returnObjects: true,
      }) as unknown as PdfGame[];
      const advancedGames = t("pdf.sections.advanced_games", {
        returnObjects: true,
      }) as unknown as PdfGame[];

      const [img1] = await Promise.all([
        fetchAsDataUrl(abs("/imagens/moldes/mala.jpg")),
      ]);

      const moldePromises: Promise<string>[] = [];
      for (let i = 0; i < 3; i++) {
        moldePromises.push(
          fetchAsDataUrl(abs(`/imagens/moldes/parte_${i}_0.jpg`)),
          fetchAsDataUrl(abs(`/imagens/moldes/parte_${i}_1.jpg`)),
          fetchAsDataUrl(abs(`/imagens/moldes/parte_${i}_2.jpg`)),
        );
      }

      const instructionItems = t("pdf.instruction_games", { returnObjects: true }) as Array<{
        title: string;
        summary: string;
        instructions: string[];
      }>;
      

      // Await and map to PdfImage[]
      const moldeSrcs = await Promise.all(moldePromises);
      const moldes: { src: string; caption?: string; width?: number }[] = moldeSrcs.map((src) => ({
        src,
        width: 420,
      }));


      const cardsDebateCategories = t("pdf.cardsDebate.cards", {
        returnObjects: true,
      }) as unknown as PdfDebateCategory[];

      const data = {
        locale: i18n.language ?? "pt",
        coverTitle: t("pdf.cover_title"),
        intro: t("pdf.intro"),
        coverInstructions: t("pdf.cover_instructions"),
        introInstructions: t("pdf.intro_instructions"),
        sections: [
          // Cover-like section that only renders an image (from public/imagens)
          {
            title: t("pdf.cover_title"),
            images: {
              images: [
                {
                  src: img1,
                  caption: t("pdf.moldes.moldeMaleta"),
                  width: 420,
                },
              ],
              moldes: moldes,
            },
          },
          {
            title: t("pdf.sections.beginner"),
            content: t("pdf.sections.beginner_content"),
            contentPt: i18n.getFixedT("pt")("pdf.sections.beginner_content"),
            games: beginnerGames,
            gamesPt: i18n.getFixedT("pt")("pdf.sections.beginner_games", {
              returnObjects: true,
            }) as unknown as PdfGame[],
          },
          {
            title: t("pdf.sections.intermediate"),
            content: t("pdf.sections.intermediate_content"),
            contentPt: i18n.getFixedT("pt")(
              "pdf.sections.intermediate_content"
            ),
            games: intermediateGames,
            gamesPt: i18n.getFixedT("pt")("pdf.sections.intermediate_games", {
              returnObjects: true,
            }) as unknown as PdfGame[],
          },
          {
            title: t("pdf.sections.advanced"),
            content: t("pdf.sections.advanced_content"),
            contentPt: i18n.getFixedT("pt")("pdf.sections.advanced_content"),
            games: advancedGames,
            gamesPt: i18n.getFixedT("pt")("pdf.sections.advanced_games", {
              returnObjects: true,
            }) as unknown as PdfGame[],
          },
        ],
        instructions: instructionItems.map(it => ({
          title: it.title,
          summary: it.summary,
          instructions: it.instructions,
        })),
        bingo: {
          enabled: true,
          rows: 3,
          cols: 3,
          letters: undefined,
          cards: 6,
        },
        cardsDebate: {
          enabled: true,
          cards: cardsDebateCategories,
        },
        domino: {
          enabled: true,
          syllables: ["CA", "BO", "SA", "PA", "TO", "MA", "PE", "LA", "ME", "SE", "TE", "LE", "NE", "DE", "FE", "GE", "VO", "LO"],
        },
        wordCards: {
          enabled: true,
          categories: [
            {
              title: "Substantivos",
              color: "#1E90FF",
              colorText: "#000",
              words: [
                "cachorro","gato","menina","menino","bola","livro","escola","casa","árvore","carro",
                "pássaro","flor","sapato","peixe","sol","lua","pão","leite","mesa","cadeira"
              ]
            },
            {
              title: "Verbos",
              color: "#32CD32",
              colorText: "#fff",
              words: [
                "correr","pular","cantar","dançar","dormir","comer","beber","brincar","escrever","desenhar",
                "ler","olhar","abrir","fechar","falar","escutar","ajudar","jogar","sorrir","chorar"
              ]
            },
            {
              title: "Adjetivos",
              color: "#FFD700",
              colorText: "#000",
              words: [
                "feliz","triste","grande","pequeno","bonito","feio","rápido","lento","alto","baixo",
                "forte","fraco","quente","frio","novo","velho","vermelho","azul","branco","preto"
              ]
            }
          ]
        },
        wordSearch: {
          enabled: true,
          themes: [
            {
              ...generateWordSearch(["GATO","LEAO","CAVALO","PASSARO","PEIXE","SAPO","RATO","CACHORRO"])
            },
            {
              ...generateWordSearch(["MACA","BANANA","UVA","MELAO","LARANJA","PERA","ABACAXI","KIWI"])
            },
            {
              ...generateWordSearch(["GAVETA","CADEIRA","MESA","LIVRO","BOLSA","MOCHILA","BOLSA","MOCHILA","BOLSA","MOCHILA"])
            },
          ]
        },
        storyGame: {
          enabled: true,
          prompts: generateStoryPrompts()
        },
        objectHunt: {
          enabled: true,
          objects: generateObjects(ALL_OBJECTS)
        },
        memoryGame: {
          enabled: true,
          pairs: memoryPairs
        },
        hangman: {
          enabled: true
        }
      };
      const blob = await generatePdf(data);
      const fileName = `jogos-${data.locale}.pdf`;
      downloadBlob(fileName, blob);
    } catch (e: any) {
      setError(e?.message ?? "Erro ao gerar PDF");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <section className="flex flex-col items-center gap-6 text-center py-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          {t("app.title")}
        </h1>
        <p className="max-w-2xl text-base sm:text-lg text-neutral-600 dark:text-neutral-300">
          {t("app.description", {
            lang: i18n.language?.toUpperCase?.() || "PT",
          })}
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={handleGeneratePdf}
            disabled={loading}
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-2.5 text-white font-medium shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 disabled:opacity-70"
            aria-busy={loading}
          >
            {loading ? t("actions.downloading") : t("actions.generate_pdf")}
          </button>
        </div>
        {error && (
          <p role="alert" className="text-red-500">
            {error}
          </p>
        )}
      </section>
    </Layout>
  );
}

export default App;
