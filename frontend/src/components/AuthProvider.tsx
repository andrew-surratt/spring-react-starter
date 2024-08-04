import { Auth0Provider } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { AppState } from '@auth0/auth0-react/src/auth0-provider.tsx';

interface Auth0ProviderWithNavigateProps {
  children: JSX.Element;
}

export const Auth0ProviderWithNavigate = ({
  children,
}: Auth0ProviderWithNavigateProps) => {
  const navigate = useNavigate();

  const domain = import.meta.env.VITE_AUTH0_DOMAIN as string;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID as string;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL as string;

  const onRedirectCallback = (appState?: AppState): void => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  if (!(domain && clientId && redirectUri)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: `https://${domain}/api/v2/`,
        scope: 'read:current_user update:current_user_metadata',
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
