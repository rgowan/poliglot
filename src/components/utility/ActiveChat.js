import React from 'react';
import Truncate from 'react-truncate';
import { Link } from 'react-router-dom';
import moment from 'moment';
import emoji from 'emoji-dictionary';

import Auth from '../../lib/Auth';

const ActiveChat = ({ chat }) => {
  const collocutor  = chat.participants.find(user => user.id !== Auth.getPayload().id);
  const currentUser = chat.participants.find(user => user.id == Auth.getPayload().id);
  const lastMessage = chat.messages[chat.messages.length -1];

  console.log('Active Chat: current user id', Auth.getPayload().id);

  const unreadMessages = chat.messages.filter(message => !message.read.includes(Auth.getPayload().id));

  console.log('Acitve Chat: unread messages', unreadMessages.length);

  return (
    <div className="chat">
      <Link to={`/chats/${chat.id}`} >
        <img 
          className={ collocutor.online ? 'online' : '' } 
          src={collocutor.image }
        />
        <div className="info">
          <h2>{ collocutor.fullname }</h2>
          <p>
            { lastMessage && 
              <Truncate lines={1} ellipsis={<span>...</span>}>
                { lastMessage[currentUser.language.code] }
              </Truncate> 
            }
          </p>
          <p>{ moment(chat.updatedAt).format('llll') }</p>
        </div>
      </Link>
    </div>
  );
}

export default ActiveChat;