import { useState } from "react";
import "./App.css";
import Layout from "./components/Layout";
import { useTranslation } from "react-i18next";
import { handleGeneratePdf } from "./lib/asyncFunctions/generatePdf";

function App() {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced' | 'all'>('beginner');

  return (
    <Layout>
      <section className="flex flex-col items-center gap-6 text-center py-8"> 
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight"> 
          {t("app.title")} 
        </h1> 
        <p className="max-w-2xl text-base sm:text-lg text-neutral-600 dark:text-neutral-300"> 
          {t("app.description", { lang: i18n.language?.toUpperCase?.() || "PT", })} 
        </p> 
        
        {/* Seletor de Nível de Dificuldade */}
        <div className="flex flex-col gap-3 w-full max-w-md">
          <label htmlFor="difficulty-select" className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
            Nível de Dificuldade:
          </label>
          <select
            id="difficulty-select"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as typeof difficulty)}
            className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos os Níveis</option>
            <option value="beginner">Iniciante</option>
            <option value="intermediate">Intermediário</option>
            <option value="advanced">Avançado</option>
          </select>
        </div>

        <div className="flex items-center gap-3"> 
          <button
            onClick={() => handleGeneratePdf(t, i18n, setLoading, setError, difficulty)}
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
