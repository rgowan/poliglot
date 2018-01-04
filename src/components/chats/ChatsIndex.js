import React          from 'react';
import Autosuggest    from 'react-autosuggest';
import axios          from 'axios';
import socketIOClient from 'socket.io-client';
import { Link }       from 'react-router-dom';

import Navbar               from '../utility/Navbar';
import Auth                 from '../../lib/Auth';
import ActiveChat           from '../utility/ActiveChat';
import AutosuggestContainer from '../utility/AutosuggestContainer';

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

    // this.websocket.on('connect', () => {
      this.websocket.on('login',  user => this.updateUsersOnAuth(true, user));
      this.websocket.on('logout', user => this.updateUsersOnAuth(false, user));
    // });
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
  
  render() {
    return(
      <React.Fragment>
        <Navbar title='Chats'/>
        <div className="container">
          <AutosuggestContainer 
            chats={this.state.chats}
            users={this.state.users}
            history={this.props.history}
          />

          <section className="chats-container">
            <h2>Active Chats</h2>
            { this.state.chats.length !== 0 ?
              this.state.chats.map(chat => 
                <ActiveChat 
                  key={chat.id} 
                  chat={chat} 
                  users={this.state.users}
                  />
              )
            :
              <p>You have no active chats at this time.</p>
            }
          </section> 
        </div>
      </React.Fragment>
    );
  } 
}

export default ChatsIndex;
