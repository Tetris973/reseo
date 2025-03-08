import { TokenGroupType, TokenAnalysis, analyzeText } from '@web/app/token-analyzer/services';
import { TokenStorageService } from '@web/app/token-analyzer/services/store-token.service';
import { TextStorageService } from '@web/app/token-analyzer/services/store-text.service';
import { ExportImportService } from '@web/app/token-analyzer/services/export-import.service';
import { calculateFilterableSets } from './token-analysis.helper';
import { TokenAnalysisActions, TokenAnalysisStore, TokenAnalysisState } from './token-analysis-store.types';
import { createInitialState } from './token-analysis-store.state';
import { StoreApi } from 'zustand';

// Type for the get and set functions passed by Zustand
type TokenAnalysisActionsContext = {
  get: StoreApi<TokenAnalysisStore>['getState'];
  set: StoreApi<TokenAnalysisStore>['setState'];
};

/**
 * Creates the actions for the token analysis store
 */
export const createActions = ({ get, set }: TokenAnalysisActionsContext): TokenAnalysisActions => ({
  setText: (text: string) => {
    set({ inputText: text });
    const analysis = analyzeText(text);
    get().actions.setAnalysis(analysis);
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
    set((state) => ({
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

    set((state) => {
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

    const { actions, ...stateToSave } = get();
    TokenStorageService.debouncedSave(stateToSave);
  },

  toggleStaredToken: (groupType: TokenGroupType, token: string) => {
    set((state) => {
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

    const { actions, ...stateToSave } = get();
    TokenStorageService.debouncedSave(stateToSave);
  },

  loadData: () => {
    const savedText = TextStorageService.load() || '';
    const tokenData = TokenStorageService.load();

    if (tokenData) {
      const { customFilters, staredTokens } = tokenData;

      set((state) => ({
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
      get().actions.setAnalysis(analysis);
    }
  },

  exportData: () => {
    const { actions, ...stateToExport } = get();
    ExportImportService.downloadAsJson(stateToExport);
  },

  importData: async (file: File) => {
    const importResult = await ExportImportService.importFromFile(file);

    if (importResult) {
      const { inputText, customFilters, staredTokens } = importResult;

      set((state) => ({
        inputText,
        filters: {
          ...state.filters,
          customFilters,
        },
        staredTokens,
      }));

      const analysis = analyzeText(inputText);
      get().actions.setAnalysis(analysis);

      TextStorageService.immediateSave(inputText);
      const { actions, ...stateToSave } = get();
      TokenStorageService.immediateSave(stateToSave);
    }
  },

  clearAll: () => {
    set(createInitialState());
    TextStorageService.clear();
    TokenStorageService.clear();
  },

  clearCustomFilters: (groupType: TokenGroupType) => {
    set((state) => ({
      filters: {
        ...state.filters,
        customFilters: {
          ...state.filters.customFilters,
          [groupType]: new Set<string>(),
        },
      },
    }));

    // Save the updated state
    const { actions, ...stateToSave } = get();
    TokenStorageService.immediateSave(stateToSave);
  },

  clearStaredTokens: (groupType: TokenGroupType) => {
    set((state) => ({
      staredTokens: {
        ...state.staredTokens,
        [groupType]: new Set<string>(),
      },
    }));

    // Save the updated state
    const { actions, ...stateToSave } = get();
    TokenStorageService.immediateSave(stateToSave);
  },
});
