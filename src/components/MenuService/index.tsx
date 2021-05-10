import React, { useState, MouseEvent, useEffect } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { useBot } from '../../contexts/BotContext';
import './styles.css';

import { FiTwitch, FiServer, FiRefreshCcw } from 'react-icons/fi';

const MenuService = () => {
  const { statusBot, statusConn, SetInitBot, ClearClients } = useBot();
  const [statusTtv, setStatusTtv] = useState<boolean>(statusBot);

  useEffect(() => {
    setStatusTtv(statusBot);
  }, [statusBot]);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    SetInitBot(!statusBot);
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
          color={statusTtv ? 'white' : `black`}
        />
        {statusTtv ? 'on' : 'off'}
      </i>
      <i className='menu-conn' aria-controls='simple-menu' aria-haspopup='true'>
        <FiServer
          size={32}
          className='icon'
          color={statusConn !== W3CWebSocket.OPEN ? 'black' : 'white'}
        />{' '}
        {statusConn === W3CWebSocket.OPEN ? 'on' : 'off'}
      </i>
    </div>
  );
};

export default MenuService;
