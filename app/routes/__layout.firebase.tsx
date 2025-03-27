import { Alert } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useLoaderData } from '@remix-run/react';
import { v4 as uuidv4 } from 'uuid';

import { dbAdmin } from '~/firebaseAdmin';

import type { GridColDef } from '@mui/x-data-grid';

interface FirebaseOperator {
  fullName: string;
  phone: string;
  location: string;
  id: string;
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

export default function Operators() {
  const { operators } = useLoaderData<typeof loader>();
  const columns: GridColDef<FirebaseOperator>[] = [
    {
      field: 'fullName',
      headerName: 'First Name',
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
    <>
      <Alert
        severity="info"
        variant="outlined"
        sx={{ mb: 2, borderRadius: '12px', bgcolor: 'background.paper' }}
      >
        {`Data here is fetched server-side via Firebase Firestore`}
      </Alert>

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
    </>
  );
}
