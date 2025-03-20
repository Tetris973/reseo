'use client';

import { useRouter } from 'next/navigation';
import { Box, Text, Group, Stack, Badge, Button, Tabs, Tooltip, Paper } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DataTable } from 'mantine-datatable';
import { CustomFilterSummary } from './custom-filter-summary';
import classes from './custom-filters-panel.module.css';
import { TokenGroupType, TokenEntity } from '@web/app/(dashboard)/services';
import {
  useFilters,
  useTokenAnalysisActions,
  useRawAnalysis,
} from '@web/app/(dashboard)/store/token-analysis-store.hooks';
import { modals } from '@mantine/modals';
import { useActiveGroup, useNavigationActions } from '@web/app/(dashboard)/store/navigation-store';
import { useState, useEffect } from 'react';

const PAGE_SIZE = 20;

interface TabConfig {
  type: TokenGroupType;
  label: string;
}

// Tab configuration
const TAB_CONFIGS: TabConfig[] = [
  { type: 'single', label: 'Single Words' },
  { type: 'double', label: 'Double Words' },
  { type: 'triple', label: 'Triple Words' },
];

// Custom hook for navigation logic
function useCustomFiltersNavigation() {
  const router = useRouter();
  const activeGroup = useActiveGroup();
  const { setActiveGroup } = useNavigationActions();

  // Set default tab on mount if none is selected
  useEffect(() => {
    if (!activeGroup) {
      const defaultGroup: TokenGroupType = 'single';
      setActiveGroup(defaultGroup);
      router.push(`/filters?tab=custom-filters&group=${defaultGroup}`, { scroll: false });
    }
  }, [activeGroup, setActiveGroup, router]);

  const handleTabChange = (value: string | null) => {
    if (!value) return;
    const tabValue = value as TokenGroupType;
    setActiveGroup(tabValue);
    router.push(`/filters?tab=custom-filters&group=${tabValue}`, { scroll: false });
  };

  return { activeGroup, handleTabChange };
}

// Empty state component
function EmptyState() {
  return (
    <Paper
      p="md"
      withBorder
      ta="center"
      className={classes.emptyState}>
      <Text fw={500}>No custom filters have been added yet.</Text>
      <Text
        size="sm"
        c="dimmed"
        className={classes.emptyText}>
        Add filters from the Tokens panel to exclude specific tokens from your analysis.
      </Text>
    </Paper>
  );
}

// Token cell component with variations tooltip
function TokenCell({ record }: { record: TokenEntity }) {
  const hasVariations = Object.keys(record.variations).length > 0;

  if (!hasVariations) {
    return <Text>{record.token}</Text>;
  }

  return (
    <Text>
      <Tooltip
        label={
          <Box className={classes.tooltipContent}>
            <Text
              size="xs"
              fw={600}
              mb={4}>
              Variations:
            </Text>
            {Object.entries(record.variations).map(([variant, count]) => (
              <Group
                key={variant}
                justify="space-between"
                className={classes.variationGroup}>
                <Text size="xs">{variant}</Text>
                <Text
                  size="xs"
                  fw={500}>
                  {count}
                </Text>
              </Group>
            ))}
          </Box>
        }
        position="top"
        withArrow>
        <span>{record.token}</span>
      </Tooltip>
    </Text>
  );
}

// Action buttons component
function ActionButtons({
  type,
  isDisabled,
  onClear,
}: {
  type: TokenGroupType;
  isDisabled: boolean;
  onClear: (type: TokenGroupType, label: string) => void;
}) {
  const label = TAB_CONFIGS.find((config) => config.type === type)?.label || '';

  return (
    <Box className={classes.actionsContainer}>
      <Button
        variant="subtle"
        color="red"
        size="xs"
        leftSection={
          <FontAwesomeIcon
            icon="trash-alt"
            size="sm"
          />
        }
        disabled={isDisabled}
        onClick={() => onClear(type, label)}>
        Remove All
      </Button>
    </Box>
  );
}

