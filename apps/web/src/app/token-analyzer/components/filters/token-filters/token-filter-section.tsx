import { Paper, Stack, Text, ActionIcon, Flex, Collapse } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faCheck, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { TokenBadges } from './token-badges';
import { TokenFilterData } from './token-filter-lists';
import { useState } from 'react';
import { TokenEntity } from '@web/app/token-analyzer/services';

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

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
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
          <ActionIcon
            color={isEditing ? 'green' : 'blue'}
            onClick={handleToggleEdit}>
            <FontAwesomeIcon icon={isEditing ? faCheck : faPencil} />
          </ActionIcon>
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
