import React, { Component, Fragment } from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import emoji from 'emoji-dictionary';

import Auth from '../../lib/Auth';

const Suggestion = user => {
  return(
    <Fragment>
      <img className={ user.online ? 'online' : ''} src={ user.image }/>
      <p>{ user.fullname } { emoji.getUnicode(`${user.language.emoji}`) }</p>
    </Fragment>
  );
};

class AutosuggestContainer extends Component {
  state = {
    filteredUsers: [],
    inputValue: ''
  }

  handleChange = ( event, { newValue }) => {
    this.setState({ inputValue: newValue });
  }

  handleClick = (e, target) => {
    const user   = this.props.users.filter(user => user.fullname === target.suggestionValue);
    const userId = user[0].id;

    const prevChat = this.props.chats.find(chat => {
      if(chat.participants.find(participant => participant.id === userId)) return chat;
    });

    if(prevChat) {
      this.props.history.push(`/chats/${prevChat.id}`);
    } else {
      axios
        .post(`/api/chats/create/${userId}`, {}, { headers: { Authorization: `Bearer ${Auth.getToken()}`} })
        .then(res => this.props.history.push(`/chats/${res.data.id}`))
        .catch(err => console.log(err));
    }
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

    if(value === '') return this.setState({ filteredUsers: []});

    this.props.users.map(user => {
      if (user.fullname.toLowerCase().indexOf(inputValue) !== -1) filteredUsers.push(user);
    });

    return filteredUsers;
  }

  render() {
    const inputProps = {
      placeholder: '💬 Who do you want to chat to?',
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

export default AutosuggestContainer;
