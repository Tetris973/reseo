import { Flex, Text, ActionIcon } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

interface FilterHeaderProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function FilterHeader({ isOpen, onToggle }: FilterHeaderProps) {
  return (
    <Flex
      justify="space-between"
      align="center">
      <Flex
        align="center"
        gap="sm">
        <ActionIcon onClick={onToggle}>
          <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
        </ActionIcon>
        <Text
          size="sm"
          fw={500}>
          Stopwords Filter
        </Text>
      </Flex>
    </Flex>
  );
}
