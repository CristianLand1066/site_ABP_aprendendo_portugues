import { shuffleArray } from "./generalFunctions";
import getExportedLists from "../prompts/getExportedLists";

export function generateWordSearch(
  allWords: string[],
  gridSize = 10,
  minWords = 3,
  maxWords = 6
) {
  const count = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
  const words = shuffleArray(allWords).slice(0, count);

  const grid: string[][] = Array.from({ length: gridSize }, () =>
    Array(gridSize).fill("")
  );

  for (const word of words) {
    placeWordInGrid(grid, word.toUpperCase());
  }

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (!grid[r][c]) {
        grid[r][c] = alphabet[Math.floor(Math.random() * alphabet.length)];
      }
    }
  }

  return { words, grid };
}

function placeWordInGrid(grid: string[][], word: string) {
  const size = grid.length;
  let placed = false;
  let tries = 0;

  while (!placed && tries < 100) {
    tries++;
    const horizontal = Math.random() > 0.5;
    const row = Math.floor(Math.random() * size);
    const col = Math.floor(Math.random() * size);

    if (horizontal) {
      if (col + word.length > size) continue;
      if (word.split("").every((ch, i) => !grid[row][col + i] || grid[row][col + i] === ch)) {
        word.split("").forEach((ch, i) => (grid[row][col + i] = ch));
        placed = true;
      }
    } else {
      if (row + word.length > size) continue;
      if (word.split("").every((ch, i) => !grid[row + i][col] || grid[row + i][col] === ch)) {
        word.split("").forEach((ch, i) => (grid[row + i][col] = ch));
        placed = true;
      }
    }
  }
}

export function buildMultipleBingoGrids(
  count: number = 6,
  rows: number = 3,
  cols: number = 3,
  letters: string[] = getExportedLists().generalExportsList.DEFAULT_LETTERS
): { grids: string[][][]; usedItems: string[] } {
  const total = rows * cols;
  const grids: string[][][] = [];
  const allUsedItems = new Set<string>();

  let attempts = 0;
  const maxAttempts = count * 50;

  while (grids.length < count && attempts < maxAttempts) {
    attempts++;

    const availableLetters = [...letters];
    const selectedLetters: string[] = [];

    for (let i = 0; i < total; i++) {
      const randomIndex = Math.floor(Math.random() * availableLetters.length);
      const selected = availableLetters.splice(randomIndex, 1)[0];
      selectedLetters.push(selected);
      allUsedItems.add(selected);
    }

    const shuffled = shuffleArray([...selectedLetters]);
    const grid: string[][] = [];
    for (let r = 0; r < rows; r++) {
      grid.push(shuffled.slice(r * cols, (r + 1) * cols));
    }
    grids.push(grid);
  }

  return { grids, usedItems: Array.from(allUsedItems) };
}
