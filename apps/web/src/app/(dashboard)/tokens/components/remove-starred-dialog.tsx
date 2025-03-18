import { Modal, Text, Group, Button, Stack } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './remove-starred-dialog.module.css';
import { useTokenAnalysisActions } from '@web/app/(dashboard)/store/token-analysis-store.hooks';
import { TokenGroupType } from '@web/app/(dashboard)/services';

interface RemoveStarredDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  group: TokenGroupType;
}

export function RemoveStarredDialog({ open, onOpenChange, group }: RemoveStarredDialogProps) {
  const tokenAnalysisActions = useTokenAnalysisActions();

  const handleRemoveAllStarred = () => {
    tokenAnalysisActions.clearStaredTokens(group);
    onOpenChange(false);
  };

  return (
    <Modal
      opened={open}
      onClose={() => onOpenChange(false)}
      title={
        <div className={classes.dialogTitle}>
          <FontAwesomeIcon
            icon="trash-alt"
            className={classes.dialogIcon}
          />
          <Text fw={600}>Remove All Starred Tokens</Text>
        </div>
      }
      centered>
      <Stack className={classes.dialogStack}>
        <Text
          size="sm"
          className={classes.dialogText}>
          Are you sure you want to remove all starred tokens in the {group} words group? This action cannot be undone.
        </Text>

        <Group className={classes.actions}>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            color="red"
            onClick={handleRemoveAllStarred}>
            Remove All
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
