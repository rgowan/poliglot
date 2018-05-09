import React from 'react';
import Truncate from 'react-truncate';
import { Link } from 'react-router-dom';
import moment from 'moment';
import emoji from 'emoji-dictionary';

import Auth from '../../lib/Auth';

const ActiveChat = ({ chat, archiveChat, manageChats }) => {
  const collocutor  = chat.participants.find(user => user.id !== Auth.getPayload().id);
  const currentUser = chat.participants.find(user => user.id == Auth.getPayload().id);
  const lastMessage = chat.messages[chat.messages.length -1];
  
  const unreadMessages = chat.messages.filter(message => !message.read.includes(Auth.getPayload().id));

  console.log(manageChats);
  

  return (
    <div className="chat">
      <Link to={`/chats/${chat.id}`} >
        <img 
          className={ collocutor.online ? 'online' : '' } 
          src={collocutor.image }
        />
        <div className="info">
          <h2>{ collocutor.fullname } { unreadMessages.length !== 0 && <span className="unread">{ unreadMessages.length }</span> }</h2>
          <p>
            { lastMessage && 
              <Truncate lines={1} ellipsis={<span>...</span>}>
                { lastMessage[currentUser.language.code] }
              </Truncate> 
            }
          </p>
          <p>{ moment(lastMessage.createdAt).format('llll') }</p>
        </div>
      </Link>
      <div className={ manageChats ? "archive-container" : "archive-container hide"}>
        <p onClick={ () => archiveChat(chat.id) }>
          <i class="fa fa-archive"></i>
          <span>Archive</span>
        </p>

      </div>
    </div>
  );
}

export default ActiveChat;