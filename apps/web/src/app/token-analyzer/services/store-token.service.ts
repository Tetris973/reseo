import { TokenAnalysisState } from '@web/app/token-analyzer/store/token-analysis-store.types';
import { TokenGroupType } from '@web/app/token-analyzer/services/token-analysis.types';

const TOKEN_ANALYSIS_DATA_KEY = 'tokenAnalysisData';
const DEBOUNCE_TIME = 3000;

/**
 * Type for serializable token data that will be stored in localStorage
 */
export interface SerializableTokenData {
  customFilters: Record<TokenGroupType, string[]>;
  staredTokens: Record<TokenGroupType, string[]>;
}

/**
 * Type for the token data in memory (using Sets instead of arrays)
 */
export interface TokenStorageData {
  customFilters: Record<TokenGroupType, Set<string>>;
  staredTokens: Record<TokenGroupType, Set<string>>;
}

let saveDebounceTimer: NodeJS.Timeout | null = null;

/**
 * Save token filters and starred tokens to localStorage
 */
const save = (state: TokenAnalysisState): boolean => {
  try {
    // Convert Sets to Arrays for serialization
    const serializable: SerializableTokenData = {
      customFilters: Object.fromEntries(
        Object.entries(state.filters.customFilters).map(([key, set]) => [key, Array.from(set)]),
      ) as Record<TokenGroupType, string[]>,
      staredTokens: Object.fromEntries(
        Object.entries(state.staredTokens).map(([key, set]) => [key, Array.from(set)]),
      ) as Record<TokenGroupType, string[]>,
    };

    localStorage.setItem(TOKEN_ANALYSIS_DATA_KEY, JSON.stringify(serializable));
    return true;
  } catch (error) {
    console.error('Failed to save token data to localStorage:', error);
    return false;
  }
};

/**
 * Service for managing token data storage in localStorage
 */
export const TokenStorageService = {
  /**
   * Debounced version that waits for user inactivity
   * before saving to localStorage
   */
  debouncedSave: (state: TokenAnalysisState): void => {
    if (saveDebounceTimer) {
      clearTimeout(saveDebounceTimer);
    }
    saveDebounceTimer = setTimeout(() => {
      save(state);
      saveDebounceTimer = null;
    }, DEBOUNCE_TIME);
  },

  /**
   * Immediately save token data, canceling any pending debounced save
   */
  immediateSave: (state: TokenAnalysisState): boolean => {
    if (saveDebounceTimer) {
      clearTimeout(saveDebounceTimer);
      saveDebounceTimer = null;
    }
    return save(state);
  },

  /**
   * Load token filters and starred tokens from localStorage
   */
  load: (): TokenStorageData | null => {
    try {
      const storedData = localStorage.getItem(TOKEN_ANALYSIS_DATA_KEY);

      if (!storedData) {
        return null;
      }

      const parsed = JSON.parse(storedData) as SerializableTokenData;

      // Convert Arrays back to Sets
      const result: TokenStorageData = {
        customFilters: {} as Record<TokenGroupType, Set<string>>,
        staredTokens: {} as Record<TokenGroupType, Set<string>>,
      };

      // Process custom filters
      (Object.keys(parsed.customFilters) as TokenGroupType[]).forEach((key) => {
        result.customFilters[key] = new Set(parsed.customFilters[key]);
      });

      // Process starred tokens
      (Object.keys(parsed.staredTokens) as TokenGroupType[]).forEach((key) => {
        result.staredTokens[key] = new Set(parsed.staredTokens[key]);
      });

      return result;
    } catch (error) {
      console.error('Failed to load token data from localStorage:', error);
      return null;
    }
  },

  /**
   * Clear all stored token data
   */
  clear: (): boolean => {
    try {
      localStorage.removeItem(TOKEN_ANALYSIS_DATA_KEY);
      return true;
    } catch (error) {
      console.error('Failed to clear token data from localStorage:', error);
      return false;
    }
  },
};
