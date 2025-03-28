import { CssBaseline, ThemeProvider } from '@mui/material';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from '@remix-run/react';
import { useEffect, useState } from 'react';

import ClientAuth0Provider from './Auth0Provider';
import theme from './theme';

import type { LinksFunction } from '@remix-run/node';

export const links: LinksFunction = () => [
  { rel: 'icon', type: 'image/png', href: '/favicon.ico' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);

    if (navigation.state === 'loading') {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [navigation.state]);

  useEffect(() => {
    if (isLoading) {
      document.title = 'Loading...';
    } else {
      document.title = 'Smooth Operator';
    }
  }, [isLoading]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ClientAuth0Provider>
        <Outlet />
      </ClientAuth0Provider>
    </ThemeProvider>
  );
}
