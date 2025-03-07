'use client';

import { Stack, Paper } from '@mantine/core';
import { DescriptionInput } from './components/description-input';
import { StopWordsFilter } from './components/filters/stop-words/stop-words-filter';
import { TokenFilterLists } from './components/filters/token-filters/token-filter-lists';
import { TokenSummary } from './components/summary/token-summary';
import { TokenResults } from './components/results/token-results';
import { GlobalButtons } from './components/global-buttons/global-buttons';
import { useTokenAnalysisStore } from './store/token-analysis.store';
import { useEffect } from 'react';

export function TokenAnalyzer() {
  const loadData = useTokenAnalysisStore((state) => state.loadData);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <Paper
      p="md"
      radius="md"
      withBorder>
      <Stack gap="md">
        <GlobalButtons />
        <DescriptionInput />
        <StopWordsFilter />
        <TokenFilterLists />
        <TokenSummary />
        <TokenResults />
      </Stack>
    </Paper>
  );
}
