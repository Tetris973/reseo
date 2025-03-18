import { Card, Text, Group, Badge, Button } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TokenGroupType } from '@web/app/(dashboard)/services';
import classes from './recently-filtered-tokens.module.css';
import { useTokenAnalysisActions, useCustomFilters } from '@web/app/(dashboard)/store/token-analysis-store.hooks';

interface RecentlyFilteredTokensProps {
  group: TokenGroupType;
  onNavigateToFilters: (group: TokenGroupType) => void;
}

export function RecentlyFilteredTokens({ group, onNavigateToFilters }: RecentlyFilteredTokensProps) {
  const tokenAnalysisActions = useTokenAnalysisActions();
  const customFilters = useCustomFilters(group);

  const handleUnfilter = (token: string) => {
    tokenAnalysisActions.toggleCustomFilter(group, token);
  };

  return (
    <Card
      withBorder
      shadow="sm"
      className={classes.card}>
      <Card.Section className={classes.cardSection}>
        <Group className={classes.header}>
          <Group className={classes.headerGroup}>
            <FontAwesomeIcon
              icon="filter"
              size="sm"
            />
            <Text
              size="sm"
              c="dimmed">
              Recently Filtered Tokens
            </Text>
            <Badge
              variant="outline"
              size="sm">
              {customFilters.size}
            </Badge>
          </Group>
          <Button
            variant="subtle"
            size="compact-sm"
            rightSection={
              <FontAwesomeIcon
                icon="chevron-right"
                size="xs"
              />
            }
            onClick={() => onNavigateToFilters(group)}>
            View All Filters
          </Button>
        </Group>

        <Group className={classes.tokensGroup}>
          {Array.from(customFilters)
            .reverse()
            .slice(0, 16)
            .map((token) => (
              <Badge
                key={token}
                variant="light"
                size="md"
                className={classes.tokenBadge}>
                <Group className={classes.tokenGroup}>
                  <Text
                    size="xs"
                    truncate>
                    {token}
                  </Text>
                  <Button
                    variant="subtle"
                    size="compact-xs"
                    className={classes.removeButton}
                    onClick={() => handleUnfilter(token)}
                    aria-label={`Remove ${token}`}>
                    <FontAwesomeIcon
                      icon="times"
                      size="xs"
                    />
                  </Button>
                </Group>
              </Badge>
            ))}
        </Group>
      </Card.Section>
    </Card>
  );
}
