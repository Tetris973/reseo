import { TokenAnalysisState, TokenAnalysisAction } from '@web/app/token-analyzer/context/token-analysis.type';
import { calculateFilterableSets } from '@web/app/token-analyzer/context/token-analysis.helper';
import { STOP_WORDS } from '@web/app/token-analyzer/data/stopwords.helper';

// Create initial state with built-in stop words dictionary
export function createInitialState(): TokenAnalysisState {
  return {
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
    inputText: '',
    stopWordsDictionary: STOP_WORDS,
  };
}

// Reducer
export function tokenAnalysisReducer(state: TokenAnalysisState, action: TokenAnalysisAction): TokenAnalysisState {
  switch (action.type) {
    case 'SET_TEXT':
      return {
        ...state,
        inputText: action.payload,
      };

    case 'SET_ANALYSIS': {
      const filterableSets = calculateFilterableSets(action.payload.tokensByGroup, state.stopWordsDictionary);

      return {
        ...state,
        rawAnalysis: action.payload,
        filters: {
          ...state.filters,
          stopWords: {
            ...state.filters.stopWords,
            filterableSets,
          },
        },
      };
    }

    case 'SET_FILTERABLE_TOKENS':
      return {
        ...state,
        filters: {
          ...state.filters,
          stopWords: {
            ...state.filters.stopWords,
            filterableSets: action.payload,
          },
        },
      };

    case 'TOGGLE_STOPWORDS_FILTER': {
      const { groupType } = action.payload;
      const newStopWordsEnabled = {
        ...state.filters.stopWords.enabled,
        [groupType]: !state.filters.stopWords.enabled[groupType],
      };

      return {
        ...state,
        filters: {
          ...state.filters,
          stopWords: {
            ...state.filters.stopWords,
            enabled: newStopWordsEnabled,
          },
        },
      };
    }

    case 'TOGGLE_CUSTOM_FILTER': {
      const { groupType, token } = action.payload;
      const currentCustomFilters = state.filters.customFilters[groupType];
      const newCustomFilters = new Set(currentCustomFilters);

      if (newCustomFilters.has(token)) {
        newCustomFilters.delete(token);
      } else {
        newCustomFilters.add(token);
      }

      return {
        ...state,
        filters: {
          ...state.filters,
          customFilters: {
            ...state.filters.customFilters,
            [groupType]: newCustomFilters,
          },
        },
      };
    }

    default:
      return state;
  }
}
