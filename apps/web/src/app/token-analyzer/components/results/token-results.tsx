import { Grid, Text } from '@mantine/core';
import { TokenTable, TokenGroupConfig } from './token-table';
import { useRawAnalysis } from '@web/app/token-analyzer/store/token-analysis-store.hooks';
import { TokenGroupType } from '@web/app/token-analyzer/services';

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
  const rawAnalysis = useRawAnalysis();

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
          />
        </Grid.Col>
      ))}
    </Grid>
  );
}
