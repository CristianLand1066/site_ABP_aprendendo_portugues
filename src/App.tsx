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

  async function handleGeneratePdf() {
    setLoading(true);
    setError(null);
    try {
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

      const [img1, img2, img3, img4] = await Promise.all([
        fetchAsDataUrl(abs("/imagens/capa.jpg")),
        fetchAsDataUrl(abs("/imagens/image.jpg")),
        fetchAsDataUrl(abs("/imagens/image.png")),
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
                  caption: t("pdf.sections.beginner_games.0.title"),
                  width: 420,
                },
                {
                  src: img2,
                  caption: t("pdf.sections.beginner_games.1.title"),
                  width: 420,
                },
                {
                  src: img3,
                  caption: t("pdf.sections.beginner_games.2.title"),
                  width: 420,
                },
                {
                  src: img4,
                  caption: t("pdf.sections.beginner_games.2.title"),
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
        instructions: [
          {
            title: t("pdf.instruction_games.0.title"), // Add this required property
            content: t("pdf.instruction_games.0.summary"),
            instructions: t("pdf.instruction_games.0.instructions", {
              returnObjects: true,
            }) as unknown as string[],
          },
        ],
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
