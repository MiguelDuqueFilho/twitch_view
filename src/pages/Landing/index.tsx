import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import { FiTwitch } from 'react-icons/fi';
import { RiVipLine } from 'react-icons/ri';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
import { useBot } from '../../contexts/BotContext';

const Landing: React.FC = () => {
  const [totalConnections, setTotalConnections] = useState(0);
  const { clients } = useBot();

  useEffect(() => {
    setTotalConnections(Object.keys(clients).length);
  }, [clients]);

  return (
    <div id='page-landing'>
      <div id='page-landing-content' className='container'>
        <div className='logo-container'>
          <img src={logoImg} alt='duqueta' />
          <h2>Duqueta's Twitch Bot</h2>
        </div>
        <img
          src={landingImg}
          alt='Plataforma de estudos'
          className='hero-image'
        />
        <div className='buttons-container'>
          <Link to='/twitchuseract' className='twitch-user'>
            <FiTwitch size={32} className='icon' />
            Usuários ativos
          </Link>
          <Link to='/twitch-user-vip' className='twitch-user-vip'>
            <RiVipLine size={32} className='icon' />
            Usuários vips
          </Link>
        </div>
        <span className='total-connections'>
          Total de {totalConnections} usuários contabilizados
          <img src={purpleHeartIcon} alt='Coração roxo' />
        </span>
      </div>
    </div>
  );
};

export default Landing;
