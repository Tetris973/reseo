'use client';

import { Box, Group, Button, FileButton, Title } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTokenAnalysisActions } from '@web/app/(dashboard)/store/token-analysis-store.hooks';
import classes from './header.module.css';
import { useEffect, useRef } from 'react';
import { modals } from '@mantine/modals';

export function DashboardHeader() {
  const tokenAnalysisActions = useTokenAnalysisActions();

  useEffect(() => {
    tokenAnalysisActions.loadData();
  }, [tokenAnalysisActions]);
  const resetRef = useRef<() => void>(null);

  const handleImport = (file: File | null) => {
    if (file) {
      tokenAnalysisActions.importData(file);
      resetRef.current?.();
    }
  };

  function handleClearAll() {
    modals.openConfirmModal({
      title: 'Clear all data',
      children: 'Are you sure you want to clear all data? This action cannot be undone.',
      labels: { confirm: 'Clear all', cancel: 'Cancel' },
      confirmProps: { color: 'red.8' },
      onConfirm: tokenAnalysisActions.clearAll,
    });
  }

  return (
    <Box
      component="header"
      className={classes.header}>
      <Group className={classes.headerContent}>
        <Box className={classes.titleSection}>
          <Title order={2}>Reseo</Title>
        </Box>

        <Group className={classes.actionSection}>
          <FileButton
            resetRef={resetRef}
            onChange={handleImport}
            accept=".json">
            {(props) => (
              <Button
                {...props}
                variant="default"
                size="sm"
                className={classes.actionButton}
                leftSection={
                  <FontAwesomeIcon
                    icon={'upload'}
                    size="sm"
                  />
                }>
                <span className={classes.buttonText}>Import</span>
              </Button>
            )}
          </FileButton>

          <Button
            variant="default"
            size="sm"
            className={classes.actionButton}
            onClick={tokenAnalysisActions.exportData}
            leftSection={
              <FontAwesomeIcon
                icon={'download'}
                size="sm"
              />
            }>
            <span className={classes.buttonText}>Export</span>
          </Button>

          <Button
            variant="filled"
            size="sm"
            color="red.8"
            onClick={handleClearAll}
            leftSection={
              <FontAwesomeIcon
                icon={'trash'}
                size="sm"
              />
            }>
            <span className={classes.buttonText}>Clear All</span>
          </Button>
        </Group>
      </Group>
    </Box>
  );
}
