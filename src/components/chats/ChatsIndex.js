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
    users: []
  }

  websocket = socketIOClient('/sockets');

  componentDidMount() {
    this.websocket.on('login',  user => this.updateUserOnAuth(true, user));
    this.websocket.on('logout', user => this.updateUserOnAuth(false, user));

    this.websocket.on('updatedChat', updatedChat => {

      // new chat including current user
      if(!this.state.chats.some(chat => chat.id === updatedChat.id) && updatedChat.participants.some(participant => participant.id === Auth.getPayload().id)) {
        const chats = [updatedChat, ...this.state.chats];
        this.setState({ chats });
      }

      // new message in current user's active chat
      if(this.state.chats.some(chat => chat.id === updatedChat.id)) {
        const chats = this.state.chats.map((chat, i) => {
          if(chat._id === updatedChat._id) {
            chat = updatedChat;
            return chat;
          }

          return chat;
        });

        this.setState({ chats });
      }
    });
    
    axios
      .all([
        axios.get('/api/chats', { 
          headers: { Authorization: `Bearer ${Auth.getToken()}`} 
        }),
        axios.get('/api/users', { 
          headers: { Authorization: `Bearer ${Auth.getToken()}`} 
        })
      ])
      .then(axios.spread((chats, users) => this.setState({ 
        chats: chats.data, 
        users: users.data })
      ))
      .catch(err => console.log(err));
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

  archiveChat = (chatId) => {
    console.log(chatId);

    axios
      .get(`/api/chats/${chatId}/archive`, { 
        headers: { Authorization: `Bearer ${Auth.getToken()}`} 
      })
      .then(res => {
        const chats = this.state.chats.map(chat => {
          if (chat.id === res.data.id) {
            chat = res.data;
            return chat;
          }
          return chat;
        });

        this.setState({ chats });
      });
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

  sortActiveChats = () => {
    const filteredChats = this.state.chats.filter(chat => !chat.archive.includes(Auth.getPayload().id));

    return filteredChats.sort((a, b) => {
      return new Date(b.messages[b.messages.length -1].createdAt) - new Date(a.messages[a.messages.length -1].createdAt);
    })
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
            { this.sortActiveChats().length !== 0 ? 
              this.sortActiveChats().map(chat => 
                <ActiveChat 
                  key={chat.id} 
                  chat={chat}
                  archiveChat={this.archiveChat}
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