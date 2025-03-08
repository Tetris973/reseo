import { create } from 'zustand';
import { TokenGroupType } from '@web/app/token-analyzer/services';
import { TokenAnalysisStore } from './token-analysis-store.types';
import { createInitialState } from './token-analysis-store.state';
import { createActions } from './token-analysis-store.actions';

const useTokenAnalysisStore = create<TokenAnalysisStore>((set, get) => ({
  ...createInitialState(),
  actions: createActions({ get, set }),
}));

// ALL Actions
export function useTokenAnalysisActions() {
  return useTokenAnalysisStore((state) => state.actions);
}

// ALL State
export function useRawAnalysis() {
  return useTokenAnalysisStore((state) => state.rawAnalysis);
}
export function useInputText() {
  return useTokenAnalysisStore((state) => state.inputText);
}
export function useStopWordsEnabled(groupType: TokenGroupType) {
  return useTokenAnalysisStore((state) => state.filters.stopWords.enabled[groupType]);
}
export function useFilterableSets(groupType: TokenGroupType) {
  return useTokenAnalysisStore((state) => state.filters.stopWords.filterableSets[groupType]);
}
export function useCustomFilters(groupType: TokenGroupType) {
  return useTokenAnalysisStore((state) => state.filters.customFilters[groupType]);
}
export function useStaredTokens(groupType: TokenGroupType) {
  return useTokenAnalysisStore((state) => state.staredTokens[groupType]);
}
export function useStopWordsDictionary() {
  return useTokenAnalysisStore((state) => state.stopWordsDictionary);
}
export function useFilters() {
  return useTokenAnalysisStore((state) => state.filters);
}
