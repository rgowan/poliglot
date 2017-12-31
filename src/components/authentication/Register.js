import React from 'react';
import axios from 'axios';

import Auth from '../../lib/Auth';

class Register extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {
        first: '',
        last: '',
        email: '',
        image: '',
        password: '',
        passwordConfirmation: ''
      }
    };
  }

  handleChange = ({ target: { name, value } }) => {
    const user = Object.assign({}, this.state.user, { [name]: value });
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
      });
  }

  render() {
    return (
      <React.Fragment>
        <div className="centered">
          <form onSubmit={this.handleSubmit}>
            <h1>Signup</h1>
            
            <div>
              <label htmlFor="first">First Name *</label>
              <input 
                onChange={this.handleChange}
                type="text" 
                name="first" 
                id="first" 
              />
            </div>
            <div>
              <label htmlFor="last">Last Name *</label>
              <input 
                onChange={this.handleChange}
                type="text" 
                name="last" 
                id="last" 
              />
            </div>
            <div>
              <label htmlFor="email">Email *</label>
              <input 
                onChange={this.handleChange}
                type="text" 
                name="email" 
                id="email"
              />
            </div>
            <div>
              <label htmlFor="image">Profile Picture</label>
              <input 
                onChange={this.handleChange}
                type="text" 
                name="image" 
                id="image"
              />
            </div>
            <div>
              <label htmlFor="password">Password *</label>
              <input 
                onChange={this.handleChange}
                type="password" 
                name="password" 
                id="password"
              />
            </div>
            <div>
              <label htmlFor="passwordConfirmation">Password Confirmation *</label>
              <input
                onChange={this.handleChange} 
                type="password" 
                name="passwordConfirmation" 
                id="passwordConfirmation"
              />
            </div>
            <div>
              <button className="button submit">Signup</button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  } 
}

export default Register;
