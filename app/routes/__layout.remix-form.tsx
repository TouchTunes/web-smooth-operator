import { LoadingButton } from '@mui/lab';
import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useFetcher } from '@remix-run/react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import type { SelectChangeEvent } from '@mui/material';
import type { ActionFunctionArgs } from '@remix-run/node';

const ROLES = [
  { id: uuidv4(), label: 'Administrator' },
  { id: uuidv4(), label: 'Reader' },
  { id: uuidv4(), label: 'Creator' },
];

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const { fullName, secretKey, role } = Object.fromEntries(formData);
  console.log(fullName);
  console.log(secretKey);
  console.log(role);

  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  } catch (error) {
    console.log(error);
    return null;
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { success: true, message: '' };
}

const RemixForm = () => {
  const [role, setRole] = useState('');
  const { Form, state } = useFetcher<typeof action>();
  const isSubmitting = state !== 'idle';

  return (
    <Stack direction="row" justifyContent="center">
      <Form autoComplete="off" method="post">
        <Stack gap={2}>
          <Box sx={{ width: '500px' }}>
            <InputLabel required htmlFor="fullName">
              Full Name
            </InputLabel>
            <TextField fullWidth required id="fullName" name="fullName" />
          </Box>

          <Box sx={{ width: '500px' }}>
            <InputLabel required htmlFor="lastName">
              Last Name
            </InputLabel>
            <Select
              fullWidth
              required
              id="lastName"
              name="lastName"
              onChange={(e: SelectChangeEvent<string>) =>
                setRole(e.target.value)
              }
              value={role}
            >
              {ROLES.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  <Typography variant="body2">{role.label}</Typography>
                </MenuItem>
              ))}
            </Select>
          </Box>

          <input name="secretKey" type="hidden" value={uuidv4()} />
          <input name="role" type="hidden" value={role} />

          <LoadingButton
            fullWidth
            loading={isSubmitting}
            sx={{ mt: 2 }}
            type="submit"
            variant="contained"
          >
            Submit
          </LoadingButton>
        </Stack>
      </Form>
    </Stack>
  );
};

export default RemixForm;
