import React from 'react';
import { Link } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';

import Navbar from '../utility/Navbar';
import Auth from '../../lib/Auth';

const Suggestion = user => {
  return(
    <div>
      <img src={ user.image }/>
      <p>{ user.fullname }</p>
    </div>
  );
}

class ChatsIndex extends React.Component {
  constructor() {
    super();

    this.state = {
      chats: [],
      users: [],
      filteredUsers: [],
      inputValue: ''
    };
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

  onSuggestionsClearRequested = () => this.setState({ filteredUsers: [] });
  onSuggestionsFetchRequested = ({ value }) => this.setState({ filteredUsers: this.getSuggestions(value) });
  getSuggestionValue = value => value.fullname;
  handleChange = ( event, { newValue }) => this.setState({ inputValue: newValue });

  handleClick = (e, data) => {
    const user   = this.state.users.filter(user => user.fullname === data.suggestionValue);
    const userId = user[0].id;

    axios
      .post(`/api/chats/create/${userId}`, {}, { headers: { Authorization: `Bearer ${Auth.getToken()}`} })
      .then(res => this.props.history.push(`/chats/${res.data.id}`))
      .catch(err => console.log(err));
  }

  getSuggestions = value => { 
    const inputValue    = value.trim().toLowerCase();
    const inputLength   = inputValue.length;
    const filteredUsers = [];
    const usersInChats = this.state.chats.map(chat => chat.participants.find(user => user.id !== Auth.getPayload().id).id);

    if(value === '') return this.setState({ filteredUsers: []});

    this.state.users.map(user => {
      if (user.fullname.toLowerCase().indexOf(inputValue) !== -1 && user.id !== Auth.getPayload().id && usersInChats.indexOf(user.id) === -1) filteredUsers.push(user);
    });

    return filteredUsers;
  }

  render() {
    const inputProps = {
      placeholder: "Who do you want to chat to?",
      value: this.state.inputValue,
      onChange: this.handleChange
    };

    return(
      <div>
        <Navbar title='Chats' />
        <div className="container">
          <div className="new-chat">
            <Autosuggest 
              suggestions={this.state.filteredUsers}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={this.getSuggestionValue}
              renderSuggestion={Suggestion}
              inputProps={inputProps}
              onSuggestionSelected={this.handleClick}
            />
          </div>

          <h2>Active Chats</h2>
          { this.state.chats.length !== 0 ? 
            <ul className="chat-index-container">
              { this.state.chats.map(chat => 
                <li key={chat.id} className="chat-tile">
                  <Link to={`/chats/${chat.id}`}>
                    <div className="chat-picture">
                      <img src={chat.participants.find(user => user.id !== Auth.getPayload().id).image }/>
                    </div>
                    <div className="chat-info">
                      <h2>{chat.participants.find(user => user.id !== Auth.getPayload().id).fullname}</h2>
                      <p>{ chat.messages[chat.messages.length -1].content }</p>
                    </div>
                  </Link>
                </li>
              )}
            </ul> 
            : 
            <p>You have no active chats at the moment.</p>
          }
        </div>
      </div>
    );
  } 
}

export default ChatsIndex;
