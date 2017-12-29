import React from 'react';
import axios from 'axios';
import socketIOClient from 'socket.io-client';

import Auth from '../../lib/Auth';
import Navbar from '../utility/Navbar';
import { log } from 'util';

class ChatsShow extends React.Component {
  constructor() {
    super();

    this.state = {
      chat: {},
      message: {
        content: ''
      }
    }

    this.websocket = socketIOClient('/message-stream');
  }

  componentWillUnmount() {
    this.websocket.disconnect(true);
  }

  componentDidMount() {
    this.websocket.on('connect', () => {
      this.websocket.on('newMessage', newMessage => {
        const chat = Object.assign({}, this.state.chat, { messages: this.state.chat.messages.concat(newMessage)});
        this.setState({ chat, message: { content: ''} });
      });
    });

    axios
      .get(`/api/chats/${this.props.match.params.id}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}`}
      })
      .then(res => this.setState({ chat: res.data }))
      .catch(err => console.log(err));
  }

  componentWillUnmount() {
    if(this.state.chat.messages.length === 0) {
      axios
        .delete(`/api/chats/${this.state.chat.id}`, { headers: { Authorization: `Bearer ${Auth.getToken()}`} });
    };
  }

  handleChange = ({ target: { value }}) => {
    this.setState({ message: { content: value } });
  }

  handleSubmit = e => {
    e.preventDefault();

    axios
      .post(`/api/chats/${this.state.chat.id}/messages`, this.state.message, { headers: { Authorization: `Bearer ${Auth.getToken()}`} });
  }

  render() {
    return (
      <div>
       { this.state.chat.id && <Navbar title={this.state.chat.participants[1].first} /> }
       <div className="container">
        <div className="chat-show">
          <div className="messages-container">
            { this.state.chat.id && <ul>
              { this.state.chat.messages.map(message => 
                <li key={message.id} className={"message-container " + (message.createdBy.id === Auth.getPayload() .id ? 'right': 'left') }>
                  <p>{ message.content }</p>
                </li>
              )}
            </ul> }
          </div>
          <hr />
          <div className="new-message-container">
              <form onSubmit={this.handleSubmit}>
                <textarea onChange={this.handleChange} value={ this.state.message.content } />
                <button className="submit">Send</button>
              </form>
          </div>
        </div>
       </div>
      </div>
    );
  }
}

export default ChatsShow;