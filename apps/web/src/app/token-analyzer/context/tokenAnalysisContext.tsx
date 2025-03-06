'use client';

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { TokenGroupType, analyzeText } from '@web/app/token-analyzer/services';
import { TokenAnalysisContextType } from './token-analysis.type';
import { tokenAnalysisReducer, createInitialState } from './token-analysis.reducer';

const TokenAnalysisContext = createContext<TokenAnalysisContextType | undefined>(undefined);

export function TokenAnalysisProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(tokenAnalysisReducer, createInitialState());

  // Load token data and text from local storage on mount
  useEffect(() => {
    dispatch({ type: 'LOAD_TOKEN_DATA' });
    dispatch({ type: 'LOAD_TEXT' });
  }, []);

  // Run analysis when text changes
  useEffect(() => {
    if (state.inputText) {
      const analysis = analyzeText(state.inputText);
      dispatch({ type: 'SET_ANALYSIS', payload: analysis });
    }
  }, [state.inputText]);

  // API functions
  const setText = (text: string) => {
    dispatch({ type: 'SET_TEXT', payload: text });
  };

  const toggleStopWordsFilter = (groupType: TokenGroupType) => {
    dispatch({
      type: 'TOGGLE_STOPWORDS_FILTER',
      payload: { groupType },
    });
  };

  const toggleCustomFilter = (groupType: TokenGroupType, token: string) => {
    dispatch({
      type: 'TOGGLE_CUSTOM_FILTER',
      payload: { groupType, token },
    });
  };

  const toggleStaredToken = (groupType: TokenGroupType, token: string) => {
    dispatch({
      type: 'TOGGLE_STARRED_TOKEN',
      payload: { groupType, token },
    });
  };

  const contextValue: TokenAnalysisContextType = {
    state,
    setText,
    toggleStopWordsFilter,
    toggleCustomFilter,
    toggleStaredToken,
  };

  return <TokenAnalysisContext.Provider value={contextValue}>{children}</TokenAnalysisContext.Provider>;
}

// Custom hook for using the context
export function useTokenAnalysis() {
  const context = useContext(TokenAnalysisContext);
  if (context === undefined) {
    throw new Error('useTokenAnalysis must be used within a TokenAnalysisProvider');
  }
  return context;
}
