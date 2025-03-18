'use client';

import { useRouter } from 'next/navigation';
import { Box, Text } from '@mantine/core';
import { StopWordSummary } from '@web/app/(dashboard)/filters/components/stop-words/stop-word-summary';
import { StopWordsTabsContent } from '@web/app/(dashboard)/filters/components/stop-words/stop-words-tabs-content';
import { TokenGroupType } from '@web/app/(dashboard)/services';
import classes from './stop-words-panel.module.css';
import { useActiveGroup, useNavigationActions } from '@web/app/(dashboard)/store/navigation-store';

export function StopWordsPanel() {
  const router = useRouter();
  const activeGroup = useActiveGroup();
  const { setActiveGroup } = useNavigationActions();

  const handleTabChange = (value: string | null) => {
    if (value) {
      const tabValue = value as TokenGroupType;
      setActiveGroup(tabValue);
      router.push(`/filters?tab=stop-words&group=${tabValue}`, { scroll: false });
    }
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <Text className={classes.headerTitle}>Stop Words Configuration</Text>
      </Box>
      <StopWordSummary />
      <StopWordsTabsContent
        activeTab={activeGroup}
        handleTabChange={handleTabChange}
      />
    </Box>
  );
}
