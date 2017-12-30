import React from 'react';
import Auth  from '../../lib/Auth';
import { withRouter, Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...other }) => {
  return (
    <Route {...other} render={props => (
      Auth.isAuthenticated() ? (
        <Component {...props}/>
      ) : (
        <Redirect to="/"/>
      )
    )}/>
  );
};

export default withRouter(ProtectedRoute);