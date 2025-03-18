'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Group, UnstyledButton } from '@mantine/core';
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
        <UnstyledButton
          key={tab.id}
          component={Link}
          href={`/${tab.id}`}
          className={`${classes.navLink} ${currentPath === tab.id ? classes.active : classes.inactive}`}>
          {tab.label}
        </UnstyledButton>
      ))}
    </Group>
  );
}
