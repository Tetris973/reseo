import { Badge, Flex } from '@mantine/core';
import { TokenEntity } from '@web/app/token-analyzer/services';

interface TokenBadgesProps {
  tokenTableEntries: TokenEntity[];
  isEditing: boolean;
  onToggleFilter: (token: string) => void;
  customFilters: Set<string>;
}

export function TokenBadges({ tokenTableEntries, isEditing, onToggleFilter, customFilters }: TokenBadgesProps) {
  return (
    <Flex
      wrap="wrap"
      gap="xs"
      p="xs">
      {tokenTableEntries.map(
        (entry) =>
          customFilters.has(entry.token) && (
            <Badge
              key={entry.token}
              variant="dot"
              color={isEditing ? 'red' : 'gray'}
              style={{ cursor: isEditing ? 'pointer' : 'default' }}
              onClick={() => isEditing && onToggleFilter(entry.token)}>
              {entry.token}
            </Badge>
          ),
      )}
    </Flex>
  );
}
