import React, { Component, Fragment } from 'react';
import axios from 'axios';

import Auth from '../../lib/Auth';
import LoginForm from './LoginForm';

class Login extends Component {
  state = {
    user: {
      email: '',
      password: ''
    }
  }

  handleChange = ({ target: { name, value } }) => {
    const user = Object.assign({}, this.state.user, { [name]: value });
    this.setState({ user });
  }

  handleSubmit = e => {
    e.preventDefault();
    
    axios
      .post('/api/login', this.state.user)
      .then(res => {
        Auth.setToken(res.data.token);
        this.props.history.push('/chats');
      });
  }
  
  render() {
    return (
      <LoginForm 
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  } 
}

export default Login;
