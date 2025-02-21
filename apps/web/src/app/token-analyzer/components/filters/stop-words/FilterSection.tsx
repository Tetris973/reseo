import { Flex, Text, Switch, ActionIcon, Collapse, Stack } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

interface FilterSectionProps {
  title: string;
  description: string;
  checked: boolean;
  onToggle: () => void;
  isExpanded: boolean;
  onExpandToggle: () => void;
  children?: React.ReactNode;
}

export function FilterSection({
  title,
  description,
  checked,
  onToggle,
  isExpanded,
  onExpandToggle,
  children,
}: FilterSectionProps) {
  return (
    <Flex
      direction="column"
      gap="xs">
      <Flex
        align="center"
        justify="space-between">
        <Flex
          align="center"
          gap="sm">
          <ActionIcon
            size="sm"
            onClick={onExpandToggle}>
            <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} />
          </ActionIcon>
          <Flex
            direction="column"
            gap={2}>
            <Text size="sm">{title}</Text>
            <Text
              size="xs"
              c="dimmed">
              {description}
            </Text>
          </Flex>
        </Flex>
        <Switch
          checked={checked}
          onChange={onToggle}
          size="md"
          onLabel="ON"
          offLabel="OFF"
        />
      </Flex>
      <Collapse in={isExpanded}>
        <Stack
          gap="xs"
          p="sm">
          {children}
        </Stack>
      </Collapse>
    </Flex>
  );
}
