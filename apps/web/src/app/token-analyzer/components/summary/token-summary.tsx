import { Paper, Text, Group } from '@mantine/core';
import { faListOl } from '@fortawesome/free-solid-svg-icons';
import { StatItem } from './stat-item';
import { useRawAnalysis } from '@web/app/token-analyzer/store/token-analysis-store.hooks';

export function TokenSummary() {
  const analysis = useRawAnalysis();
  const summary = analysis?.summary || {
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
