import { createContext, useState, useContext, useEffect } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

export interface TwitchUserValue {
  badges?: object;
  color: string;
  'display-name': string;
  emotes: any;
  mod: boolean;
  'room-id': string;
  subscriber: boolean;
  turbo: boolean;
  'user-id': string;
  'user-type': string;
  'emotes-raw': any;
  'badges-raw': string;
  username: string;
  'message-type': string;
  message?: string;
}

export interface TwitchUser {
  [key: string]: TwitchUserValue;
}

export interface BotContextData {
  client: W3CWebSocket;
  statusConn: number;
  statusBot: boolean;
  clients: TwitchUser;
  roomState: RommStateData;
  SetInitBot(value: boolean): void;
  ClearClients(): void;
}

export interface RommStateData {
  'emote-only': boolean;
  'followers-only': string;
  r9k: boolean;
  rituals: boolean;
  'room-id': string;
  slow: boolean;
  'subs-only': boolean;
  channel: string;
}

const rommStateinit = {
  'emote-only': false,
  'followers-only': '',
  r9k: false,
  rituals: false,
  'room-id': '',
  slow: false,
  'subs-only': false,
  channel: '',
};

const BotContext = createContext<BotContextData>({} as BotContextData);
const client = new W3CWebSocket('ws://127.0.0.1:8000');

export const BotProvider: React.FC = ({ children }) => {
  const [clients, setClients] = useState<TwitchUser>({});
  const [statusConn, setStatusConn] = useState<number>(W3CWebSocket.CLOSED);
  const [statusBot, setStatusBot] = useState<boolean>(false);
  const [roomState, setRoomState] = useState<RommStateData>(rommStateinit);
  // const [messageReceived, setMessageReceived] = useState<string>('');

  useEffect(() => {
    // client = new W3CWebSocket('ws://127.0.0.1:8000');
    setStatusBot(false);
    client.onerror = function () {
      console.log('Connection Error');
    };

    client.onopen = () => {
      console.log('WebSocket Client Connected');
      setStatusConn(W3CWebSocket.OPEN);
    };
    client.onclose = () => {
      console.log('WebSocket Client Closed');
      setStatusConn(W3CWebSocket.CLOSED);
      setStatusBot(false);
    };

    client.onmessage = (message) => {
      console.log(' >>>>>>>> Received: ' + message.data);
      if (typeof message.data === 'string') handleData(message.data);
    };
  }, []);

  function handleData(msg: string) {
    const objMsg = JSON.parse(msg);
    switch (objMsg.type) {
      case 'command':
        console.log('handle command not implemented');
        break;
      case 'message':
        if (objMsg.data === 'initbot') {
          setStatusBot(true);
        }
        if (objMsg.data === 'termbot') {
          setStatusBot(false);
        }
        break;
      case 'clients':
        setClients(objMsg.data);
        break;
      case 'roomstate':
        setRoomState(objMsg.data);
        break;
      case 'twitchMsg':
        // if (!user['emotes'] || user['emotes'].length === 0) {
        //   return message;
        // }
        break;
      default:
        console.log(`erro de typo de mensagem `);
        break;
    }
  }

  // function handleClients(msg: msgProps) {
  //   const newdata = JSON.parse(String(msg.data));
  //   console.log(`clients=${JSON.stringify(clients)}`);
  //   console.log(`data=${JSON.stringify(newdata)}`);
  //   setClients([...clients, ...newdata]);
  //   console.log(`clients+data=${JSON.stringify(clients)}`);
  // }

  function sendInitTtv(value: boolean) {
    if (statusConn === W3CWebSocket.OPEN) {
      const data = { type: 'command', data: value ? 'initbot' : 'termbot' };
      client.send(JSON.stringify(data));
    } else {
      console.log('WebSocket not Open');
    }
  }

  function SetInitBot(value: boolean) {
    sendInitTtv(value);
  }

  function ClearClients() {
    if (statusConn === W3CWebSocket.OPEN) {
      const data = { type: 'command', data: 'clearclients' };
      client.send(JSON.stringify(data));
    } else {
      console.log('WebSocket not Open');
    }
  }

  return (
    <BotContext.Provider
      value={{
        client,
        statusBot,
        statusConn,
        clients,
        roomState,
        SetInitBot,
        ClearClients,
      }}
    >
      {children}
    </BotContext.Provider>
  );
};

export function useBot() {
  const context = useContext(BotContext);
  return context;
}
