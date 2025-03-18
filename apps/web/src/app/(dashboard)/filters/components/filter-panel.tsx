'use client';

import { useRouter } from 'next/navigation';
import { Card, Text, Tabs } from '@mantine/core';
import { StopWordsPanel } from './stop-words/stop-words-panel';
import { CustomFiltersPanel } from './custom-filters/custom-filters-panel';
import { useActiveTab, useNavigationActions, TabType } from '@web/app/(dashboard)/store/navigation-store';
import classes from './filter-panel.module.css';

export function FilterPanel() {
  const router = useRouter();
  const activeTab = useActiveTab();
  const { setActiveTab } = useNavigationActions();

  // Handle tab change manually
  const handleTabChange = (value: string | null) => {
    if (!value) return;
    const newTab = value as TabType;
    setActiveTab(newTab);
    router.push(`/filters?tab=${newTab}`, { scroll: false });
  };

  return (
    <div>
      <Card
        className={classes.filterPanel}
        shadow="sm">
        <div className={classes.cardHeader}>
          <div className={classes.titleSection}>
            <Text className={classes.title}>Filter Management</Text>
            <Text className={classes.description}>Configure and manage token filters</Text>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          mt="md">
          <Tabs.List className={classes.tabsList}>
            <Tabs.Tab value="stop-words">Stop Words</Tabs.Tab>
            <Tabs.Tab value="custom-filters">Custom Filters</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel
            value="stop-words"
            className={classes.tabContent}>
            <StopWordsPanel />
          </Tabs.Panel>

          <Tabs.Panel
            value="custom-filters"
            className={classes.tabContent}>
            <CustomFiltersPanel />
          </Tabs.Panel>
        </Tabs>
      </Card>
    </div>
  );
}
