import React          from 'react';
import Autosuggest    from 'react-autosuggest';
import axios          from 'axios';

import Auth from '../../lib/Auth';

class AutosuggestContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      filteredUsers: [],
      inputValue: ''
    }
  }

  handleChange = ( event, { newValue }) => {
    this.setState({ inputValue: newValue });
  }

  handleClick = (e, target) => {
    const user   = this.props.users.filter(user => user.fullname === target.suggestionValue);
    const userId = user[0].id;

    axios
      .post(`/api/chats/create/${userId}`, {}, { headers: { Authorization: `Bearer ${Auth.getToken()}`} })
      .then(res => this.props.history.push(`/chats/${res.data.id}`))
      .catch(err => console.log(err));
  }

  onSuggestionsClearRequested = () => {
    this.setState({ filteredUsers: [] });
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({ filteredUsers: this.getSuggestions(value) });
  }

  getSuggestionValue = value => {
    return value.fullname;
  }

  getSuggestions = value => { 
    const inputValue    = value.trim().toLowerCase();
    const filteredUsers = [];
    const usersInChats  = this.props.chats.map(chat => chat.participants.find(user => user.id !== Auth.getPayload().id).id);

    if(value === '') return this.setState({ filteredUsers: []});

    this.props.users.map(user => {
      if (user.fullname.toLowerCase().indexOf(inputValue) !== -1 && user.id !== Auth.getPayload().id && usersInChats.indexOf(user.id) === -1) filteredUsers.push(user);
    });

    return filteredUsers;
  }

  render() {
    const inputProps = {
      placeholder: "💬 Who do you want to chat to?",
      value: this.state.inputValue,
      onChange: this.handleChange
    };


    return (
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

export default AutosuggestContainer;