import { Stack, Text, Flex, Badge } from '@mantine/core';
import { StopWordsByLetter } from '@web/app/token-analyzer/data/stopwords.helper';

interface StopWordsListProps {
  stopWordsByLetter: StopWordsByLetter;
}

export function StopWordsList({ stopWordsByLetter }: StopWordsListProps) {
  return (
    <Stack gap="xs">
      {Object.entries(stopWordsByLetter).map(([letter, words]) => (
        <div key={letter}>
          <Text
            size="xs"
            c="dimmed"
            mb={4}>
            — {letter.toUpperCase()} —
          </Text>
          <Flex
            wrap="wrap"
            gap="xs">
            {Array.from(words).map((word) => (
              <Badge
                key={word}
                variant="dot"
                color="gray">
                {word}
              </Badge>
            ))}
          </Flex>
        </div>
      ))}
    </Stack>
  );
}
