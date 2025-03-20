import { Card, Text, Button, Textarea, Group, Title } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './text-input-form.module.css';
import { useTokenAnalysisActions, useInputText } from '@web/app/(dashboard)/store/token-analysis-store.hooks';

export function TextInputForm() {
  const tokenAnalysisActions = useTokenAnalysisActions();
  const inputText = useInputText();
  return (
    <Card className={classes.card}>
      <Card.Section
        withBorder
        inheritPadding
        pb="xs"
        pt="xs">
        <Title order={4}>Text Input</Title>
        <Text
          c="dimmed"
          size="sm">
          Enter your text for tokenization and analysis
        </Text>
      </Card.Section>

      <Card.Section p="md">
        <Textarea
          placeholder="Enter text here..."
          autosize
          minRows={12}
          maxRows={12}
          mb="md"
          value={inputText}
          onChange={(e) => tokenAnalysisActions.setText(e.target.value)}
        />
        <Group justify="flex-end">
          <Button
            variant="filled"
            leftSection={<FontAwesomeIcon icon="play" />}>
            Tokenize Text
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
}
