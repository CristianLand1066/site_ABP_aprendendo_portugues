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
  images?: PdfImage[];
}

export interface PdfData {
  locale: (typeof languages)[0]["code"];
  coverTitle: string;
  intro: string;
  sections: PdfSection[];
  bingo?: PdfBingoConfig;
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
  bingoText: { fontSize: 10, fontWeight: 600 },
  bingoCard: { marginBottom: 16 },
});

const DEFAULT_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function shuffleArray<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
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
  const sectionImages = (data.sections || []).flatMap(
    (sec) => sec.images || []
  );
  const gameImages = (data.sections || []).flatMap((sec) =>
    (sec.games || []).map((g) => g.imageSrc).filter(Boolean)
  ) as string[];

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
      {(sectionImages.length > 0 || gameImages.length > 0) && (
        <Page size="A4" style={styles.page}>
          <Text style={styles.h2}>{imagesTitle}</Text>
          {sectionImages.map((img, idxImg) => (
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
        <Page size="A4" style={styles.page}>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {Array.from({ length: data.bingo.cards ?? 1 }).map((_, cardIdx) => {
              const rows = data.bingo?.rows ?? 3;
              const cols = data.bingo?.cols ?? 3;
              const letters = data.bingo?.letters ?? DEFAULT_LETTERS;
              const grid = buildBingoGrid(rows, cols, letters);

              return (
                <View
                  key={`bingo-${cardIdx}`}
                  style={{ width: "50%", padding: 3 }}
                >
                  <Text style={styles.h2}>
                    {bingoTitle} #{cardIdx + 1}
                  </Text>
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
                  key={`bingo-${cardIdx}`}
                  style={{ width: "50%", padding: 3 }}
                >
                  <Text style={styles.h2}>
                    {bingoTitle} #{cardIdx + 1}
                  </Text>
                  {renderGrid(grid, styles)}
                </View>
              );
            })}
          </View>
        </Page>
      )}
    </Document>
  );
}
