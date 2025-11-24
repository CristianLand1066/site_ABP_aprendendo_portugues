export function shuffleArray<T>(arr: T[]): T[] {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  export function getRandomCards(arr: string[], count: number): string[] {
    const shuffled = shuffleArray(arr);
    return shuffled.slice(0, count);
  }

  export function getRandomPhrases<T extends { phrases: string[] }>(
    card: T,
    count: number = 5
  ): T {
    return {
      ...card,
      phrases: getRandomCards(card.phrases, count)
    };
  }