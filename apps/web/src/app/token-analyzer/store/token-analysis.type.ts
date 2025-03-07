import { TokenAnalysis, TokenGroupType } from '@web/app/token-analyzer/services';

export type FilterType = 'stopwords' | 'custom' | null;

export interface TokenAnalysisState {
  // Original unfiltered analysis
  rawAnalysis: TokenAnalysis | null;

  // Filter configuration
  filters: {
    stopWords: {
      enabled: Record<TokenGroupType, boolean>;
      filterableSets: Record<TokenGroupType, Set<string>>;
    };
    customFilters: Record<TokenGroupType, Set<string>>;
  };
  staredTokens: Record<TokenGroupType, Set<string>>;
  // Input state
  inputText: string;
  // Stop words dictionary (flat set)
  stopWordsDictionary: Set<string>;
}

export interface TokenAnalysisActions {
  setText: (text: string) => void;
  setAnalysis: (analysis: TokenAnalysis) => void;
  toggleStopWordsFilter: (groupType: TokenGroupType) => void;
  toggleCustomFilter: (groupType: TokenGroupType, token: string) => void;
  toggleStaredToken: (groupType: TokenGroupType, token: string) => void;
  loadData: () => void;
  exportData: () => void;
  importData: (file: File) => Promise<void>;
  clearAll: () => void;
  clearCustomFilters: (groupType: TokenGroupType) => void;
  clearStaredTokens: (groupType: TokenGroupType) => void;
}
