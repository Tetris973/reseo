import { DataTable } from 'mantine-datatable';
import { Text, Group, Button, Box, Badge, Tooltip, Flex, Paper } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { TokenEntity, TokenGroupType } from '@web/app/(dashboard)/services';
import { useTokenAnalysisActions } from '@web/app/(dashboard)/store/token-analysis-store.hooks';
import classes from './token-table.module.css';

interface TokenTableProps {
  group: TokenGroupType;
  tokenEntities: TokenEntity[];
  customFilter: Set<string>;
  staredTokens: Set<string>;
  stopWordsFilterable: Set<string>;
}

const PAGE_SIZE = 20;

export function TokenTable({ group, customFilter, staredTokens, stopWordsFilterable, tokenEntities }: TokenTableProps) {
  const [page, setPage] = useState(1);
  const tokenAnalysisActions = useTokenAnalysisActions();

  const paginatedEntries = tokenEntities.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (tokenEntities.length === 0) {
    return (
      <Paper
        p="md"
        withBorder
        ta="center"
        className={classes.emptyState}>
        <Text fw={500}>No tokens match the current filter criteria.</Text>
        <Text
          size="sm"
          c="dimmed"
          className={classes.emptyText}>
          Try adjusting the filter settings above.
        </Text>
      </Paper>
    );
  }

  const renderTokenCell = (record: TokenEntity) => {
    const hasVariations = Object.keys(record.variations).length > 0;
    const isStopWord = stopWordsFilterable.has(record.token.toLowerCase());
    const isFiltered = customFilter.has(record.token);

    const tokenText = (
      <Text
        span
        className={isStopWord || isFiltered ? classes.stopWord : undefined}>
        {record.token}
      </Text>
    );

    return (
      <Flex
        gap="xs"
        align="center">
        {isStopWord && (
          <Badge
            variant="outline"
            size="xs">
            Stop
          </Badge>
        )}
        {hasVariations ? (
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
                  <Flex
                    key={variant}
                    className={classes.variationFlex}>
                    <Text size="xs">{variant}</Text>
                    <Text
                      size="xs"
                      fw={500}>
                      {count}
                    </Text>
                  </Flex>
                ))}
              </Box>
            }
            position="top"
            withArrow>
            {tokenText}
          </Tooltip>
        ) : (
          tokenText
        )}
      </Flex>
    );
  };

  const renderActionsCell = (record: TokenEntity) => {
    const isStarred = staredTokens.has(record.token);
    const isFiltered = customFilter.has(record.token);
    return (
      <Group gap="xs">
        <Button
          variant="subtle"
          size="compact-sm"
          onClick={(e) => {
            e.stopPropagation();
            tokenAnalysisActions.toggleCustomFilter(group, record.token);
          }}
          className={classes.actionButton}
          aria-label={isFiltered ? 'Remove filter' : 'Add filter'}>
          <FontAwesomeIcon
            icon="filter"
            className={isFiltered ? classes.filterIcon : undefined}
          />
        </Button>
        <Button
          variant="subtle"
          size="compact-sm"
          onClick={(e) => {
            e.stopPropagation();
            tokenAnalysisActions.toggleStaredToken(group, record.token);
          }}
          className={classes.actionButton}
          aria-label={isStarred ? 'Unstar token' : 'Star token'}>
          <FontAwesomeIcon
            icon="star"
            className={isStarred ? classes.starIcon : undefined}
          />
        </Button>
      </Group>
    );
  };

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
          width: 120,
          render: renderActionsCell,
        },
        {
          accessor: 'token',
          title: 'Token',
          render: renderTokenCell,
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
      records={paginatedEntries}
      totalRecords={tokenEntities.length}
      recordsPerPage={PAGE_SIZE}
      page={page}
      onPageChange={setPage}
      paginationSize="sm"
      paginationText={({ from, to, totalRecords }) => `Showing ${from} - ${to} of ${totalRecords} tokens`}
    />
  );
}
