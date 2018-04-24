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
    users: [],
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

    this.websocket.on('connect', () => {
      this.websocket.on('login',  user => 
        this.updateUsersOnAuth(true, user)
      );
      this.websocket.on('logout', user => 
        this.updateUsersOnAuth(false, user)
      );
    });
  }

  componentWillUnmount() {
    this.websocket.disconnect(true);
  }

  updateUsersOnAuth(boolean, user) {
    const users = this.state.users.map(person => {
      if(person.id === user.id) {
        person.online = boolean;
        return person;
      } 
      return person;
    });

    return this.setState({ users });
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

          <section className="chats-container">
            <h2>Active Chats</h2>
            { this.state.chats.length !== 0 ? 
              this.state.chats.map(chat => 
                <ActiveChat 
                  key={chat.id} 
                  chat={chat} 
                  users={this.state.users}
                  />
              )
            :
              <p>You have no active chats at this time.</p>
            }
          </section> 
        </div>
      </Fragment>
    );
  } 
}

export default ChatsIndex;