import { useTheme } from '@mui/material/styles';
import { Card, CardContent, Container, Grid, Typography } from '@mui/material';
import { format, parseISO } from 'date-fns';

export type MessageParams = {
  direction: 'in' | 'out';
  createdDate: string;
  username: string;
  text: string;
};

export function Message({
  direction,
  createdDate,
  username,
  text,
}: MessageParams) {
  const theme = useTheme();

  return (
    <Container>
      <Grid
        container
        direction={direction === 'in' ? 'row' : 'row-reverse'}
        spacing={2}
      >
        <Grid item xs={6}>
          <Card
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
            <CardContent>
              <Typography
                variant={'subtitle2'}
                sx={{ color: 'primary.contrastText' }}
              >
                {format(createdDate, 'p')} - {username}
              </Typography>
              <Typography
                variant={'body1'}
                sx={{ color: 'primary.contrastText' }}
              >
                {text}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
