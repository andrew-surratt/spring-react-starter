import {
  Grid,
  Box,
  Card,
  Typography,
  CardContent,
  CardHeader,
  IconButton,
} from '@mui/material';
import { ServerDocument, useServer } from '../hooks/useServer.ts';
import DeleteIcon from '@mui/icons-material/Delete';

function Document({ document }: { document: ServerDocument }) {
  const { deleteDocument } = useServer();

  return (
    <Grid item xs={4}>
      <Card variant={'outlined'} sx={{ minHeight: 200 }}>
        <CardContent>
          <CardHeader
            title={document.name}
            action={
              <IconButton
                aria-label="delete"
                onClick={() => deleteDocument(document.id)}
              >
                <DeleteIcon />
              </IconButton>
            }
          />
          <CardContent>
            <Typography variant={'body2'}>{document.content}</Typography>
          </CardContent>
        </CardContent>
      </Card>
    </Grid>
  );
}

export function Documents({ documents }: { documents?: ServerDocument[] }) {
  return (
    <Box sx={{ padding: 5 }}>
      <Grid container spacing={2}>
        {documents &&
          documents.map((document) => (
            <Document key={document.id} document={document} />
          ))}
      </Grid>
    </Box>
  );
}
