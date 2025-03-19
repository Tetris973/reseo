'use client';
// import of fontawesome must be done here, otherwise it will not work
import '@web/lib/fontawesome';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { theme } from '@web/lib/mantine-theme';
import { useEffect, useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  // We need to handle SSR by setting the initial state only after mounting
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    // If you add a component or provider from Mantine here, remember to add it to to the test utils test/utils/unit-test/renderer.tsx
    <MantineProvider
      theme={theme}
      defaultColorScheme="light">
      <Notifications />
      <ModalsProvider>{mounted ? children : null}</ModalsProvider>
    </MantineProvider>
  );
}
