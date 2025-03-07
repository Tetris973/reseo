import { Group } from '@mantine/core';
import { ExportImportButton } from './export-import-button';
import { ClearAllButton } from './clear-all-button';

export function GlobalButtons() {
  return (
    <Group gap="xs">
      <ExportImportButton />
      <ClearAllButton />
    </Group>
  );
}
