import { Chip, Flex, Text } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface TokenChipProps {
  token: string;
  isStared: boolean;
  isFiltered: boolean;
}

export function TokenChip({ token, isStared, isFiltered }: TokenChipProps) {
  const chipStyles = {
    root: {
      opacity: isFiltered ? 0.5 : 1,
      textDecoration: isFiltered ? 'line-through' : 'none',
    },
    label: {
      fontWeight: isStared ? 700 : 400,
    },
  };

  return (
    <Chip
      styles={chipStyles}
      checked={isStared}
      color="gray"
      icon={
        <FontAwesomeIcon
          icon={faStar}
          size="xs"
        />
      }
      onClick={(e) => {
        // We'll let the parent (row click) handle interactions now
        e.stopPropagation(); // Still prevent default event bubbling
      }}
      variant="outline"
      size="sm">
      <Flex
        align="center"
        gap="xs">
        <Text>{token}</Text>
      </Flex>
    </Chip>
  );
}
