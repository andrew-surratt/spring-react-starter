import {
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';

type MessageParams = {
  direction: 'in' | 'out';
  text: string;
};

function Message({ direction, text }: MessageParams) {
  const theme = useTheme();

  return (
    <Container>
      <Grid
        container
        direction={direction === 'in' ? 'row' : 'row-reverse'}
        spacing={2}
      >
        <Grid item xs={6}>
          <Paper
            sx={{
              borderRadius: '15px',
              margin: '5px',
              backgroundColor:
                direction === 'in'
                  ? theme.palette.primary.light
                  : theme.palette.primary.main,
              ...(direction === 'in'
                ? {
                    borderBottomLeftRadius: '0',
                  }
                : {
                    borderBottomRightRadius: '0',
                  }),
            }}
          >
            <Typography
              variant={'body1'}
              sx={{
                padding: '10px',
                paddingLeft: '20px',
                color: theme.palette.primary.contrastText,
              }}
            >
              {text}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

function MessageInput() {
  const theme = useTheme();

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
          />
        </Grid>
        <Grid item>
          <IconButton sx={{ color: theme.palette.primary.main }}>
            <SendIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Container>
  );
}

export function Chat() {
  return (
    <>
      <Container maxWidth={'lg'} sx={{ height: '90vh' }}>
        <Grid
          container
          direction="column"
          spacing={2}
          alignContent={'center'}
          sx={{ width: '100%', height: '100%' }}
        >
          <Grid item sx={{ width: '100%', flexGrow: 1, mt: 1 }}>
            <Message direction={'in'} text={'Hello'} />
            <Message direction={'out'} text={'Hi there'} />
          </Grid>
          <Grid
            item
            sx={{ width: '100%', alignSelf: 'flex-end', margin: 'auto' }}
          >
            <MessageInput />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
