import { Card, Grid, Typography } from '@mui/material';

export const Document = () => {
  return (
    <Grid item xs={4}>
      <Card sx={{ minHeight: 200 }}>
        <Typography variant={'h6'} sx={{ textAlign: 'center' }}>
          Document
        </Typography>
      </Card>
    </Grid>
  );
};
