import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';
import HomeIcon from '@mui/icons-material/Home';
import UserIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';

import { useTheme } from '@mui/material/styles';
import { useAuth0 } from '@auth0/auth0-react';

export const NavMenu = () => {
  const theme = useTheme();
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <Box sx={{ height: '10vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            React Starter
          </Typography>
          <IconButton aria-label="home" sx={{ paddingRight: 1.4 }}>
            <Link to={'/'}>
              <HomeIcon sx={{ color: theme.palette.primary.contrastText }} />
            </Link>
          </IconButton>
          {isAuthenticated ? (
            <Box>
              <IconButton size="large" aria-label="chat" color="inherit">
                <Link to={'/chat'}>
                  <ChatIcon
                    sx={{ color: theme.palette.primary.contrastText }}
                  />
                </Link>
              </IconButton>
              <IconButton
                size="large"
                aria-label="profile"
                sx={{ padding: 1.2, paddingTop: 1.1 }}
              >
                <Link to={'/profile'}>
                  <UserIcon
                    sx={{ color: theme.palette.primary.contrastText }}
                  />
                </Link>
              </IconButton>
            </Box>
          ) : (
            <IconButton
              size="medium"
              aria-label="login"
              sx={{ padding: 1, paddingTop: 0.5 }}
              onClick={() => loginWithRedirect()}
            >
              <LoginIcon sx={{ color: theme.palette.primary.contrastText }} />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
