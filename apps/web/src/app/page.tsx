'use client';

import { Container } from '@mantine/core';
import { TokenAnalyzer } from '@webRoot/src/app/token-analyzer/token-analyzer';

export default function Home() {
  return (
    <Container
      maw="100%"
      p="md">
      <TokenAnalyzer />
    </Container>
  );
}
