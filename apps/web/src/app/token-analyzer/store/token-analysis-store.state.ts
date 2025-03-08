import { STOP_WORDS } from '@web/app/token-analyzer/data/stopwords.helper';
import { TokenAnalysisState } from './token-analysis-store.types';

/**
 * Creates the initial state for the token analysis store
 */
export const createInitialState = (): TokenAnalysisState => ({
  rawAnalysis: null,
  filters: {
    stopWords: {
      enabled: {
        single: true,
        double: true,
        triple: true,
      },
      filterableSets: {
        single: new Set<string>(),
        double: new Set<string>(),
        triple: new Set<string>(),
      },
    },
    customFilters: {
      single: new Set<string>(),
      double: new Set<string>(),
      triple: new Set<string>(),
    },
  },
  staredTokens: {
    single: new Set<string>(),
    double: new Set<string>(),
    triple: new Set<string>(),
  },
  inputText: '',
  stopWordsDictionary: STOP_WORDS,
});
