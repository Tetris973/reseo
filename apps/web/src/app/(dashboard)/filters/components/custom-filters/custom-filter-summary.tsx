import { Box, Text, Badge } from '@mantine/core';
import classes from './custom-filter-summary.module.css';

interface CustomFilterSummaryProps {
  singleCount: number;
  doubleCount: number;
  tripleCount: number;
}

export function CustomFilterSummary({ singleCount, doubleCount, tripleCount }: CustomFilterSummaryProps) {
  return (
    <Box className={classes.summaryGrid}>
      <Box className={classes.summaryCard}>
        <Box className={classes.cardContent}>
          <Text className={classes.cardTitle}>Single Words</Text>
          <Text className={classes.cardSubtitle}>{singleCount} filters</Text>
        </Box>
        <Badge
          variant={singleCount > 0 ? 'filled' : 'outline'}
          className={singleCount > 0 ? classes.activeBadge : classes.inactiveBadge}>
          {singleCount > 0 ? 'Active' : 'Inactive'}
        </Badge>
      </Box>

      <Box className={classes.summaryCard}>
        <Box className={classes.cardContent}>
          <Text className={classes.cardTitle}>Double Words</Text>
          <Text className={classes.cardSubtitle}>{doubleCount} filters</Text>
        </Box>
        <Badge
          variant={doubleCount > 0 ? 'filled' : 'outline'}
          className={doubleCount > 0 ? classes.activeBadge : classes.inactiveBadge}>
          {doubleCount > 0 ? 'Active' : 'Inactive'}
        </Badge>
      </Box>

      <Box className={classes.summaryCard}>
        <Box className={classes.cardContent}>
          <Text className={classes.cardTitle}>Triple Words</Text>
          <Text className={classes.cardSubtitle}>{tripleCount} filters</Text>
        </Box>
        <Badge
          variant={tripleCount > 0 ? 'filled' : 'outline'}
          className={tripleCount > 0 ? classes.activeBadge : classes.inactiveBadge}>
          {tripleCount > 0 ? 'Active' : 'Inactive'}
        </Badge>
      </Box>
    </Box>
  );
}
