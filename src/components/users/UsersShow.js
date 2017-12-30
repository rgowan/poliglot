import React from 'react';
import axios from 'axios';

import Auth from '../../lib/Auth';
import Navbar from '../utility/Navbar';

class UsersShow extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {}
    };
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
      <React.Fragment>
        <Navbar title="Profile" /> 
        
        <div className="container">
          <div className="profile-container">
            <img className={ this.state.user.online ? 'online' : '' } src={ this.state.user.image } />
            <h2>{ this.state.user.fullname }</h2>
            <h3>{ this.state.user.email }</h3>
            <p>Status: <span>{ this.state.user.online ? 'Online' : 'Offline' }</span></p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UsersShow;