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
      domain="dev--d6f2kxp.us.auth0.com"
      clientId="aYmWlr6lBk2wMUkKNWm19nKAEeF47bWZ"
      authorizationParams={{
        redirect_uri: 'http://localhost:5173/api/auth0callback',
      }}
    >
      {children}
    </Auth0Provider>
  );
}
