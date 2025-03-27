import { Alert, Button, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { action as routeAction, loader as routeLoader } from './route.server';
import AddOperatorModal from '~/routes/__layout.firebase/AddOperatorModal';

import type { FirebaseOperator } from './route.server';
import type { GridColDef } from '@mui/x-data-grid';

export const loader = routeLoader;
export const action = routeAction;

export default function Operators() {
  const { operators } = useLoaderData<typeof routeLoader>();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
