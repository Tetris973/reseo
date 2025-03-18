'use client';

import { Suspense, useState, type ReactNode, useEffect } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { Box, ActionIcon, Text, Loader, Group } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DashboardHeader } from './components/header';
import { DashboardSidebar } from './components/sidebar';
import { MainNavigation } from './components/main-navigation';
import classes from './layout.module.css';
import { initializeNavigationStore, useNavigationActions } from './store/navigation-store';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const route = pathname.split('/')[1];
  const { setActiveTab } = useNavigationActions();

  useEffect(() => {
    const tab = searchParams.get('tab') || undefined;
    setActiveTab(initializeNavigationStore(tab, route).getState().activeTab);
  }, [searchParams, route, setActiveTab]);

  return (
    <Box className={classes.container}>
      <DashboardHeader />
      <Box className={classes.mainContent}>
        <Box
          className={`${classes.sidebar} ${sidebarOpen ? classes.sidebarOpen : classes.sidebarClosed}`}
          role="navigation">
          <DashboardSidebar />
        </Box>
        <Box className={classes.contentArea}>
          <Group className={classes.navigationBar}>
            <ActionIcon
              variant="subtle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={classes.toggleButton}
              aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}>
              <FontAwesomeIcon
                icon={sidebarOpen ? 'square-caret-left' : 'bars'}
                size="lg"
              />
            </ActionIcon>
            <Text
              size="lg"
              fw={600}
              className={classes.dashboardTitle}>
              Text Tokenization Dashboard
            </Text>
            <MainNavigation />
          </Group>
          <Box className={classes.mainArea}>
            <Suspense
              fallback={
                <Box className={classes.loadingContainer}>
                  <Loader
                    size="md"
                    variant="oval"
                  />
                </Box>
              }>
              {children}
            </Suspense>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
