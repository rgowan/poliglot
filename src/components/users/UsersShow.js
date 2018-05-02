import React, { Component, Fragment } from 'react';
import axios from 'axios';
import emoji from 'emoji-dictionary';

import Auth from '../../lib/Auth';
import Navbar from '../utility/Navbar';

class UsersShow extends Component {
  state = {
    user: {}
  }

  componentDidMount() {
    axios
      .get(`/api/users/${this.props.match.params.id}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}`}
      })
      .then(res => this.setState({ user: res.data }))
      .catch(err => console.log(err));
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

           <h2>Archived Chats</h2>
           <p>You do not have any archived chats at the moment.</p>
        </div>
      </Fragment>
    );
  }
}

export default UsersShow;