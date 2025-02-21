import _ from 'lodash';
import { TokenCount } from './token-analysis.types';
import { nonSemanticCharsPattern } from './token-analysis.constant';

const removeNonSemanticCharacters = (word: string): string => {
  return word.replace(nonSemanticCharsPattern, '');
};

/**
 * Counts occurrences of tokens in the input array
 * @param tokens Array of tokens to count
 * @param groupSize Number of consecutive tokens to group together (default: 1)
 * @returns Array of token counts ordered by frequency
 */
export const countTokenOccurrences = (tokens: string[], groupSize: number = 1): TokenCount[] => {
  const tokenGroups =
    groupSize > 1 ? tokens.slice(0, -(groupSize - 1)).map((_, i) => tokens.slice(i, i + groupSize).join(' ')) : tokens;

  return _.chain(tokenGroups)
    .map(removeNonSemanticCharacters)
    .countBy()
    .map((count, token) => ({ token, count }))
    .orderBy(['count'], ['desc'])
    .value();
};
