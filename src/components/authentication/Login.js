import React from 'react';
import axios from 'axios';

import Auth from '../../lib/Auth';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {
        email: '',
        password: ''
      }
    };
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
          <h1>Login</h1>

          <form onSubmit={this.handleSubmit}>
            <div>
             <label htmlFor="email">Email</label>
             <input 
              onChange={ this.handleChange } 
              type="text" 
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

export default Login;
