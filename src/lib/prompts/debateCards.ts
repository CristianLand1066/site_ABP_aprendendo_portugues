import { debateCardsPromptsPt } from "./debateCards/pt";
import { debateCardsPromptsEn } from "./debateCards/en";
import { debateCardsPromptsEs } from "./debateCards/es";
import { debateCardsPromptsFr } from "./debateCards/fr";
import { debateCardsPromptsDe } from "./debateCards/de";

export interface DebateCard {
  title: string;
  color: string;
  colorText: string;
  phrases: string[];
}

/**
 * Retorna os cards de debate no idioma especificado
 * @param locale - Código do idioma (pt, en, es, fr, de)
 * @returns Array de cards de debate traduzidos
 */
export function getDebateCards(locale: string): DebateCard[] {
  switch (locale) {
    case "pt":
      return debateCardsPromptsPt;
    case "en":
      return debateCardsPromptsEn;
    case "es":
      return debateCardsPromptsEs;
    case "fr":
      return debateCardsPromptsFr;
    case "de":
      return debateCardsPromptsDe;
    default:
      // Fallback para português se o idioma não for suportado
      return debateCardsPromptsPt;
  }
}
