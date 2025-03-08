import { TokenGroupType, TokenEntity } from './token-analysis.types';
import { TokenStorageData } from './store-token.service';
import { TokenAnalysisState } from '@web/app/token-analyzer/store/token-analysis-store.types';
import { saveAs } from 'file-saver';
/**
 * Interface defining the structure of the exported JSON data
 */
export interface ExportedTokenData {
  inputText: string;
  staredTokenEntities: Record<TokenGroupType, TokenEntity[]>;
  customFilters: Record<TokenGroupType, string[]>;
}

/**
 * Represents the merged result of importing token data
 */
export interface ImportResult extends TokenStorageData {
  inputText: string;
  staredTokenEntities: Record<TokenGroupType, TokenEntity[]>;
}

/**
 * Formats the token analysis state into a structure suitable for export
 */
function formatTokenData(state: TokenAnalysisState): ExportedTokenData | null {
  try {
    if (!state.rawAnalysis) {
      console.error('Cannot export data: No analysis results available');
      return null;
    }

    const staredTokenEntities: Record<TokenGroupType, TokenEntity[]> = {
      single: [],
      double: [],
      triple: [],
    };

    Object.keys(state.staredTokens).forEach((groupType) => {
      const group = groupType as TokenGroupType;
      const staredTokensInGroup = state.staredTokens[group];

      if (staredTokensInGroup.size > 0 && state.rawAnalysis?.tokensByGroup[group]) {
        // Find each starred token's full entity data
        staredTokenEntities[group] = state.rawAnalysis.tokensByGroup[group].filter((entity: TokenEntity) =>
          staredTokensInGroup.has(entity.token),
        );
      }
    });

    const exportData: ExportedTokenData = {
      inputText: state.inputText,
      staredTokenEntities,
      customFilters: Object.fromEntries(
        Object.entries(state.filters.customFilters).map(([key, set]) => [key, Array.from(set as Set<string>)]),
      ) as Record<TokenGroupType, string[]>,
    };

    return exportData;
  } catch (error) {
    console.error('Failed to format data for export:', error);
    return null;
  }
}

/**
 * Service for exporting and importing token analysis data
 */
export const ExportImportService = {
  /**
   * Generates a downloadable JSON file from the current state
   */
  downloadAsJson: (state: TokenAnalysisState): boolean => {
    const exportData = formatTokenData(state);

    if (!exportData) {
      return false;
    }

    try {
      const jsonString = JSON.stringify(exportData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });

      // Use FileSaver.js to trigger download
      saveAs(blob, `token-analysis-export-${new Date().toISOString().slice(0, 10)}.json`);

      return true;
    } catch (error) {
      console.error('Failed to download export file:', error);
      return false;
    }
  },

  /**
   * Imports data from a JSON string
   */
  importFromJson: (jsonString: string): ImportResult | null => {
    try {
      const parsed = JSON.parse(jsonString) as ExportedTokenData;

      const customFilters: Record<TokenGroupType, Set<string>> = {} as Record<TokenGroupType, Set<string>>;
      const staredTokens: Record<TokenGroupType, Set<string>> = {} as Record<TokenGroupType, Set<string>>;

      // Convert arrays to sets for custom filters
      (Object.keys(parsed.customFilters) as TokenGroupType[]).forEach((key) => {
        customFilters[key] = new Set(parsed.customFilters[key]);
      });

      // Extract just the token strings from staredTokenEntities for the staredTokens sets
      (Object.keys(parsed.staredTokenEntities) as TokenGroupType[]).forEach((key) => {
        staredTokens[key] = new Set(parsed.staredTokenEntities[key].map((entity: TokenEntity) => entity.token));
      });

      return {
        inputText: parsed.inputText,
        customFilters,
        staredTokens,
        staredTokenEntities: parsed.staredTokenEntities,
      };
    } catch (error) {
      console.error('Failed to parse imported JSON:', error);
      return null;
    }
  },

  /**
   * Imports data from a File object
   */
  importFromFile: async (file: File): Promise<ImportResult | null> => {
    try {
      const text = await file.text();
      return ExportImportService.importFromJson(text);
    } catch (error) {
      console.error('Failed to read import file:', error);
      return null;
    }
  },
};
