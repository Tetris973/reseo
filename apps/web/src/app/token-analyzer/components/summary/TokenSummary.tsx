import { Paper, Text, Group } from '@mantine/core';
import { faListOl } from '@fortawesome/free-solid-svg-icons';
import { StatItem } from './StatItem';
import { useTokenAnalysis } from '@web/app/token-analyzer/context/tokenAnalysisContext';

export function TokenSummary() {
  const { state } = useTokenAnalysis();
  const summary = state.rawAnalysis?.summary || {
    rawTokenCount: 0,
    rawUniqueTokenCount: 0,
  };

  return (
    <Paper
      withBorder
      p="md"
      radius="md">
      <Text
        size="lg"
        fw={500}
        mb="md">
        Analysis Summary
      </Text>
      <Group grow>
        <StatItem
          icon={faListOl}
          label="Raw Token Count"
          mainValue={summary.rawTokenCount.toString()}
          subValue={`${summary.rawUniqueTokenCount} unique`}
        />
      </Group>
    </Paper>
  );
}
