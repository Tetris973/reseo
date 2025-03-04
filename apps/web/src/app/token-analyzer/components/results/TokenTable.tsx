import { DataTable } from 'mantine-datatable';
import { Paper, Flex, Text, Button, SegmentedControl, Group } from '@mantine/core';
import { useState, useEffect } from 'react';
import { TokenGroupType, TokenEntity } from '@web/app/token-analyzer/services';
import { TokenChip } from './TokenChip';

export interface TokenGroupConfig {
  type: TokenGroupType;
  title: string;
  description: string;
}

export type TokenInteractionMode = 'filter' | 'star';

interface TokenTableProps {
  config: TokenGroupConfig;
  entries: TokenEntity[];
  onToggleFilter: (token: string) => void;
  customFilters: Set<string>;
  stopWordsEnabled: boolean;
  stopWordsFilterable: Set<string>;
  staredTokens: Set<string>;
  onToggleStar: (token: string) => void;
}

const PAGE_SIZE = 20;

export function TokenTable({
  config,
  entries,
  onToggleFilter,
  customFilters,
  stopWordsEnabled,
  stopWordsFilterable,
  staredTokens,
  onToggleStar,
}: TokenTableProps) {
  const [showFilteredTokens, setShowFilteredTokens] = useState(false);
  const [showOnlyStarredTokens, setShowOnlyStarredTokens] = useState(false);
  const [page, setPage] = useState(1);
  const [interactionMode, setInteractionMode] = useState<TokenInteractionMode>('filter');

  useEffect(() => {
    setPage(1);
  }, [showFilteredTokens, showOnlyStarredTokens]);

  const baseEntries = entries.filter(
    (entry) =>
      // Always filter out stop words
      // stopsWordsFilterable set is always in lowercase
      !(stopWordsEnabled && stopWordsFilterable.has(entry.token.toLowerCase())) &&
      // Show custom filtered tokens only when showFilteredTokens is true
      // customFilters is never normalized, so we need to compare the original token
      (showFilteredTokens || !customFilters.has(entry.token)) &&
      // Show only starred tokens when showOnlyStarredTokens is true
      (!showOnlyStarredTokens || staredTokens.has(entry.token)),
  );

  const paginatedEntries = baseEntries.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleRowClick = ({ record }: { record: TokenEntity }) => {
    if (interactionMode === 'filter') {
      onToggleFilter(record.token);
    } else if (interactionMode === 'star') {
      onToggleStar(record.token);
    }
  };

  return (
    <Paper
      p="xs"
      withBorder>
      <Flex
        justify="space-between"
        align="center"
        mb="xs">
        <div>
          <Text
            size="sm"
            fw={500}>
            {config.title}
          </Text>
          <Text
            size="xs"
            c="dimmed">
            {config.description}
          </Text>
        </div>
        <Flex gap="xs">
          <Group>
            <SegmentedControl
              size="xs"
              value={interactionMode}
              onChange={(value) => setInteractionMode(value as TokenInteractionMode)}
              data={[
                { label: 'Filter', value: 'filter' },
                { label: 'Star', value: 'star' },
              ]}
            />
          </Group>
          <Button
            variant={showFilteredTokens ? 'filled' : 'outline'}
            color={showFilteredTokens ? 'blue.8' : 'gray'}
            size="xs"
            onClick={() => setShowFilteredTokens(!showFilteredTokens)}>
            {showFilteredTokens ? 'Hide Filtered' : 'Show Filtered'}
          </Button>
          <Button
            variant={showOnlyStarredTokens ? 'filled' : 'outline'}
            color={showOnlyStarredTokens ? 'blue.8' : 'gray'}
            size="xs"
            onClick={() => setShowOnlyStarredTokens(!showOnlyStarredTokens)}>
            {showOnlyStarredTokens ? 'Only Starred' : 'All Tokens'}
          </Button>
        </Flex>
      </Flex>
      <DataTable
        withTableBorder
        withColumnBorders
        highlightOnHover
        idAccessor="token"
        columns={[
          {
            accessor: 'token',
            title: 'Token',
            render: (record) => {
              return (
                <TokenChip
                  token={record.token}
                  isStared={staredTokens.has(record.token)}
                  isFiltered={customFilters.has(record.token)}
                />
              );
            },
          },
          {
            accessor: 'count',
            title: 'Count',
            textAlign: 'right',
          },
          {
            accessor: 'density',
            title: 'Density',
            textAlign: 'right',
            render: (record) => `${record.density.toFixed(2)}%`,
          },
        ]}
        onRowClick={handleRowClick}
        records={paginatedEntries}
        totalRecords={baseEntries.length}
        recordsPerPage={PAGE_SIZE}
        page={page}
        onPageChange={setPage}
        paginationSize="sm"
        paginationActiveBackgroundColor="blue.8"
        paginationText={({ from, to, totalRecords }) => `Showing ${from} - ${to} of ${totalRecords} tokens`}
        rowStyle={(record) => ({
          cursor: 'pointer',
          opacity: customFilters.has(record.token) ? 0.5 : 1,
        })}
      />
    </Paper>
  );
}
