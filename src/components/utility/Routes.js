import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import Homepage from '../Homepage';
import Login from '../authentication/Login';
import Register from '../authentication/Register';
import ChatsIndex from '../chats/ChatsIndex';
import ChatsShow from '../chats/ChatsShow';
import UsersShow from '../users/UsersShow';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={ Homepage } />
      <Route path="/login" component={ Login }/>
      <Route path="/register" component={ Register }/>
      <ProtectedRoute path="/chats/:id" component={ ChatsShow }/>
      <ProtectedRoute path="/chats" component={ ChatsIndex }/>
      <ProtectedRoute path="/users/:id" component={ UsersShow }/>
    </Switch>
  );
};

export default Routes;
