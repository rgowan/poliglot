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
      <div>
        <Navbar title="Profile" /> 
        
        <div className="container">
          <div className="profile">
            <img src={ this.state.user.image } />
            <h2>{ this.state.user.fullname }</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default UsersShow;