import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import languages from "../../i18n/languages";
import type { DocumentProps } from "@react-pdf/renderer";

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

interface WordCard {
  substantivo: string;
  verbo: string;
  adjetivo: string;
}

export interface PdfDebateCategory {
  title: string;
  summary: string;
  color: string;
  colorText: string;
  icon: string;
  phrases: string[];
}

interface DominoPiece {
  left: string;
  right: string;
}


export interface PdfData {
  locale: (typeof languages)[0]["code"];
  coverTitle: string;
  intro: string;
  sections: PdfSection[];
  bingo?: PdfBingoConfig;
  cardsDebate?: {
    enabled: boolean;
    categories: PdfDebateCategory[];
  };
  wordCards?: {
    enabled: boolean;
    categories: WordCard[];
  };
  domino?: {
    enabled: boolean;
    syllables: string[];
  };
}

export interface PdfGame {
  title: string;
  summary: string;
  instructions: string[];
  imageSrc?: string;
}

export interface PdfImage {
  src: string;
  caption?: string;
  width?: number;
  height?: number;
}

interface PdfBingoConfig {
  enabled: boolean;
  rows?: number; // default 12
  cols?: number; // default 12
  letters?: string[]; // default A-Z
  cards?: number; // number of cards to generate, default 1
}

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  bingo: {
    padding: 0,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  molde: {
    padding: 0,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  domino: {
    padding: 0,
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  h1: { fontSize: 24, marginBottom: 8 },
  h2: { fontSize: 18, marginTop: 16, marginBottom: 6 },
  p: { marginBottom: 8, lineHeight: 1.4 },
  list: { marginLeft: 12 },
  caption: {
    marginBottom: 8,
    lineHeight: 1.4,
    fontStyle: "italic",
    fontSize: 10,
    color: "#555",
  },
  captionLabel: {
    fontStyle: "italic",
    fontSize: 10,
    color: "#555",
    fontWeight: 700,
  },
  image: { marginTop: 6, marginBottom: 6, alignSelf: "center" },
  //bingo styles
  bingoGrid: { marginTop: 12, gap: 0 },
  bingoRow: { flexDirection: "row" },
  bingoCell: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000",
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  bingoText: { fontSize: 10, fontWeight: 500 },
  bingoCard: { marginBottom: 10 },
});

const DEFAULT_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const DEFAULT_NUMBERS = Array.from({ length: 1001 }, (_, i) => i.toString());


function shuffleArray<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDominoPieces(syllables: string[]): DominoPiece[] {
  const pieces: DominoPiece[] = [];
  for (let i = 0; i < syllables.length; i++) {
    for (let j = i + 1; j < syllables.length; j++) {
      pieces.push({ left: syllables[i], right: syllables[j] });
    }
  }
  return pieces.sort(() => Math.random() - 0.5).slice(0, 90);
}

function makeLettersPool(letters: string[], total: number): string[] {
  const pool: string[] = [];
  while (pool.length < total) pool.push(...letters);
  return pool.slice(0, total);
}

function buildBingoGrid(
  rows: number,
  cols: number,
  letters: string[] = DEFAULT_LETTERS
): string[][] {
  const total = rows * cols;
  const pool = makeLettersPool(letters, total);
  const shuffled = shuffleArray(pool);
  const grid: string[][] = [];
  for (let r = 0; r < rows; r++) {
    grid.push(shuffled.slice(r * cols, (r + 1) * cols));
  }
  return grid;
}

function buildWordCards(
  substantivos: string[],
  verbos: string[],
  adjetivos: string[],
  limit = 18 // número máximo de cartões por página
): WordCard[] {
  const cards: WordCard[] = [];
  const max = Math.min(substantivos.length, verbos.length, adjetivos.length, limit);

  for (let i = 0; i < max; i++) {
    cards.push({
      substantivo: substantivos[i],
      verbo: verbos[i],
      adjetivo: adjetivos[i],
    });
  }

  return cards;
}

function renderGrid(grid: string[][], styles: any) {
  return (
    <View style={styles.bingoGrid}>
      {grid.map((row, r) => (
        <View key={r} style={styles.bingoRow}>
          {row.map((cell, c) => (
            <View key={c} style={styles.bingoCell}>
              <Text style={styles.bingoText}>{cell}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

export function PdfDocument(data: PdfData): React.ReactElement<DocumentProps> {
  // Aggregate all images to render together on a dedicated page at the end
  const sectionImagesImages: PdfImage[] = (data.sections || []).flatMap(
    (sec) => sec.images?.images || []
  );
  const sectionImagesMoldes: PdfImage[] = (data.sections || []).flatMap(
    (sec) => sec.images?.moldes || []
  );

  const imagesTitle =
    data.locale === "pt"
      ? "Imagens"
      : data.locale === "es"
      ? "Imágenes"
      : data.locale === "fr"
      ? "Images"
      : data.locale === "de"
      ? "Bilder"
      : "Images";

  const bingoTitle =
    data.locale === "pt"
      ? "Bingo"
      : data.locale === "es"
      ? "Bingo"
      : data.locale === "fr"
      ? "Bingo"
      : data.locale === "de"
      ? "Bingo"
      : "Bingo";

  const cardsDebateTitle = 
    data.locale === "pt"
      ? "Cartas de Debate"
      : data.locale === "es"
      ? "Cartas de Debate"
      : data.locale === "fr"
      ? "Cartes de Débat"
      : data.locale === "de"
      ? "Debattenkarten"
      : "Debate Cards";

  const dominoTitle =
    data.locale === "pt"
      ? "Dominó de Sílabas"
      : data.locale === "es"
      ? "Dominó de Silabas"
      : data.locale === "fr"
      ? "Dominó des Syllabes"
      : data.locale === "de"
      ? "Dominos der Silben"
      : "Dominó de Sílabas";

    const wordCardsTitle =
      data.locale === "pt"
        ? "Cartões de Frases"
        : data.locale === "es"
        ? "Cartas de Debate"
        : data.locale === "fr"
        ? "Cartes de Débat"
        : data.locale === "de"
        ? "Debattenkarten"
        : "Debate Cards";
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

      {/* Page 2: images aggregated */}
      {sectionImagesImages.length > 0 && (
        <Page size="A4" style={styles.page}>
          <Text style={styles.h2}>{imagesTitle}</Text>
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
          <Text style={styles.h1}>
            {bingoTitle}
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {Array.from({ length: data.bingo.cards ?? 1 }).map((_, cardIdx) => {
              const rows = data.bingo?.rows ?? 3;
              const cols = data.bingo?.cols ?? 3;
              const letters = data.bingo?.letters ?? DEFAULT_LETTERS;
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
            {Array.from({ length: data.bingo.cards ?? 1 }).map((_, cardIdx) => {
              const rows = 4;
              const cols = 4;
              const letters = data.bingo?.letters ?? DEFAULT_LETTERS;
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
            {Array.from({ length: data.bingo.cards ?? 1 }).map((_, cardIdx) => {
              const rows = 4; // maior que 3x3 para caber mais números
              const cols = 4;
              const letters = data.bingo?.letters ?? DEFAULT_NUMBERS;
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
      {data.cardsDebate?.enabled && data.cardsDebate.categories?.length > 0 && (
        <Page size="A4" style={styles.page}>
          <Text style={styles.h1}>
            {cardsDebateTitle}
          </Text>

          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 2 }}>
            {data.cardsDebate.categories.map((cat, idx) => (
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
                  {cat.summary}
                </Text>
                {cat.phrases.map((p, pi) => (
                  <Text
                    key={pi}
                    style={{ fontSize: 10, marginBottom: 2, color: cat.colorText }}
                  >
                    - {p}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        </Page>
      )}

      {data.domino?.enabled && (
        <Page size="A4" style={styles.domino}>
          <Text style={styles.h1}>{dominoTitle}</Text>

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
          <Text style={styles.h1}>✍️ Cartões de Palavras</Text>

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
