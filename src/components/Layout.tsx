import { type PropsWithChildren } from "react";
import LanguageSelector from "./LanguageSelector";
import { ChevronRight } from "lucide-react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-neutral-900 dark:text-neutral-100 flex flex-col">

      {/* HEADER */}
      <header className="w-full flex-shrink-0 border-b border-neutral-200 dark:border-neutral-800">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg">
            <span className="bg-blue-600 text-white px-2.5 py-1.5 rounded-md">ABP</span>
            <span>Aprendendo Português</span>
          </div>
          <LanguageSelector />
        </div>
      </header>

      {/* MAIN */}
      <main className="w-full flex-1 flex items-center justify-center py-8">
        {children}
      </main>

      {/* LINK DE AGRADECIMENTOS */}
      <div className="w-full flex-shrink-0 px-6 py-2 flex justify-center items-center gap-1">
        <a
          href="https://abp.com.br"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-600 transition-colors"
        >
          Agradecimentos
        </a>
        <ChevronRight className="w-4 h-4 text-blue-600 dark:text-blue-400" />
      </div>

      {/* FOOTER */}
      <footer className="w-full flex-shrink-0 border-t-2 border-neutral-700 bg-neutral-800">
        <div className="px-6 py-3 text-center text-xs text-neutral-300">
          © {new Date().getFullYear()} ABP — Material educacional multilíngue.
        </div>
      </footer>

    </div>
  );
}
