import React, { Component, Fragment } from 'react';
import axios from 'axios';
import emoji from 'emoji-dictionary';

import Auth from '../../lib/Auth';
import Navbar from '../utility/Navbar';
import ActiveChat from '../utility/ActiveChat';

class UsersShow extends Component {
  state = {
    user: {},
    chats: []
  }

  componentDidMount() {
    axios
      .all([
        axios.get(`/api/users/${this.props.match.params.id}`, { 
          headers: { Authorization: `Bearer ${Auth.getToken()}`} 
        }),
        axios.get('/api/chats', { 
          headers: { Authorization: `Bearer ${Auth.getToken()}`} 
        })
      ])
      .then(axios.spread((user, chats) => this.setState({ 
        user: user.data, 
        chats: chats.data })
      ))
      .catch(err => console.log(err));
  }

  filterChats() {
    return this.state.chats.filter(chat => chat.archive.includes(this.props.match.params.id));
  }
  
  render() {
    return(
      <Fragment>
        <Navbar title="Profile" /> 
        
        <div className="container">
          <div className="profile-container">
            <img 
              className={ this.state.user.online ? "online" : "" } 
              src={ this.state.user.image } 
            />
            <h2>{ this.state.user.fullname }</h2>
            <h3>{ this.state.user.email }</h3>
            
            { this.state.user.language && 
              <p>Language: { this.state.user.language.name } { emoji.getUnicode(`${this.state.user.language.emoji}`) }</p> 
            }

            <p>Status: <span>{ this.state.user.online ? 'Online' : 'Offline' }</span></p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default UsersShow;