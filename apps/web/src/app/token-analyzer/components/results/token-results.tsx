import { Grid, Text } from '@mantine/core';
import { TokenTable, TokenGroupConfig } from './token-table';
import { useTokenAnalysisStore } from '@webRoot/src/app/token-analyzer/store/token-analysis.store';
import { TokenGroupType } from '@web/app/token-analyzer/services';
import { useShallow } from 'zustand/react/shallow';

const TOKEN_GROUP_CONFIGS: TokenGroupConfig[] = [
  {
    type: 'single' as TokenGroupType,
    title: 'Single Word Tokens',
    description: 'Most common individual words',
  },
  {
    type: 'double' as TokenGroupType,
    title: 'Two-Word Phrases',
    description: 'Most common consecutive word pairs',
  },
  {
    type: 'triple' as TokenGroupType,
    title: 'Three-Word Phrases',
    description: 'Most common three-word sequences',
  },
];

export function TokenResults() {
  const [rawAnalysis, filters, staredTokens, toggleCustomFilter, toggleStaredToken, clearStaredTokens] =
    useTokenAnalysisStore(
      useShallow((state) => [
        state.rawAnalysis,
        state.filters,
        state.staredTokens,
        state.toggleCustomFilter,
        state.toggleStaredToken,
        state.clearStaredTokens,
      ]),
    );

  if (!rawAnalysis) {
    return (
      <Text
        c="dimmed"
        ta="center"
        py="xl">
        Enter a job description to analyze keywords and phrases
      </Text>
    );
  }

  return (
    <Grid>
      {TOKEN_GROUP_CONFIGS.map((config) => (
        <Grid.Col
          key={config.type}
          span={4}>
          <TokenTable
            config={config}
            entries={rawAnalysis.tokensByGroup[config.type]}
            onToggleFilter={(token) => toggleCustomFilter(config.type, token)}
            customFilters={filters.customFilters[config.type]}
            stopWordsEnabled={filters.stopWords.enabled[config.type]}
            stopWordsFilterable={filters.stopWords.filterableSets[config.type]}
            staredTokens={staredTokens[config.type]}
            onToggleStar={(token: string) => toggleStaredToken(config.type, token)}
            clearStaredTokens={() => clearStaredTokens(config.type)}
          />
        </Grid.Col>
      ))}
    </Grid>
  );
}
