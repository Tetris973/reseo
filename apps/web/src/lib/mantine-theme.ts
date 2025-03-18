'use client';

import { createTheme, rem, MantineThemeOverride } from '@mantine/core';

// Create the Mantine theme
export const theme: MantineThemeOverride = createTheme({
  colors: {
    // Primary colors (based on shadcn component.json)
    primary: [
      '#fafafa', // 0: Lightest
      '#f5f5f5',
      '#e5e5e5',
      '#d4d4d4',
      '#a3a3a3',
      '#737373',
      '#525252',
      '#404040',
      '#262626',
      '#171717',
      '#0a0a0a', // 10: Darkest
    ],

    // Secondary colors (based on shadcn component.json)
    secondary: [
      '#fafafa', // 0: Lightest
      '#f5f5f5',
      '#e5e5e5',
      '#d4d4d4',
      '#a3a3a3',
      '#737373',
      '#525252',
      '#404040',
      '#262626',
      '#171717',
      '#0a0a0a', // 10: Darkest
    ],

    // Muted colors (based on shadcn component.json)
    muted: [
      '#fafafa', // 0: Lightest
      '#f5f5f5',
      '#e5e5e5',
      '#d4d4d4',
      '#a3a3a3',
      '#737373',
      '#525252',
      '#404040',
      '#262626',
      '#171717',
      '#0a0a0a', // 10: Darkest
    ],

    // Accent colors (based on shadcn component.json)
    accent: [
      '#fafafa', // 0: Lightest
      '#f5f5f5',
      '#e5e5e5',
      '#d4d4d4',
      '#a3a3a3',
      '#737373',
      '#525252',
      '#404040',
      '#262626',
      '#171717',
      '#0a0a0a', // 10: Darkest
    ],
  },

  // Set which color is used as the primary theme color
  primaryColor: 'primary',

  // Default radius to match shadcn
  radius: {
    xs: rem(2),
    sm: rem(4),
    md: rem(8),
    lg: rem(12),
    xl: rem(16),
  },

  // Font settings if needed
  fontFamily: 'inherit',

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
