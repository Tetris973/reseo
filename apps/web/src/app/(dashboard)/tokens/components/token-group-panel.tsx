'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Paper, Stack } from '@mantine/core';
import { TokenGroupTabs } from './token-group-tabs';
import { TokenGroupHeader } from './token-group-header';
import { RemoveStarredDialog } from './remove-starred-dialog';
import { TokenGroupType } from '@web/app/(dashboard)/services';
import { useNavigationActions } from '@web/app/(dashboard)/store/navigation-store';
import classes from './token-group-panel.module.css';

export function TokenGroupPanel() {
  const router = useRouter();
  const { navigateTo } = useNavigationActions();

  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [currentGroup, setCurrentGroup] = useState<TokenGroupType>('single');

  // Add filter states here
  const [showStopWords, setShowStopWords] = useState(false);
  const [showFiltered, setShowFiltered] = useState(false);
  const [showStarredOnly, setShowStarredOnly] = useState(false);

  const openRemoveDialog = (group: TokenGroupType) => {
    setCurrentGroup(group);
    setRemoveDialogOpen(true);
  };

  const navigateToFilters = (group: TokenGroupType) => {
    navigateTo('custom-filters', group);
    router.push(`/filters?tab=custom-filters&group=${group}`, { scroll: false });
  };

  return (
    <Stack className={classes.container}>
      <Paper
        shadow="xs"
        radius="md"
        withBorder>
        <TokenGroupHeader
          showStopWords={showStopWords}
          setShowStopWords={setShowStopWords}
          showFiltered={showFiltered}
          setShowFiltered={setShowFiltered}
          showStarredOnly={showStarredOnly}
          setShowStarredOnly={setShowStarredOnly}
        />
        <TokenGroupTabs
          openRemoveDialog={openRemoveDialog}
          showStopWords={showStopWords}
          showFiltered={showFiltered}
          showStarredOnly={showStarredOnly}
          navigateToFilters={navigateToFilters}
        />
      </Paper>

      <RemoveStarredDialog
        open={removeDialogOpen}
        onOpenChange={setRemoveDialogOpen}
        group={currentGroup}
      />
    </Stack>
  );
}
