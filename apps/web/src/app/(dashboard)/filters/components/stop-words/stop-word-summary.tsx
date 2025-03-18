'use client';

import { Box, Text, Switch } from '@mantine/core';
import classes from './stop-word-summary.module.css';
import { useFilters, useTokenAnalysisActions } from '@web/app/(dashboard)/store/token-analysis-store.hooks';

export function StopWordSummary() {
  const filters = useFilters();
  const tokenAnalysisActions = useTokenAnalysisActions();

  return (
    <Box className={classes.summaryGrid}>
      <Box className={classes.summaryItem}>
        <Box className={classes.summaryContent}>
          <Text className={classes.summaryTitle}>Single Words</Text>
          <Text className={classes.summaryCount}>{filters.stopWords.filterableSets.single.size} words</Text>
        </Box>
        <Switch
          id="single-stop-words-enabled"
          checked={filters.stopWords.enabled.single}
          onChange={() => tokenAnalysisActions.toggleStopWordsFilter('single')}
        />
      </Box>

      <Box className={classes.summaryItem}>
        <Box className={classes.summaryContent}>
          <Text className={classes.summaryTitle}>Double Words</Text>
          <Text className={classes.summaryCount}>{filters.stopWords.filterableSets.double.size} phrases</Text>
        </Box>
        <Switch
          id="double-stop-words-enabled"
          checked={filters.stopWords.enabled.double}
          onChange={() => tokenAnalysisActions.toggleStopWordsFilter('double')}
        />
      </Box>

      <Box className={classes.summaryItem}>
        <Box className={classes.summaryContent}>
          <Text className={classes.summaryTitle}>Triple Words</Text>
          <Text className={classes.summaryCount}>{filters.stopWords.filterableSets.triple.size} phrases</Text>
        </Box>
        <Switch
          id="triple-stop-words-enabled"
          checked={filters.stopWords.enabled.triple}
          onChange={() => tokenAnalysisActions.toggleStopWordsFilter('triple')}
        />
      </Box>
    </Box>
  );
}
