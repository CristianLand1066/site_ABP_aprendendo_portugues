import { useState } from "react";
import "./App.css";
import Layout from "./components/Layout";
import { useTranslation } from "react-i18next";
import { generatePdf, downloadBlob } from "./features/pdf/pdf.service";
import type { PdfGame } from "./features/pdf/pdf.templates";


function App() {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGeneratePdf() {
    setLoading(true);
    setError(null);
    try {
      const data = {
        locale: i18n.language ?? "pt",
        coverTitle: t("pdf.cover_title"),
        intro: t("pdf.intro"),
        sections: [
          {
            title: t("pdf.sections.beginner"),
            content: t("pdf.sections.beginner_content"),
            contentPt: i18n.getFixedT("pt")("pdf.sections.beginner_content"),
            games: t("pdf.sections.beginner_games", { returnObjects: true }) as unknown as PdfGame[],
            gamesPt: i18n.getFixedT("pt")("pdf.sections.beginner_games", { returnObjects: true }) as unknown as PdfGame[],
          },
          {
            title: t("pdf.sections.intermediate"),
            content: t("pdf.sections.intermediate_content"),
            contentPt: i18n.getFixedT("pt")("pdf.sections.intermediate_content"),
            games: t("pdf.sections.intermediate_games", { returnObjects: true }) as unknown as PdfGame[],
            gamesPt: i18n.getFixedT("pt")("pdf.sections.intermediate_games", { returnObjects: true }) as unknown as PdfGame[],
          },
          {
            title: t("pdf.sections.advanced"),
            content: t("pdf.sections.advanced_content"),
            contentPt: i18n.getFixedT("pt")("pdf.sections.advanced_content"),
            games: t("pdf.sections.advanced_games", { returnObjects: true }) as unknown as PdfGame[],
            gamesPt: i18n.getFixedT("pt")("pdf.sections.advanced_games", { returnObjects: true }) as unknown as PdfGame[],
          },
        ],
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
