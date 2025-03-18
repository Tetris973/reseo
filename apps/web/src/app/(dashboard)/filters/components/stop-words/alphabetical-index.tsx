import { ScrollArea, UnstyledButton, Box } from '@mantine/core';
import classes from './alphabetical-index.module.css';

interface AlphabeticalIndexProps {
  letters: string[];
  activeLetter: string;
  setActiveLetter: (letter: string) => void;
  onLetterClick?: (letter: string) => void;
}

export function AlphabeticalIndex({ letters, activeLetter, setActiveLetter, onLetterClick }: AlphabeticalIndexProps) {
  return (
    <Box className={classes.container}>
      <ScrollArea
        className={classes.scrollArea}
        type="never">
        <Box className={classes.lettersList}>
          {letters.map((letter) => (
            <UnstyledButton
              key={letter}
              className={`${classes.letterButton} ${activeLetter === letter ? classes.letterButtonActive : ''}`}
              onClick={() => {
                setActiveLetter(letter);
                if (onLetterClick) {
                  onLetterClick(letter);
                }
              }}>
              {letter}
            </UnstyledButton>
          ))}
        </Box>
      </ScrollArea>
    </Box>
  );
}
