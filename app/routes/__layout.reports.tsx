import { Container, Typography } from '@mui/material';

export default function Index() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h3" gutterBottom>
        Welcome to Smooth Operator!
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        One place to rule over your ever-growing fleet of TouchTunes devices.
      </Typography>
    </Container>
  );
}
