import { Grid } from '@mantine/core';
import { TokenFilterSection } from './token-filter-section';
import {
  useTokenAnalysisActions,
  useRawAnalysis,
  useFilters,
} from '@web/app/token-analyzer/store/token-analysis-store.hooks';
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
  const tokenAnalysisActions = useTokenAnalysisActions();
  const rawAnalysis = useRawAnalysis();
  const filters = useFilters();
  const toggleCustomFilter = tokenAnalysisActions.toggleCustomFilter;

  return (
    <Grid>
      {TOKEN_FILTER_CONFIGS.map((config) => (
        <Grid.Col
          span={4}
          key={config.type}>
          <TokenFilterSection
            config={config}
            tokenTableEntries={rawAnalysis?.tokensByGroup[config.type] ?? []}
            onToggleFilter={(token) => toggleCustomFilter(config.type, token)}
            customFilters={filters.customFilters[config.type]}
          />
        </Grid.Col>
      ))}
    </Grid>
  );
}
