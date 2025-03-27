import { getOperators } from '~/src/services/operators.service';

import type { LoaderFunctionArgs } from '@remix-run/node';

export async function loader({ request }: LoaderFunctionArgs) {
  const { searchParams } = new URL(request.url);
  const quantity = searchParams.get('quantity') || '10';

  try {
    const operators = await getOperators({ quantity });
    return {
      operators,
      error: null,
    };
  } catch (error: unknown) {
    return {
      operators: null,
      error,
    };
  }
}
