import { shuffleArray } from "./generalFunctions";
import getExportedLists from "../prompts/getExportedLists";

export function generateMemoryPairs() {
    const shuffled = shuffleArray(getExportedLists().memoryPairsList as { word: string; image?: string }[]);
    const count = 12;
    return shuffled.slice(0, count);
  }  

export function generateObjects() {
    const shuffled = shuffleArray(getExportedLists().objectsList as string[]);
    const count = 36;
    return shuffled.slice(0, count);
  }

export function generateStoryPrompts(): string[] {
    const shuffled = shuffleArray(getExportedLists().storyList as string[]);
    const count = 16;
    return shuffled.slice(0, count);
  }

export function buildDominoPieces(syllables: string[]): { left: string; right: string }[] {
  const pieces: { left: string; right: string }[] = [];
  for (let i = 0; i < syllables.length; i++) {
    for (let j = i + 1; j < syllables.length; j++) {
      pieces.push({ left: syllables[i], right: syllables[j] });
    }
  }
  return pieces.sort(() => Math.random() - 0.5).slice(0, 90);
}