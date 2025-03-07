'use client';

import { Stack, Paper } from '@mantine/core';
import { DescriptionInput } from './components/DescriptionInput';
import { StopWordsFilter } from './components/filters/stop-words/StopWordsFilter';
import { TokenFilterLists } from './components/filters/token-filters/TokenFilterLists';
import { TokenSummary } from './components/summary/TokenSummary';
import { TokenResults } from './components/results/TokenResults';
import { TokenAnalysisProvider } from './context/tokenAnalysisContext';
import { ExportButton } from './components/ExportButton';

export function TokenAnalyzer() {
  return (
    <TokenAnalysisProvider>
      <Paper
        p="md"
        radius="md"
        withBorder>
        <Stack gap="md">
          <ExportButton />
          <DescriptionInput />
          <StopWordsFilter />
          <TokenFilterLists />
          <TokenSummary />
          <TokenResults />
        </Stack>
      </Paper>
    </TokenAnalysisProvider>
  );
}
