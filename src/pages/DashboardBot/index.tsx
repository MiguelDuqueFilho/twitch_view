import React, { useState, useEffect } from 'react';
import './styles.css';

import PageHeader from '../../components/PageHeader';
import { GrConnect } from 'react-icons/gr';
import { useBot, RommStateData } from '../../contexts/BotContext';

const DashboardBot: React.FC = () => {
  const { clients, statusConn, statusBot, roomState, R9k } = useBot();
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
            <span className='card-item'>
              Server :{' '}
              <span
                className={`card-item-dados ${statusConn ? 'ok' : 'alert'}`}
              >
                {statusConn ? 'On' : 'Off'}
              </span>
            </span>
            <span className='card-item'>
              Twitch :{' '}
              <span className={`card-item-dados ${statusBot ? 'ok' : 'alert'}`}>
                {statusBot ? 'On' : 'Off'}
              </span>
            </span>
          </div>
        </section>
        <section className='cards'>
          <span className='section-header'>Canal status</span>
          <div className='card-content'>
            <span className='card-item'>
              channel :{' '}
              <span className='card-item-dados ok'>
                {channelStatus.channel}
              </span>
            </span>
            <span className='card-item'>
              roomId :{' '}
              <span className='card-item-dados ok'>
                {channelStatus['room-id']}
              </span>
            </span>
            <span className='card-item'>
              Modo somente Emote :{' '}
              <span
                className={`card-item-dados ${
                  channelStatus['emote-only'] ? 'alert' : ''
                }`}
              >
                {channelStatus['emote-only'] ? 'On' : 'Off'}
              </span>
            </span>
            <span className='card-item'>
              Modo somente Seguidores :{' '}
              <span
                className={`card-item-dados ${
                  channelStatus['followers-only'] !== '-1' ? 'alert' : ''
                }`}
              >
                {channelStatus['followers-only']}
              </span>
            </span>
            <span className='card-item'>
              Modo R9k :{' '}
              <span
                className={`card-item-dados ${
                  channelStatus.r9k ? 'alert' : ''
                }`}
              >
                {channelStatus.r9k ? 'On' : 'Off'}
              </span>
            </span>
            <span className='card-item'>
              Modo Rituals :{' '}
              <span
                className={`card-item-dados ${
                  channelStatus.rituals ? 'alert' : ''
                }`}
              >
                {channelStatus.rituals ? 'On' : 'Off'}
              </span>
            </span>
            <span className='card-item'>
              Modo Slow :{' '}
              <span
                className={`card-item-dados ${
                  channelStatus.slow ? 'alert' : ''
                }`}
              >
                {channelStatus.slow ? 'On' : 'Off'}
              </span>
            </span>
            <span className='card-item'>
              {/* subscribe = assinantes */}
              Modo somente Assinantes :{' '}
              <span
                className={`card-item-dados ${
                  channelStatus['subs-only'] ? 'alert' : ''
                }`}
              >
                {channelStatus['subs-only'] ? 'On' : 'Off'}
              </span>
            </span>
          </div>
        </section>
        <section className='cards'>
          <span className='section-header'>Acões do canal</span>
          <div className='card-content'>
            <span className='card-item'>
              <span className='card-ref'>Comercial</span>
              <i
                onClick={() => {
                  alert('comercial acionado');
                }}
              >
                <GrConnect
                  size={20}
                  className='icon'
                  color={true ? 'green' : `black`}
                />
              </i>
            </span>
            <span className='card-item'>
              <span className='card-ref'>R9k</span>
              <i
                onClick={() => {
                  R9k(!channelStatus.r9k);
                }}
              >
                <GrConnect
                  size={20}
                  className='icon'
                  color={true ? 'green' : `black`}
                />
              </i>
            </span>
          </div>
        </section>
        <section className='cards'>
          <span className='section-header'>Usuários bot</span>
          <div className='card-content'>
            <span className='card-item '>
              Total : <span className='card-item-dados ok'>{totalClients}</span>{' '}
              usuários
            </span>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardBot;
