import { Group, Stack, Text, ThemeIcon } from '@mantine/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface StatItemProps {
  icon: IconProp;
  label: string;
  mainValue: string;
  subValue?: string;
  color?: string;
}

export function StatItem({ icon, label, mainValue, subValue, color = 'blue' }: StatItemProps) {
  return (
    <Group>
      <ThemeIcon
        color={color}
        size="lg"
        variant="light">
        <FontAwesomeIcon
          icon={icon}
          size="lg"
        />
      </ThemeIcon>
      <Stack gap={0}>
        <Text
          size="sm"
          c="dimmed">
          {label}
        </Text>
        <Text fw={500}>
          {mainValue}
          {subValue && (
            <Text
              span
              size="sm"
              c="dimmed"
              ml={4}>
              ({subValue})
            </Text>
          )}
        </Text>
      </Stack>
    </Group>
  );
}
