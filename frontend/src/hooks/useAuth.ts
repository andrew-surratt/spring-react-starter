import { useAuth0 } from '@auth0/auth0-react';
import { useCallback } from 'react';
import { get } from '../api/server.ts';

export interface Auth0UserProfile {
  email: string;
  picture: string;
  name: string;
}

export const useAuth = () => {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN as string;
  const serverBaseUrl = import.meta.env.VITE_SERVER_BASE_URL as string;
  const { user, isLoading, isAuthenticated, getAccessTokenSilently } =
    useAuth0();

  const getAccessToken = useCallback(
    async (): Promise<string> =>
      getAccessTokenSilently({
        authorizationParams: {
          audience: `https://${domain}/api/v2/`,
          scope: 'read:current_user update:current_user_metadata',
        },
      }),
    [domain, getAccessTokenSilently],
  );

  const getUserProfile = useCallback(
    async (userSub?: string): Promise<Auth0UserProfile | null> => {
      const sub = userSub ?? user?.sub;
      if (sub) {
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${sub}`;
        const token = await getAccessToken();

        try {
          console.log(await get(`${serverBaseUrl}/user`, token));
        } catch (e) {
          console.error(e);
        }

        return get<Auth0UserProfile>(userDetailsByIdUrl, token);
      }
      return null;
    },
    [domain, user, user?.sub, serverBaseUrl, getAccessToken],
  );

  return {
    user,
    isLoading,
    isAuthenticated,
    getAccessTokenSilently: getAccessToken,
    getUserProfile,
  };
};
