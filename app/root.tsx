import { CssBaseline, ThemeProvider } from '@mui/material';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ClientAuth0Provider>
        <Outlet />
      </ClientAuth0Provider>
    </ThemeProvider>
  );
}
