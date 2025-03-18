import stopwordsJson from './stopwords.json';

// TODO: delete below
export interface StopWordsByLetter {
  [letter: string]: Set<string>;
}

export const STOP_WORDS: Set<string> = new Set(Object.values(stopwordsJson).flat());
// TODO: delete below
export const STOP_WORDS_BY_LETTER: StopWordsByLetter = Object.fromEntries(
  Object.entries(stopwordsJson).map(([letter, words]) => [letter, new Set(words)]),
);
