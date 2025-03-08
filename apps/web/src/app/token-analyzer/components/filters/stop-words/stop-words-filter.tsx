import { FilterSection } from './filter-section';
import { StopWordsList } from './stop-words-list';
import { Paper, Stack, Flex, Badge } from '@mantine/core';
import { useState, useMemo } from 'react';
import { TokenGroupType } from '@web/app/token-analyzer/services';
import {
  useTokenAnalysisActions,
  useFilters,
  useStopWordsDictionary,
} from '@web/app/token-analyzer/store/token-analysis-store.hooks';
import { groupStopWordsByFirstLetter } from '@web/app/token-analyzer/store/token-analysis.helper';

export function StopWordsFilter() {
  const [expandedSection, setExpandedSection] = useState<TokenGroupType | null>(null);
  const tokenAnalysisActions = useTokenAnalysisActions();
  const filters = useFilters();
  const stopWordsDictionary = useStopWordsDictionary();
  const toggleStopWordsFilter = tokenAnalysisActions.toggleStopWordsFilter;

  // Transform flat stop words set into alphabetical grouping for display
  const stopWordsByLetter = useMemo(() => {
    return groupStopWordsByFirstLetter(stopWordsDictionary);
  }, [stopWordsDictionary]);

  const handleExpandToggle = (section: TokenGroupType) => {
    setExpandedSection((current) => (current === section ? null : section));
  };

  return (
    <Paper
      p="sm"
      withBorder>
      <Stack gap="md">
        <FilterSection
          title="Single Word Stop Words"
          description='Filter common words like "the", "and", "for"'
          checked={filters.stopWords.enabled.single}
          onToggle={() => toggleStopWordsFilter('single')}
          isExpanded={expandedSection === 'single'}
          onExpandToggle={() => handleExpandToggle('single')}>
          <StopWordsList stopWordsByLetter={stopWordsByLetter} />
        </FilterSection>

        <FilterSection
          title="Two-Word Stop Phrases"
          description="Filter phrases where all words are stop words"
          checked={filters.stopWords.enabled.double}
          onToggle={() => toggleStopWordsFilter('double')}
          isExpanded={expandedSection === 'double'}
          onExpandToggle={() => handleExpandToggle('double')}>
          <Flex
            wrap="wrap"
            gap="xs">
            {Array.from(filters.stopWords.filterableSets.double || new Set()).map((phrase) => (
              <Badge
                key={phrase}
                variant="dot"
                color="gray">
                {phrase}
              </Badge>
            ))}
          </Flex>
        </FilterSection>

        <FilterSection
          title="Three-Word Stop Phrases"
          description="Filter phrases where all words are stop words"
          checked={filters.stopWords.enabled.triple}
          onToggle={() => toggleStopWordsFilter('triple')}
          isExpanded={expandedSection === 'triple'}
          onExpandToggle={() => handleExpandToggle('triple')}>
          <Flex
            wrap="wrap"
            gap="xs">
            {Array.from(filters.stopWords.filterableSets.triple || new Set()).map((phrase) => (
              <Badge
                key={phrase}
                variant="dot"
                color="gray">
                {phrase}
              </Badge>
            ))}
          </Flex>
        </FilterSection>
      </Stack>
    </Paper>
  );
}
