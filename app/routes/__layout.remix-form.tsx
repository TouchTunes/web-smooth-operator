import { Alert, Avatar, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useFetcher, useLoaderData } from '@remix-run/react';
import { v4 as uuidv4 } from 'uuid';

import { getOperators } from '~/src/services/operators.service';

import type { GridColDef } from '@mui/x-data-grid';
import type { Operator } from '~/src/services/operators.service';

export async function loader() {
  try {
    const operators = await getOperators();
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

export default function RemixFormSubmission() {
  const { operators } = useLoaderData<typeof loader>();
  const { state } = useFetcher<typeof loader>();
  const isLoading = state !== 'idle';
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

  return (
    <>
      <Alert
        severity="info"
        variant="outlined"
        sx={{ mb: 2, borderRadius: '12px', bgcolor: 'background.paper' }}
      >
        {`Data here is fetched server-side via real public API`}
      </Alert>

      <DataGrid
        rows={operators || []}
        columns={columns}
        loading={isLoading}
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
    </>
  );
}
