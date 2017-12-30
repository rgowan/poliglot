import React    from 'react';
import Truncate from 'react-truncate';
import { Link } from 'react-router-dom';
import moment   from 'moment';
import emoji    from 'emoji-dictionary';

import Auth from '../../lib/Auth';

const ActiveChat = ({ data, users }) => {
  const collocutor = data.participants.find(user => user.id !== Auth.getPayload().id);
  const lastMessage = data.messages[data.messages.length -1];

  return (
    <div className="chat">
      <Link to={`/chats/${data.id}`} >
        <img 
          className={ users.find(user => user.fullname === collocutor.fullname).online ? 'online' : '' } 
          src={collocutor.image }
        />
        <div className="info">
          <h2>{ collocutor.fullname } { emoji.getUnicode(`${data.language.emoji}`) }</h2>
          <Truncate lines={1} ellipsis={<span>...</span>}>{lastMessage.content}</Truncate>
          <p>{ moment(data.updatedAt).format('llll') }</p>
        </div>
      </Link>
    </div>
  );
}

export default ActiveChat;