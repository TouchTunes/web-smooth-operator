import { type MetaFunction } from '@remix-run/node';
import { redirect } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Smooth Operator' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export function loader() {
  return redirect('/dashboard');
}
