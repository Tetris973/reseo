import { Button } from '@mantine/core';
import { useTokenAnalysisStore } from '@webRoot/src/app/token-analyzer/store/token-analysis.store';
import { modals } from '@mantine/modals';

export function ClearAllButton() {
  const clearAll = useTokenAnalysisStore((state) => state.clearAll);

  function handleClearAll() {
    modals.openConfirmModal({
      title: 'Clear all data',
      children: 'Are you sure you want to clear all data? This action cannot be undone.',
      labels: { confirm: 'Clear all', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: clearAll,
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
