import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Navbar from '../utility/Navbar';
import Auth from '../../lib/Auth';

class ChatsIndex extends React.Component {
  constructor() {
    super();

    this.state = {
      chats: []
    };
  }

  componentDidMount() {
    axios
      .get('/api/chats', { headers: { Authorization: `Bearer ${Auth.getToken()}`} })
      .then(res => this.setState({ chats: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return(
      <div>
        <Navbar title='Chats' />
        { this.state.chats[0] && <div className="container">
          <ul className="chat-index-container">
            { this.state.chats.map(chat => 
              <li key={chat.id} className="chat-tile">
                <Link to={`/chats/${chat.id}`}>
                  <div className="chat-picture">
                    <img src={chat.participants[1].image }/>
                  </div>
                  <div className="chat-info">
                    <h2>{chat.participants[1].fullname}</h2>
                    <p>{ chat.messages[chat.messages.length -1].content }</p>
                  </div>
                </Link>
              </li>
            )}
          </ul>
          </div> }
      </div>
    );
  } 
}

export default ChatsIndex;
