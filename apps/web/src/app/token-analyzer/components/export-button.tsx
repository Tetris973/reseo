'use client';

import { Button, Tooltip, Group, FileButton } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport, faFileImport } from '@fortawesome/free-solid-svg-icons';
import { useTokenAnalysisStore } from '@webRoot/src/app/token-analyzer/store/token-analysis.store';
import { useRef } from 'react';

export function ExportButton() {
  const exportData = useTokenAnalysisStore((state) => state.exportData);
  const importData = useTokenAnalysisStore((state) => state.importData);
  const resetRef = useRef<() => void>(null);

  const handleExport = () => {
    exportData();
  };

  const handleImport = async (file: File | null) => {
    if (file) {
      await importData(file);
      // Reset the file input
      resetRef.current?.();
    }
  };

  return (
    <Group gap="xs">
      <Tooltip
        label={'Export your analysis data'}
        position="bottom">
        <Button
          onClick={handleExport}
          leftSection={<FontAwesomeIcon icon={faFileExport} />}
          variant="outline"
          color="blue">
          Export
        </Button>
      </Tooltip>

      <FileButton
        resetRef={resetRef}
        onChange={handleImport}
        accept=".json">
        {(props) => (
          <Tooltip
            label={'Import analysis data from file'}
            position="bottom">
            <Button
              {...props}
              leftSection={<FontAwesomeIcon icon={faFileImport} />}
              variant="outline"
              color="green">
              Import
            </Button>
          </Tooltip>
        )}
      </FileButton>
    </Group>
  );
}
