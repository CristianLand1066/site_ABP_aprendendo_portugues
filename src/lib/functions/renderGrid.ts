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

export function buildBingoGrid(
  rows: number,
  cols: number,
  letters: string[] = getExportedLists().generalExportsList.DEFAULT_LETTERS
): string[][] {
  const total = rows * cols;
  const pool = makeLettersPool(letters, total);
  const shuffled = shuffleArray(pool);
  const grid: string[][] = [];
  for (let r = 0; r < rows; r++) {
    grid.push(shuffled.slice(r * cols, (r + 1) * cols));
  }
  return grid;
}

function makeLettersPool(letters: string[], total: number): string[] {
    const pool: string[] = [];
    while (pool.length < total) pool.push(...letters);
    return pool.slice(0, total);
  }