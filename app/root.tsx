import { Auth0Provider } from '@auth0/auth0-react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

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
      <Auth0Provider
        domain="dev--d6f2kxp.us.auth0.com"
        clientId="aYmWlr6lBk2wMUkKNWm19nKAEeF47bWZ"
        authorizationParams={{
          redirect_uri: 'http://localhost:5173/api/auth0callback',
        }}
      >
        <Outlet />
      </Auth0Provider>
    </ThemeProvider>
  );
}
