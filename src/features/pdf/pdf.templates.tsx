import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
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
});

export function PdfDocument(data: PdfData): React.ReactElement<DocumentProps> {
  // Aggregate all images to render together on a dedicated page at the end
  const sectionImages = (data.sections || []).flatMap((sec) => sec.images || []);
  const gameImages = (data.sections || [])
    .flatMap((sec) => (sec.games || []).map((g) => g.imageSrc).filter(Boolean)) as string[];

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
                      <Text style={styles.captionLabel}>(Português) </Text>- {sec.gamesPt[idx].title}
                    </Text>
                    <Text style={styles.caption}>{sec.gamesPt[idx].summary}</Text>
                    {(Array.isArray(sec.gamesPt[idx].instructions)
                      ? sec.gamesPt[idx].instructions
                      : sec.gamesPt[idx].instructions
                      ? [sec.gamesPt[idx].instructions]
                      : []
                    ).map((instPt, idx3) => (
                      <Text key={idx3} style={{ ...styles.caption, ...styles.list }}>
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
                {...(img.width || img.height ? { width: img.width, height: img.height } : {})}
              />
              {img.caption && <Text style={styles.caption}>{img.caption}</Text>}
            </View>
          ))}

          
        </Page>
      )}
    </Document>
  );
}
