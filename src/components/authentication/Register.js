import React from 'react';
import axios from 'axios';
import emoji from 'emoji-dictionary';

import Auth from '../../lib/Auth';

export default class Register extends React.Component {
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
      <React.Fragment>
        <div className="register">
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
                type="email" 
                name="email" 
                id="email"
              />
            </div>
            <div>
              <label htmlFor="email">Language *</label>
              { this.state.languages && <select onChange={this.handleChange} name="language" value={this.state.user.language}>
              <option value='' disabled="true">Please select a language</option>
              { this.state.languages.map((language, i) => 
                <option key={i} value={ language.id }>{ emoji.getUnicode(`${language.emoji}`) } { language.name }</option>
              )}
            </select> }
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
