import { Card, Text, Button, Textarea, Group } from '@mantine/core';
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
        className={classes.cardHeader}>
        <Text className={classes.cardTitle}>Input Text</Text>
        <Text className={classes.cardDescription}>Enter your text for tokenization and analysis</Text>
      </Card.Section>

      <Card.Section className={classes.cardBody}>
        <Textarea
          placeholder="Enter text here..."
          autosize
          minRows={12}
          maxRows={12}
          className={classes.textarea}
          value={inputText}
          onChange={(e) => tokenAnalysisActions.setText(e.target.value)}
        />
        <Group className={classes.actionGroup}>
          <Button
            variant="filled"
            className={classes.actionButton}>
            <FontAwesomeIcon
              icon="play"
              className={classes.buttonIcon}
            />
            Tokenize Text
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
}
