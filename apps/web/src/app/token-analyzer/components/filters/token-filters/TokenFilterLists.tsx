import { Grid } from '@mantine/core';
import { TokenFilterSection } from './TokenFilterSection';
import { useTokenAnalysis } from '@web/app/token-analyzer/context/tokenAnalysisContext';
import { TokenGroupType } from '@web/app/token-analyzer/services';

export interface TokenFilterData {
  type: TokenGroupType;
  label: string;
  description: string;
}

export const TOKEN_FILTER_CONFIGS: TokenFilterData[] = [
  {
    type: 'single',
    label: 'Single Word Filter',
    description: 'Click to remove individual words',
  },
  {
    type: 'double',
    label: 'Double Word Filter',
    description: 'Click to remove word pairs',
  },
  {
    type: 'triple',
    label: 'Triple Word Filter',
    description: 'Click to remove word triplets',
  },
];

export function TokenFilterLists() {
  const { state, toggleCustomFilter } = useTokenAnalysis();

  return (
    <Grid>
      {TOKEN_FILTER_CONFIGS.map((config) => (
        <Grid.Col
          span={4}
          key={config.type}>
          <TokenFilterSection
            config={config}
            tokenTableEntries={state.rawAnalysis?.tokensByGroup[config.type] ?? []}
            onToggleFilter={(token) => toggleCustomFilter(config.type, token)}
            customFilters={state.filters.customFilters[config.type]}
          />
        </Grid.Col>
      ))}
    </Grid>
  );
}
