import { useCallback } from 'react';
import { deleteCall, get, post } from '../api/server.ts';
import { useAuth } from './useAuth.ts';

export type ServerDocument = {
  id: string;
  name: string;
  content: string;
};

export type ServerMessage = {
  id: string;
  username: string;
  message: string;
  createdDate: string;
};

export type ServerDocumentRequest = Omit<ServerDocument, 'id'>;

export const useServer = () => {
  const serverUrl = import.meta.env.VITE_SERVER_BASE_URL as string;
  const { getAccessTokenSilently, getUserProfile } = useAuth();

  const getDocuments = useCallback(async (): Promise<ServerDocument[]> => {
    const url = `${serverUrl}/documents`;
    const token = await getAccessTokenSilently();

    return get(url, token);
  }, [serverUrl, getAccessTokenSilently]);

  const createDocument = useCallback(
    async (document: ServerDocumentRequest): Promise<void> => {
      const url = `${serverUrl}/documents`;
      const token = await getAccessTokenSilently();

      return post(url, document, token);
    },
    [serverUrl, getAccessTokenSilently],
  );

  const deleteDocument = useCallback(
    async (documentId: string): Promise<void> => {
      const url = `${serverUrl}/documents/${documentId}`;
      const token = await getAccessTokenSilently();

      return deleteCall(url, token);
    },
    [serverUrl, getAccessTokenSilently],
  );

  const getMessages = useCallback(async (): Promise<ServerMessage[]> => {
    const url = `${serverUrl}/messages`;
    const token = await getAccessTokenSilently();

    return get(url, token);
  }, [serverUrl, getAccessTokenSilently]);

  return {
    getUserProfile,
    getDocuments,
    createDocument,
    deleteDocument,
    getMessages,
  };
};
