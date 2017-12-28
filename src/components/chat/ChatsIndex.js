import React from 'react';
import { Link } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';

import Navbar from '../utility/Navbar';
import Auth from '../../lib/Auth';

const renderSuggestion = user => {
  return(
    <div>{ user.fullname }</div>
  );
}

class ChatsIndex extends React.Component {
  constructor() {
    super();

    this.state = {
      chats: [],
      users: [],
      filteredUsers: [],
      user: ''
    };

    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.getSuggestions              = this.getSuggestions.bind(this);
    this.getSuggestionValue          = this.getSuggestionValue.bind(this);
  }

  componentDidMount() {
    axios
      .get('/api/chats', { headers: { Authorization: `Bearer ${Auth.getToken()}`} })
      .then(res => this.setState({ chats: res.data }))
      .catch(err => console.log(err));
    
    axios
      .get('/api/users', { headers: { Authorization: `Bearer ${Auth.getToken()}`} })
      .then(res => this.setState({ users: res.data }))
      .catch(err => console.log(err));
  }

  onSuggestionsClearRequested = () => {
    this.setState({ filteredUsers: [] });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({ filteredUsers: this.getSuggestions(value) }, () => console.log(this.state));
  };


  getSuggestionValue = user => user.fullname;

  onChange = ( { target: { value }}) => {
    this.setState({ user: value });
  }

  getSuggestions = value => {  
    const inputValue    = value.trim().toLowerCase();
    const inputLength   = inputValue.length;
    const filteredUsers = [];

    this.state.users.map(user => {
      if (user.fullname.toLowerCase().indexOf(inputValue) !== -1) filteredUsers.push(user);
    });

    return filteredUsers;
  }



  render() {
    const inputProps = {
      placeholder: 'Who do you want to chat with?',
      value: this.state.user,
      onChange: this.onChange
    };


    return(
      <div>
        <Navbar title='Chats' />
        { this.state.chats[0] && <div className="container">
          <div className="new-chat">
          <Autosuggest 
            suggestions={this.state.filteredUsers}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
          </div>
          <ul className="chat-index-container">
            { this.state.chats.map(chat => 
              <li key={chat.id} className="chat-tile">
                <Link to={`/chats/${chat.id}`}>
                  <div className="chat-picture">
                    <img src={chat.participants[1].image }/>
                  </div>
                  <div className="chat-info">
                    <h2>{chat.participants[1].fullname}</h2>
                    <p>{ chat.messages[chat.messages.length -1].content }</p>
                  </div>
                </Link>
              </li>
            )}
          </ul>
          </div> }
      </div>
    );
  } 
}

export default ChatsIndex;
