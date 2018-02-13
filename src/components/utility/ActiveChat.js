import React    from 'react';
import Truncate from 'react-truncate';
import { Link } from 'react-router-dom';
import emoji    from 'emoji-dictionary';
import moment   from 'moment';

import Auth from '../../lib/Auth';

const ActiveChat = ({ chat, users }) => {
  const collocutor  = chat.participants.find(user => user.id !== Auth.getPayload().id);
  const lastMessage = chat.messages[chat.messages.length -1];
  const currentUser = chat.participants.find(user => user.id == Auth.getPayload().id);

  return (
    <div className="chat">
      <Link to={`/chats/${chat.id}`} >
        <img 
          className={ users.find(user => user.fullname === collocutor.fullname).online ? 'online' : '' } 
          src={collocutor.image }
        />
        <div className="info">
          <h2>{ collocutor.fullname }</h2>
          <p>{ lastMessage && <Truncate lines={1} ellipsis={<span>...</span>}>{ lastMessage[currentUser.language.code] }</Truncate> }</p>
          <p>{ moment(chat.updatedAt).format('llll') }</p>
        </div>
      </Link>
    </div>
  );
}

export default ActiveChat;