import { useTheme } from '@mui/material/styles';
import { Container, Grid, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';

export interface MessageInputParams {
  sendMessage: (msg: string) => void;
}

export function MessageInput({ sendMessage }: MessageInputParams) {
  const theme = useTheme();
  const [message, setMessage] = useState<string>('');

  return (
    <Container>
      <Grid
        container
        direction="row"
        spacing={1}
        alignContent={'space-between'}
        alignItems={'center'}
      >
        <Grid item sx={{ flexGrow: 1 }}>
          <TextField
            id="message-input"
            label="Type your message here..."
            variant="filled"
            sx={{ width: '100%' }}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
        </Grid>
        <Grid item>
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              sendMessage(message);
            }}
            sx={{ color: theme.palette.primary.main }}
          >
            <SendIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Container>
  );
}
