import { dbAdmin } from '~/firebaseAdmin';

import type { ActionFunctionArgs } from '@remix-run/node';

export interface FirebaseOperator {
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
  const { fullName, phone, role, location, intent } =
    Object.fromEntries(formData);

  const newOperator: Omit<FirebaseOperator, 'id'> = {
    fullName: fullName.toString(),
    phone: phone.toString(),
    location: location.toString(),
    role: role.toString(),
  };

  switch (intent) {
    case 'add-operator':
      try {
        await dbAdmin.collection('operators').add(newOperator);
        return { success: true, message: '' };
      } catch (error) {
        return { success: false, message: error };
      }
    case 'add-operator-error':
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error(''));
        }, 1000);
      }).then(() => {
        return {
          success: false,
          error: null,
        };
      });
    default:
      return null;
  }
}

export type ActionData = typeof action;
