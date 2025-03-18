'use client';

import { Container } from '@mantine/core';
import { TextInputPanel } from './components/text-input-panel';

export default function Page() {
  return (
    <Container
      size="xl"
      py="md">
      <TextInputPanel />
    </Container>
  );
}
