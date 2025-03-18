import { Box, Title, Text, Group, Switch, TextInput, Flex } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './token-group-header.module.css';

interface TokenGroupHeaderProps {
  showStopWords: boolean;
  setShowStopWords: (value: boolean) => void;
  showFiltered: boolean;
  setShowFiltered: (value: boolean) => void;
  showStarredOnly: boolean;
  setShowStarredOnly: (value: boolean) => void;
}

export function TokenGroupHeader({
  showStopWords,
  setShowStopWords,
  showFiltered,
  setShowFiltered,
  showStarredOnly,
  setShowStarredOnly,
}: TokenGroupHeaderProps) {
  return (
    <Box className={classes.header}>
      <Flex className={classes.headerFlex}>
        <Box>
          <Title
            order={3}
            className={classes.title}>
            Token Groups
          </Title>
          <Text
            size="sm"
            className={classes.description}>
            View and manage tokens by word group
          </Text>
        </Box>

        <Group className={classes.switchGroup}>
          <Group className={classes.switchItem}>
            <Switch
              id="show-stop-words"
              checked={showStopWords}
              onChange={(event) => setShowStopWords(event.currentTarget.checked)}
              size="sm"
            />
            <Text
              size="sm"
              component="label"
              htmlFor="show-stop-words"
              className={classes.switchLabel}>
              <FontAwesomeIcon
                icon="eye"
                size="sm"
                className={classes.switchIcon}
              />
              Stop Words
            </Text>
          </Group>

          <Group className={classes.switchItem}>
            <Switch
              id="show-filtered"
              checked={showFiltered}
              onChange={(event) => setShowFiltered(event.currentTarget.checked)}
              size="sm"
            />
            <Text
              size="sm"
              component="label"
              htmlFor="show-filtered"
              className={classes.switchLabel}>
              <FontAwesomeIcon
                icon="filter"
                size="sm"
                className={classes.switchIcon}
              />
              Filtered
            </Text>
          </Group>

          <Group className={classes.switchItem}>
            <Switch
              id="show-starred"
              checked={showStarredOnly}
              onChange={(event) => setShowStarredOnly(event.currentTarget.checked)}
              size="sm"
            />
            <Text
              size="sm"
              component="label"
              htmlFor="show-starred"
              className={classes.switchLabel}>
              <FontAwesomeIcon
                icon="star"
                size="sm"
                className={classes.switchIcon}
              />
              Starred Only
            </Text>
          </Group>
        </Group>
      </Flex>

      <TextInput
        placeholder="Search tokens..."
        leftSection={
          <FontAwesomeIcon
            icon="search"
            size="sm"
          />
        }
        radius="md"
        className={classes.searchInput}
      />
    </Box>
  );
}
