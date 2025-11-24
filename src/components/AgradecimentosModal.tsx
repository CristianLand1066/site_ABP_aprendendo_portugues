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
                <h3 className="text-xl font-semibold mb-3">Equipe do Projeto Aprendizagem sem Fronteiras</h3>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  Agradecemos a todos os integrantes da equipe pelo empenho e colaboração na realização deste projeto. Cada um contribuiu de forma essencial para que a proposta se tornasse possível.
                </p>
                  <ul>
                    <li><strong>Cristian Mateus Land</strong> — Desenvolvimento da plataforma/atividades e Letras Português/Alemão</li>
                    <li><strong>Gabriel Teles Bergamini</strong> — Desenvolvimento de atividades e Letras Português/Alemão</li>
                    <li><strong>Giovana Ferrari Simon</strong> — Desenvolvimento de atividades e Pedagogia</li>
                    <li><strong>Isabella Antunes de Oliveira</strong> — Desenvolvimento de atividades e Letras Português/Inglês</li>
                  </ul>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  Obrigada(o) pelo comprometimento, pelas trocas e pelo trabalho coletivo. Sem vocês, este projeto não teria tomado forma.
                </p>
              </section>
            </div>
          ) : (
            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-semibold mb-3">Apoiadores e Parceiros</h3>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  Gostaríamos de registrar nossa mais sincera gratidão às professoras <strong>Marguit Goldmeyer</strong>, 
                  professora de Língua Portuguesa, <strong>Katlen Bohn Grando</strong>, da área da Pedagogia e <strong>Joseane Mathias</strong>, 
                  professora responsável pela disciplina, pela disponibilidade, dedicação e pelo conhecimento generosamente 
                  compartilhado ao longo do desenvolvimento deste projeto. Suas contribuições foram fundamentais 
                  para ampliarmos nossa compreensão sobre os aspectos linguísticos, pedagógicos e metodológicos 
                  envolvidos no processo de alfabetização, especialmente no contexto multicultural que buscamos atender.
                </p>
              </section>

              <section>
                <h4 className="text-lg font-semibold mb-3">Instituições Parceiras</h4>
                <ul className="list-disc list-inside space-y-2 text-neutral-700 dark:text-neutral-300">
                  <li>Agradecemos também ao <strong>Programa Move Sem Fronteiras</strong>, 
                    que gentilmente respondeu às nossas perguntas e nos encaminhou materiais valiosos, 
                    enriquecendo nossa pesquisa e fortalecendo o propósito deste trabalho voltado ao acolhimento 
                    e ao aprendizado de crianças estrangeiras e brasileiras.
                  </li>
                  <li>Agradecemos ao <strong>Instituto Superior de Educação Ivoti (ISEI)</strong>, 
                    cuja formação, apoio e ambiente acadêmico inspirador tornaram possível o desenvolvimento deste trabalho. 
                    A instituição tem sido fundamental para nossa trajetória como futuros profissionais da educação.</li>
                </ul>
              </section>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
