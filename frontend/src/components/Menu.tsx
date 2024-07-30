import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';
import HomeIcon from '@mui/icons-material/Home';
import { useTheme } from '@mui/material/styles';

export const NavMenu = () => {
  const theme = useTheme();

  return (
    <Box sx={{ height: '10vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            React Starter
          </Typography>
          <IconButton aria-label="home">
            <Link to={'/'}>
              <HomeIcon sx={{ color: theme.palette.primary.contrastText }} />
            </Link>
          </IconButton>
          <IconButton size="large" aria-label="chat" color="inherit">
            <Link to={'/chat'}>
              <ChatIcon sx={{ color: theme.palette.primary.contrastText }} />
            </Link>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
