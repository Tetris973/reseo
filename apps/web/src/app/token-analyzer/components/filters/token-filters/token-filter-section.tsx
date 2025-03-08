import { Paper, Stack, Text, ActionIcon, Flex, Collapse, Tooltip } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faCheck, faChevronDown, faChevronUp, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TokenBadges } from './token-badges';
import { TokenFilterData } from './token-filter-lists';
import { useState } from 'react';
import { TokenEntity } from '@web/app/token-analyzer/services';
import { useTokenAnalysisActions } from '@web/app/token-analyzer/store/token-analysis-store.hooks';
import { modals } from '@mantine/modals';

interface TokenFilterSectionProps {
  config: TokenFilterData;
  tokenTableEntries: TokenEntity[];
  onToggleFilter: (token: string) => void;
  customFilters: Set<string>;
}

export function TokenFilterSection({
  config,
  tokenTableEntries,
  onToggleFilter,
  customFilters,
}: TokenFilterSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const tokenAnalysisActions = useTokenAnalysisActions();

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClearCustomFilters = () => {
    modals.openConfirmModal({
      title: `Clear ${config.label} filters`,
      children: `Are you sure you want to clear all custom filters for ${config.label.toLowerCase()}? This action cannot be undone.`,
      labels: { confirm: 'Clear filters', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => tokenAnalysisActions.clearCustomFilters(config.type),
    });
  };

  return (
    <Paper
      p="sm"
      withBorder>
      <Stack gap="xs">
        <Flex
          justify="space-between"
          align="center">
          <div>
            <Flex
              align="center"
              gap="xs">
              <Text
                size="sm"
                fw={500}>
                {config.label}
              </Text>
              <ActionIcon
                size="sm"
                variant="subtle"
                onClick={handleToggleExpand}
                aria-label={isExpanded ? 'Collapse' : 'Expand'}>
                <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} />
              </ActionIcon>
            </Flex>
            <Text
              size="xs"
              c="dimmed">
              {config.description}
            </Text>
          </div>
          <Flex gap="xs">
            <Tooltip label={`Edit ${config.label.toLowerCase()}`}>
              <ActionIcon
                variant="subtle"
                color={isEditing ? 'green' : 'blue'}
                onClick={handleToggleEdit}>
                <FontAwesomeIcon icon={isEditing ? faCheck : faPencil} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label={`Clear all ${config.label.toLowerCase()}`}>
              <ActionIcon
                color="red"
                variant="subtle"
                onClick={handleClearCustomFilters}
                aria-label={`Clear ${config.label} filters`}>
                <FontAwesomeIcon icon={faTrash} />
              </ActionIcon>
            </Tooltip>
          </Flex>
        </Flex>

        <Collapse in={isExpanded}>
          <Paper
            h={200}
            style={{ overflow: 'auto' }}>
            <TokenBadges
              tokenTableEntries={tokenTableEntries}
              isEditing={isEditing}
              onToggleFilter={onToggleFilter}
              customFilters={customFilters}
            />
          </Paper>
        </Collapse>
      </Stack>
    </Paper>
  );
}
