import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import socketIOClient from 'socket.io-client';

import Auth from '../../lib/Auth';
import Navbar from '../utility/Navbar';
import ActiveChat from '../utility/ActiveChat';
import AutosuggestContainer from '../utility/AutosuggestContainer';

class ChatsIndex extends Component {
  state = {
    chats: [],
    filteredUsers: [],
    inputValue: ''
  }

  websocket = socketIOClient('/sockets');

  componentDidMount() {
    const headers = { Authorization: `Bearer ${Auth.getToken()}`};

    axios
      .all([
        axios.get('/api/chats', { headers }),
        axios.get('/api/users', { headers })
      ])
      .then(axios.spread((chats, users) => this.setState({ 
        chats: chats.data, 
        users: users.data })
      ))
      .catch(err => console.log(err));

    this.websocket.on('login',  user => this.updateUserOnAuth(true, user));
    this.websocket.on('logout', user => this.updateUserOnAuth(false, user));
  }

  componentWillUnmount() {
    this.websocket.disconnect(true);
  }

  updateUserOnAuth(boolean, user) {
    const chats = this.state.chats.map(chat => {
      const participant = chat.participants.find(person => person.id === user.id);
      if(participant) {
        participant.online = boolean;
        return chat;
      }

      return chat;
    });

    this.setState({ chats });
  }

  handleClick = (e, target) => {
    const userId = this.state.users.find(user => user.fullname === target.suggestionValue).id;

    axios
      .post(`/api/chats/create/${userId}`, {}, { 
        headers: { Authorization: `Bearer ${Auth.getToken()}`} 
      })
      .then(res => this.props.history.push(`/chats/${res.data.id}`))
      .catch(err => console.log(err));
  }

  render() {
    return(
      <Fragment>
        <Navbar title='Chats'/>
        <div className="container">
          <AutosuggestContainer 
            chats={this.state.chats}
            users={this.state.users}
            history={this.props.history}
          />

          <div className="chats-container">
            <h2>Active Chats</h2>
            { this.state.chats.length !== 0 ? 
              this.state.chats.map(chat => 
                <ActiveChat 
                  key={chat.id} 
                  chat={chat}
                />
              )
            :
              <p>You have no active chats at this time.</p>
            }
          </div> 
        </div>
      </Fragment>
    );
  } 
}

export default ChatsIndex;