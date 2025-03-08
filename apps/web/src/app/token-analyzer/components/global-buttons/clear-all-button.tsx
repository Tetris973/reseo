import { Button } from '@mantine/core';
import { useTokenAnalysisActions } from '@web/app/token-analyzer/store/token-analysis-store.hooks';
import { modals } from '@mantine/modals';

export function ClearAllButton() {
  const tokenAnalysisActions = useTokenAnalysisActions();

  function handleClearAll() {
    modals.openConfirmModal({
      title: 'Clear all data',
      children: 'Are you sure you want to clear all data? This action cannot be undone.',
      labels: { confirm: 'Clear all', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: tokenAnalysisActions.clearAll,
    });
  }

  return (
    <Button
      onClick={handleClearAll}
      color="red">
      Clear All
    </Button>
  );
}
