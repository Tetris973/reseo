import { useState, useMemo, useEffect, useRef } from 'react';
import { Box, Tabs, ScrollArea, SimpleGrid, Stack, Badge } from '@mantine/core';
import { AlphabeticalIndex } from '@web/app/(dashboard)/filters/components/stop-words/alphabetical-index';
import { TokenGroupType } from '@web/app/(dashboard)/services/token-analysis.types';
import { useFilters, useStopWordsDictionary } from '@web/app/(dashboard)/store/token-analysis-store.hooks';
import { groupStopWordsByFirstLetter } from '@web/app/(dashboard)/store/token-analysis.helper';
import classes from './stop-words-tabs-content.module.css';

interface StopWordsTabsContentProps {
  activeTab: TokenGroupType;
  handleTabChange: (value: string | null) => void;
}

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

  return (
    <Tabs
      value={activeTab}
      onChange={handleTabChange}>
      <Box className={classes.tabsContainer}>
        <Tabs.List>
          <Tabs.Tab value="single">Single Words</Tabs.Tab>
          <Tabs.Tab value="double">Double Words</Tabs.Tab>
          <Tabs.Tab value="triple">Triple Words</Tabs.Tab>
        </Tabs.List>
      </Box>

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
