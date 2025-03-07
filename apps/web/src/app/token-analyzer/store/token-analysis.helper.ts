import { TokenGroupType } from '@web/app/token-analyzer/services';

// Group stop words by first letter (UI helper function)
export function groupStopWordsByFirstLetter(stopWords: Set<string>): Record<string, Set<string>> {
  const result: Record<string, Set<string>> = {};

  Array.from(stopWords).forEach((word) => {
    const firstLetter = word.charAt(0).toUpperCase();
    if (!result[firstLetter]) {
      result[firstLetter] = new Set<string>();
    }
    result[firstLetter].add(word);
  });

  return result;
}

export function calculateFilterableSets(
  tokensByGroup: Record<TokenGroupType, Array<{ token: string }>>,
  stopWords: Set<string>,
): Record<TokenGroupType, Set<string>> {
  // Keep the single group as stopWords
  const result: Record<TokenGroupType, Set<string>> = {
    single: stopWords,
    double: new Set<string>(),
    triple: new Set<string>(),
  };

  // Normalize the stopWords set for case-insensitive comparison
  const normalizedStopWords = new Set(Array.from(stopWords).map((word) => word.toLowerCase()));

  // For multi-word tokens, check if ALL component words are in stopWords
  ['double', 'triple'].forEach((groupType) => {
    const tokens = tokensByGroup[groupType as TokenGroupType];

    tokens.forEach(({ token }) => {
      const words = token.split(/\s+/);
      const isAllWordsInStopWords = words.every((word) => normalizedStopWords.has(word.toLowerCase()));

      if (isAllWordsInStopWords) {
        result[groupType as TokenGroupType].add(token.toLowerCase());
      }
    });
  });

  return result;
}
