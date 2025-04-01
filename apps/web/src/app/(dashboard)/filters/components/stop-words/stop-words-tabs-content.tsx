import { useState, useMemo, useEffect, useRef } from 'react';
import { Box, Tabs, ScrollArea, SimpleGrid, Stack, Badge, Group, Text } from '@mantine/core';
import { AlphabeticalIndex } from '@web/app/(dashboard)/filters/components/stop-words/alphabetical-index';
import { TokenGroupType } from '@web/app/(dashboard)/services/token-analysis.types';
import { useFilters, useStopWordsDictionary } from '@web/app/(dashboard)/store/token-analysis-store.hooks';
import { groupStopWordsByFirstLetter } from '@web/app/(dashboard)/store/token-analysis.helper';
import classes from './stop-words-tabs-content.module.css';

interface StopWordsTabsContentProps {
  activeTab: TokenGroupType;
  handleTabChange: (value: string | null) => void;
}

const TAB_CONFIGS = [
  { type: 'single' as TokenGroupType, label: 'Single Words' },
  { type: 'double' as TokenGroupType, label: 'Double Words' },
  { type: 'triple' as TokenGroupType, label: 'Triple Words' },
];

export function StopWordsTabsContent({ activeTab, handleTabChange }: StopWordsTabsContentProps) {
  const stopWordsDictionary = useStopWordsDictionary();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const filters = useFilters();

  // Transform flat stop words set into alphabetical grouping for display
  const stopWordsByLetter = useMemo(() => {
    return groupStopWordsByFirstLetter(stopWordsDictionary);
  }, [stopWordsDictionary]);

  const letters = useMemo(() => {
    return Object.keys(stopWordsByLetter);
  }, [stopWordsByLetter]);

  // Set the first letter as active by default
  const [activeLetter, setActiveLetter] = useState<string>('');

  // Initialize with the first letter when letters are available
  useEffect(() => {
    if (letters.length > 0 && !activeLetter) {
      setActiveLetter(letters[0]);
    }
  }, [letters, activeLetter]);

  // Scroll to the selected letter section
  const scrollToLetter = (letter: string) => {
    if (scrollAreaRef.current) {
      const element = document.getElementById(`letter-${letter}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const stopWordCounts = useMemo(
    () => ({
      single: filters.stopWords.filterableSets.single?.size || 0,
      double: filters.stopWords.filterableSets.double?.size || 0,
      triple: filters.stopWords.filterableSets.triple?.size || 0,
    }),
    [filters.stopWords.filterableSets],
  );

  return (
    <Tabs
      value={activeTab}
      onChange={handleTabChange}>
      <Group
        justify="space-between"
        align="center"
        mb="xs"
        wrap="nowrap"
        className={classes.tabsContainer}>
        <Tabs.List className={classes.tabsList}>
          {TAB_CONFIGS.map((config) => (
            <Tabs.Tab
              key={config.type}
              value={config.type}>
              <Group gap="xs">
                <Text>{config.label}</Text>
                <Badge
                  variant="light"
                  className={classes.tabsBadge}>
                  {stopWordCounts[config.type]}
                </Badge>
              </Group>
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Group>

      <Tabs.Panel value="single">
        <Box className={classes.contentContainer}>
          <AlphabeticalIndex
            letters={letters}
            activeLetter={activeLetter}
            setActiveLetter={setActiveLetter}
            onLetterClick={scrollToLetter}
          />
          <Box style={{ flex: 1 }}>
            <ScrollArea
              className={classes.scrollArea}
              viewportRef={scrollAreaRef}>
              <Stack gap="md">
                {Object.entries(stopWordsByLetter).map(([letter, words]) => (
                  <Box
                    key={letter}
                    id={`letter-${letter}`}
                    className={classes.letterSection}>
                    <Box className={classes.letterHeader}>
                      <Box className={classes.letterTitle}>{letter}</Box>
                    </Box>
                    <SimpleGrid
                      cols={{ base: 1, sm: 2, lg: 3 }}
                      spacing="xs"
                      className={classes.cardsGrid}>
                      {Array.from(words).map((token) => (
                        <Badge
                          key={token}
                          variant="dot"
                          color="var(--mantine-color-gray-6)">
                          {token}
                        </Badge>
                      ))}
                    </SimpleGrid>
                  </Box>
                ))}
              </Stack>
            </ScrollArea>
          </Box>
        </Box>
      </Tabs.Panel>

      <Tabs.Panel value="double">
        <Box className={classes.contentContainer}>
          <AlphabeticalIndex
            letters={letters}
            activeLetter={activeLetter}
            setActiveLetter={setActiveLetter}
            onLetterClick={scrollToLetter}
          />
          <Box style={{ flex: 1 }}>
            <ScrollArea className={classes.scrollArea}>
              <SimpleGrid
                cols={{ base: 1, sm: 2, lg: 3 }}
                spacing="xs">
                {Array.from(filters.stopWords.filterableSets.double || new Set()).map((token) => (
                  <Badge
                    key={token}
                    variant="dot"
                    color="var(--mantine-color-gray-6)">
                    {token}
                  </Badge>
                ))}
              </SimpleGrid>
            </ScrollArea>
          </Box>
        </Box>
      </Tabs.Panel>

      <Tabs.Panel value="triple">
        <Box className={classes.contentContainer}>
          <AlphabeticalIndex
            letters={letters}
            activeLetter={activeLetter}
            setActiveLetter={setActiveLetter}
            onLetterClick={scrollToLetter}
          />
          <Box style={{ flex: 1 }}>
            <ScrollArea className={classes.scrollArea}>
              <SimpleGrid
                cols={{ base: 1, sm: 2, lg: 3 }}
                spacing="xs">
                {Array.from(filters.stopWords.filterableSets.triple || new Set()).map((token) => (
                  <Badge
                    key={token}
                    variant="dot"
                    color="var(--mantine-color-gray-6)">
                    {token}
                  </Badge>
                ))}
              </SimpleGrid>
            </ScrollArea>
          </Box>
        </Box>
      </Tabs.Panel>
    </Tabs>
  );
}
