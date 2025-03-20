'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Group, Button } from '@mantine/core';
import classes from './main-navigation.module.css';

export function MainNavigation() {
  const pathname = usePathname();
  const currentPath = pathname?.split('/')[1] || '';

  const tabs = [
    { id: 'text-input', label: 'Text Input' },
    { id: 'tokens', label: 'Tokens' },
    { id: 'filters', label: 'Filters' },
  ];

  return (
    <Group
      component="nav"
      className={classes.nav}>
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          component={Link}
          href={`/${tab.id}`}
          variant={currentPath === tab.id ? 'filled' : 'subtle'}
          size="sm"
          fw={600}
          className={classes.navLink}>
          {tab.label}
        </Button>
      ))}
    </Group>
  );
}
