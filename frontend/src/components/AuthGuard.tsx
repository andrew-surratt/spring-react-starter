import { withAuthenticationRequired } from '@auth0/auth0-react';
import { CircularProgress } from '@mui/material';
import { ComponentType } from 'react';

interface AuthenticationGuardProps {
  component: ComponentType<object>;
}

export const AuthenticationGuard = ({
  component,
}: AuthenticationGuardProps) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="page-layout">
        <CircularProgress />
      </div>
    ),
  });

  return <Component />;
};
