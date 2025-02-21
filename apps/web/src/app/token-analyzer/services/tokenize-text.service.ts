import { allowedCharsPattern } from './token-analysis.constant';

export interface TokenizationResult {
  relevantTokens: string[];
  irrelevantTokens: string[];
}

const splitText = (text: string): string[] => {
  if (!text?.trim()) {
    return [];
  }
  return text.trim().split(/\s+/).filter(Boolean);
};

/**
 * Tokenizes text and separates tokens into relevant and irrelevant based on domain rules
 * @param text Text to tokenize
 * @returns Object containing relevant and irrelevant tokens
 */
export const tokenizeText = (text: string): TokenizationResult => {
  const tokens = splitText(text);

  return {
    relevantTokens: tokens.filter((word) => allowedCharsPattern.test(word)),
    irrelevantTokens: tokens.filter((word) => !allowedCharsPattern.test(word)),
  };
};
