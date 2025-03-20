'use client';

import { createTheme, rem, MantineThemeOverride } from '@mantine/core';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
});

// Create the Mantine theme
export const theme: MantineThemeOverride = createTheme({
  // Default radius to match shadcn
  radius: {
    xs: rem(2),
    sm: rem(4),
    md: rem(8),
    lg: rem(12),
    xl: rem(16),
  },

  fontFamily: inter.style.fontFamily,

  primaryColor: 'dark',

  // Configure component defaults
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
    },
    Card: {
      defaultProps: {
        radius: 'md',
        padding: 'lg',
      },
    },
    // Add other component defaults as needed
  },
});
