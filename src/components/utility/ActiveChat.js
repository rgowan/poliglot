import React    from 'react';
import { Link } from 'react-router-dom';
import moment   from 'moment';

import Auth from '../../lib/Auth';

const ActiveChat = ({ data, users }) => {
  const collocutor = data.participants.find(user => user.id !== Auth.getPayload().id);

  return (
    <div className="chat">
      <Link to={`/chats/${data.id}`} >
        <img 
          className={ users.find(user => user.fullname === collocutor.fullname).online ? 'online' : '' } 
          src={collocutor.image }
        />
        <div className="info">
          <h2>{ collocutor.fullname }</h2>
          <p>{ data.messages[data.messages.length -1].content }</p>
          <p>{ moment(data.updatedAt).format('llll') }</p>
        </div>
      </Link>
    </div>
  );
}

export default ActiveChat;