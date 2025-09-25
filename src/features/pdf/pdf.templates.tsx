import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import languages from "../../i18n/languages";
import type { DocumentProps } from "@react-pdf/renderer";

export interface PdfSection {
    title: string;
    content?: string;
    games?: PdfGame[];
    contentPt?: string;
    gamesPt?: PdfGame[];
  }

export interface PdfGame {
  title: string;
  summary: string;
  instructions: string[];
}

export interface PdfData {
  locale: (typeof languages)[0]["code"];
  coverTitle: string;
  intro: string;
  sections: PdfSection[];
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
    caption: { marginBottom: 8, lineHeight: 1.4, fontStyle: "italic", fontSize: 10, color: "#555" },
    captionLabel: { fontStyle: "italic", fontSize: 10, color: "#555", fontWeight: 700 },
  });

export function PdfDocument(data: PdfData): React.ReactElement<DocumentProps> {
  return (
    <Document>
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
                    {(Array.isArray(g.instructions) ? g.instructions : g.instructions ? [g.instructions] : []).map((inst, idx2) => (
                    <Text key={idx2} style={styles.list}>
                        - {inst}
                    </Text>
                    ))}

                    {data.locale !== "pt" && sec.gamesPt?.[idx] && (
                    <View>
                        <Text style={styles.caption}>
                        <Text style={styles.captionLabel}>(Português) </Text>
                        - {sec.gamesPt[idx].title}
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
    </Document>
  );
}
