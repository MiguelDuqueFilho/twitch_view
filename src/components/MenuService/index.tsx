import React, { useState, MouseEvent } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { useBot } from '../../contexts/BotContext';
import './styles.css';

import { FiTwitch, FiServer, FiRefreshCcw } from 'react-icons/fi';

const MenuService = () => {
  const [statusTtv, setStatusTtv] = useState<boolean>(true);
  const { statusBot, statusConn, SetInitBot, ClearClients } = useBot();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    SetInitBot(statusTtv);
    setStatusTtv(!statusTtv);
  };

  const handleClear = (event: MouseEvent<HTMLButtonElement>) => {
    ClearClients();
  };

  return (
    <div className='menu'>
      <i
        className='menu-conn'
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClear}
      >
        <FiRefreshCcw
          size={32}
          className='icon'
          color={statusBot ? 'white' : `black`}
        />
      </i>
      <i
        className='menu-conn'
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClick}
      >
        <FiTwitch
          size={32}
          className='icon'
          color={statusBot ? 'white' : `black`}
        />
      </i>
      <i className='menu-conn' aria-controls='simple-menu' aria-haspopup='true'>
        <FiServer
          size={32}
          className='icon'
          color={statusConn !== W3CWebSocket.OPEN ? 'black' : 'white'}
        />
      </i>
    </div>
  );
};

export default MenuService;
