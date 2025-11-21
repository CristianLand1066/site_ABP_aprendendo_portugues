import { generatePdf, downloadBlob } from "../../features/pdf/pdf.service";
import getExportedLists from "../prompts/getExportedLists";
import { generateWordSearch } from "../functions/renderGrid";
import {
  generateMemoryPairs,
  generateObjects,
  generateStoryPrompts,
  generateCores,
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
  setError: (v: string | null) => void,
  difficulty?: 'beginner' | 'intermediate' | 'advanced' | 'all'
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

    // Define nível padrão como 'all' se não especificado
    const selectedDifficulty = difficulty || 'all';

    // Função auxiliar para verificar se um jogo deve estar habilitado
    const isGameEnabled = (gameLevel: 'beginner' | 'intermediate' | 'advanced'): boolean => {
      if (selectedDifficulty === 'all') return true;
      return selectedDifficulty === gameLevel;
    };

    // Filtra seções com base no nível de dificuldade
    const allSections = [
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
        level: 'beginner' as const,
        title: t("pdf.sections.beginner"),
        content: t("pdf.sections.beginner_content"),
        contentPt: i18n.getFixedT("pt")("pdf.sections.beginner_content"),
        games: beginnerGames,
        gamesPt: i18n.getFixedT("pt")("pdf.sections.beginner_games", {
          returnObjects: true,
        }) as PdfGame[],
      },
      {
        level: 'intermediate' as const,
        title: t("pdf.sections.intermediate"),
        content: t("pdf.sections.intermediate_content"),
        contentPt: i18n.getFixedT("pt")("pdf.sections.intermediate_content"),
        games: intermediateGames,
        gamesPt: i18n.getFixedT("pt")("pdf.sections.intermediate_games", {
          returnObjects: true,
        }) as PdfGame[],
      },
      {
        level: 'advanced' as const,
        title: t("pdf.sections.advanced"),
        content: t("pdf.sections.advanced_content"),
        contentPt: i18n.getFixedT("pt")("pdf.sections.advanced_content"),
        games: advancedGames,
        gamesPt: i18n.getFixedT("pt")("pdf.sections.advanced_games", {
          returnObjects: true,
        }) as PdfGame[],
      },
    ];

    // Filtra seções mantendo sempre a primeira (imagens/moldes)
    const filteredSections = allSections.filter((section, index) => {
      if (index === 0) return true; // Sempre inclui seção de moldes
      if (selectedDifficulty === 'all') return true;
      return 'level' in section && section.level === selectedDifficulty;
    });

    const data = {
      locale: i18n.language ?? "pt",
      difficulty: selectedDifficulty,
      coverTitle: t("pdf.cover_title"),
      intro: t("pdf.intro"),
      coverInstructions: t("pdf.cover_instructions"),
      introInstructions: t("pdf.intro_instructions"),
      sections: filteredSections,
      instructions: instructionItems.map((it) => ({
        title: it.title,
        summary: it.summary,
        instructions: it.instructions,
      })),
      // Jogos filtrados por nível
      bingo: { enabled: isGameEnabled('beginner'), rows: 3, cols: 3, letters: undefined, cards: 6 },
      cardsDebate: { enabled: isGameEnabled('advanced'), cards: cardsDebateCategories },
      domino: { enabled: isGameEnabled('intermediate'), syllables: getExportedLists().dominoGameList },
      wordCards: {
        enabled: isGameEnabled('intermediate'),
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
        enabled: isGameEnabled('intermediate') || isGameEnabled('advanced'),
        themes: [
          { ...generateWordSearch(getExportedLists().wordSearchList.animais) },
          { ...generateWordSearch(getExportedLists().wordSearchList.frutas) },
          { ...generateWordSearch(getExportedLists().wordSearchList.objetos) },
        ],
      },
      storyGame: { enabled: isGameEnabled('advanced'), prompts: generateStoryPrompts() },
      objectHunt: { enabled: isGameEnabled('beginner'), objects: generateObjects() },
      memoryGame: { enabled: isGameEnabled('beginner'), pairs: memoryPairs },
      hangman: { enabled: isGameEnabled('intermediate') },
      portugueseLetters: { enabled: isGameEnabled('beginner'), syllables: BASE_LETTERS_NUMBERS },
      mapaMundi: { enabled: isGameEnabled('beginner')},
      desenharOrigem: { enabled: isGameEnabled('beginner')},
      apresentacao: { enabled: isGameEnabled('beginner')},
      minhaFamilia: { enabled: isGameEnabled('beginner')},
      desenheObjetosDaCor: { enabled: isGameEnabled('beginner'), cores: generateCores() },
      cronograma: { enabled: isGameEnabled('beginner')},
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
