import {
  Avatar,
  Box,
  CircularProgress,
  Container,
  Divider,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import LoginButton from './LoginButton.tsx';
import LogoutButton from './LogoutButton.tsx';
import { Auth0UserProfile, useAuth } from '../hooks/useAuth.ts';

export const ProfilePage = () => {
  const { user, isLoading, isAuthenticated, getUserProfile } = useAuth();
  const [userMetadata, setUserMetadata] = useState<Auth0UserProfile | null>(
    null,
  );

  useEffect(() => {
    const getUserMetadata = async () => {
      if (user?.sub) {
        const userdata = await getUserProfile(user.sub);

        setUserMetadata(userdata);
      }
    };

    getUserMetadata().catch((e: unknown) => {
      console.error(e);
    });
  }, [getUserProfile, user?.sub]);

  if (isLoading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  return isAuthenticated && userMetadata ? (
    <Container>
      <Box>
        <Avatar src={userMetadata.picture} alt={userMetadata.name} />
        <Typography variant={'h4'}>{userMetadata.name}</Typography>
        <Typography>{userMetadata.email}</Typography>
      </Box>
      <Divider sx={{ paddingTop: '20px' }} />
      <Box component={'div'} pt={'20px'}>
        <LogoutButton />
      </Box>
    </Container>
  ) : (
    <Container>
      <Typography>No User found</Typography>
      <Divider sx={{ paddingTop: '20px' }} />
      <Box component={'div'} pt={'20px'}>
        <LoginButton />
      </Box>
    </Container>
  );
};
