import { TokenAnalysisState } from '@web/app/token-analyzer/context/token-analysis.type';
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

/**
 * Save token filters and starred tokens to localStorage
 */
function saveTokenData(state: TokenAnalysisState) {
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
}

let saveDebounceTimer: NodeJS.Timeout | null = null;

/**
 * Debounced version of saveTokenData that waits for user inactivity
 * before saving to localStorage
 */
export function debouncedSaveTokenData(state: TokenAnalysisState): void {
  if (saveDebounceTimer) {
    clearTimeout(saveDebounceTimer);
  }
  saveDebounceTimer = setTimeout(() => {
    saveTokenData(state);
    saveDebounceTimer = null;
  }, DEBOUNCE_TIME);
}

/**
 * Immediately save token data, canceling any pending debounced save
 */
export function immediateSaveTokenData(state: TokenAnalysisState): boolean {
  if (saveDebounceTimer) {
    clearTimeout(saveDebounceTimer);
    saveDebounceTimer = null;
  }
  return saveTokenData(state);
}

/**
 * Load token filters and starred tokens from localStorage
 */
export function loadTokenData(): TokenStorageData | null {
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
}

/**
 * Clear all stored token data
 */
export function clearTokenData(): boolean {
  try {
    localStorage.removeItem(TOKEN_ANALYSIS_DATA_KEY);
    return true;
  } catch (error) {
    console.error('Failed to clear token data from localStorage:', error);
    return false;
  }
}
