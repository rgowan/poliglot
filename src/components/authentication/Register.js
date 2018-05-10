import React, { Component } from 'react';
import axios from 'axios';

import Auth from '../../lib/Auth';
import RegisterForm from './RegisterForm';

class Register extends Component {
  state = {
    languages: [],
    user: {
      first: '',
      last: '',
      email: '',
      language: '',
      image: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  componentDidMount() {
    axios
      .get('/api/languages')
      .then(res => this.setState({ languages: res.data }))
      .catch(err => console.log(err));
  }

  handleChange = ({ target: { name, value } }) => {
    const user = Object.assign({}, this.state.user, { [name]: value });
    this.setState({ user });
  }

  handleImageUpload = (result) => {
    const user = Object.assign({}, this.state.user, { image: result.filesUploaded[0].url});
    this.setState({ user });
  }

  handleSubmit = e => {
    e.preventDefault();

    let user = null;
    if (this.state.user.image === '') user = Object.assign({}, this.state.user, { image: '/assets/images/default-user-image.png' });

    axios
      .post('/api/register', user || this.state.user)
      .then(res => {
        Auth.setToken(res.data.token);
        this.props.history.push('/chats');
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <RegisterForm 
        handleChange={this.handleChange}
        handleImageUpload={this.handleImageUpload}
        handleSubmit={this.handleSubmit}
        user={this.state.user}
        languages={this.state.languages}
      />
    );
  } 
}

export default Register;