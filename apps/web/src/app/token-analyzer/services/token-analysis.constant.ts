/**
 * Usual regex characters
 */
export const ALPHABET = 'a-zA-Z';
export const NUMBERS = '0-9';

/**
 * Technical Naming Characters (Common in tech terms)
 */
export const DOTS = '.'; // vue.js, .NET
export const HYPHEN = '\\-'; // full-stack
export const PLUS = '+'; // C++
export const HASH = '#'; // C#
export const AMPERSAND = '&'; // R&D

/**
 * Punctuation/Grammar Characters
 */
export const APOSTROPHE = "'"; // don't, you're
export const COMMA = ','; // c++, c#, etc
export const COLON = ':'; // missions:
export const EXLAMATION_POINT = '!'; // business!

/**
 * Structural Characters:
 */
export const PARENTHESES = '()'; // grouping
export const FORWARD_SLASH = '/'; // CI/CD, and/or

/**
 * Characters that should not provoke a filter of the whole word it is found in
 */
export const ALLOWED_CHARS = [
  ALPHABET,
  NUMBERS,
  DOTS,
  EXLAMATION_POINT,
  COMMA,
  PLUS,
  HASH,
  COLON,
  FORWARD_SLASH,
  HYPHEN,
  PARENTHESES,
  AMPERSAND,
  APOSTROPHE,
].join('');

/**
 * Characters that should be removed from a word after filtering
 */
export const NON_SEMANTIC_CHARS = [PARENTHESES, COLON, COMMA, EXLAMATION_POINT].join('');

export const allowedCharsPattern = new RegExp(`[${ALLOWED_CHARS}]`);
export const nonSemanticCharsPattern = new RegExp(`[${NON_SEMANTIC_CHARS}]`, 'g');
