import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Container, createTheme, ThemeProvider } from '@mui/material';
import { NavMenu } from './components/Menu.tsx';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Home } from './routes/Home.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { Chat } from './routes/Chat.tsx';

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
      <Box height="100%">
        <NavMenu />
        <Outlet />
      </Box>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/chat',
        element: <Chat />,
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
