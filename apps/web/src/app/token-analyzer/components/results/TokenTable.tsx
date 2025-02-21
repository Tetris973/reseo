import { DataTable } from 'mantine-datatable';
import { Paper, Flex, Text, Button } from '@mantine/core';
import { useState, useEffect } from 'react';
import { TokenGroupType, TokenEntity } from '@web/app/token-analyzer/services';

export interface TokenGroupConfig {
  type: TokenGroupType;
  title: string;
  description: string;
}

interface TokenTableProps {
  config: TokenGroupConfig;
  entries: TokenEntity[];
  onToggleFilter: (token: string) => void;
  customFilters: Set<string>;
  stopWordsEnabled: boolean;
  stopWordsFilterable: Set<string>;
}

const PAGE_SIZE = 20;

export function TokenTable({
  config,
  entries,
  onToggleFilter,
  customFilters,
  stopWordsEnabled,
  stopWordsFilterable,
}: TokenTableProps) {
  const [showFilteredTokens, setShowFilteredTokens] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [showFilteredTokens]);

  const baseEntries = entries.filter(
    (entry) =>
      // Always filter out stop words
      // stopsWordsFilterable set is always in lowercase
      !(stopWordsEnabled && stopWordsFilterable.has(entry.token.toLowerCase())) &&
      // Show custom filtered tokens only when showFilteredTokens is true
      // customFilters is never normalized, so we need to compare the original token
      (showFilteredTokens || !customFilters.has(entry.token)),
  );

  const paginatedEntries = baseEntries.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleRowClick = ({ record }: { record: TokenEntity }) => {
    onToggleFilter(record.token);
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
          <Button
            variant={showFilteredTokens ? 'filled' : 'outline'}
            color={showFilteredTokens ? 'blue.8' : 'gray'}
            size="xs"
            onClick={() => setShowFilteredTokens(!showFilteredTokens)}>
            {showFilteredTokens ? 'Hide Filtered' : 'Show Filtered'}
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
              const isCustomFiltered = customFilters.has(record.token);
              return (
                <Text
                  component="span"
                  style={{
                    textDecoration: isCustomFiltered ? 'line-through' : 'none',
                    color: isCustomFiltered ? 'grey' : 'inherit',
                  }}>
                  {record.token}
                </Text>
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
