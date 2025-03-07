import { create } from 'zustand';
import { STOP_WORDS } from '@web/app/token-analyzer/data/stopwords.helper';
import { TokenAnalysis, TokenGroupType, analyzeText } from '@web/app/token-analyzer/services';
import { TokenStorageService } from '@web/app/token-analyzer/services/store-token.service';
import { TextStorageService } from '@web/app/token-analyzer/services/store-text.service';
import { ExportImportService } from '@web/app/token-analyzer/services/export-import.service';
import { calculateFilterableSets } from '@web/app/token-analyzer/store/token-analysis.helper';
import { TokenAnalysisState, TokenAnalysisActions } from '@web/app/token-analyzer/store/token-analysis.type';

// Create initial state structure
const createInitialState = (): TokenAnalysisState => ({
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

export const useTokenAnalysisStore = create<TokenAnalysisState & TokenAnalysisActions>((set, get) => ({
  ...createInitialState(),
  setText: (text: string) => {
    set({ inputText: text });
    const analysis = analyzeText(text);
    get().setAnalysis(analysis);
    TextStorageService.debouncedSave(text);
  },

  setAnalysis: (analysis: TokenAnalysis) => {
    const filterableSets = calculateFilterableSets(analysis.tokensByGroup, get().stopWordsDictionary);

    set({
      rawAnalysis: analysis,
      filters: {
        ...get().filters,
        stopWords: {
          ...get().filters.stopWords,
          filterableSets,
        },
      },
    });
  },

  toggleStopWordsFilter: (groupType: TokenGroupType) => {
    set((state: TokenAnalysisState) => ({
      filters: {
        ...state.filters,
        stopWords: {
          ...state.filters.stopWords,
          enabled: {
            ...state.filters.stopWords.enabled,
            [groupType]: !state.filters.stopWords.enabled[groupType],
          },
        },
      },
    }));
  },

  toggleCustomFilter: (groupType: TokenGroupType, token: string) => {
    // If the token is starred, don't allow filtering it
    if (get().staredTokens[groupType].has(token)) {
      return;
    }

    set((state: TokenAnalysisState) => {
      const currentCustomFilters = state.filters.customFilters[groupType];
      const newCustomFilters = new Set(currentCustomFilters);

      if (newCustomFilters.has(token)) {
        newCustomFilters.delete(token);
      } else {
        newCustomFilters.add(token);
      }

      return {
        filters: {
          ...state.filters,
          customFilters: {
            ...state.filters.customFilters,
            [groupType]: newCustomFilters,
          },
        },
      };
    });

    TokenStorageService.debouncedSave(get());
  },

  toggleStaredToken: (groupType: TokenGroupType, token: string) => {
    set((state: TokenAnalysisState) => {
      const currentStaredTokens = state.staredTokens[groupType];
      const newStaredTokens = new Set(currentStaredTokens);

      if (newStaredTokens.has(token)) {
        newStaredTokens.delete(token);
      } else {
        newStaredTokens.add(token);
      }

      const newState: Partial<TokenAnalysisState> = {
        staredTokens: {
          ...state.staredTokens,
          [groupType]: newStaredTokens,
        },
      };

      // When we star a token, it always removes it from the custom filters
      if (state.filters.customFilters[groupType].has(token)) {
        const newCustomFilters = new Set(state.filters.customFilters[groupType]);
        newCustomFilters.delete(token);

        newState.filters = {
          ...state.filters,
          customFilters: {
            ...state.filters.customFilters,
            [groupType]: newCustomFilters,
          },
        };
      }

      return newState as Partial<TokenAnalysisState>;
    });

    TokenStorageService.debouncedSave(get());
  },

  // Load data from localStorage
  loadData: () => {
    const savedText = TextStorageService.load() || '';
    const tokenData = TokenStorageService.load();

    if (tokenData) {
      const { customFilters, staredTokens } = tokenData;

      set((state: TokenAnalysisState) => ({
        inputText: savedText,
        filters: {
          ...state.filters,
          customFilters,
        },
        staredTokens,
      }));
    } else {
      set({ inputText: savedText });
    }

    // Run analysis if we have text
    if (savedText) {
      const analysis = analyzeText(savedText);
      get().setAnalysis(analysis);
    }
  },

  exportData: () => {
    ExportImportService.downloadAsJson(get());
  },

  importData: async (file: File) => {
    const importResult = await ExportImportService.importFromFile(file);

    if (importResult) {
      const { inputText, customFilters, staredTokens } = importResult;

      set((state: TokenAnalysisState) => ({
        inputText,
        filters: {
          ...state.filters,
          customFilters,
        },
        staredTokens,
      }));

      const analysis = analyzeText(inputText);
      get().setAnalysis(analysis);

      TextStorageService.immediateSave(inputText);
      TokenStorageService.immediateSave(get());
    }
  },
}));
