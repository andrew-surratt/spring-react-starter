import { Grid, Box, Card, Typography, CardContent } from '@mui/material';

function Document() {
  return (
    <Grid item xs={4}>
      <Card variant={'outlined'} sx={{ minHeight: 200 }}>
        <CardContent>
          <Typography variant={'h4'} gutterBottom>
            Document
          </Typography>
          <Typography variant={'body2'}>Document content</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export function Documents() {
  return (
    <Box sx={{ padding: 5 }}>
      <Grid container spacing={2}>
        {[...Array(6).keys()].map((key) => (
          <Document key={key} />
        ))}
      </Grid>
    </Box>
  );
}
