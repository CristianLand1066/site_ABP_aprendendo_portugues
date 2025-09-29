// src/components/translate.tsx
import { Text } from "@react-pdf/renderer";
import { styles } from "../lib/prompts/styles";
import type { PdfData } from "../features/pdf/pdf.templates";
import type { i18n as I18n } from "i18next";

export function getTraduction(
  i18n: I18n,
  data: PdfData,
  text: string,
  type: "title" | "caption"
) {
  if (type === "title") {
    const translation = i18n.getFixedT("pt")(text);
    return <Text style={styles.h1}>{translation}</Text>;
  }

  const translation = i18n.getFixedT(data.locale)(text);
  if (data.locale !== "pt") {
    return <Text style={styles.captionLabel}>({translation})</Text>;
  }
  return null;
}