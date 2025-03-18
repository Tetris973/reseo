import { Badge, Flex } from '@mantine/core';
import { TokenEntity } from '@web/app/(dashboard)/services/token-analysis.types';

interface TokenBadgesProps {
  tokenTableEntries: TokenEntity[];
  onToggleFilter: (token: string) => void;
  customFilters: Set<string>;
}

export function TokenBadges({ tokenTableEntries, onToggleFilter, customFilters }: TokenBadgesProps) {
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
              color="var(--mantine-color-red-8)"
              style={{ cursor: 'pointer' }}
              onClick={() => onToggleFilter(entry.token)}>
              {entry.token}
            </Badge>
          ),
      )}
    </Flex>
  );
}
