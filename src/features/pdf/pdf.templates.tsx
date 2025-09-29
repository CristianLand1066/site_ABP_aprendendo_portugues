import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
} from "@react-pdf/renderer";
import languages from "../../i18n/languages";
import type { DocumentProps } from "@react-pdf/renderer";
import { useTranslation } from "react-i18next";
import { styles } from "../../lib/prompts/styles";
import getExportedLists from "../../lib/prompts/getExportedLists";
import { getTraduction } from "../../components/translate";
import { renderGrid} from "../../components/renderGrid";
import { generateHangman } from "../../components/generateHangMan";
import { buildDominoPieces } from "../../lib/functions/generateGames";
import { buildBingoGrid } from "../../lib/functions/renderGrid";

export interface PdfSection {
  title: string;
  content?: string;
  games?: PdfGame[];
  contentPt?: string;
  gamesPt?: PdfGame[];
  images?: {
    images: PdfImage[];
    moldes: PdfImage[];
  };
}

export interface PdfInstruction {
  title: string;
  content?: string;
  games?: PdfGame[];
}

interface WordCard {
  title: string;
  color: string;
  colorText: string;
  words: string[];
}

export interface PdfDebateCategory {
  title: string;
  color: string;
  colorText: string;
  phrases: string[];
}

export interface PdfData {
  locale: (typeof languages)[0]["code"];
  coverTitle: string;
  intro: string;
  coverInstructions: string;
  introInstructions: string;
  sections: PdfSection[];
  instructions: PdfInstruction[];
  bingo?: PdfBingoConfig;
  cardsDebate?: {
    enabled: boolean;
    cards: PdfDebateCategory[];
  };
  wordCards?: {
    enabled: boolean;
    categories: WordCard[];
  };
  domino?: {
    enabled: boolean;
    syllables: string[];
  };
  wordSearch?: {
    enabled: boolean;
    themes: {
      words: string[];
      grid: string[][];
    }[];
  };
  storyGame?: {
    enabled: boolean;
    prompts: string[]; // frases sorteadas
  };
  objectHunt?: {
    enabled: boolean;
    objects: string[]; // lista de objetos sorteados
  };
  memoryGame?: {
    enabled: boolean;
    pairs: {
      word: string;
      image?: string; // opcional: se tiver imagem correspondente
    }[];
  };
  hangman?: {
    enabled: boolean;
  };
}

export interface PdfGame {
  title: string;
  summary: string;
  instructions: string[];
  imageSrc?: string;
}

export interface PdfInstruction {
  title: string;
  summary?: string;
  instructions?: string[];
}

export interface PdfImage {
  src: string;
  caption?: string;
  width?: number;
  height?: number;
}

interface PdfBingoConfig {
  enabled: boolean;
  rows?: number;
  cols?: number;
  letters?: string[];
  cards?: number;
}



