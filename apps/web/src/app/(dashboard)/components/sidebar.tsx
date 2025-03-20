'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Title,
  Text,
  Stack,
  Group,
  Badge,
  Divider,
  ScrollArea,
  UnstyledButton,
  Collapse,
  Paper,
} from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  useStaredTokens,
  useCustomFilters,
  useRawAnalysis,
  useFilters,
} from '@web/app/(dashboard)/store/token-analysis-store.hooks';
import { useNavigationActions, TabType } from '@web/app/(dashboard)/store/navigation-store';
import { TokenGroupType } from '@web/app/(dashboard)/services';

import classes from './sidebar.module.css';

export function DashboardSidebar() {
  const [starredOpen, setStarredOpen] = useState(true);
  const [filteredOpen, setFilteredOpen] = useState(true);

  const filters = useFilters();
  const { navigateTo } = useNavigationActions();

  const rawAnalysis = useRawAnalysis();
  const singleCustomFilters = useCustomFilters('single');
  const doubleCustomFilters = useCustomFilters('double');
  const tripleCustomFilters = useCustomFilters('triple');
  const singleStaredTokens = useStaredTokens('single');
  const doubleStaredTokens = useStaredTokens('double');
  const tripleStaredTokens = useStaredTokens('triple');

  const handleNavigation = (tab: TabType, group: TokenGroupType) => {
    navigateTo(tab, group);
  };

  return (
    <Box className={classes.sidebar}>
      <Box className={classes.summarySection}>
        <Title order={4}>Summary</Title>
        <Box className={classes.statsGrid}>
          <Paper
            withBorder
            className={classes.statsPaper}>
            <Text className={classes.statsLabel}>Raw Tokens</Text>
            <Text className={classes.statsValue}>{rawAnalysis?.summary.rawTokenCount || 0}</Text>
          </Paper>
          <Paper
            withBorder
            className={classes.statsPaper}>
            <Text className={classes.statsLabel}>Unique Tokens</Text>
            <Text className={classes.statsValue}>{rawAnalysis?.summary.rawUniqueTokenCount || 0}</Text>
          </Paper>
        </Box>
      </Box>

      <Divider className={classes.divider} />

      <ScrollArea className={classes.scrollArea}>
        <Box className={classes.collapsibleSection}>
          <UnstyledButton
            className={classes.collapsibleButton}
            onClick={() => setStarredOpen(!starredOpen)}>
            <Group>
              <FontAwesomeIcon
                icon="star"
                size="sm"
              />
              <Text>Starred Tokens</Text>
            </Group>
            <Group>
              <FontAwesomeIcon
                icon={starredOpen ? 'chevron-down' : 'chevron-right'}
                size="sm"
              />
            </Group>
          </UnstyledButton>

          <Collapse in={starredOpen}>
            <Stack className={classes.collapsibleContent}>
              <UnstyledButton
                component={Link}
                href="/tokens?group=single"
                onClick={() => handleNavigation('tokens', 'single')}
                className={classes.navItem}>
                <Group className={classes.navItemGroup}>
                  <Text size="sm">Single Words</Text>
                  <Badge
                    variant="outline"
                    size="sm"
                    className={classes.badgeCount}>
                    {singleStaredTokens.size || 0}
                  </Badge>
                </Group>
              </UnstyledButton>

              <UnstyledButton
                component={Link}
                href="/tokens?group=double"
                onClick={() => handleNavigation('tokens', 'double')}
                className={classes.navItem}>
                <Group className={classes.navItemGroup}>
                  <Text size="sm">Double Words</Text>
                  <Badge
                    variant="outline"
                    size="sm"
                    className={classes.badgeCount}>
                    {doubleStaredTokens.size || 0}
                  </Badge>
                </Group>
              </UnstyledButton>

              <UnstyledButton
                component={Link}
                href="/tokens?group=triple"
                onClick={() => handleNavigation('tokens', 'triple')}
                className={classes.navItem}>
                <Group className={classes.navItemGroup}>
                  <Text size="sm">Triple Words</Text>
                  <Badge
                    variant="outline"
                    size="sm"
                    className={classes.badgeCount}>
                    {tripleStaredTokens.size || 0}
                  </Badge>
                </Group>
              </UnstyledButton>
            </Stack>
          </Collapse>
        </Box>

        <Box className={classes.collapsibleSection}>
          <UnstyledButton
            className={classes.collapsibleButton}
            onClick={() => setFilteredOpen(!filteredOpen)}>
            <Group>
              <FontAwesomeIcon
                icon="filter"
                size="sm"
              />
              <Text>Filtered Tokens</Text>
            </Group>
            <Group>
              <FontAwesomeIcon
                icon={filteredOpen ? 'chevron-down' : 'chevron-right'}
                size="sm"
              />
            </Group>
          </UnstyledButton>

          <Collapse in={filteredOpen}>
            <Stack className={classes.collapsibleContent}>
              <UnstyledButton
                component={Link}
                href="/filters?tab=custom-filters&group=single"
                onClick={() => handleNavigation('custom-filters', 'single')}
                className={classes.navItem}>
                <Group className={classes.navItemGroup}>
                  <Text size="sm">Single Words</Text>
                  <Badge
                    variant="outline"
                    size="sm"
                    className={classes.badgeCount}>
                    {singleCustomFilters.size || 0}
                  </Badge>
                </Group>
              </UnstyledButton>

              <UnstyledButton
                component={Link}
                href="/filters?tab=custom-filters&group=double"
                onClick={() => handleNavigation('custom-filters', 'double')}
                className={classes.navItem}>
                <Group className={classes.navItemGroup}>
                  <Text size="sm">Double Words</Text>
                  <Badge
                    variant="outline"
                    size="sm"
                    className={classes.badgeCount}>
                    {doubleCustomFilters.size || 0}
                  </Badge>
                </Group>
              </UnstyledButton>

              <UnstyledButton
                component={Link}
                href="/filters?tab=custom-filters&group=triple"
                onClick={() => handleNavigation('custom-filters', 'triple')}
                className={classes.navItem}>
                <Group className={classes.navItemGroup}>
                  <Text size="sm">Triple Words</Text>
                  <Badge
                    variant="outline"
                    size="sm"
                    className={classes.badgeCount}>
                    {tripleCustomFilters.size || 0}
                  </Badge>
                </Group>
              </UnstyledButton>
            </Stack>
          </Collapse>
        </Box>
      </ScrollArea>

      <Divider className={classes.divider} />

      <Box className={classes.footerSection}>
        <Text className={classes.footerLabel}>Stop Words</Text>

        <Box className={classes.footerItem}>
          <Text size="sm">Single Words</Text>
          <Badge
            variant="outline"
            className={filters.stopWords.enabled.single ? classes.enabledBadge : classes.disabledBadge}>
            {filters.stopWords.enabled.single ? 'Enabled' : 'Disabled'}
          </Badge>
        </Box>

        <Box className={classes.footerItem}>
          <Text size="sm">Double Words</Text>
          <Badge
            variant="outline"
            className={filters.stopWords.enabled.double ? classes.enabledBadge : classes.disabledBadge}>
            {filters.stopWords.enabled.double ? 'Enabled' : 'Disabled'}
          </Badge>
        </Box>

        <Box className={classes.footerItem}>
          <Text size="sm">Triple Words</Text>
          <Badge
            variant="outline"
            className={filters.stopWords.enabled.triple ? classes.enabledBadge : classes.disabledBadge}>
            {filters.stopWords.enabled.triple ? 'Enabled' : 'Disabled'}
          </Badge>
        </Box>
      </Box>
    </Box>
  );
}
