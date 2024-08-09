import { withAuthenticationRequired } from '@auth0/auth0-react';
import { CircularProgress, Grid } from '@mui/material';
import { ComponentType } from 'react';

interface AuthenticationGuardProps {
  component: ComponentType<object>;
}

export const AuthenticationGuard = ({
  component,
}: AuthenticationGuardProps) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        height={'100%'}
      >
        <CircularProgress />
      </Grid>
    ),
  });

  return <Component />;
};
