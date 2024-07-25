import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, createTheme, ThemeProvider } from '@mui/material';
import { NavMenu } from './components/Menu.tsx';
import { Documents } from './components/Documents.tsx';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3e63dd',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <NavMenu />
        <Documents />
      </Box>
    </ThemeProvider>
  );
}

export default App;
