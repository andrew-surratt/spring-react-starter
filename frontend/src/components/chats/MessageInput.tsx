import { useTheme } from '@mui/material/styles';
import { Grid, IconButton, Input } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';

export interface MessageInputParams {
  sendMessage: (msg: string) => void;
}

export function MessageInput({ sendMessage }: MessageInputParams) {
  const theme = useTheme();
  const [message, setMessage] = useState<string>('');

  return (
    <Grid
      component={'form'}
      defaultValue=""
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage(message);
        setMessage('');
      }}
      sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
    >
      <Input
        placeholder="Type your message here..."
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        sx={{ flexGrow: 1, marginRight: 2 }}
      />
      <IconButton type="submit" sx={{ color: theme.palette.primary.main }}>
        <SendIcon />
      </IconButton>
    </Grid>
  );
}
