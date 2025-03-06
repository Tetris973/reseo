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

export type TokenAnalysisAction =
  | { type: 'SET_TEXT'; payload: string }
  | { type: 'SET_ANALYSIS'; payload: TokenAnalysis }
  | { type: 'SET_FILTERABLE_TOKENS'; payload: Record<TokenGroupType, Set<string>> }
  | { type: 'TOGGLE_STOPWORDS_FILTER'; payload: { groupType: TokenGroupType } }
  | { type: 'TOGGLE_CUSTOM_FILTER'; payload: { groupType: TokenGroupType; token: string } }
  | { type: 'TOGGLE_STARRED_TOKEN'; payload: { groupType: TokenGroupType; token: string } }
  | { type: 'LOAD_TOKEN_DATA' }
  | { type: 'LOAD_TEXT' };

export interface TokenAnalysisContextType {
  state: TokenAnalysisState;
  setText: (text: string) => void;
  toggleStopWordsFilter: (groupType: TokenGroupType) => void;
  toggleCustomFilter: (groupType: TokenGroupType, token: string) => void;
  toggleStaredToken: (groupType: TokenGroupType, token: string) => void;
}
