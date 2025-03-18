import { Stack } from '@mantine/core';
import { TextInputForm } from './text-input-form';
import classes from './text-input-panel.module.css';

export function TextInputPanel() {
  return (
    <Stack className={classes.panel}>
      <TextInputForm />
    </Stack>
  );
}
