import { useState } from "react";
import { X } from "lucide-react";

interface AgradecimentosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AgradecimentosModal({ isOpen, onClose }: AgradecimentosModalProps) {
  const [activeTab, setActiveTab] = useState<"equipe" | "apoiadores">("equipe");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-neutral-900 rounded-lg shadow-2xl overflow-hidden mx-4">
        
        {/* Header do Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800">
          <h2 className="text-2xl font-bold">Agradecimentos</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 px-6 pt-4 border-b border-neutral-200 dark:border-neutral-700">
          <button
            onClick={() => setActiveTab("equipe")}
            className={`px-4 py-2 font-medium transition-all border-b-2 ${
              activeTab === "equipe"
                ? "border-blue-600 text-blue-600 dark:text-blue-400"
                : "border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
            }`}
          >
            Equipe do Projeto
          </button>
          <button
            onClick={() => setActiveTab("apoiadores")}
            className={`px-4 py-2 font-medium transition-all border-b-2 ${
              activeTab === "apoiadores"
                ? "border-blue-600 text-blue-600 dark:text-blue-400"
                : "border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
            }`}
          >
            Apoiadores
          </button>
        </div>

        {/* Conteúdo das Tabs */}
        <div className="px-6 py-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {activeTab === "equipe" ? (
            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-semibold mb-3">Equipe do Projeto ABP</h3>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  Este projeto foi desenvolvido com dedicação e carinho por uma equipe comprometida
                  com a educação e o ensino da língua portuguesa. Agradecemos a todos os envolvidos
                  que tornaram este material educacional possível.
                </p>
              </section>

              <section>
                <h4 className="text-lg font-semibold mb-3">Desenvolvimento</h4>
                <ul className="list-disc list-inside space-y-2 text-neutral-700 dark:text-neutral-300">
                  <li>Equipe de Desenvolvimento de Software</li>
                  <li>Designers e UX/UI</li>
                  <li>Especialistas em Pedagogia</li>
                </ul>
              </section>

              <section>
                <h4 className="text-lg font-semibold mb-3">Conteúdo Pedagógico</h4>
                <ul className="list-disc list-inside space-y-2 text-neutral-700 dark:text-neutral-300">
                  <li>Professores de Língua Portuguesa</li>
                  <li>Revisores e Consultores Linguísticos</li>
                  <li>Especialistas em Educação Multilíngue</li>
                </ul>
              </section>
            </div>
          ) : (
            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-semibold mb-3">Apoiadores e Parceiros</h3>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  Agradecemos profundamente a todos os apoiadores, instituições e parceiros que
                  acreditaram neste projeto e contribuíram para sua realização.
                </p>
              </section>

              <section>
                <h4 className="text-lg font-semibold mb-3">Instituições Parceiras</h4>
                <ul className="list-disc list-inside space-y-2 text-neutral-700 dark:text-neutral-300">
                  <li>Instituições de Ensino</li>
                  <li>Organizações Educacionais</li>
                  <li>Comunidades de Educadores</li>
                </ul>
              </section>

              <section>
                <h4 className="text-lg font-semibold mb-3">Comunidade</h4>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  Um agradecimento especial a todos os professores, alunos e educadores que utilizam
                  este material e contribuem com feedback valioso para sua melhoria contínua.
                </p>
              </section>

              <section>
                <h4 className="text-lg font-semibold mb-3">Tecnologias Open Source</h4>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  Este projeto foi construído com tecnologias open source: React, TypeScript, 
                  TailwindCSS, i18next, @react-pdf/renderer e muitas outras bibliotecas incríveis
                  mantidas pela comunidade.
                </p>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
