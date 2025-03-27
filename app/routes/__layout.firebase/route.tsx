import DeleteIcon from '@mui/icons-material/Delete';
import { Alert, Button, IconButton, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useFetcher, useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { action as routeAction, loader as routeLoader } from './route.server';
import AddOperatorModal from '~/routes/__layout.firebase/AddOperatorModal';
import ErrorBoundaryComponent from '~/src/components/ErrorBoundaryBase';

import type { FirebaseOperator } from './route.server';
import type { GridColDef } from '@mui/x-data-grid';

export const loader = routeLoader;
export const action = routeAction;

export default function Operators() {
  const { operators } = useLoaderData<typeof routeLoader>();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { state, submit } = useFetcher<typeof routeAction>();

  const deleteOperator = (operatorId: string) => {
    submit(
      { intent: 'delete-operator', operatorId },
      {
        method: 'POST',
      },
    );
  };

  const columns: GridColDef<FirebaseOperator>[] = [
    {
      field: 'fullName',
      headerName: 'First Name',
      flex: 1,
    },
    {
      field: 'role',
      headerName: 'Role',
      flex: 1,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      flex: 1,
    },
    {
      field: 'location',
      headerName: 'Location',
      flex: 2,
    },
    {
      field: 'actions',
      headerName: '',
      flex: 0.5,
      renderCell: ({ row }) => (
        <IconButton
          aria-label="delete"
          size="small"
          onClick={() => deleteOperator(row.id)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];

  return (
    <Stack gap={2}>
      <Alert
        severity="info"
        variant="outlined"
        sx={{ borderRadius: '12px', bgcolor: 'background.paper' }}
      >
        {`Data here is fetched server-side via Firebase Firestore`}
      </Alert>

      <Button
        variant="outlined"
        onClick={() => setIsAddModalOpen((previousState) => !previousState)}
      >
        Add Operator
      </Button>

      <DataGrid
        rows={operators || []}
        columns={columns}
        loading={state !== 'idle'}
        getRowId={() => uuidv4()}
        disableRowSelectionOnClick
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
      />

      <AddOperatorModal
        isModalOpen={isAddModalOpen}
        handleClose={() => setIsAddModalOpen((previousState) => !previousState)}
      />
    </Stack>
  );
}

export function ErrorBoundary() {
  return <ErrorBoundaryComponent />;
}
