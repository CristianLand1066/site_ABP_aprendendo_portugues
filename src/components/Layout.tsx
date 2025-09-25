import { PropsWithChildren } from "react";
import LanguageSelector from "./LanguageSelector";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-neutral-900 dark:text-neutral-100">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-blue-600 text-white px-3 py-1 rounded"
      >
        Ir para o conteúdo principal
      </a>

      <header className="w-full border-b border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded bg-blue-600 text-white font-bold">
              ABP
            </span>
            <span className="font-semibold">Aprendendo Português</span>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSelector />
          </div>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-5xl px-4 py-8">
        {children}
      </main>

      <footer className="mt-12 w-full border-t border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-neutral-500 dark:text-neutral-400">
          <p>
            © {new Date().getFullYear()} ABP — Material educacional multilíngue.
            Construído com React + Vite.
          </p>
        </div>
      </footer>
    </div>
  );
}
