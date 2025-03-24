import { Container, Typography } from "@mui/material";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Smooth Operator" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 8 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Smooth Operator
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        One place to rule over your ever growing fleet of devices
      </Typography>
    </Container>
  );
}
