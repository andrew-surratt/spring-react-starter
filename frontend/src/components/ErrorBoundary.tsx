import { Alert, AlertTitle } from '@mui/material';

export function ErrorBoundary() {
  return (
    <Alert severity="warning">
      <AlertTitle>Warning</AlertTitle>
      Page not found.
    </Alert>
  );
}
