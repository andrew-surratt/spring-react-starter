import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, createTheme, ThemeProvider } from '@mui/material';
import { NavMenu } from './components/Menu.tsx';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Home } from './routes/Home.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { Chat } from './routes/Chat.tsx';
import { Auth0ProviderWithNavigate } from './components/AuthProvider.tsx';
import { AuthenticationGuard } from './components/AuthGuard.tsx';
import { ProfilePage } from './components/Profile.tsx';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3e63dd',
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Auth0ProviderWithNavigate>
        <Box height="100%">
          <NavMenu />
          <Outlet />
        </Box>
      </Auth0ProviderWithNavigate>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/chat',
        element: <AuthenticationGuard component={Chat} />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: '*',
    element: (
      <Box height="100%">
        <NavMenu />
        <ErrorBoundary />
      </Box>
    ),
    errorElement: <ErrorBoundary />,
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
