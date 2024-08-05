import { Container, Grid } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import { MessageInput } from '../components/chats/MessageInput.tsx';
import { Message } from '../components/chats/Message.tsx';
import { ServerMessage, useServer } from '../hooks/useServer.ts';

export function Chat() {
  const chatroom = '/topic/room';

  const { getMessages, getUserProfile } = useServer();

  const [wsClient, setWsClient] = useState<Client | null>(null);
  const [wsSubscription, setWsSubscription] =
    useState<StompSubscription | null>(null);
  const [messages, setMessages] = useState<ServerMessage[]>([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (wsClient === null) {
      const serverWebSocketUrl = import.meta.env
        .VITE_SERVER_WEBSOCKET_URL as string;
      const client = new Client({
        brokerURL: `${serverWebSocketUrl}/chat`,
        debug: function (str) {
          console.log(str);
        },
        reconnectDelay: 50000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      client.onConnect = function (frame) {
        console.log('WebSocket is connected ' + frame.body);
      };

      client.onWebSocketError = (e) => {
        console.error(e);
      };

      client.onStompError = function (frame) {
        // Will be invoked in case of error encountered at Broker
        // Bad login/passcode typically will cause an error
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
      };

      client.activate();
      setWsClient(client);
    }

    return () => {
      void wsClient?.deactivate();
    };
  }, [wsClient]);

  useEffect(() => {
    if (
      wsClient !== null &&
      wsClient.connected &&
      wsSubscription === null &&
      username
    ) {
      setWsSubscription(
        wsClient.subscribe(chatroom, (message: IMessage) => {
          console.log(`Received message ${message.body}`, message);
          const msg: ServerMessage = JSON.parse(message.body) as ServerMessage;
          setMessages(
            messages.concat([
              {
                id: msg.id,
                username,
                message: msg.message,
                createdDate: msg.createdDate,
              },
            ]),
          );
        }),
      );
    }

    return () => {
      wsSubscription?.unsubscribe();
    };
  }, [messages, username, wsClient, wsClient?.connected, wsSubscription]);

  useEffect(() => {
    void getMessages().then((messages) => {
      setMessages(messages);
    });
  }, [getMessages]);

  useEffect(() => {
    void getUserProfile().then((profile) => {
      setUsername(profile?.name ?? '');
    });
  }, [getUserProfile]);

  const sendMessage = useCallback(
    (message: string) => {
      if (wsClient) {
        wsClient.publish({
          destination: '/app/message',
          body: JSON.stringify({
            username: username,
            message: message,
          }),
        });
      }
    },
    [username, wsClient],
  );

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
            {messages.map((message) => (
              <Message
                key={message.id}
                direction={message.username === username ? 'out' : 'in'}
                createdDate={message.createdDate}
                username={message.username}
                text={message.message}
              />
            ))}
          </Grid>
          <Grid
            item
            sx={{ width: '100%', alignSelf: 'flex-end', margin: 'auto' }}
          >
            <MessageInput sendMessage={sendMessage} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
