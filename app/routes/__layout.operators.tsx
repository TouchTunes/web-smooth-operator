import { Container } from '@mui/material';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { getOperators } from '~/src/components/services/operators.service';

export async function loader() {
  try {
    const operators = await getOperators();
    return json({
      operators,
    });
  } catch (error: unknown) {
    console.log(error);
  }

  return json({
    operators: null,
  });
}

export default function Operators() {
  const { operators } = useLoaderData<typeof loader>();
  console.log(operators);
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 8 }}></Container>
  );
}
