import { tokenizeText, countTokenOccurrences, consolidateVariations, TokenAnalysis, TokensByGroup } from './index';

export const analyzeText = (text: string): TokenAnalysis => {
  const { relevantTokens } = tokenizeText(text);

  // single word tokens
  const tokenCount = countTokenOccurrences(relevantTokens);
  const rawTokenCount = tokenCount.reduce((acc, curr) => acc + curr.count, 0);

  // Build tokensByGroup directly
  const tokensByGroup: TokensByGroup = {
    single: consolidateVariations(tokenCount),
    double: consolidateVariations(countTokenOccurrences(relevantTokens, 2)),
    triple: consolidateVariations(countTokenOccurrences(relevantTokens, 3)),
  };

  // Count unique tokens
  const rawUniqueTokenCount = tokensByGroup.single.length;

  const analysis: TokenAnalysis = {
    summary: {
      rawTokenCount,
      rawUniqueTokenCount,
    },
    tokenCount,
    tokensByGroup,
  };

  return analysis;
};
