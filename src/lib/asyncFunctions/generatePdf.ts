import { generatePdf, downloadBlob } from "../../features/pdf/pdf.service";
import getExportedLists from "../prompts/getExportedLists";
import { generateWordSearch } from "../functions/renderGrid";
import {
  generateMemoryPairs,
  generateObjects,
  generateStoryPrompts,
} from "../functions/generateGames";
import { fetchAsDataUrl } from "./fetchDataUrl";
import type {
  PdfGame,
  PdfDebateCategory,
} from "../../features/pdf/pdf.templates";
import type { i18n as I18n } from "i18next";
import type { TFunction } from "i18next";
import { getRandomCards } from "../functions/generalFunctions";
import { BASE_LETTERS_NUMBERS } from "../prompts/BASE_LETTERS_NUMBERS";
/**
 * Gera o PDF de jogos educativos
 */
export async function handleGeneratePdf(
  t: TFunction,
  i18n: I18n,
  setLoading: (v: boolean) => void,
  setError: (v: string | null) => void
) {
  const abs = (p: string) => new URL(p, window.location.origin).href;

  setLoading(true);
  setError(null);

  try {
    const selectedPairs = generateMemoryPairs();

    const memoryPairs = await Promise.all(
      selectedPairs.map(async (p) => ({
        word: p.word,
        image: p.image ? await fetchAsDataUrl(abs(p.image)) : undefined,
      }))
    );

    const beginnerGames = t("pdf.sections.beginner_games", {
      returnObjects: true,
    }) as PdfGame[];
    const intermediateGames = t("pdf.sections.intermediate_games", {
      returnObjects: true,
    }) as PdfGame[];
    const advancedGames = t("pdf.sections.advanced_games", {
      returnObjects: true,
    }) as PdfGame[];

    const [img1] = await Promise.all([
      fetchAsDataUrl(abs("/imagens/moldes/mala.jpg")),
    ]);

    const moldePromises: Promise<string>[] = [];
    for (let i = 0; i < 3; i++) {
      moldePromises.push(
        fetchAsDataUrl(abs(`/imagens/moldes/parte_${i}_0.jpg`)),
        fetchAsDataUrl(abs(`/imagens/moldes/parte_${i}_1.jpg`)),
        fetchAsDataUrl(abs(`/imagens/moldes/parte_${i}_2.jpg`))
      );
    }

    const instructionItems = t("pdf.instruction_games", {
      returnObjects: true,
    }) as Array<{
      title: string;
      summary: string;
      instructions: string[];
    }>;

    const moldeSrcs = await Promise.all(moldePromises);
    const moldes = moldeSrcs.map((src) => ({ src, width: 420 }));

    const cardsDebateCategories = t("pdf.cardsDebate.cards", {
      returnObjects: true,
    }) as PdfDebateCategory[];

    const data = {
      locale: i18n.language ?? "pt",
      coverTitle: t("pdf.cover_title"),
      intro: t("pdf.intro"),
      coverInstructions: t("pdf.cover_instructions"),
      introInstructions: t("pdf.intro_instructions"),
      sections: [
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
            moldes,
          },
        },
        {
          title: t("pdf.sections.beginner"),
          content: t("pdf.sections.beginner_content"),
          contentPt: i18n.getFixedT("pt")("pdf.sections.beginner_content"),
          games: beginnerGames,
          gamesPt: i18n.getFixedT("pt")("pdf.sections.beginner_games", {
            returnObjects: true,
          }) as PdfGame[],
        },
        {
          title: t("pdf.sections.intermediate"),
          content: t("pdf.sections.intermediate_content"),
          contentPt: i18n.getFixedT("pt")("pdf.sections.intermediate_content"),
          games: intermediateGames,
          gamesPt: i18n.getFixedT("pt")("pdf.sections.intermediate_games", {
            returnObjects: true,
          }) as PdfGame[],
        },
        {
          title: t("pdf.sections.advanced"),
          content: t("pdf.sections.advanced_content"),
          contentPt: i18n.getFixedT("pt")("pdf.sections.advanced_content"),
          games: advancedGames,
          gamesPt: i18n.getFixedT("pt")("pdf.sections.advanced_games", {
            returnObjects: true,
          }) as PdfGame[],
        },
      ],
      instructions: instructionItems.map((it) => ({
        title: it.title,
        summary: it.summary,
        instructions: it.instructions,
      })),
      bingo: { enabled: true, rows: 3, cols: 3, letters: undefined, cards: 6 },
      cardsDebate: { enabled: true, cards: cardsDebateCategories },
      domino: { enabled: true, syllables: getExportedLists().dominoGameList },
      wordCards: {
        enabled: true,
        categories: [
          {
            title: "Substantivos",
            color: "#1E90FF",
            colorText: "#000",
            words: getRandomCards(
              getExportedLists().wordsCrdsList.substantivos,
              20
            ),
          },
          {
            title: "Verbos",
            color: "#32CD32",
            colorText: "#fff",
            words: getRandomCards(getExportedLists().wordsCrdsList.verbos, 20),
          },
          {
            title: "Adjetivos",
            color: "#FFD700",
            colorText: "#000",
            words: getRandomCards(
              getExportedLists().wordsCrdsList.adjetivos,
              20
            ),
          },
        ],
      },
      wordSearch: {
        enabled: true,
        themes: [
          { ...generateWordSearch(getExportedLists().wordSearchList.animais) },
          { ...generateWordSearch(getExportedLists().wordSearchList.frutas) },
          { ...generateWordSearch(getExportedLists().wordSearchList.objetos) },
        ],
      },
      storyGame: { enabled: true, prompts: generateStoryPrompts() },
      objectHunt: { enabled: true, objects: generateObjects() },
      memoryGame: { enabled: true, pairs: memoryPairs },
      hangman: { enabled: true },
      portugueseLetters: { enabled: true, syllables: BASE_LETTERS_NUMBERS },
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
