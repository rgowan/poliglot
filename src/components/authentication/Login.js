import React from 'react';
import axios from 'axios';

import Auth from '../../lib/Auth';

export default class Login extends React.Component {
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
      <React.Fragment>
        <div className="centered">
          <form onSubmit={this.handleSubmit}>
            <h1>Login</h1>
            
            <div>
             <label htmlFor="email">Email</label>
             <input 
              onChange={ this.handleChange } 
              type="email" 
              name="email" 
              id="email" 
             />
            </div>
            <div>
             <label htmlFor="password">Password</label>
             <input 
              onChange={ this.handleChange }
              type="password" 
              name="password" 
              id="password"
              />
            </div>
            <div>
             <button className="button submit">Login</button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  } 
}
