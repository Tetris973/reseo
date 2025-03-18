import { Tabs, Group, Text, Badge } from '@mantine/core';
import { TokenGroupTabPanel } from './token-group-tab-panel';
import classes from './token-group-tabs.module.css';
import { TokenGroupType } from '@web/app/(dashboard)/services';
import { useRawAnalysis } from '@web/app/(dashboard)/store/token-analysis-store.hooks';
import { useActiveGroup, useNavigationActions } from '@web/app/(dashboard)/store/navigation-store';
import { useRouter } from 'next/navigation';

interface TokenGroupTabsProps {
  openRemoveDialog: (group: TokenGroupType) => void;
  showStopWords: boolean;
  showFiltered: boolean;
  showStarredOnly: boolean;
  navigateToFilters: (group: TokenGroupType) => void;
}

export function TokenGroupTabs({
  openRemoveDialog,
  showStopWords,
  showFiltered,
  showStarredOnly,
  navigateToFilters,
}: TokenGroupTabsProps) {
  const router = useRouter();
  const rawAnalysis = useRawAnalysis();
  const activeGroup = useActiveGroup();
  const { setActiveGroup } = useNavigationActions();

  const handleTabChange = (value: string | null) => {
    if (!value) return;
    const tabValue = value as TokenGroupType;
    setActiveGroup(tabValue);
    router.push(`/tokens?group=${tabValue}`, { scroll: false });
  };

  // Create a comprehensive data structure for each token group
  const tokenGroupsData = [
    {
      type: 'single' as TokenGroupType,
      label: 'Single Words',
      count: rawAnalysis?.tokensByGroup.single.length,
    },
    {
      type: 'double' as TokenGroupType,
      label: 'Double Words',
      count: rawAnalysis?.tokensByGroup.double.length,
    },
    {
      type: 'triple' as TokenGroupType,
      label: 'Triple Words',
      count: rawAnalysis?.tokensByGroup.triple.length,
    },
  ];

  if (!rawAnalysis) {
    return (
      <Text
        c="dimmed"
        ta="center"
        py="xl">
        Enter a job description to analyze keywords and phrases
      </Text>
    );
  }

  return (
    <Tabs
      value={activeGroup}
      onChange={handleTabChange}>
      <Tabs.List className={classes.tabsList}>
        {tokenGroupsData.map(({ type, label, count }) => (
          <Tabs.Tab
            key={type}
            value={type}
            className={classes.tabItem}>
            <Group className={classes.tabGroup}>
              <Text size="sm">{label}</Text>
              <Badge
                variant="light"
                color="gray"
                size="sm">
                {count}
              </Badge>
            </Group>
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {tokenGroupsData.map(({ type, label }) => (
        <TokenGroupTabPanel
          key={type}
          type={type}
          label={label}
          showStopWords={showStopWords}
          showFiltered={showFiltered}
          showStarredOnly={showStarredOnly}
          openRemoveDialog={openRemoveDialog}
          navigateToFilters={navigateToFilters}
          tokenEntities={rawAnalysis.tokensByGroup[type]}
        />
      ))}
    </Tabs>
  );
}
