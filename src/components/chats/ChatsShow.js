import React          from 'react';
import axios          from 'axios';
import socketIOClient from 'socket.io-client';
import emoji          from 'emoji-dictionary';

import Auth    from '../../lib/Auth';
import Navbar  from '../utility/Navbar';
import Message from '../utility/Message';

class ChatsShow extends React.Component {
  constructor() {
    super();

    this.state = {
      languages: [],
      chat: {},
      message: {
        content: ''
      }
    }

    this.websocket = socketIOClient('/sockets');
  }

  componentDidMount() {
    axios
      .get(`/api/chats/${this.props.match.params.id}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}`}
      })
      .then(res => this.setState({ chat: res.data }, () => console.log(this.state)))
      .catch(err => console.log(err));

    axios
      .get('/api/languages', {
        headers: { Authorization: `Bearer ${Auth.getToken()}`}
      })
      .then(res => this.setState({ languages: res.data }))
      .catch(err => console.log(err));
    
    this.websocket.on('connect', () => {
      this.websocket.on('newMessage', newMessage => {
        const chat = Object.assign({}, this.state.chat, { messages: this.state.chat.messages.concat(newMessage)});
        this.setState({ chat, message: { content: ''} });
      });
    });
  }

  componentWillUnmount() {
    this.websocket.disconnect(true);
    if(this.state.chat.messages.length === 0) axios.delete(`/api/chats/${this.state.chat.id}`, { headers: { Authorization: `Bearer ${Auth.getToken()}`} });
  }

  handleChange = ({ target: { value }}) => this.setState({ message: { content: value } });

  handleLanguageChange = (e) => {
    const language = this.state.languages.find(language => language.code === e.target.value);
    delete language.id;

    axios
      .put(`/api/chats/${this.props.match.params.id}`, { language }, { headers: { Authorization: `Bearer ${Auth.getToken()}`} })
      .then(res => {
        const chat = Object.assign({}, this.state.chat, { language })
        this.setState({ chat }, () => console.log(this.state));
      })
      .catch(err => console.log(err));
  }

  handleSubmit = e => {
    e.preventDefault();
    axios.post(`/api/chats/${this.state.chat.id}/messages`, this.state.message, { headers: { Authorization: `Bearer ${Auth.getToken()}`} });
  }

  getCollocutor() {
    return this.state.chat.participants.find(chattingWith => chattingWith.id !== Auth.getPayload().id);
  }

  render() {
    return (
      <div>
       { this.state.chat.id && <Navbar title={this.getCollocutor().first} colloctor={this.getCollocutor()} /> }

       <div className="container">
          <form className="language-selector">
            <label>Language</label>
            { this.state.chat.id && <select onChange={this.handleLanguageChange} value={this.state.chat.language.code}>
              <option value=' ' disabled='true'>Please select a language</option>
              { this.state.languages.map((language, i) => 
                <option key={i} value={ language.code }>{ emoji.getUnicode(`${language.emoji}`) } { language.name }</option>
              )}
            </select> }
          </form>
          
          <section className="chat-container">
            <h2>Messages</h2>
            <div className="messages-box">
              { this.state.chat.id && this.state.chat.messages.map(message => 
                <Message
                  key={message.id} 
                  data={message}
                  language={this.state.chat.language} 
                />
              )}
            </div>
            <div className="new-message-box">
              <form onSubmit={this.handleSubmit}>
                <textarea 
                  onChange={this.handleChange}
                  value={this.state.message.content}
                  placeholder="Aa"
                />
                <input type="submit" value="Send"/>
              </form>
            </div>
          </section>
       </div>
      </div>
    );
  }
}

export default ChatsShow;