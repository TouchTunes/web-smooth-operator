import {
  Alert,
  Avatar,
  Box,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useLoaderData, useSearchParams } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { v4 as uuidv4 } from 'uuid';

import { getOperators } from '~/src/services/operators.service';

import type { GridColDef } from '@mui/x-data-grid';
import type { LoaderFunctionArgs } from '@remix-run/node';
import type { Operator } from '~/src/services/operators.service';

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

export default function Operators() {
  const { operators: initialOperators } = useLoaderData<typeof loader>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearchParams] = useSearchParams();
  const [operators, setOperators] = useState(initialOperators);
  const [operatorsQuantity, setOperatorsQuantity] = useState('');
  const [debouncedQuantity] = useDebounce(operatorsQuantity, 500);

  const getOperatorName = (operator: Operator) =>
    `${operator.name.title} ${operator.name.first} ${operator.name.last}`;

  const columns: GridColDef<Operator>[] = [
    {
      field: 'fullName',
      headerName: 'First Name',
      flex: 1,
      renderCell: ({ row }) => (
        <Stack direction={'row'} alignItems="center" sx={{ height: 'inherit' }}>
          <Avatar
            alt={getOperatorName(row)}
            src={row.picture.thumbnail}
            sx={{ width: 40, height: 40, mr: 2 }}
          />
          <Typography>{getOperatorName(row)}</Typography>
        </Stack>
      ),
    },
    {
      field: 'cell',
      headerName: 'Phone',
      flex: 1,
    },
    {
      field: 'location',
      headerName: 'Location',
      flex: 2,
      valueGetter: (value, row) =>
        `${row.location.city}, ${row.location.state}, ${row.location.country}`,
    },
  ];

  const handleQuantityChange = (nextQuantity: string) => {
    if (nextQuantity === '') {
      setOperatorsQuantity('');
      return;
    }

    if (!/^\d+$/.test(nextQuantity)) return;
    if (parseInt(nextQuantity, 10) > 5000) return;
    if (nextQuantity.length > 1 && nextQuantity.startsWith('0')) return;

    setOperatorsQuantity(nextQuantity);
  };

  useEffect(() => {
    // Once debounced value is ready, update the search params
    setOperators(initialOperators);
  }, [initialOperators]);

  useEffect(() => {
    // Once debounced value is ready, update the search params
    if (debouncedQuantity) {
      setOperators(null);
      setSearchParams({ quantity: debouncedQuantity });
    }
  }, [debouncedQuantity, setSearchParams]);

  return (
    <Stack gap={2}>
      <Alert
        severity="info"
        variant="outlined"
        sx={{ borderRadius: '12px', bgcolor: 'background.paper' }}
      >
        {`Data here is fetched server-side via real public API`}
      </Alert>

      <Box>
        <InputLabel required htmlFor="quantity">
          Quantity
        </InputLabel>
        <TextField
          fullWidth
          value={operatorsQuantity}
          onChange={(event) => handleQuantityChange(event.target.value)}
          id="quantity"
          name="quantity"
        />
      </Box>

      <DataGrid
        rows={operators || []}
        columns={columns}
        loading={operators === null}
        getRowId={() => uuidv4()}
        disableRowSelectionOnClick
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5]}
      />
    </Stack>
  );
}