export function PdfDocument(data: PdfData): React.ReactElement<DocumentProps> {
  const { i18n } = useTranslation();
  // Aggregate all images to render together on a dedicated page at the end
  const sectionImagesImages: PdfImage[] = (data.sections || []).flatMap(
    (sec) => sec.images?.images || []
  );
  const sectionImagesMoldes: PdfImage[] = (data.sections || []).flatMap(
    (sec) => sec.images?.moldes || []
  );

  return (
    <Document>
      {/* Page 1: text content only */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.h1}>{data.coverTitle}</Text>
        <Text style={styles.p}>{data.intro}</Text>

        {data.sections.map((sec) => (
          <View key={sec.title} wrap>
            <Text style={styles.h2}>{sec.title}</Text>

            {sec.content && <Text style={styles.p}>{sec.content}</Text>}

            {data.locale !== "pt" && sec.contentPt && (
              <Text style={styles.caption}>
                <Text style={styles.captionLabel}>(Português) </Text>
                {sec.contentPt}
              </Text>
            )}

            {sec.games?.map((g, idx) => (
              <View key={g.title} style={{ marginBottom: 8 }}>
                <Text>• {g.title}</Text>
                <Text style={styles.p}>{g.summary}</Text>

                {(Array.isArray(g.instructions)
                  ? g.instructions
                  : g.instructions
                  ? [g.instructions]
                  : []
                ).map((inst, idx2) => (
                  <Text key={idx2} style={styles.list}>
                    - {inst}
                  </Text>
                ))}

                {data.locale !== "pt" && sec.gamesPt?.[idx] && (
                  <View>
                    <Text style={styles.caption}>
                      <Text style={styles.captionLabel}>(Português) </Text>-{" "}
                      {sec.gamesPt[idx].title}
                    </Text>
                    <Text style={styles.caption}>
                      {sec.gamesPt[idx].summary}
                    </Text>
                    {(Array.isArray(sec.gamesPt[idx].instructions)
                      ? sec.gamesPt[idx].instructions
                      : sec.gamesPt[idx].instructions
                      ? [sec.gamesPt[idx].instructions]
                      : []
                    ).map((instPt, idx3) => (
                      <Text
                        key={idx3}
                        style={{ ...styles.caption, ...styles.list }}
                      >
                        - {instPt}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        ))}
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.h1}>{data.coverInstructions}</Text>
        <Text style={styles.p}>{data.introInstructions}</Text>

        {data.instructions.map((sec) => (
          <View key={sec.title} wrap>
            <Text style={styles.h2}>{sec.title}</Text>

            {sec.content && <Text style={styles.p}>{sec.content}</Text>}

            {data.locale !== "pt" && (
              <Text style={styles.caption}>
                <Text style={styles.captionLabel}>(Português) </Text>
                {sec.content}
              </Text>
            )}

            <Text style={styles.p}>{sec.summary}</Text>
            {sec.instructions?.map((inst, idx2) => (
              <Text key={idx2} style={styles.list}>
                - {inst}
              </Text>
            ))}
          </View>
        ))}
      </Page>

      {/* Page 2: images aggregated */}
      {sectionImagesImages.length > 0 && (
        <Page size="A4" style={styles.page}>
          {getTraduction(i18n, data, "pdf.images.title", "title")}
          {getTraduction(i18n, data, "pdf.images.title", "caption")}
          {sectionImagesImages.map((img, idxImg) => (
            <View key={`sec-img-${idxImg}`}>
              <Image
                style={styles.image}
                src={img.src}
                {...(img.width || img.height
                  ? { width: img.width, height: img.height }
                  : {})}
              />
              {img.caption && <Text style={styles.caption}>{img.caption}</Text>}
            </View>
          ))}
        </Page>
      )}

      {/* Optional:bingo pages */}
      {data.bingo?.enabled && (
        <Page size="A4" style={styles.bingo}>
          {getTraduction(i18n, data, "pdf.bingo.title", "title")}
          {getTraduction(i18n, data, "pdf.bingo.title", "caption")}
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {Array.from({ length: data.bingo.cards ?? 1 }).map(() => {
              const rows = data.bingo?.rows ?? 3;
              const cols = data.bingo?.cols ?? 3;
              const letters = getExportedLists().generalExportsList.DEFAULT_LETTERS;
              const grid = buildBingoGrid(rows, cols, letters);

              return (
                <View
                  key={`bingo-3X3`}
                  style={{ width: "50%", padding: 1 }}
                >
                  {renderGrid(grid, styles)}
                </View>
              );
            })}
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {Array.from({ length: data.bingo.cards ?? 1 }).map(() => {
              const rows = 4;
              const cols = 4;
              const letters = getExportedLists().generalExportsList.DEFAULT_LETTERS;
              const grid = buildBingoGrid(rows, cols, letters);

              return (
                <View
                  key={`bingo-4X4`}
                  style={{ width: "50%", padding: 1 }}
                >
                  {renderGrid(grid, styles)}
                </View>
              );
            })}
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {Array.from({ length: data.bingo.cards ?? 1 }).map(() => {
              const rows = 4;
              const cols = 4;
              const letters = getExportedLists().generalExportsList.DEFAULT_LETTERS;
              const grid = buildBingoGrid(rows, cols, letters);

              return (
                <View
                  key={`bingo-5X5`}
                  style={{ width: "50%", padding: 1 }}
                >
                  {renderGrid(grid, styles)}
                </View>
              );
            })}
          </View>
        </Page>
      )}

      {/* Optional: cardsDebate pages */}
      {data.cardsDebate?.enabled && data.cardsDebate.cards?.length > 0 && (
        <Page size="A4" style={styles.page}>
          {getTraduction(i18n, data, "pdf.cardsDebate.title", "title")}
          {getTraduction(i18n, data, "pdf.cardsDebate.title", "caption")}

          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 2 }}>
            {data.cardsDebate.cards.map((cat, idx) => (
              <View
                key={idx}
                style={{
                  marginBottom: 16,
                  borderWidth: 1,
                  borderColor: "#ddd",
                  borderRadius: 6,
                  padding: 8,
                  backgroundColor: cat.color,
                  width: "48%",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: cat.colorText,
                  }}
                >
                  {cat.title}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontStyle: "italic",
                    marginBottom: 6,
                    color: cat.colorText,
                  }}
                >
                </Text>
                {cat.phrases.map((p, pi) => {
                  const ptPhrases = i18n.getFixedT("pt")(`pdf.cardsDebate.cards.${idx}.phrases`, {
                    returnObjects: true,
                  }) as string[];
                  const ptPhrase = ptPhrases?.[pi];
                  
                  return (
                    <React.Fragment key={pi}>
                      <Text style={{ fontSize: 10, marginBottom: 2, color: cat.colorText }}>
                        - {ptPhrase || p}
                      </Text>
                      {data.locale !== "pt" && (
                        <Text
                          style={{ fontSize: 8, marginBottom: 2, color: cat.colorText, fontStyle: "italic" }}
                        >
                          - {p}
                        </Text>
                      )}
                    </React.Fragment>
                  );
                })}
              </View>
            ))}
          </View>
        </Page>
      )}

      {data.domino?.enabled && (
        <Page size="A4" style={styles.domino}>
          {getTraduction(i18n, data, "pdf.domino.title", "title")}
          {getTraduction(i18n, data, "pdf.domino.title", "caption")}

          <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 12 }}>
            {buildDominoPieces(data.domino.syllables).map((piece, idx) => (
              <View
                key={idx}
                style={{
                  width: "16%", // 4 peças por linha
                  borderWidth: 1,
                  borderColor: "#000",
                  margin: 1,
                  flexDirection: "row",
                  height: 50,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    borderRightWidth: 1,
                    borderColor: "#000",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 2,
                  }}
                >
                  <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                    {piece.left}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                    {piece.right}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </Page>
      )}

      {data.wordCards?.enabled && (
        <Page size="A4" style={styles.molde}>
          {getTraduction(i18n, data, "pdf.wordCards.title", "title")}
          {getTraduction(i18n, data, "pdf.wordCards.title", "caption")}

          <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 12 }}>
            {data.wordCards.categories?.flatMap((cat) =>
              cat.words.map((word, idx) => (
                <View
                  key={`${cat.title}-${idx}`}
                  style={{
                    width: "16%",       // ~5 cartões por linha
                    height: 50,         // altura do cartão
                    borderWidth: 1,
                    borderColor: "#000",
                    margin: 6,
                    padding: 6,
                    borderRadius: 6,
                    backgroundColor: cat.color,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                      color: cat.colorText,
                      textTransform: "capitalize",
                    }}
                  >
                    {word}
                  </Text>
                </View>
              ))
            )}
          </View>
        </Page>
      )}
      
      {data.wordSearch?.enabled && data.wordSearch.themes?.length > 0 && (
        <Page size="A4" style={styles.wordSearch}>
          {getTraduction(i18n, data, "pdf.wordSearch.title", "title")}
          {getTraduction(i18n, data, "pdf.wordSearch.title", "caption")}

          {data.wordSearch.themes.map((theme, idx) => (
            <View key={idx} style={{ marginBottom: 16 }}>

              {/* Renderiza a grade */}
              <View style={styles.bingoGrid}>
                {theme.grid.map((row, r) => (
                  <View key={r} style={styles.bingoRow}>
                    {row.map((cell, c) => (
                      <View key={c} style={styles.bingoCell}>
                        <Text style={styles.bingoText}>{cell}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>

              <Text style={{ marginTop: 8, fontSize: 10 }}>
                Palavras: {theme.words.join(", ")}
              </Text>
            </View>
          ))}
        </Page>
      )}

      {data.storyGame?.enabled && data.storyGame.prompts?.length > 0 && (
        <Page size="A4" style={styles.storyGame}>
          {getTraduction(i18n, data, "pdf.storyGame.title", "title")}
          {getTraduction(i18n, data, "pdf.storyGame.title", "caption")}

          <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 12 }}>
            {data.storyGame.prompts.map((phrase, idx) => (
              <View
                key={idx}
                style={{
                  width: "45%",      // 2 cartões por linha
                  minHeight: 80,     // altura mínima
                  borderWidth: 1,
                  borderColor: "#000",
                  borderRadius: 8,
                  padding: 8,
                  margin: 6,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: idx % 2 === 0 ? "#f5f5f5" : "#e0f7fa", // alterna cores
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {phrase}
                </Text>
              </View>
            ))}
          </View>
        </Page>
      )}

      {data.objectHunt?.enabled && data.objectHunt.objects?.length > 0 && (
        <Page size="A4" style={styles.objectHunt}>
          {getTraduction(i18n, data, "pdf.objectHunt.title", "title")}
          {getTraduction(i18n, data, "pdf.objectHunt.title", "caption")}

          <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 12 }}>
            {data.objectHunt.objects.map((obj, idx) => (
              <View
                key={idx}
                style={{
                  width: "30%",      // 3 cartões por linha
                  minHeight: 50,
                  borderWidth: 1,
                  borderColor: "#000",
                  borderRadius: 8,
                  padding: 8,
                  margin: 6,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: idx % 2 === 0 ? "#fff9c4" : "#c8e6c9", // alterna cores
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: "bold", textAlign: "center" }}>
                  {obj}
                </Text>
              </View>
            ))}
          </View>
        </Page>
      )}

      {data.hangman?.enabled && (
        <Page size="A4" style={styles.hangman}>
          {getTraduction(i18n, data, "pdf.hangman.title", "title")}
          {getTraduction(i18n, data, "pdf.hangman.title", "caption")}

          {/* Imagem da forca */}
          {generateHangman()}
        </Page>
      )}

      {data.memoryGame?.enabled && data.memoryGame.pairs?.length > 0 && (
        <Page size="A4" style={styles.memoryGame}>
          {getTraduction(i18n, data, "pdf.memoryGame.title", "title")}
          {getTraduction(i18n, data, "pdf.memoryGame.title", "caption")}

          <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 12 }}>
            {data.memoryGame.pairs.flatMap((pair) => [
              // Cartão com palavra
              <View
                key={`${pair.word}-word`}
                style={{
                  width: "30%",
                  height: 80,
                  borderWidth: 1,
                  borderColor: "#000",
                  borderRadius: 8,
                  margin: 6,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#f1f8e9"
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>{pair.word}</Text>
              </View>,

              // Cartão com imagem
              <View
                key={`${pair.word}-img`}
                style={{
                  width: "30%",
                  height: 80,
                  borderWidth: 1,
                  borderColor: "#000",
                  borderRadius: 8,
                  margin: 6,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#fff3e0"
                }}
              >
                {pair.image ? (
                  <Image
                    src={pair.image}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover" // preenche e corta o excesso para ocupar todo o cartão
                    }}
                  />
                ) : (
                  <Text>[Imagem]</Text>
                )}
              </View>
            ])}
          </View>
        </Page>
      )}
      {sectionImagesMoldes.length > 0 && sectionImagesMoldes.map((img, idxImg) => (
        <Page size="A4" style={styles.molde}>
          <View key={`sec-img-${idxImg}`}>
            <Image
              style={styles.image}
              src={img.src}
              {...(img.width || img.height
                ? { width: img.width, height: img.height }
                : {})}
            />
          </View>
        </Page>
      ))}
    </Document>
  );
}
