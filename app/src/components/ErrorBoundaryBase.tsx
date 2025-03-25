import { Alert, Button, CardMedia, Stack } from '@mui/material';
import { Link } from '@remix-run/react';

const ErrorBoundaryComponent = () => {
  return (
    <Stack direction="row" justifyContent="center" sx={{ p: 2, width: '100%' }}>
      <Stack gap={2} sx={{ maxWidth: 'sm', width: '100%' }}>
        <Alert
          severity="error"
          variant="outlined"
          sx={{ borderRadius: '12px' }}
        >
          {`OH NO!`}
        </Alert>

        <CardMedia component="img" image="/error.png" />

        <Button component={Link} to={'/'} variant="outlined">
          Call for help
        </Button>
      </Stack>
    </Stack>
  );
};

export default ErrorBoundaryComponent;
