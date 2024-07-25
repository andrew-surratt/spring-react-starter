import { Grid, Box } from '@mui/material';
import { Document } from './Document.tsx';

export const Documents = () => {
  return (
    <Box sx={{ padding: 5 }}>
      <Grid container spacing={2}>
        {[...Array(6).keys()].map((key) => (
          <Document key={key} />
        ))}
      </Grid>
    </Box>
  );
};
