import { useTranslation } from "react-i18next";
import languages from "../../src/i18n/languages";

const LANGS = [
  ...languages,
] as const;

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  return (
    <label
      className="inline-flex items-center gap-2 text-sm"
      aria-label="Selecionar idioma"
    >
      <span role="img" aria-hidden className="select-none">
        🌐
      </span>
      <select
        className="border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
      >
        {LANGS.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </label>
  );
}
