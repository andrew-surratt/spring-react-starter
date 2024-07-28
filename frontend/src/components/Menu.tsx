import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';
import HomeIcon from '@mui/icons-material/Home';

export const NavMenu = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            React Starter
          </Typography>
          <IconButton aria-label="home">
            <Link to={'/'}>
              <HomeIcon />
            </Link>
          </IconButton>
          <IconButton size="large" aria-label="chat" color="inherit">
            <Link to={'/chat'}>
              <ChatIcon />
            </Link>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
