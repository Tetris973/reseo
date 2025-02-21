export type TokenGroupType = 'single' | 'double' | 'triple';

export interface TokenCount {
  token: string;
  count: number;
}

/**
 * Represents a token entity with its statistical properties.
 */
export interface TokenEntity {
  /**
   * Most used token, the one with the most count in the text.
   */
  token: string;

  /**
   * Total count of all the similar tokens.
   */
  count: number;

  /**
   * Density of all the similar tokens against the whole text.
   */
  density: number;

  /**
   * Each similar token including the main token, with their count in the text.
   */
  variations: Record<string, number>;
}

export type TokensByGroup = Record<TokenGroupType, TokenEntity[]>;

export interface TokenAnalysisSummary {
  /**
   * Total count of valid tokens before any filtering
   */
  rawTokenCount: number;

  /**
   * Count of unique tokens before any filtering
   */
  rawUniqueTokenCount: number;
}

export interface TokenAnalysis {
  // Raw data
  tokenCount: TokenCount[];
  tokensByGroup: TokensByGroup;

  // Statistics at each step
  summary: TokenAnalysisSummary;
}
