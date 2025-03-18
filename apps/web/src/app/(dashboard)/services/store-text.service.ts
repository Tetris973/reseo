const TEXT_DATA_KEY = 'tokenAnalysisText';
const DEBOUNCE_TIME = 3000;

let textSaveDebounceTimer: NodeJS.Timeout | null = null;

/**
 * Save text input to localStorage
 */
const save = (text: string): boolean => {
  try {
    localStorage.setItem(TEXT_DATA_KEY, text);
    return true;
  } catch (error) {
    console.error('Failed to save text data to localStorage:', error);
    return false;
  }
};

/**
 * Service for managing text data storage in localStorage
 */
export const TextStorageService = {
  /**
   * Debounced version that waits for user inactivity
   * before saving to localStorage
   */
  debouncedSave: (text: string): void => {
    if (textSaveDebounceTimer) {
      clearTimeout(textSaveDebounceTimer);
    }
    textSaveDebounceTimer = setTimeout(() => {
      save(text);
      textSaveDebounceTimer = null;
    }, DEBOUNCE_TIME);
  },

  /**
   * Immediately save text data, canceling any pending debounced save
   */
  immediateSave: (text: string): boolean => {
    if (textSaveDebounceTimer) {
      clearTimeout(textSaveDebounceTimer);
      textSaveDebounceTimer = null;
    }
    return save(text);
  },

  /**
   * Load text data from localStorage
   */
  load: (): string | null => {
    try {
      const storedText = localStorage.getItem(TEXT_DATA_KEY);
      return storedText;
    } catch (error) {
      console.error('Failed to load text data from localStorage:', error);
      return null;
    }
  },

  /**
   * Clear stored text data
   */
  clear: (): boolean => {
    try {
      localStorage.removeItem(TEXT_DATA_KEY);
      return true;
    } catch (error) {
      console.error('Failed to clear text data from localStorage:', error);
      return false;
    }
  },
};
