import React, { Component, Fragment } from 'react';
import axios from 'axios';
import emoji from 'emoji-dictionary';
import socketIOClient from 'socket.io-client';

import Auth from '../../lib/Auth';
import Navbar from '../utility/Navbar';
import Message from '../utility/Message';

class ChatsShow extends Component {
  state = {
    languages: [],
    chat: {},
    message: {
      content: ''
    },
    currentUser: {}
  }

  websocket = socketIOClient('/sockets');

  componentDidMount() {
    const headers = { Authorization: `Bearer ${Auth.getToken()}`};

    axios
      .all([
        axios.get(`/api/chats/${this.props.match.params.id}`, { headers }),
        axios.get('/api/languages', { headers }),
        axios.get(`/api/users/${Auth.getPayload().id}`, { headers })
      ])
      .then(axios.spread((chat, languages, user) => {
        this.setState({ 
          chat: chat.data, 
          languages: languages.data, 
          currentUser: user.data 
        });
      }))
      .catch(err => console.log(err));
    
    this.websocket.on('newMessage', newMessage => {
      const chat = Object.assign({}, this.state.chat, { messages: this.state.chat.messages.concat(newMessage)});
      this.setState({ chat });
    });
  
    this.websocket.on('login',  user => this.updateUserOnAuth(true, user));
    this.websocket.on('logout', user => this.updateUserOnAuth(false, user));
  }

  componentDidUpdate() {
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  componentWillUnmount() {
    this.websocket.disconnect(true);
    if(this.state.chat.messages.length === 0) 
      axios.delete(`/api/chats/${this.state.chat.id}`, { headers: { Authorization: `Bearer ${Auth.getToken()}`} });
  }

  updateUserOnAuth(boolean, user) {
    const participant = this.state.chat.participants.find(participant => participant.id === user.id );

    if (participant) {
      const participants = this.state.chat.participants.map(user => {
        if (user.id === participant.id) {
          user.online = boolean;
          return user;
        }

        return user;
      });

      const chat = Object.assign({}, this.state.chat, { participants });
      this.setState({ chat });
    }
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ message: { content: value } });
  }

  handleLanguageChange = (e) => {
    const language = this.state.languages.find(language => language.code === e.target.value);
    delete language.id;

    axios
      .put(`/api/chats/${this.props.match.params.id}`, { language }, { headers: { Authorization: `Bearer ${Auth.getToken()}`} })
      .then(res => {
        const chat = Object.assign({}, this.state.chat, { language })
        this.setState({ chat });
      })
      .catch(err => console.log(err));
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.message.content !== '') {
      axios
        .post(`/api/chats/${this.state.chat.id}/messages`, this.state.message, { headers: { Authorization: `Bearer ${Auth.getToken()}`} })
        .then(() => {
          this.setState({ message: { content: '' }})
        })
    }
  }

  getCollocutor() {
    return this.state.chat.participants.find(chattingWith => chattingWith.id !== Auth.getPayload().id);
  }

  render() {
    return (
      <Fragment>
        { this.state.chat.id && 
          <Navbar title={this.getCollocutor().first} colloctor={this.getCollocutor()} /> 
        }

        <div className="container">
          { this.state.chat.id && 
            <form className="language-selector">
              <label>{ this.getCollocutor().first} is reading</label>
              <select onChange={this.handleLanguageChange} value={this.getCollocutor().language.code}>
                { this.state.languages.map(language => 
                  <option key={language.id} value={language.code} disabled>
                    { emoji.getUnicode(`${language.emoji}`) } { language.name }
                  </option>
                )}
              </select>
            </form>
          }
          <section className="chat-container">
            <h2>Messages</h2>
            <div 
              className="messages-box" 
              ref={(messagesContainer => this.messagesContainer = messagesContainer)}
            >
              { this.state.chat.id && this.state.chat.messages.map((message, i) => 
                <Message
                  key={i} 
                  data={message}
                  language={this.state.currentUser.language.code} 
                />
              )}
            </div>
          </section>
        </div>

        <div className="new-message-box">
          <form onSubmit={this.handleSubmit}>
            <textarea 
              onChange={this.handleChange}
              value={this.state.message.content}
              placeholder="Aa"
            />
            <button className={this.state.message.content ? 'sendable-message' : ''}><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default ChatsShow;