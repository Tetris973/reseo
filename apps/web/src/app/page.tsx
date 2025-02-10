'use client';

import React from 'react';
import { Box, Title, Stack, Container, useMantineTheme } from '@mantine/core';
import { Header } from '@web/components/Header';

export default function Home() {
  const theme = useMantineTheme();

  return (
    <>
      <Header />
      <Box
        component="main"
        style={{
          minHeight: '100vh',
          backgroundColor: theme.colors.gray[0],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: `${theme.spacing.xl} ${theme.spacing.md}`,
        }}>
        <Container size="sm">
          <Stack
            gap="xl"
            align="center">
            <Title order={1}>Welcome to My Next.js App</Title>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
