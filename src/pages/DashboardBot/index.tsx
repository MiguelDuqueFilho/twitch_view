import React, { useState, useEffect } from 'react';
import './styles.css';

import PageHeader from '../../components/PageHeader';

import { useBot, RommStateData } from '../../contexts/BotContext';

const DashboardBot: React.FC = () => {
  const { clients, statusConn, statusBot, roomState } = useBot();
  const [totalClients, setTotalClients] = useState(0);
  const [channelStatus, setchannelStatus] = useState<RommStateData>(roomState);

  useEffect(() => {
    const total = Object.entries(clients).length;
    setTotalClients(total);
  }, [clients]);

  useEffect(() => {
    setchannelStatus(roomState);
  }, [roomState]);

  return (
    <div id='page-dashboard-bot' className='container'>
      <PageHeader title='Dashboard'></PageHeader>
      <main>
        <section className='cards'>
          <span className='section-header'>Comunicação status</span>
          <div className='card-content'>
            <span className='cards-item'>
              Server :{' '}
              <span
                className={`cards-item-dados ${statusConn ? 'ok' : 'alert'}`}
              >
                {statusConn ? 'Ativo' : 'Inativo'}
              </span>
            </span>
            <span className='cards-item'>
              Twitch :{' '}
              <span
                className={`cards-item-dados ${statusBot ? 'ok' : 'alert'}`}
              >
                {statusBot ? 'Ativo' : 'Inativo'}
              </span>
            </span>
          </div>
        </section>
        <section className='cards'>
          <span className='section-header'>Canal status</span>
          <div className='card-content'>
            <span className='cards-item'>
              channel :{' '}
              <span className='cards-item-dados ok'>
                {channelStatus.channel}
              </span>
            </span>
            <span className='cards-item'>
              roomId :{' '}
              <span className='cards-item-dados ok'>
                {channelStatus['room-id']}
              </span>
            </span>
            <span className='cards-item'>
              Modo somente Emote :{' '}
              <span
                className={`cards-item-dados ${
                  channelStatus['emote-only'] ? 'alert' : ''
                }`}
              >
                {channelStatus['emote-only'] ? 'Ativo' : 'Inativo'}
              </span>
            </span>
            <span className='cards-item'>
              Modo somente Seguidores :{' '}
              <span
                className={`cards-item-dados ${
                  channelStatus['followers-only'] !== '-1' ? 'alert' : ''
                }`}
              >
                {channelStatus['followers-only']}
              </span>
            </span>
            <span className='cards-item'>
              Modo R9k :{' '}
              <span
                className={`cards-item-dados ${
                  channelStatus.r9k ? 'alert' : ''
                }`}
              >
                {channelStatus.r9k ? 'Ativo' : 'Inativo'}
              </span>
            </span>
            <span className='cards-item'>
              Modo Rituals :{' '}
              <span
                className={`cards-item-dados ${
                  channelStatus.rituals ? 'alert' : ''
                }`}
              >
                {channelStatus.rituals ? 'Ativo' : 'Inativo'}
              </span>
            </span>
            <span className='cards-item'>
              Modo Slow :{' '}
              <span
                className={`cards-item-dados ${
                  channelStatus.slow ? 'alert' : ''
                }`}
              >
                {channelStatus.slow ? 'Ativo' : 'Inativo'}
              </span>
            </span>
            <span className='cards-item'>
              {/* subscribe = assinantes */}
              Modo somente Assinantes :{' '}
              <span
                className={`cards-item-dados ${
                  channelStatus['subs-only'] ? 'alert' : ''
                }`}
              >
                {channelStatus['subs-only'] ? 'Ativo' : 'Inativo'}
              </span>
            </span>
          </div>
        </section>
        <section className='cards'>
          <span className='section-header'>Usuários bot</span>
          <div className='card-content'>
            <span className='cards-item '>
              Total :{' '}
              <span className='cards-item-dados ok'>{totalClients}</span>{' '}
              usuários
            </span>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardBot;
