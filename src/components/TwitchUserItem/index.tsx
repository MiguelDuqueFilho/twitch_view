import React, { useEffect, useState } from 'react';
import './styles.css';

import { GiHumanCannonball } from 'react-icons/gi';
import { FiAlertTriangle } from 'react-icons/fi';
import { TwitchUserValue } from '../../contexts/BotContext';
import { getMessageHTML, getBadges } from '../../services/utils';

interface TwitchUserItemProps {
  user: TwitchUserValue;
}

interface clientTwitch {
  client: TwitchUserValue;
}

const TwitchUserItem: React.FC<TwitchUserItemProps> = ({ user }) => {
  const [twitchuser, setTwitchuser] = useState<clientTwitch>({ client: user });
  const [imgs, setImgs] = useState(
    twitchuser.client.badges ? getBadges(twitchuser.client.badges) : []
  );
  const [typeUser, setTypeUser] = useState(twitchuser.client['user-id']);

  useEffect(() => {
    setTwitchuser({ client: user });
    setImgs(getBadges(twitchuser.client.badges));

    function getTypeUser() {
      let type: string = twitchuser.client['user-id'];
      if (twitchuser.client.subscriber) {
        type = 'Assinante';
      }
      if (twitchuser.client['user-type'] !== null) {
        type = twitchuser.client['user-type'] + ' ';
      }

      setTypeUser(type);
    }
    getTypeUser();
  }, [user, twitchuser.client]);

  const props = {
    dangerouslySetInnerHTML: {
      __html: getMessageHTML(twitchuser.client.message, {
        emotes: twitchuser.client.emotes,
      }),
    },
  };

  // twitchuser.client.badges && getBadges(twitchuser.client.badges);

  return (
    <article className='twitch-item'>
      <header>
        {imgs &&
          imgs?.map((imgItem: string, index) => (
            <img key={index} alt='badges' src={imgItem} />
          ))}
        <div className='twitch-user'>
          <strong>#{twitchuser.client.username}</strong>
          <span>{twitchuser.client['display-name']}</span>
        </div>
      </header>
      {twitchuser.client.message !== '' && (
        <div className='mensagem'>
          <span className='title-emotion'>Última mensagem:</span>
          <div className='emotion' {...props}></div>
        </div>
      )}
      {/* <div
        dangerouslySetInnerHTML={{
          __html:
            twitchuser.client.message &&
            formatEmotes(twitchuser.client.message, twitchuser.client.emotes),
        }}
      ></div> */}
      {/* <img
        className='emoticon'
        src='http://static-cdn.jtvnw.net/emoticons/v1/425618/3.0'
      /> */}
      <footer>
        <p>
          <strong>{typeUser}</strong>
        </p>
        <i className='timeout' onClick={() => {}}>
          <FiAlertTriangle size={20} className='icon' color={'gray'} />
        </i>
        <i className='ban' onClick={() => {}}>
          <GiHumanCannonball size={20} className='icon' color={'gray'} />
        </i>
      </footer>
    </article>
  );
};

export default TwitchUserItem;
