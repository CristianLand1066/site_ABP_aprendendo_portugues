export interface Language {
  code: string;
  name: string;
  label: string;
}

const languages: Language[] = [
  { code: "pt", name: "Português", label: "Português" },
  { code: "es", name: "Español", label: "Español" },
  { code: "en", name: "English", label: "English" },
  { code: "fr", name: "Français", label: "Français" },
  { code: "de", name: "Deutsch", label: "Deutsch" },
];

export default languages;
