import React          from 'react';
import Autosuggest    from 'react-autosuggest';
import axios          from 'axios';
import socketIOClient from 'socket.io-client';
import { Link }       from 'react-router-dom';

import Navbar     from '../utility/Navbar';
import Auth       from '../../lib/Auth';
import ActiveChat from '../utility/ActiveChat';

class ChatsIndex extends React.Component {
  constructor() {
    super();

    this.state = {
      chats: [],
      users: [],
      filteredUsers: [],
      inputValue: ''
    };

    this.websocket = socketIOClient('/sockets');
  }

  componentDidMount() {
    const headers = { Authorization: `Bearer ${Auth.getToken()}`};

    axios
      .all([
        axios.get('/api/chats', { headers }),
        axios.get('/api/users', { headers })
      ])
      .then(axios.spread((chats, users) => this.setState({ chats: chats.data, users: users.data })))
      .catch(err => console.log(err));

    this.websocket.on('connect', () => {
      this.websocket.on('login',  user => this.updateUsersOnAuth(true, user));
      this.websocket.on('logout', user => this.updateUsersOnAuth(false, user));
    });
  }

  componentWillUnmount() {
    this.websocket.disconnect(true);
  }

  updateUsersOnAuth(boolean, user) {
    const users = this.state.users.map(person => {
      if(person.id === user.id) {
        person.online = boolean;
        return person;
      } 
      return person;
    });

    return this.setState({ users });
  }

  handleClick = (e, target) => {
    const user   = this.state.users.filter(user => user.fullname === target.suggestionValue);
    const userId = user[0].id;

    axios
      .post(`/api/chats/create/${userId}`, {}, { headers: { Authorization: `Bearer ${Auth.getToken()}`} })
      .then(res => this.props.history.push(`/chats/${res.data.id}`))
      .catch(err => console.log(err));
  }

  handleChange                = ( event, { newValue }) => this.setState({ inputValue: newValue });
  onSuggestionsClearRequested = () => this.setState({ filteredUsers: [] });
  onSuggestionsFetchRequested = ({ value }) => this.setState({ filteredUsers: this.getSuggestions(value) });
  getSuggestionValue          = value => value.fullname;
  
  getSuggestions = value => { 
    const inputValue    = value.trim().toLowerCase();
    const filteredUsers = [];
    const usersInChats  = this.state.chats.map(chat => chat.participants.find(user => user.id !== Auth.getPayload().id).id);

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

          <form className="auto-suggest-container">
            <label>New Chat</label>
            <Autosuggest 
              suggestions={this.state.filteredUsers}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={this.getSuggestionValue}
              renderSuggestion={Suggestion}
              inputProps={inputProps}
              onSuggestionSelected={this.handleClick}
            />
          </form>
          <div className="chats-container">
            <h2>Active Chats</h2>
            { this.state.chats !== [] ? 
              this.state.chats.map(chat => 
                <ActiveChat 
                  key={chat.id} 
                  data={chat} 
                  users={this.state.users}
                  />
              )
            :
              <p>You have no active chats at this time.</p>
            }
          </div> 
        </div>
      </div>
    );
  } 
}

const Suggestion = user => {
  return(
    <div>
      <img className={ user.online ? 'online' : ''} src={ user.image }/>
      <p>{ user.fullname }</p>
    </div>
  );
}

export default ChatsIndex;
