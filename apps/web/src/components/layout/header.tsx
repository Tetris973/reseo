'use client';

import { Box, Title, useMantineColorScheme } from '@mantine/core';

export function Header() {
  const { colorScheme } = useMantineColorScheme();

  return (
    <Box
      component="header"
      h={60}
      px="md"
      py="xs"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: `1px solid ${
          colorScheme === 'dark' ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-3)'
        }`,
        backgroundColor: colorScheme === 'dark' ? 'var(--mantine-color-dark-7)' : 'white',
        color: colorScheme === 'dark' ? 'var(--mantine-color-dark-0)' : 'var(--mantine-color-black)',
      }}>
      <Title order={3}>Text Tokenization App</Title>
    </Box>
  );
}
