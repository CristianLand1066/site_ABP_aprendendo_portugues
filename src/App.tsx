import { useState } from "react";
import "./App.css";
import Layout from "./components/Layout";
import { useTranslation } from "react-i18next";
import { handleGeneratePdf } from "./lib/asyncFunctions/generatePdf";

function App() {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <Layout>
      <section className="flex flex-col items-center gap-6 text-center py-8"> 
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight"> 
          {t("app.title")} 
        </h1> 
        <p className="max-w-2xl text-base sm:text-lg text-neutral-600 dark:text-neutral-300"> 
          {t("app.description", { lang: i18n.language?.toUpperCase?.() || "PT", })} 
        </p> 
        <div className="flex items-center gap-3"> 
          <button
            onClick={() => handleGeneratePdf(t, i18n, setLoading, setError)}
            disabled={loading}
          >
            {loading ? t("actions.downloading") : t("actions.generate_pdf")}
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </section>
    </Layout>
  );
}

export default App;
