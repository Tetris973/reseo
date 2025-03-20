// In mantine doc it says to use styles.css, but with mantine-datatable it does not work
// So we use styles.layer.css instead. Maybe to import it to the mantine layer we defined in ./layout.css
import '@mantine/core/styles.layer.css';
import '@mantine/notifications/styles.layer.css';
import 'mantine-datatable/styles.layer.css'; // Needs to be after mantine-core styles
import './layout.css';

import { AppShell, ColorSchemeScript } from '@mantine/core';
import type { Metadata } from 'next';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Reseo',
  description: 'Tokenize and analyze text to highlight the most relevant parts',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
        <link
          rel="shortcut icon"
          href="/favicon.ico"
        />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <Providers>
          {/* When adding Mantine components, such as the AppShell, remember to put them in the render.utils.tsx file */}
          <AppShell header={{ height: 60 }}>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
