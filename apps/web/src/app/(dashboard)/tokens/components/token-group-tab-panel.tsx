import { Box, Group, Text, Badge, Button, Tabs } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RecentlyFilteredTokens } from './recently-filtered-tokens';
import { TokenTable } from './token-table';
import classes from './token-group-tab-panel.module.css';
import { TokenGroupType, TokenEntity } from '@web/app/(dashboard)/services';
import {
  useStaredTokens,
  useFilterableSets,
  useStopWordsEnabled,
  useCustomFilters,
} from '@web/app/(dashboard)/store/token-analysis-store.hooks';

interface TokenGroupTabPanelProps {
  type: TokenGroupType;
  label: string;
  showStopWords: boolean;
  showFiltered: boolean;
  showStarredOnly: boolean;
  openRemoveDialog: (group: TokenGroupType) => void;
  navigateToFilters: (group: TokenGroupType) => void;
  tokenEntities: TokenEntity[];
}

export function TokenGroupTabPanel({
  type,
  label,
  openRemoveDialog,
  navigateToFilters,
  showFiltered,
  showStopWords,
  showStarredOnly,
  tokenEntities: entities,
}: TokenGroupTabPanelProps) {
  const staredTokens = useStaredTokens(type);
  const customFilters = useCustomFilters(type);
  const stopWordsEnabled = useStopWordsEnabled(type);
  const stopWordsFilterable = useFilterableSets(type);

  const filteredTokenEntities = entities.filter(
    (entry) =>
      // Always filter out stop words
      // stopsWordsFilterable set is always in lowercase
      !(!showStopWords && stopWordsEnabled && stopWordsFilterable.has(entry.token.toLowerCase())) &&
      // Show custom filtered tokens only when showFilteredTokens is true
      // customFilters is never normalized, so we need to compare the original token
      (showFiltered || !customFilters.has(entry.token)) &&
      // Show only starred tokens when showOnlyStarredTokens is true
      (!showStarredOnly || staredTokens.has(entry.token)),
  );

  return (
    <Tabs.Panel
      key={type}
      value={type}>
      <Box className={classes.tabPanel}>
        <RecentlyFilteredTokens
          group={type}
          onNavigateToFilters={navigateToFilters}
        />
      </Box>
      <Group className={classes.headerGroup}>
        <Group className={classes.tabGroup}>
          <Text
            size="sm"
            fw={500}>
            {label}
          </Text>
          {staredTokens.size > 0 && (
            <Badge
              variant="light"
              color="gray"
              size="sm">
              {staredTokens.size} starred
            </Badge>
          )}
        </Group>
        {staredTokens.size > 0 && (
          <Button
            variant="subtle"
            color="red"
            size="xs"
            onClick={() => openRemoveDialog(type)}
            leftSection={
              <FontAwesomeIcon
                icon="trash-alt"
                size="sm"
              />
            }>
            Remove Starred
          </Button>
        )}
      </Group>
      <TokenTable
        group={type}
        customFilter={customFilters}
        staredTokens={staredTokens}
        stopWordsFilterable={stopWordsFilterable}
        tokenEntities={filteredTokenEntities}
      />
    </Tabs.Panel>
  );
}
