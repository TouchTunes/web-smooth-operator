import { Alert, Button, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { dbAdmin } from '~/firebaseAdmin';
import AddOperatorModal from '~/src/components/AddOperatorModal';

import type { GridColDef } from '@mui/x-data-grid';
import type { ActionFunctionArgs } from '@remix-run/node';

interface FirebaseOperator {
  fullName: string;
  phone: string;
  location: string;
  id: string;
  role: string;
}

export async function loader() {
  const snapshot = await dbAdmin.collection('operators').get();
  const operators: FirebaseOperator[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<FirebaseOperator, 'id'>),
  }));

  return {
    operators,
  };
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const { fullName, phone, role, location } = Object.fromEntries(formData);

  const newOperator: Omit<FirebaseOperator, 'id'> = {
    fullName: fullName.toString(),
    phone: phone.toString(),
    location: location.toString(),
    role: role.toString(),
  };

  try {
    await dbAdmin.collection('operators').add(newOperator);
    return { success: true, message: '' };
  } catch (error) {
    console.log(error);
    return { success: false, message: error };
  }
}

export default function Operators() {
  const { operators } = useLoaderData<typeof loader>();
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
              pageSize: 10,
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

export type ActionData = typeof action;
