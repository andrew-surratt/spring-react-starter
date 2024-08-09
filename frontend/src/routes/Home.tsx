import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { Documents } from '../components/Documents.tsx';
import { ServerDocument, useServer } from '../hooks/useServer.ts';
import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth.ts';

export const Home = () => {
  const { isAuthenticated } = useAuth();
  const { createDocument, getDocuments } = useServer();
  const [open, setOpen] = useState(false);
  const [documents, setDocuments] = useState<ServerDocument[] | undefined>([]);

  useEffect(() => {
    const effect = async () => {
      if (!open) {
        const response = await getDocuments();

        setDocuments(response);
      }
    };

    effect().catch((e: unknown) => {
      console.error(e);
    });
  }, [getDocuments, open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Box sx={{ paddingLeft: 5 }}>
        {isAuthenticated && (
          <Button variant="contained" onClick={handleClickOpen}>
            Create Document
          </Button>
        )}
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());

            createDocument({
              name: typeof formJson.name === 'string' ? formJson.name : '',
              content:
                typeof formJson.content === 'string' ? formJson.content : '',
            }).catch((e: unknown) => {
              console.error(e);
            });
            handleClose();
          },
        }}
      >
        <DialogTitle>Create Document</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter the Document Details.</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="content"
            name="content"
            label="Content"
            type="text"
            multiline
            rows={3}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
      <Documents documents={documents} />
    </Box>
  );
};
