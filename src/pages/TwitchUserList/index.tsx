import React, { useState, FormEvent, useEffect } from 'react';
import './styles.css';

import PageHeader from '../../components/PageHeader';
import TwitchUserItem from '../../components/TwitchUserItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import { useBot, TwitchUser } from '../../contexts/BotContext';

const TwitchUserList: React.FC = () => {
  const { clients } = useBot();
  const [twitchUsers, setTwitchUsers] = useState<TwitchUser>(clients);
  const [search, setSearch] = useState('');
  const [tipo, setTipo] = useState('');

  useEffect(() => {
    let filtered = clients;
    if (search.length >= 3) {
      filtered = Object.fromEntries(
        Object.entries(clients).filter(([key, val]) => key.includes(search))
      );
    }
    setTwitchUsers(filtered);
  }, [clients, search]);

  async function searchTwitchUsers(e: FormEvent) {
    e.preventDefault();
    // const response = await api.get('classes', {
    //   params: {
    //     subject,
    //     week_day,
    //     time,
    //   }),
  }

  // setTwitchUsers(response.data);

  return (
    <div id='page-twitchUser-list' className='container'>
      <PageHeader title='Twitch users '>
        <form id='search-twitchUsers' onSubmit={searchTwitchUsers}>
          <Input
            name='user'
            label='pesquisa usuários'
            type='text'
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <Select
            name='tipo'
            label='tipo usuário'
            value={tipo}
            onChange={(e) => {
              setTipo(e.target.value);
            }}
            options={[
              { value: '', label: 'Nenhuma' },
              { value: 'followers', label: 'Seguidores' },
              { value: 'vip', label: 'Vip' },
              { value: 'subscriber', label: 'Assinante' },
              { value: 'mod', label: 'Moderador' },
            ]}
          />
        </form>
      </PageHeader>
      <main>
        {Object.entries(twitchUsers).map(([key, value]) => (
          <TwitchUserItem key={key} user={value} />
        ))}
      </main>
    </div>
  );
};

export default TwitchUserList;