// Tab navigation component
function TabNavigation({
  activeGroup,
  onTabChange,
  filterCounts,
  children,
}: {
  activeGroup: TokenGroupType | null;
  onTabChange: (value: string | null) => void;
  filterCounts: Record<TokenGroupType, number>;
  children: React.ReactNode;
}) {
  return (
    <Tabs
      value={activeGroup}
      onChange={onTabChange}>
      <Tabs.List className={classes.tabsList}>
        {TAB_CONFIGS.map((config) => (
          <Tabs.Tab
            key={config.type}
            value={config.type}>
            <Group>
              <Text>{config.label}</Text>
              <Badge
                variant="light"
                className={classes.tabsBadge}>
                {filterCounts[config.type]}
              </Badge>
            </Group>
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {children}
    </Tabs>
  );
}

// Token table component
function TokenTable({
  type,
  tokens,
  page,
  onPageChange,
  onRemoveToken,
}: {
  type: TokenGroupType;
  tokens: TokenEntity[];
  page: number;
  onPageChange: (page: number) => void;
  onRemoveToken: (type: TokenGroupType, token: string) => void;
}) {
  if (tokens.length === 0) {
    return <EmptyState />;
  }

  const paginatedTokens = tokens.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <DataTable
      withTableBorder
      withColumnBorders
      highlightOnHover
      idAccessor="token"
      columns={[
        {
          accessor: 'actions',
          title: 'Actions',
          width: 80,
          textAlign: 'center',
          render: (record) => (
            <Button
              variant="subtle"
              size="compact-md"
              onClick={() => onRemoveToken(type, record.token)}
              className={classes.actionButton}
              aria-label="Remove filter">
              <FontAwesomeIcon
                icon="xmark"
                size="1x"
              />
            </Button>
          ),
        },
        {
          accessor: 'token',
          title: 'Token',
          render: (record) => <TokenCell record={record} />,
        },
        {
          accessor: 'count',
          title: 'Count',
          textAlign: 'right',
          width: 120,
          render: (record) => (
            <Text
              size="sm"
              fw={500}>
              {record.count.toLocaleString()}
            </Text>
          ),
        },
        {
          accessor: 'density',
          title: 'Density',
          textAlign: 'right',
          width: 120,
          render: (record) => <Text size="sm">{record.density.toFixed(2)}%</Text>,
        },
      ]}
      records={paginatedTokens}
      totalRecords={tokens.length}
      recordsPerPage={PAGE_SIZE}
      page={page}
      onPageChange={onPageChange}
      paginationSize="sm"
      paginationActiveBackgroundColor="blue.8"
      paginationText={({ from, to, totalRecords }) => `Showing ${from} - ${to} of ${totalRecords} filtered tokens`}
    />
  );
}

// Tab content component
function TabContent({
  type,
  page,
  onPageChange,
  onRemoveToken,
  onClearFilters,
}: {
  type: TokenGroupType;
  page: number;
  onPageChange: (page: number) => void;
  onRemoveToken: (type: TokenGroupType, token: string) => void;
  onClearFilters: (type: TokenGroupType, label: string) => void;
}) {
  const filters = useFilters();
  const rawAnalysis = useRawAnalysis();

  const filteredTokens = (rawAnalysis?.tokensByGroup[type] || []).filter((token) =>
    filters.customFilters[type].has(token.token),
  );

  const isDisabled = filters.customFilters[type].size === 0;

  return (
    <Stack gap="md">
      <TokenTable
        type={type}
        tokens={filteredTokens}
        page={page}
        onPageChange={onPageChange}
        onRemoveToken={onRemoveToken}
      />
      <ActionButtons
        type={type}
        isDisabled={isDisabled}
        onClear={onClearFilters}
      />
    </Stack>
  );
}

export function CustomFiltersPanel() {
  const filters = useFilters();
  const tokenAnalysisActions = useTokenAnalysisActions();
  const { activeGroup, handleTabChange } = useCustomFiltersNavigation();
  const [page, setPage] = useState(1);

  const handleClearCustomFilters = (type: TokenGroupType, label: string) => {
    modals.openConfirmModal({
      title: `Clear ${label} filters`,
      children: `Are you sure you want to clear all custom filters for ${label.toLowerCase()}? This action cannot be undone.`,
      labels: { confirm: 'Clear filters', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => tokenAnalysisActions.clearCustomFilters(type),
    });
  };

  const filterCounts = {
    single: filters.customFilters.single.size,
    double: filters.customFilters.double.size,
    triple: filters.customFilters.triple.size,
  };

  return (
    <Box className={classes.container}>
      <Group className={classes.header}>
        <Text className={classes.title}>Custom Filters</Text>
      </Group>

      <CustomFilterSummary
        singleCount={filterCounts.single}
        doubleCount={filterCounts.double}
        tripleCount={filterCounts.triple}
      />

      <TabNavigation
        activeGroup={activeGroup}
        onTabChange={handleTabChange}
        filterCounts={filterCounts}>
        {TAB_CONFIGS.map((config) => (
          <Tabs.Panel
            key={config.type}
            value={config.type}>
            <TabContent
              type={config.type}
              page={page}
              onPageChange={setPage}
              onRemoveToken={tokenAnalysisActions.toggleCustomFilter}
              onClearFilters={handleClearCustomFilters}
            />
          </Tabs.Panel>
        ))}
      </TabNavigation>
    </Box>
  );
}
