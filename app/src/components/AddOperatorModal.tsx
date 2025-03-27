import LoadingButton from '@mui/lab/LoadingButton';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useFetcher } from '@remix-run/react';
import { useEffect, useState } from 'react';

import type { SelectChangeEvent } from '@mui/material';
import type { action as routeAction } from '~/routes/__layout.firebase';

const ROLES = ['Administrator', 'Reader', 'Creator'];

interface AddOperatorModalProps {
  isModalOpen: boolean;
  handleClose: () => void;
}

export default function AddOperatorModal({
  isModalOpen,
  handleClose,
}: AddOperatorModalProps) {
  const { Form, state, data } = useFetcher<typeof routeAction>();
  const [role, setRole] = useState('');
  const isSubmitting = state !== 'idle';

  useEffect(() => {
    if (data?.success) {
      handleClose();
    }
  }, [data]);

  return (
    <Dialog open={isModalOpen} onClose={handleClose}>
      <Form autoComplete="off" method="post">
        <DialogTitle>{'Add New Smooth Operator'}</DialogTitle>
        <DialogContent>
          <Stack gap={2} sx={{ width: '500px' }}>
            <>
              <InputLabel required htmlFor="fullName">
                Full Name
              </InputLabel>
              <TextField fullWidth required id="fullName" name="fullName" />
            </>

            <>
              <InputLabel required htmlFor="lastName">
                Role
              </InputLabel>
              <Select
                fullWidth
                required
                id="role"
                name="role"
                onChange={(e: SelectChangeEvent<string>) =>
                  setRole(e.target.value)
                }
                value={role}
              >
                {ROLES.map((role) => (
                  <MenuItem key={role} value={role}>
                    <Typography variant="body2">{role}</Typography>
                  </MenuItem>
                ))}
              </Select>
            </>

            <>
              <InputLabel htmlFor="phone">Phone</InputLabel>
              <TextField fullWidth id="phone" name="phone" />
            </>

            <>
              <InputLabel htmlFor="location">Location</InputLabel>
              <TextField fullWidth id="location" name="location" />
            </>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <LoadingButton
            loading={isSubmitting}
            name="intent"
            type="submit"
            value="add-operator-error"
          >
            EB
          </LoadingButton>
          <LoadingButton
            loading={isSubmitting}
            name="intent"
            type="submit"
            value="add-operator"
            variant="contained"
          >
            Add
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
