import { Auth0Provider } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

import type { ReactNode } from 'react';

interface ClientAuth0ProviderProps {
  children: ReactNode;
}

export default function ClientAuth0Provider({
  children,
}: ClientAuth0ProviderProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Auth0Provider
      domain={import.meta.env.AUTH0_DOMAIN}
      clientId={import.meta.env.AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: 'http://localhost:5173/api/auth0callback',
      }}
    >
      {children}
    </Auth0Provider>
  );
}

// https://remix.run/resources/remix-auth-auth0-strategy
// This is probably the way to go but as of now I failed to set it up properly.
