import { TokenCount, TokenEntity } from './token-analysis.types';

/**
 * Aggregates frequency data for a token and its variations
 * @param variations List of token variations with their counts
 * @param totalTokensCount Total number of tokens in the analyzed text
 */
const aggregateVariationStats = (variations: TokenCount[], totalTokensCount: number): TokenEntity => {
  const variantFrequencies: Record<string, number> = {};
  let totalOccurrences = 0;

  for (const { token, count } of variations) {
    variantFrequencies[token] = count;
    totalOccurrences += count;
  }

  // Get the canonical form (most frequent token)
  const canonicalForm = variations.reduce((prev, curr) => (curr.count > prev.count ? curr : prev)).token;

  return {
    token: canonicalForm,
    count: totalOccurrences,
    density: (totalOccurrences / totalTokensCount) * 100,
    variations: variantFrequencies,
  };
};

/**
 * Consolidates different variations of the same token under their most frequent form
 * Works with both single tokens and token groups (e.g., "Next.js" or "Next.js framework")
 * Example: "Next.js framework" (10 occurrences), "NextJS Framework" (5 occurrences)
 *          → returns: {
 *              token: "Next.js framework",
 *              count: 15,
 *              variations: { "Next.js framework": 10, "NextJS Framework": 5 },
 *              density: 0.75 // if total tokens was 2000
 *            }
 *
 * @param tokenCounts - Array of tokens and their individual occurrence counts
 * @returns Array of TokenEntity objects sorted by count in descending order
 */
export const consolidateVariations = (tokenCounts: TokenCount[]): TokenEntity[] => {
  const normalizedGroups = new Map<string, TokenCount[]>();

  for (const entry of tokenCounts) {
    const normalizedForm = entry.token.replace(/[.-]/g, '').toLowerCase();

    if (!normalizedGroups.has(normalizedForm)) {
      normalizedGroups.set(normalizedForm, [entry]);
    } else {
      normalizedGroups.get(normalizedForm)!.push(entry);
    }
  }

  const totalTokensCount = tokenCounts.reduce((acc, curr) => acc + curr.count, 0);

  // Transform the Map into an array of TokenEntity objects
  return Array.from(normalizedGroups.values())
    .map((variations) => aggregateVariationStats(variations, totalTokensCount))
    .sort((a, b) => b.count - a.count); // Sort by count descending
};
