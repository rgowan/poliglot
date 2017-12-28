import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Homepage from '../Homepage'
import Login    from '../authentication/Login';
import Register from '../authentication/Register';
import ChatsIndex from '../chat/ChatsIndex';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={ Homepage } />
      <Route path="/login" component={ Login }/>
      <Route path="/register" component={ Register }/>
      <Route path="/chats" component={ ChatsIndex }/>
    </Switch>
  );
};

export default Routes;